package repository

import (
	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type StudentRankRepository struct {
	db *gorm.DB
}

func NewStudentRankRepository(db *gorm.DB) *StudentRankRepository {
	return &StudentRankRepository{db: db}
}

func (r StudentRankRepository) Create(studentRank *models.StudentRank) error {
	return r.db.Create(studentRank).Error
}

func (r StudentRankRepository) Read(id uint) (*models.StudentRank, error) {
	var studentRank models.StudentRank
	err := r.db.First(&studentRank, id).Error
	if err != nil {
		return nil, err
	}
	return &studentRank, nil
}

func (r StudentRankRepository) UpdateFields(id uint, updates map[string]interface{}) error {
	return r.db.Model(&models.StudentRank{}).Where("id = ?", id).Updates(updates).Error
}

func (r StudentRankRepository) Delete(id uint) error {
	return r.db.Delete(&models.StudentRank{}, id).Error
}
