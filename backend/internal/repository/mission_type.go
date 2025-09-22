package repository

import (
	"context"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type MissionTypeRepository struct {
	db *gorm.DB
}

func NewMissionTypeRepository(db *gorm.DB) *MissionTypeRepository {
	return &MissionTypeRepository{db: db}
}

func (r *MissionTypeRepository) Create(ctx context.Context, missionType *models.MissionType) error {
	return r.db.WithContext(ctx).Create(missionType).Error
}

func (r *MissionTypeRepository) Read(ctx context.Context, id uint) (*models.MissionType, error) {
	var missionType models.MissionType
	err := r.db.WithContext(ctx).First(&missionType, id).Error
	if err != nil {
		return nil, err
	}
	return &missionType, nil
}

func (r *MissionTypeRepository) UpdateFields(ctx context.Context, id uint, updates map[string]interface{}) error {
	result := r.db.WithContext(ctx).Model(&models.MissionType{}).Where("id = ?", id).Updates(updates)
	return result.Error
}

func (r *MissionTypeRepository) Delete(ctx context.Context, id uint) error {
	result := r.db.WithContext(ctx).Delete(&models.MissionType{}, id)
	return result.Error
}
