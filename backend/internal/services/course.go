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
	GetCourseArtifactByID(ctx context.Context, artifactID uint) (*models.Artifact, error)
	IsCourseAvailableForStudent(ctx context.Context, studentID uint, courseID uint) (bool, error)
	// GetCourseMissions(courseID uint) ([]*models.Mission, error)
	// GetCourseProgress(studentID, courseID uint) (float64, error)
}

type courseService struct {
	courseRepo          repository.CourseRepository
	studentsCoursesRepo repository.StudentsCoursesRepository
	artifactRepo        repository.ArtifactRepository
	studentRepo         repository.StudentRepository
	// missionRepo         repository.MissionRepository
	// missionService MissionService
	// studentRankRepo
}

func NewCourseService(
	courseRepo repository.CourseRepository,
	studentsCoursesRepo repository.StudentsCoursesRepository,
	artifactRepo repository.ArtifactRepository,
	studentRepo repository.StudentRepository,
	// missionRepo repository.MissionRepository,
	// missionService MissionService,
) CourseService {
	return &courseService{
		courseRepo:  courseRepo,
		studentRepo: studentRepo,
		// missionRepo:         missionRepo,
		studentsCoursesRepo: studentsCoursesRepo,
		artifactRepo:        artifactRepo,
		studentRepo:         studentRepo,
		// missionRepo:         missionRepo,
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

func (s *courseService) GetCourseArtifactByID(ctx context.Context, artifactID uint) (*models.Artifact, error) {
	return s.artifactRepo.Read(ctx, artifactID)
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
