package student

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"

	studentResponse "github.com/4otis/gamification-platform-alabuga/internal/dto/response/student"
	"github.com/4otis/gamification-platform-alabuga/internal/repository"
	"github.com/4otis/gamification-platform-alabuga/internal/services"
	"github.com/gin-gonic/gin"
)

type CourseHandler struct {
	courseService  services.CourseService
	missionService services.MissionService
	// studentService services.StudentService
}

func NewCourseHandler(
	courseService services.CourseService,
	missionService services.MissionService,
	// studentService services.StudentService,
) *CourseHandler {
	return &CourseHandler{
		courseService:  courseService,
		missionService: missionService,
		// studentService: studentService,
	}
}

// GetCoursePage godoc
// @Summary Получить страницу курса
// @Description Возвращает данные для страницы курса: информацию о курсе, его этапах и миссиях
// @Tags Course
// @Accept json
// @Produce json
// @Param student_id path int true "ID студента"
// @Param course_id path int true "ID курса"
// @Success 200 {object} studentResponse.CourseResponse "Успешный ответ"
// @Failure 400 {object} dto.ErrorResponse "Неверный ID студента или курса"
// @Failure 404 {object} dto.ErrorResponse "Курс не найден"
// @Failure 500 {object} dto.ErrorResponse "Внутренняя ошибка сервера"
// @Security ApiKeyAuth
// @Router /student/{student_id}/courses/{course_id} [get]
func (h *CourseHandler) GetCoursePage(c *gin.Context) {
	studentID, err := strconv.Atoi(c.Param("student_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid student ID"})
		return
	}

	courseID, err := strconv.Atoi(c.Param("course_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid student ID"})
		return
	}

	isAvailable, err := h.courseService.IsCourseAvailableForStudent(
		c.Request.Context(),
		uint(studentID),
		uint(courseID),
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if !isAvailable {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Course is not available for this student (insufficient rank)",
		})
		return
	}

	courseData, err := h.courseService.GetCourseByID(c.Request.Context(), uint(courseID))
	if err != nil {
		if errors.Is(err, repository.ErrNotFound) {
			c.JSON(http.StatusNotFound, gin.H{
				"error":   err.Error(),
				"message": fmt.Sprintf("Student by (id:%d) not found", courseID),
			})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	missions, err := h.missionService.GetStudentsMissionsByCourseID(c.Request.Context(), uint(studentID), uint(courseID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	artifactData, err := h.courseService.GetCourseArtifactByID(c.Request.Context(), courseData.ArtifactID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	response := studentResponse.CourseResponse{
		Course: &studentResponse.DetailedCourseInfo{
			ID:          courseData.ID,
			Title:       courseData.Title,
			Descr:       courseData.Descr,
			MinProgress: courseData.MinProgress,
			Timeout:     courseData.Timeout,
			Rank:        courseData.Rank.Name,
			Artifact: &studentResponse.ArtifactInfo{
				ID:       artifactData.ID,
				Title:    artifactData.Title,
				Descr:    artifactData.Descr,
				FilePath: artifactData.FilePath,
				RarityID: artifactData.RarityID,
				Rarity:   artifactData.Rarity.Name,
			},
		},
		Missions: convertMissionsToStructedTreeMissionsDTO(missions),
	}

	c.JSON(http.StatusOK, response)
}
