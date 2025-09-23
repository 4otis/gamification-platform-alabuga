package repository

import (
	"context"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type HRRepository struct {
	db *gorm.DB
}

func NewHRRepository(db *gorm.DB) *HRRepository {
	return &HRRepository{db: db}
}

func (r *HRRepository) Create(ctx context.Context, hr *models.HR) error {
	return r.db.WithContext(ctx).Create(hr).Error
}

func (r *HRRepository) Read(ctx context.Context, id uint) (*models.HR, error) {
	var hr models.HR
	err := r.db.WithContext(ctx).First(&hr, id).Error
	if err != nil {
		return nil, err
	}
	return &hr, nil
}

func (r *HRRepository) UpdateFields(ctx context.Context, id uint, updates map[string]interface{}) error {
	result := r.db.WithContext(ctx).Model(&models.HR{}).Where("id = ?", id).Updates(updates)
	return result.Error
}

func (r *HRRepository) Delete(ctx context.Context, id uint) error {
	result := r.db.WithContext(ctx).Delete(&models.HR{}, id)
	return result.Error
}
