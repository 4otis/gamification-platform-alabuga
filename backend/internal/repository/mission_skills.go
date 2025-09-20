package repository

import (
	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type MissionSkillsRepository struct {
	db *gorm.DB
}

func NewSkillRepository(db *gorm.DB) *MissionSkillsRepository {
	return &MissionSkillsRepository{db: db}
}

func (r MissionSkillsRepository) Create(mission_skills *models.MissionSkills) error {
	return r.db.Create(mission_skills).Error
}

func (r MissionSkillsRepository) Read(id uint) (*models.MissionSkills, error) {
	var mission_skills models.MissionSkills
	err := r.db.First(&mission_skills, id).Error
	if err != nil {
		return nil, err
	}
	return &mission_skills, nil
}

func (r MissionSkillsRepository) UpdateFields(id uint, updates map[string]interface{}) error {
	return r.db.Model(&models.MissionSkills{}).Where("id = ?", id).Updates(updates).Error
}

func (r MissionSkillsRepository) Delete(id uint) error {
	return r.db.Delete(&models.MissionSkills{}, id).Error
}
