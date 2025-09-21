package repository

import (
	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type StudentsCoursesRepository struct {
	db *gorm.DB
}

func NewStudentsCoursesRepository(db *gorm.DB) *StudentsCoursesRepository {
	return &StudentsCoursesRepository{db: db}
}

func (r StudentsCoursesRepository) Create(students_courses *models.StudentsCourses) error {
	return r.db.Create(students_courses).Error
}

func (r StudentsCoursesRepository) Read(id uint) (*models.StudentsCourses, error) {
	var students_courses models.StudentsCourses
	err := r.db.First(&students_courses, id).Error
	if err != nil {
		return nil, err
	}
	return &students_courses, nil
}

func (r StudentsCoursesRepository) UpdateFields(id uint, updates map[string]interface{}) error {
	return r.db.Model(&models.StudentsCourses{}).Where("id = ?", id).Updates(updates).Error
}

func (r StudentsCoursesRepository) Delete(id uint) error {
	return r.db.Delete(&models.StudentsCourses{}, id).Error
}
