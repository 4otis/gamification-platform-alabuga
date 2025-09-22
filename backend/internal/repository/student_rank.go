package repository

import (
	"context"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type StudentRankRepository struct {
	db *gorm.DB
}

func NewStudentRankRepository(db *gorm.DB) *StudentRankRepository {
	return &StudentRankRepository{db: db}
}

func (r *StudentRankRepository) Create(ctx context.Context, studentRank *models.StudentRank) error {
	return r.db.WithContext(ctx).Create(studentRank).Error
}

func (r *StudentRankRepository) Read(ctx context.Context, id uint) (*models.StudentRank, error) {
	var studentRank models.StudentRank
	err := r.db.WithContext(ctx).First(&studentRank, id).Error
	if err != nil {
		return nil, err
	}
	return &studentRank, nil
}

func (r *StudentRankRepository) UpdateFields(ctx context.Context, id uint, updates map[string]interface{}) error {
	result := r.db.WithContext(ctx).Model(&models.StudentRank{}).Where("id = ?", id).Updates(updates)
	return result.Error
}

func (r *StudentRankRepository) Delete(ctx context.Context, id uint) error {
	result := r.db.WithContext(ctx).Delete(&models.StudentRank{}, id)
	return result.Error
}
