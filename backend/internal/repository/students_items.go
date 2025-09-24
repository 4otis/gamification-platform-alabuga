package repository

import (
	"context"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type StudentsItemsRepository struct {
	db *gorm.DB
}

func NewStudentsItemsRepository(db *gorm.DB) *StudentsItemsRepository {
	return &StudentsItemsRepository{db: db}
}

// func (r *StudentsItemsRepository) Create(ctx context.Context, studentsItems *models.StudentsItems) error {
// 	return r.db.WithContext(ctx).Create(studentsItems).Error
// }

// func (r *StudentsItemsRepository) Read(ctx context.Context, id uint) (*models.StudentsItems, error) {
// 	var studentsItems models.StudentsItems
// 	err := r.db.WithContext(ctx).First(&studentsItems, id).Error
// 	if err != nil {
// 		return nil, err
// 	}
// 	return &studentsItems, nil
// }

func (r *StudentsItemsRepository) ReadAll(ctx context.Context) ([]*models.Item, error) {
	var studentsItems []*models.Item
	err := r.db.WithContext(ctx).Find(&studentsItems).Error
	if err != nil {
		return nil, err
	}
	return studentsItems, nil
}

// func (r *StudentsItemsRepository) UpdateFields(ctx context.Context, id uint, updates map[string]interface{}) error {
// 	result := r.db.WithContext(ctx).Model(&models.StudentsItems{}).Where("id = ?", id).Updates(updates)
// 	return result.Error
// }

// func (r *StudentsItemsRepository) Delete(ctx context.Context, id uint) error {
// 	result := r.db.WithContext(ctx).Delete(&models.StudentsItems{}, id)
// 	return result.Error
// }

// func (r *StudentsItemsRepository) GetAvailableItems(ctx context.Context, studentExp int) ([]*models.Course, error) {

// 	var availableCourses []*models.Course

// 	return availableCourses, nil /// !!! nil исправить на err
// }

func (r *StudentsItemsRepository) GetEquipedItems(ctx context.Context, studentID uint) ([]*models.Item, error) {
	var equipedItems []*models.Item

	err := r.db.WithContext(ctx).
		Preload("Type").
		Joins("JOIN students_items si ON items.id = si.item_id").
		Where("si.student_id = ? AND si.is_equiped = ?", studentID, true).
		Find(&equipedItems).Error
	if err != nil {
		return nil, err
	}

	return equipedItems, nil
}

func (r *StudentsItemsRepository) EquipItem(ctx context.Context, studentID uint, itemID uint, typeID uint) error {
	err := r.db.WithContext(ctx).
		Model(&models.StudentsItems{}).
		Joins("JOIN items ON items.id = students_items.item_id").
		Where("students_items.student_id = ? AND items.type_id = ? AND students_items.is_equiped = ?",
			studentID, typeID, true).
		Update("is_equiped", false).Error
	if err != nil {
		return err
	}

	err = r.db.WithContext(ctx).
		Model(&models.StudentsItems{}).
		Where("student_id = ? AND item_id = ?", studentID, itemID).
		Update("is_equiped", true).Error
	if err != nil {
		return err
	}

	return nil
}
