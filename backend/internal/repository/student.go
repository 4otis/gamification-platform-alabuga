package repository

import (
	"context"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type StudentRepository struct {
	db *gorm.DB
}

func NewStudentRepository(db *gorm.DB) *StudentRepository {
	return &StudentRepository{db: db}
}

func (r *StudentRepository) Create(ctx context.Context, student *models.Student) error {
	return r.db.WithContext(ctx).Create(student).Error
}

func (r *StudentRepository) Read(ctx context.Context, id uint) (*models.Student, error) {
	var student models.Student
	err := r.db.WithContext(ctx).Preload("Rank").First(&student, id).Error
	if err != nil {
		return nil, err
	}
	return &student, nil
}

func (r StudentRepository) ReadAll(ctx context.Context) ([]*models.Student, error) {
	var students []*models.Student
	err := r.db.WithContext(ctx).Preload("Rank").Find(&students).Error
	if err != nil {
		return nil, err
	}
	return students, nil
}

func (r StudentRepository) GetSortedByExp(ctx context.Context) ([]*models.Student, error) {
	var students []*models.Student
	err := r.db.WithContext(ctx).Preload("Rank").
		Order("exp desc").Find(&students).Error
	if err != nil {
		return nil, err
	}
	return students, nil
}

func (r *StudentRepository) UpdateFields(ctx context.Context, id uint, updates map[string]interface{}) error {
	result := r.db.WithContext(ctx).Model(&models.Student{}).Where("id = ?", id).Updates(updates)
	return result.Error
}

func (r *StudentRepository) Delete(ctx context.Context, id uint) error {
	result := r.db.WithContext(ctx).Delete(&models.Student{}, id)
	return result.Error
}
