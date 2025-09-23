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

func (r *StudentsCoursesRepository) GetAvailableMissions(ctx context.Context, studentID uint) ([]*models.StudentsCourses, error) {
	var availableMissions []*models.StudentsCourses
	err := r.db.WithContext(ctx).
		Joins("JOIN students_missions sm ON missions.id = sm.mission_id").
		Where("sm.student_id = ? AND sm.is_active = ?", studentID, true).
		Find(&availableMissions).Error
	if err != nil {
		return nil, err
	}

	return availableMissions, err
}
