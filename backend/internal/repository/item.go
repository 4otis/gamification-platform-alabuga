package repository

import (
	"context"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type ItemRepository struct {
	db *gorm.DB
}

func NewItemRepository(db *gorm.DB) *ItemRepository {
	return &ItemRepository{db: db}
}

func (r *ItemRepository) Create(ctx context.Context, item *models.Item) error {
	return r.db.WithContext(ctx).Create(item).Error
}

func (r *ItemRepository) Read(ctx context.Context, id uint) (*models.Item, error) {
	var item models.Item
	err := r.db.WithContext(ctx).First(&item, id).Error
	if err != nil {
		return nil, err
	}
	return &item, nil
}

func (r *ItemRepository) ReadAll(ctx context.Context) ([]*models.Item, error) {
	var items []*models.Item
	err := r.db.WithContext(ctx).Find(&items).Error
	if err != nil {
		return nil, err
	}
	return items, nil
}

func (r *ItemRepository) UpdateFields(ctx context.Context, id uint, updates map[string]interface{}) error {
	result := r.db.WithContext(ctx).Model(&models.Item{}).Where("id = ?", id).Updates(updates)
	return result.Error
}

func (r *ItemRepository) Delete(ctx context.Context, id uint) error {
	result := r.db.WithContext(ctx).Delete(&models.Item{}, id)
	return result.Error
}

func (r *StudentsCoursesRepository) GetAvailableItems(ctx context.Context, studentID uint) ([]*models.Item, error) {
	var availableItems []*models.Item
	err := r.db.WithContext(ctx).
		Joins("JOIN students_courses sc ON courses.id = sc.course_id").
		Where("sc.student_id = ? AND sc.is_completed = ?", studentID, false).
		Find(&availableCourses).Error
	if err != nil {
		return nil, err
	}

	return availableCourses, err
}
