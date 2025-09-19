package services

import "github.com/4otis/gamification-platform-alabuga/internal/repository"

type StudentService struct {
	studentRepo repository.StudentRepository
}

func NewStudentService(studentRepo *repository.StudentRepository) *StudentService {
	return &StudentService{
		studentRepo: *studentRepo,
	}
}
