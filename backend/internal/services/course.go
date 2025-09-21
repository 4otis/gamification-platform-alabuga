// internal/services/course_service.go
package services

import (
	"github.com/4otis/gamification-platform-alabuga/internal/repository"
)

type CourseService interface {
	// GetCourseByID(id uint) (*models.Course, error)
	// GetAvailableCourses(studentID uint) ([]*models.Course, error)
	// GetCourseMissions(courseID uint) ([]*models.Mission, error)
	// GetCourseProgress(studentID, courseID uint) (float64, error)
}

type courseService struct {
	courseRepo  repository.CourseRepository
	missionRepo repository.MissionRepository
	studentRepo repository.StudentRepository
}

func NewCourseService(
	courseRepo repository.CourseRepository,
	missionRepo repository.MissionRepository,
	studentRepo repository.StudentRepository,
) CourseService {
	return &courseService{
		courseRepo:  courseRepo,
		missionRepo: missionRepo,
		studentRepo: studentRepo,
	}
}
