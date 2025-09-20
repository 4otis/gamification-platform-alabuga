package repository

import (
	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type RarityRepository struct {
	db *gorm.DB
}

func NewRarityRepository(db *gorm.DB) *RarityRepository {
	return &RarityRepository{db: db}
}

func (r RarityRepository) Create(artifact *models.Rarity) error {
	return r.db.Create(rarity).Error
}

func (r RarityRepository) Read(id uint) (*models.Rarity, error) {
	var rarity models.Rarity
	err := r.db.First(&rarity, id).Error
	if err != nil {
		return nil, err
	}
	return &rarity, nil
}

func (r RarityRepository) UpdateFields(id uint, updates map[string]interface{}) error {
	return r.db.Model(&models.Rarity{}).Where("id = ?", id).Updates(updates).Error
}

func (r RarityRepository) Delete(id uint) error {
	return r.db.Delete(&models.Rarity{}, id).Error
}
