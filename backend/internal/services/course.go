// internal/services/course_service.go
package services

import (
	"context"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"github.com/4otis/gamification-platform-alabuga/internal/repository"
)

type CourseService interface {
	GetCourseByID(ctx context.Context, id uint) (*models.Course, error)
	GetAvailableCourses(ctx context.Context, studentID uint) ([]*models.Course, error)
	GetCompletedCourses(ctx context.Context, studentID uint) ([]*models.Course, error)
	// GetCourseMissions(courseID uint) ([]*models.Mission, error)
	// GetCourseProgress(studentID, courseID uint) (float64, error)
}

type courseService struct {
	courseRepo          repository.CourseRepository
	missionRepo         repository.MissionRepository
	studentRepo         repository.StudentRepository
	studentsCoursesRepo repository.StudentsCoursesRepository
	// missionService MissionService
	// studentRankRepo
}

func NewCourseService(
	courseRepo repository.CourseRepository,
	missionRepo repository.MissionRepository,
	studentRepo repository.StudentRepository,
	studentsCoursesRepo repository.StudentsCoursesRepository,
	// missionService MissionService,
) CourseService {
	return &courseService{
		courseRepo:  courseRepo,
		studentRepo: studentRepo,
		// missionRepo:         missionRepo,
		studentsCoursesRepo: studentsCoursesRepo,
		// missionService: missionService,
	}
}

func (s *courseService) GetCourseByID(ctx context.Context, id uint) (*models.Course, error) {
	return s.courseRepo.Read(ctx, id)
}

func (s *courseService) GetAvailableCourses(ctx context.Context, studentID uint) ([]*models.Course, error) {
	return s.studentsCoursesRepo.GetAvailableCourses(ctx, studentID)
}

func (s *courseService) GetCompletedCourses(ctx context.Context, studentID uint) ([]*models.Course, error) {
	return s.studentsCoursesRepo.GetCompletedCourses(ctx, studentID)
}

// func (s *courseService) GetAllMissionByCourse()
// {

// }
