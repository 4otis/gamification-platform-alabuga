package services

import (
	"context"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"github.com/4otis/gamification-platform-alabuga/internal/repository"
)

type StudentService interface {
	GetStudentByID(ctx context.Context, id uint) (*models.Student, error)
}

type studentService struct {
	studentRepo          repository.StudentRepository
	rankRepo             repository.StudentRankRepository
	skillRepo            repository.SkillRepository
	missionRepo          repository.MissionRepository
	studentsMissionsRepo repository.StudentsMissionsRepository
	studentsCoursesRepo  repository.StudentsCoursesRepository
}

func NewStudentService(
	studentRepo repository.StudentRepository,
	rankRepo repository.StudentRankRepository,
	skillRepo repository.SkillRepository,
	missionRepo repository.MissionRepository,
	studentsMissionsRepo repository.StudentsMissionsRepository,
	studentsCoursesRepo repository.StudentsCoursesRepository,
) StudentService {
	return &studentService{
		studentRepo:          studentRepo,
		rankRepo:             rankRepo,
		skillRepo:            skillRepo,
		missionRepo:          missionRepo,
		studentsMissionsRepo: studentsMissionsRepo,
		studentsCoursesRepo:  studentsCoursesRepo,
	}
}

func (s *studentService) GetStudentByID(ctx context.Context, id uint) (*models.Student, error) {
	return s.studentRepo.Read(ctx, id)
}
