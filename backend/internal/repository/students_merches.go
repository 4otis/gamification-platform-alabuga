package repository

import (
	"context"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type StudentsMerchesRepository struct {
	db *gorm.DB
}

func NewStudentsMerchesRepository(db *gorm.DB) *StudentsMerchesRepository {
	return &StudentsMerchesRepository{db: db}
}

func (r *StudentsMerchesRepository) GetOrderedMerchesByStudentID(ctx context.Context, studentID uint) ([]*models.Merch, error) {
	var orderedMerches []*models.Merch
	err := r.db.WithContext(ctx).
		Joins("JOIN students_merches sm ON merches.id = sm.merch_id").
		Where("sm.student_id = ?", studentID).
		Find(&orderedMerches).Error
	if err != nil {
		return nil, err
	}

	return orderedMerches, err
}

func (r *StudentsMerchesRepository) GetCompletedMerchesByStudentID(ctx context.Context, studentID uint) ([]*models.Merch, error) {
	var completedMerches []*models.Merch
	err := r.db.WithContext(ctx).
		Joins("JOIN students_merches sm ON merches.id = sm.merch_id").
		Where("sm.student_id = ? AND sm.is_done = ?", studentID, true).
		Find(&completedMerches).Error
	if err != nil {
		return nil, err
	}

	return completedMerches, err
}
