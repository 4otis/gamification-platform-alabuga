package repository

import (
	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type StudentsSkillsRepository struct {
	db *gorm.DB
}

func NewSkillRepository(db *gorm.DB) *StudentsSkillsRepository {
	return &StudentsSkillsRepository{db: db}
}

func (r StudentsSkillsRepository) Create(students_skills *models.StudentsSkills) error {
	return r.db.Create(students_skills).Error
}

func (r StudentsSkillsRepository) Read(id uint) (*models.StudentsSkills, error) {
	var students_skills models.StudentsSkills
	err := r.db.First(&students_skills, id).Error
	if err != nil {
		return nil, err
	}
	return &students_skills, nil
}

func (r StudentsSkillsRepository) UpdateFields(id uint, updates map[string]interface{}) error {
	return r.db.Model(&models.StudentsSkills{}).Where("id = ?", id).Updates(updates).Error
}

func (r StudentsSkillsRepository) Delete(id uint) error {
	return r.db.Delete(&models.StudentsSkills{}, id).Error
}
