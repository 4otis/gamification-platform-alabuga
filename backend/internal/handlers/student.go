package handlers

import "github.com/4otis/gamification-platform-alabuga/internal/services"

type StudentHandler struct {
	studentService *services.StudentService
}

func NewStudentHandler(studentService *services.StudentService) *StudentHandler {
	return &StudentHandler{
		studentService: studentService,
	}
}
