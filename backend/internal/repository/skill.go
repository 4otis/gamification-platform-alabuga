package repository

import (
	"context"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type SkillRepository struct {
	db *gorm.DB
}

func NewSkillRepository(db *gorm.DB) *SkillRepository {
	return &SkillRepository{db: db}
}

func (r *SkillRepository) Create(ctx context.Context, skill *models.Skill) error {
	return r.db.WithContext(ctx).Create(skill).Error
}

func (r *SkillRepository) Read(ctx context.Context, id uint) (*models.Skill, error) {
	var skill models.Skill
	err := r.db.WithContext(ctx).First(&skill, id).Error
	if err != nil {
		return nil, err
	}
	return &skill, nil
}

func (r *SkillRepository) UpdateFields(ctx context.Context, id uint, updates map[string]interface{}) error {
	result := r.db.WithContext(ctx).Model(&models.Skill{}).Where("id = ?", id).Updates(updates)
	return result.Error
}

func (r *SkillRepository) Delete(ctx context.Context, id uint) error {
	result := r.db.WithContext(ctx).Delete(&models.Skill{}, id)
	return result.Error
}

func (r *SkillRepository) GetSkillsByMissionID(ctx context.Context, missionID uint) ([]*models.Skill, error) {
	var skills []*models.Skill
	err := r.db.WithContext(ctx).
		Joins("JOIN missions_skills ms ON skills.id = ms.skill_id").
		Where("ms.mission_id = ?", missionID).
		Find(&skills).Error
	if err != nil {
		return nil, err
	}

	return skills, nil
}
