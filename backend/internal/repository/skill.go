package repository

import (
	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type SkillRepository struct {
	db *gorm.DB
}

func NewSkillRepository(db *gorm.DB) *SkillRepository {
	return &SkillRepository{db: db}
}

func (r SkillRepository) Create(artifact *models.Skill) error {
	return r.db.Create(skill).Error
}

func (r SkillRepository) Read(id uint) (*models.Skill, error) {
	var skill models.Skill
	err := r.db.First(&skill, id).Error
	if err != nil {
		return nil, err
	}
	return &skill, nil
}

func (r SkillRepository) UpdateFields(id uint, updates map[string]interface{}) error {
	return r.db.Model(&models.Skill{}).Where("id = ?", id).Updates(updates).Error
}

func (r SkillRepository) Delete(id uint) error {
	return r.db.Delete(&models.Skill{}, id).Error
}
