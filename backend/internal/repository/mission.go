package repository

import (
	"context"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type MissionRepository struct {
	db *gorm.DB
}

func NewMissionRepository(db *gorm.DB) *MissionRepository {
	return &MissionRepository{db: db}
}

func (r *MissionRepository) Create(ctx context.Context, mission *models.Mission) error {
	return r.db.WithContext(ctx).Create(mission).Error
}

func (r MissionRepository) Read(ctx context.Context, id uint) (*models.Mission, error) {
	var mission models.Mission
	err := r.db.WithContext(ctx).
		Preload("Artifact").
		Preload("MissionType").
		Preload("Course").
		Preload("Questions").
		First(&mission, id).Error
	if err != nil {
		return nil, err
	}
	return &mission, nil
}

func (r *MissionRepository) UpdateFields(ctx context.Context, id uint, updates map[string]interface{}) error {
	result := r.db.WithContext(ctx).Model(&models.Mission{}).Where("id = ?", id).Updates(updates)
	return result.Error
}

func (r *MissionRepository) Delete(ctx context.Context, id uint) error {
	result := r.db.WithContext(ctx).Delete(&models.Mission{}, id)
	return result.Error
}

// func (r *MissionRepository) GetAvailableMissions(ctx context.Context, studentID uint) ([]*models.Mission, error) {
// 	var availableMissions []*models.Mission
// 	err := r.db.WithContext().Jo
// 	return
// }
