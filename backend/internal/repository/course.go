package repository

import (
	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type CourseRepository struct {
	db *gorm.DB
}

func NewSkillRepository(db *gorm.DB) *CourseRepository {
	return &CourseRepository{db: db}
}

func (r CourseRepository) Create(course *models.Course) error {
	return r.db.Create(course).Error
}

func (r CourseRepository) Read(id uint) (*models.Course, error) {
	var course models.Course
	err := r.db.First(&course, id).Error
	if err != nil {
		return nil, err
	}
	return &course, nil
}

func (r CourseRepository) UpdateFields(id uint, updates map[string]interface{}) error {
	return r.db.Model(&models.Course{}).Where("id = ?", id).Updates(updates).Error
}

func (r CourseRepository) Delete(id uint) error {
	return r.db.Delete(&models.Course{}, id).Error
}
