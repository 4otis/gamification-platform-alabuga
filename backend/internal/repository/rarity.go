package repository

import (
	"context"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type RarityRepository struct {
	db *gorm.DB
}

func NewRarityRepository(db *gorm.DB) *RarityRepository {
	return &RarityRepository{db: db}
}

func (r *RarityRepository) Create(ctx context.Context, rarity *models.Rarity) error {
	return r.db.WithContext(ctx).Create(rarity).Error
}

func (r *RarityRepository) Read(ctx context.Context, id uint) (*models.Rarity, error) {
	var rarity models.Rarity
	err := r.db.WithContext(ctx).First(&rarity, id).Error
	if err != nil {
		return nil, err
	}
	return &rarity, nil
}

func (r *RarityRepository) UpdateFields(ctx context.Context, id uint, updates map[string]interface{}) error {
	result := r.db.WithContext(ctx).Model(&models.Rarity{}).Where("id = ?", id).Updates(updates)
	return result.Error
}

func (r *RarityRepository) Delete(ctx context.Context, id uint) error {
	result := r.db.WithContext(ctx).Delete(&models.Rarity{}, id)
	return result.Error
}
