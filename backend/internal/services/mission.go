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
	GetStudentsMissionsByCourseID(ctx context.Context, studentID uint, courseID uint) ([]*models.Mission, error)

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

func (s *missionService) GetStudentsMissionsByCourseID(ctx context.Context, studentID uint, courseID uint) ([]*models.Mission, error) {
	err := s.studentsMissionsRepo.AssignCourseMissionsToStudent(ctx, studentID, courseID)
	if err != nil {
		return nil, err
	}

	return s.studentsMissionsRepo.GetStudentsMissionsByCourseID(ctx, studentID, courseID)
}

// func (s *missionService) StartMission(ctx context.Context, studentID, missionID int) error {
// 	// Проверяем доступность миссии для студента
// 	availableMissions, err := s.GetAvailableMissions(ctx, studentID)
// 	if err != nil {
// 		return err
// 	}

// 	missionAvailable := false
// 	for _, mission := range availableMissions {
// 		if mission.ID == missionID {
// 			missionAvailable = true
// 			break
// 		}
// 	}

// 	if !missionAvailable {
// 		return errors.New("mission not available for this student")
// 	}

// 	// Добавляем логику начала миссии (например, запись в базу)
// 	return s.missionRepo.StartMission(ctx, studentID, missionID)
// }

// func (s *missionService) CompleteMission(ctx context.Context, studentID, missionID int) error {
// 	mission, err := s.missionRepo.GetByID(ctx, missionID)
// 	if err != nil {
// 		return err
// 	}

// 	// Начисляем награды
// 	err = s.studentService.UpdateStudentStats(ctx, studentID, mission.ExpReward, mission.ManaReward)
// 	if err != nil {
// 		return err
// 	}

// 	// Начисляем прогресс по навыкам
// 	missionSkills, err := s.missionRepo.GetSkillsByMissionID(ctx, missionID)
// 	if err != nil {
// 		return err
// 	}

// 	for _, missionSkill := range missionSkills {
// 		err = s.missionRepo.UpdateStudentSkill(ctx, studentID, missionSkill.SkillID, missionSkill.ScoreReward)
// 		if err != nil {
// 			return err
// 		}
// 	}

// 	// Помечаем миссию как выполненную
// 	return s.missionRepo.CompleteMission(ctx, studentID, missionID)
// }

// func (s *missionService) GetMissionChain(ctx context.Context, missionID int) ([]*models.Mission, error) {
// 	return s.missionRepo.GetChainByMissionID(ctx, missionID)
// }

