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
	IsCourseAvailableForStudent(ctx context.Context, studentID uint, courseID uint) (bool, error)
	GetStudentCourseProgress(ctx context.Context, studentID uint, courseID uint) (float64, error)
}

type courseService struct {
	courseRepo           repository.CourseRepository
	studentsCoursesRepo  repository.StudentsCoursesRepository
	artifactRepo         repository.ArtifactRepository
	studentRepo          repository.StudentRepository
	missionRepo          repository.MissionRepository
	studentsMissionsRepo repository.StudentsMissionsRepository
}

func NewCourseService(
	courseRepo repository.CourseRepository,
	studentsCoursesRepo repository.StudentsCoursesRepository,
	artifactRepo repository.ArtifactRepository,
	studentRepo repository.StudentRepository,
	studentsMissionsRepo repository.StudentsMissionsRepository,
) CourseService {
	return &courseService{
		courseRepo:           courseRepo,
		studentRepo:          studentRepo,
		studentsCoursesRepo:  studentsCoursesRepo,
		artifactRepo:         artifactRepo,
		studentsMissionsRepo: studentsMissionsRepo,
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

func (s *courseService) IsCourseAvailableForStudent(ctx context.Context, studentID uint, courseID uint) (bool, error) {
	student, err := s.studentRepo.Read(ctx, studentID)
	if err != nil {
		return false, err
	}

	course, err := s.courseRepo.Read(ctx, courseID)
	if err != nil {
		return false, err
	}

	return student.RankID >= course.RankID, nil
}

func (s *courseService) GetStudentCourseProgress(ctx context.Context, studentID uint, courseID uint) (float64, error) {
	missions, err := s.studentsMissionsRepo.GetStudentsMissionsByCourseID(ctx, studentID, courseID)
	if err != nil {
		return 0, err
	}

	// for _, mission := range missions {
	// 	fmt.Printf("id: %d, is_completed: %t\n", mission.ID, mission.IsCompleted)
	// }

	if len(missions) == 0 {
		return 0, nil
	}

	completedCount := 0
	for _, mission := range missions {
		if mission.IsCompleted {
			completedCount++
		}
	}

	return float64(completedCount) / float64(len(missions)), nil
}
