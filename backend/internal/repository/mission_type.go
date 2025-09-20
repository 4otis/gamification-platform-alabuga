package repository

import (
	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type MissionTypeRepository struct {
	db *gorm.DB
}

func NewSkillRepository(db *gorm.DB) *MissionTypeRepository {
	return &MissionTypeRepository{db: db}
}

func (r MissionTypeRepository) Create(mission_type *models.MissionType) error {
	return r.db.Create(mission_type).Error
}

func (r MissionTypeRepository) Read(id uint) (*models.MissionType, error) {
	var mission_type models.MissionType
	err := r.db.First(&mission_type, id).Error
	if err != nil {
		return nil, err
	}
	return &mission_type, nil
}

func (r MissionTypeRepository) UpdateFields(id uint, updates map[string]interface{}) error {
	return r.db.Model(&models.MissionType{}).Where("id = ?", id).Updates(updates).Error
}

func (r MissionTypeRepository) Delete(id uint) error {
	return r.db.Delete(&models.MissionType{}, id).Error
}
