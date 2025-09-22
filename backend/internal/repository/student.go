package repository

import (
	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type StudentRepository struct {
	db *gorm.DB
}

func NewStudentRepository(db *gorm.DB) *StudentRepository {
	return &StudentRepository{db: db}
}

func (r StudentRepository) Create(student *models.Student) error {
	return r.db.Create(student).Error
}

func (r StudentRepository) Read(id uint) (*models.Student, error) {
	var student models.Student
	err := r.db.Table("student").First(&student, id).Error
	return &student, err
}

func (r StudentRepository) ReadAll() ([]*models.Student, error) {
	var students []*models.Student
	err := r.db.Table("student").Find(&students).Error
	if err != nil {
		return nil, err
	}
	return students, nil
}

func (r StudentRepository) UpdateFields(id uint, updates map[string]interface{}) error {
	return r.db.Model(&models.Student{}).Where("id = ?", id).Updates(updates).Error
}

func (r StudentRepository) Delete(id uint) error {
	return r.db.Delete(&models.Student{}, id).Error
}
