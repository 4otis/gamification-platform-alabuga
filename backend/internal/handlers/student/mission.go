package student

import (
	"net/http"
	"strconv"

	"github.com/4otis/gamification-platform-alabuga/internal/dto/response/student"
	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"github.com/4otis/gamification-platform-alabuga/internal/services"
	"github.com/gin-gonic/gin"
)

type MissionHandler struct {
	studentService services.StudentService
	missionService services.MissionService
	rankingService services.RankingService
}

func NewMissionHandler(studentService services.StudentService,
	missionService services.MissionService,
	rankingService services.RankingService) *MissionHandler {
	return &MissionHandler{
		studentService: studentService,
		missionService: missionService,
		rankingService: rankingService,
	}
}

// g.GET("/student/:student_id/missions/:mission_id", missionHandler.GetMission)
func (h *MissionHandler) GetMission(c *gin.Context) {
	// studentID, err := strconv.Atoi(c.Param("student_id"))
	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid student ID"})
	// 	return
	// }

	missionID, err := strconv.Atoi(c.Param("mission_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid mission ID"})
		return
	}

	mission, err := h.missionService.GetMissionByID(c.Request.Context(), uint(missionID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	skills, err := h.rankingService.GetSkillsByMissionID(c.Request.Context(), uint(missionID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	response := student.GetMissionResponse{
		Mission: &student.DetailedMissionInfo{
			ID:              uint(missionID),
			Title:           mission.Title,
			Descr:           mission.Descr,
			ManaReward:      mission.ManaReward,
			ExpReward:       mission.ExpReward,
			MissionType:     mission.MissionType.Name,
			NodeLvl:         mission.NodeLvl,
			IsAutoCompleted: mission.IsAutoCompleted,
			Course: &student.CourseInfo{
				ID:    mission.Course.ID,
				Title: mission.Course.Title,
				Descr: mission.Course.Descr,
			},
			Artifact: &student.ArtifactInfo{
				ID:       mission.Artifact.ID,
				Title:    mission.Artifact.Title,
				Descr:    mission.Artifact.Descr,
				FilePath: mission.Artifact.FilePath,
				RarityID: mission.Artifact.RarityID,
				Rarity:   mission.Artifact.Rarity.Name,
			},
			Skills: convertSkillsToDTO(skills),
		},
	}

	c.JSON(http.StatusOK, response)
}

// g.GET("/student/:student_id/missions/:course_id", missionHandler.GetMissionsTree)
// func (h *MissionHandler) GetMissionsTree(c *gin.Context) {
// 	studentID, err := strconv.Atoi(c.Param("student_id"))
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid student ID"})
// 		return
// 	}

// 	courseID, err := strconv.Atoi(c.Param("course_id"))
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid course ID"})
// 		return
// 	}

// 	missions, err := h.missionService.GetStudentsMissionsByCourseID(c.Request.Context(), studentID, courseID)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error", err.Error()})
// 		return
// 	}

// 	response := &student.GetMissionsTreeResponse{
// 		Missions: convertMissionsToStructedTreeMissionsDTO(missions),
// 	}

// c.JSON(http.StatusOK, response)
// }

// g.POST("/student/:student_id/missions/:mission_id", missionHandler.UploadFile)

// g.POST("/student/:student_id/missions/:mission_id", missionHandler.CompleteMission)
func CompleteMission(c *gin.Context) {
	studentID, err := strconv.Atoi(c.Param("student_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid student ID"})
		return
	}

	missionID, err := strconv.Atoi(c.Param("mission_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid mission ID"})
		return
	}

	err := h.missionService.CompleteMission(c.Request.Context(), studentID, missionID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusNoContent, gin.H{}) // возможно, надо будет отправлять заново все данные для обновления

}

func convertMissionsToStructedTreeMissionsDTO(missions []*models.Mission) []*student.StructedTreeMission {
	var result []*student.StructedTreeMission
	for _, m := range missions {
		result = append(result, &student.StructedTreeMission{
			ID:          m.ID,
			Title:       m.Title,
			IsActive:    m.IsActive,
			IsCompleted: m.IsCompleted,
		})
	}
}
