// internal/services/mission_service.go
package services

import (
	"context"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"github.com/4otis/gamification-platform-alabuga/internal/repository"
)

type MissionService interface {
	GetMissionByID(ctx context.Context, id uint) (*models.Mission, error)
	GetAvailableMissions(ctx context.Context, studentID uint) ([]*models.Mission, error)
	GetCompletedMissions(ctx context.Context, studentID uint) ([]*models.Mission, error)

	// StartMission(ctx context.Context, studentID, missionID uint) error
	// CompleteMission(ctx context.Context, studentID, missionID uint) error
	// GetMissionChain(ctx context.Context, missionID uint) ([]*models.Mission, error)
}

type missionService struct {
	missionRepo repository.MissionRepository
	studentRepo repository.StudentRepository
	// courseRepo     repository.CourseRepository
	studentsMissionsRepo repository.StudentsMissionsRepository
	missionsSkillsRepo   repository.MissionsSkillsRepository
	studentService       StudentService
}

func NewMissionService(
	missionRepo repository.MissionRepository,
	studentRepo repository.StudentRepository,
	// courseRepo repository.CourseRepository,
	studentsMissionsRepo repository.StudentsMissionsRepository,
	missionsSkillsRepo repository.MissionsSkillsRepository,
	studentService StudentService,
) MissionService {
	return &missionService{
		missionRepo:          missionRepo,
		studentRepo:          studentRepo,
		studentsMissionsRepo: studentsMissionsRepo,
		missionsSkillsRepo:   missionsSkillsRepo,
		// courseRepo:     courseRepo,
		studentService: studentService,
	}
}

func (s *missionService) GetMissionByID(ctx context.Context, id uint) (*models.Mission, error) {
	return s.missionRepo.Read(ctx, id)
}

func (s *missionService) GetAvailableMissions(ctx context.Context, studentID uint) ([]*models.Mission, error) {
	return s.studentsMissionsRepo.GetAvailableMissions(ctx, studentID)
}

func (s *missionService) GetCompletedMissions(ctx context.Context, studentID uint) ([]*models.Mission, error) {
	return s.studentsMissionsRepo.GetCompletedMissions(ctx, studentID)
}
