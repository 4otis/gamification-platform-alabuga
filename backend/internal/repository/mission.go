package repository

import (
	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type MissionRepository struct {
	db *gorm.DB
}

func NewSkillRepository(db *gorm.DB) *MissionRepository {
	return &MissionRepository{db: db}
}

func (r MissionRepository) Create(mission *models.Mission) error {
	return r.db.Create(mission).Error
}

func (r MissionRepository) Read(id uint) (*models.Mission, error) {
	var mission models.Mission
	err := r.db.First(&mission, id).Error
	if err != nil {
		return nil, err
	}
	return &mission, nil
}

func (r MissionRepository) UpdateFields(id uint, updates map[string]interface{}) error {
	return r.db.Model(&models.Mission{}).Where("id = ?", id).Updates(updates).Error
}

func (r MissionRepository) Delete(id uint) error {
	return r.db.Delete(&models.Mission{}, id).Error
}
