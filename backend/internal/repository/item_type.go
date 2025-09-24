package repository

import (
	"context"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type ItemTypeRepository struct {
	db *gorm.DB
}

func NewItemRepository(db *gorm.DB) *ItemTypeRepository {
	return &ItemTypeRepository{db: db}
}

func (r *ItemTypeRepository) Create(ctx context.Context, itemType *models.ItemType) error {
	return r.db.WithContext(ctx).Create(itemType).Error
}

func (r *ItemTypeRepository) Read(ctx context.Context, id uint) (*models.ItemType, error) {
	var itemType models.ItemType
	err := r.db.WithContext(ctx).First(&itemType, id).Error
	if err != nil {
		return nil, err
	}
	return &itemType, nil
}

func (r *ItemTypeRepository) ReadAll(ctx context.Context) (*models.ItemType, error) {
	var itemTypes []*models.ItemType
	err := r.db.WithContext(ctx).Find(&itemTypes).Error
	if err != nil {
		return nil, err
	}
	return itemTypes, nil
}

func (r *ItemTypeRepository) UpdateFields(ctx context.Context, id uint, updates map[string]interface{}) error {
	result := r.db.WithContext(ctx).Model(&models.ItemType{}).Where("id = ?", id).Updates(updates)
	return result.Error
}

func (r *ItemTypeRepository) Delete(ctx context.Context, id uint) error {
	result := r.db.WithContext(ctx).Delete(&models.ItemType{}, id)
	return result.Error
}
