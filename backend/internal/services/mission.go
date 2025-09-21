// internal/services/mission_service.go
package services

import "github.com/4otis/gamification-platform-alabuga/internal/repository"

type MissionService interface {
	//implement me
}

type missionService struct {
	missionRepo    repository.MissionRepository
	studentRepo    repository.StudentRepository
	studentService StudentService
}

func NewMissionService(
	missionRepo repository.MissionRepository,
	studentRepo repository.StudentRepository,
	studentService StudentService,
) MissionService {
	return &missionService{
		missionRepo:    missionRepo,
		studentRepo:    studentRepo,
		studentService: studentService,
	}
}
