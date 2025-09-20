package repository

import (
	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type MissionsSkillsRepository struct {
	db *gorm.DB
}

func NewMissionsSkillsRepository(db *gorm.DB) *MissionsSkillsRepository {
	return &MissionsSkillsRepository{db: db}
}

func (r MissionsSkillsRepository) Create(missionsSkills *models.MissionsSkills) error {
	return r.db.Create(missionsSkills).Error
}

func (r MissionsSkillsRepository) Read(id uint) (*models.MissionsSkills, error) {
	var missionsSkills models.MissionsSkills
	err := r.db.First(&missionsSkills, id).Error
	if err != nil {
		return nil, err
	}
	return &missionsSkills, nil
}

func (r MissionsSkillsRepository) UpdateFields(id uint, updates map[string]interface{}) error {
	return r.db.Model(&models.MissionsSkills{}).Where("id = ?", id).Updates(updates).Error
}

func (r MissionsSkillsRepository) Delete(id uint) error {
	return r.db.Delete(&models.MissionsSkills{}, id).Error
}
