package repository

import (
	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type StudentRankRepository struct {
	db *gorm.DB
}

func NewSkillRepository(db *gorm.DB) *StudentRankRepository {
	return &StudentRankRepository{db: db}
}

func (r StudentRankRepository) Create(student_rank *models.StudentRank) error {
	return r.db.Create(student_rank).Error
}

func (r StudentRankRepository) Read(id uint) (*models.StudentRank, error) {
	var student_rank models.StudentRank
	err := r.db.First(&student_rank, id).Error
	if err != nil {
		return nil, err
	}
	return &student_rank, nil
}

func (r StudentRankRepository) UpdateFields(id uint, updates map[string]interface{}) error {
	return r.db.Model(&models.StudentRank{}).Where("id = ?", id).Updates(updates).Error
}

func (r StudentRankRepository) Delete(id uint) error {
	return r.db.Delete(&models.StudentRank{}, id).Error
}
