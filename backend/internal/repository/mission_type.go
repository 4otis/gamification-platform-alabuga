package repository

import (
	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type MissionTypeRepository struct {
	db *gorm.DB
}

func NewMissionTypeRepository(db *gorm.DB) *MissionTypeRepository {
	return &MissionTypeRepository{db: db}
}

func (r MissionTypeRepository) Create(missionType *models.MissionType) error {
	return r.db.Create(missionType).Error
}

func (r MissionTypeRepository) Read(id uint) (*models.MissionType, error) {
	var missionType models.MissionType
	err := r.db.First(&missionType, id).Error
	if err != nil {
		return nil, err
	}
	return &missionType, nil
}

func (r MissionTypeRepository) UpdateFields(id uint, updates map[string]interface{}) error {
	return r.db.Model(&models.MissionType{}).Where("id = ?", id).Updates(updates).Error
}

func (r MissionTypeRepository) Delete(id uint) error {
	return r.db.Delete(&models.MissionType{}, id).Error
}
