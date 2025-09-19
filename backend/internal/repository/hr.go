package repository

import (
	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type HRRepository struct {
	db *gorm.DB
}

func NewHRRepository(db *gorm.DB) *HRRepository {
	return &HRRepository{db: db}
}

func (r HRRepository) Create(hr *models.HR) error {
	return r.db.Create(hr).Error
}

func (r HRRepository) Read(login string) (*models.HR, error) {
	var hr models.HR
	err := r.db.Where("login = ?", login).First(&hr).Error
	if err != nil {
		return nil, err
	}
	return &hr, nil
}

func (r HRRepository) UpdateFields(id uint, updates map[string]interface{}) error {
	return r.db.Model(&models.HR{}).Where("id = ?", id).Updates(updates).Error
}

func (r HRRepository) Delete(id uint) error {
	return r.db.Delete(&models.HR{}, id).Error
}
