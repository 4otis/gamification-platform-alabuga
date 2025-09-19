package services

import "github.com/4otis/gamification-platform-alabuga/internal/repository"

type HRService struct {
	hrRepo      repository.HRRepository
	studentRepo repository.StudentRepository
}

func NewHRService(hrRepo *repository.HRRepository, studentRepo *repository.StudentRepository) *HRService {
	return &HRService{
		hrRepo:      *hrRepo,
		studentRepo: *studentRepo,
	}
}
