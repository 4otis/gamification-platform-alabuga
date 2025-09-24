package student

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"

	studentRequest "github.com/4otis/gamification-platform-alabuga/internal/dto/request/student"
	"github.com/4otis/gamification-platform-alabuga/internal/dto/response/student"
	studentResponse "github.com/4otis/gamification-platform-alabuga/internal/dto/response/student"
	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"github.com/4otis/gamification-platform-alabuga/internal/repository"
	"github.com/4otis/gamification-platform-alabuga/internal/services"
	"github.com/gin-gonic/gin"
)

type InventoryHandler struct {
	inventoryService services.InventoryService
	studentService   services.StudentService
	// missionService   services.MissionService
	// courseService    services.CourseService
	// rankingService   services.RankingService
}

func NewInventoryHandler(
	inventoryService services.InventoryService,
	studentService services.StudentService,
	// missionService services.MissionService,
	// courseService services.CourseService,
	// rankingService services.RankingService
) *InventoryHandler {
	return &InventoryHandler{
		inventoryService: inventoryService,
		studentService:   studentService,
		// missionService:   missionService,
		// courseService:    courseService,
		// rankingService:   rankingService,
	}
}

// GetInventoryPage godoc
// @Summary Получить страницу инвентаря студента
// @Description Возвращает данные для страницы инвентаря студента: информацию о студенте, экипированные предметы, доступные предметы и типы предметов
// @Tags Inventory
// @Accept  json
// @Produce  json
// @Param student_id path int true "ID студента"
// @Success 200 {object} student.InventoryResponse "Успешный ответ"
// @Failure 400 {object} dto.ErrorResponse "Неверный ID студента"
// @Failure 404 {object} dto.ErrorResponse "Студент не найден"
// @Failure 500 {object} dto.ErrorResponse "Внутренняя ошибка сервера"
// @Security ApiKeyAuth
// @Router /student/{student_id}/inventory/ [get]
func (h *InventoryHandler) GetInventoryPage(c *gin.Context) {
	studentID, err := strconv.Atoi(c.Param("student_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid student ID"})
		return
	}

	studentData, err := h.studentService.GetStudentByID(c.Request.Context(), uint(studentID))
	if err != nil {
		if errors.Is(err, repository.ErrNotFound) {
			c.JSON(http.StatusNotFound, gin.H{
				"error":   err.Error(),
				"message": fmt.Sprintf("Student by (id:%d) not found", studentID),
			})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	equipedItems, err := h.inventoryService.GetEquipedItems(c.Request.Context(), uint(studentID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	availableItems, err := h.inventoryService.GetAvailableItems(c.Request.Context(), uint(studentID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	itemTypes, err := h.inventoryService.GetItemTypes(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	response := studentResponse.InventoryResponse{
		Profile: &studentResponse.ProfileInfo{
			Student: &studentResponse.StudentInfo{
				ID:      studentData.ID,
				Name:    studentData.Name,
				Surname: studentData.Surname,
				Exp:     studentData.Exp,
				Rank:    studentData.Rank.Name,
			},
			EquipedItems: convertItemsToDTO(equipedItems),
		},
		Items:     convertItemsToDTO(availableItems),
		ItemTypes: convertItemTypesToDTO(itemTypes),
	}

	c.JSON(http.StatusOK, response)
}

// EquipItem godoc
// @Summary Экипировать или снять предмет
// @Description Экипирует или снимает предмет у студента. Если предмет уже экипирован - снимает его.
// @Tags Inventory
// @Accept  json
// @Produce  json
// @Param student_id path int true "ID студента"
// @Param item_id path int true "ID предмета"
// @Success 200 {object} student.EquipItemResponse "Успешный ответ"
// @Failure 400 {object} dto.ErrorResponse "Неверные параметры"
// @Failure 404 {object} dto.ErrorResponse "Студент или предмет не найден"
// @Failure 500 {object} dto.ErrorResponse "Внутренняя ошибка сервера"
// @Security ApiKeyAuth
// @Router /student/{student_id}/inventory/equip/{item_id} [patch]
func (h *InventoryHandler) EquipItem(c *gin.Context) {
	var req studentRequest.EquipItemRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err := h.studentService.GetStudentByID(c.Request.Context(), uint(req.StudentID))
	if err != nil {
		if errors.Is(err, repository.ErrNotFound) {
			c.JSON(http.StatusNotFound, gin.H{
				"error":   err.Error(),
				"message": fmt.Sprintf("Student by (id:%d) not found", req.StudentID),
			})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	_, err = h.inventoryService.GetItemByID(c.Request.Context(), uint(req.ItemID))
	if err != nil {
		if errors.Is(err, repository.ErrNotFound) {
			c.JSON(http.StatusNotFound, gin.H{
				"error":   err.Error(),
				"message": fmt.Sprintf("Item by (id:%d) not found", req.ItemID),
			})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	err = h.inventoryService.EquipItem(c.Request.Context(), uint(req.StudentID), uint(req.ItemID), uint(req.TypeID))
	if err != nil {
		if errors.Is(err, repository.ErrNotFound) {
			c.JSON(http.StatusNotFound, gin.H{
				"error":   err.Error(),
				"message": fmt.Sprintf("Item by (id:%d) not found", req.ItemID),
			})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Получаем обновлённые данные для ответа
	equipedItems, err := h.inventoryService.GetEquipedItems(c.Request.Context(), uint(req.StudentID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	response := student.EquipItemResponse{
		EquipedItems: convertItemsToDTO(equipedItems),
	}

	c.JSON(http.StatusOK, response)
}

// Вспомогательные функции для преобразования моделей в DTO
func convertItemTypesToDTO(items []*models.ItemType) []*student.ItemTypeInfo {
	var result []*student.ItemTypeInfo
	for _, i := range items {
		result = append(result, &student.ItemTypeInfo{
			Name: i.Name,
		})
	}
	return result
}
