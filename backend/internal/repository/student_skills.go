package repository

import (
	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type StudentSkillsRepository struct {
	db *gorm.DB
}

func NewSkillRepository(db *gorm.DB) *StudentSkillsRepository {
	return &StudentSkillsRepository{db: db}
}

func (r StudentSkillsRepository) Create(student_skills *models.StudentSkills) error {
	return r.db.Create(student_skills).Error
}

func (r StudentSkillsRepository) Read(id uint) (*models.StudentSkills, error) {
	var student_skills models.StudentSkills
	err := r.db.First(&student_skills, id).Error
	if err != nil {
		return nil, err
	}
	return &student_skills, nil
}

func (r StudentSkillsRepository) UpdateFields(id uint, updates map[string]interface{}) error {
	return r.db.Model(&models.StudentSkills{}).Where("id = ?", id).Updates(updates).Error
}

func (r StudentSkillsRepository) Delete(id uint) error {
	return r.db.Delete(&models.StudentSkills{}, id).Error
}
