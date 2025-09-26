package repository

import (
	"context"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type StudentsCoursesRepository struct {
	db *gorm.DB
}

func NewStudentsCoursesRepository(db *gorm.DB) *StudentsCoursesRepository {
	return &StudentsCoursesRepository{db: db}
}

func (r *StudentsCoursesRepository) GetAvailableCourses(ctx context.Context, studentID uint) ([]*models.Course, error) {
	var availableCourses []*models.Course
	err := r.db.WithContext(ctx).
		Preload("Artifact").
		Joins("JOIN students_courses sc ON courses.id = sc.course_id").
		Where("sc.student_id = ? AND sc.is_completed = ?", studentID, false).
		Find(&availableCourses).Error
	if err != nil {
		return nil, err
	}

	return availableCourses, err
}

func (r *StudentsCoursesRepository) GetCompletedCourses(ctx context.Context, studentID uint) ([]*models.Course, error) {
	var completedCourses []*models.Course
	err := r.db.WithContext(ctx).
		Preload("Artifact").
		Joins("JOIN students_courses sc ON courses.id = sc.course_id").
		Where("sc.student_id = ? AND sc.is_completed = ?", studentID, true).
		Find(&completedCourses).Error
	if err != nil {
		return nil, err
	}

	return completedCourses, err
}
