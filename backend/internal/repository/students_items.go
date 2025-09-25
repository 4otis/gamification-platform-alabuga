package repository

import (
	"context"
	"fmt"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type StudentsItemsRepository struct {
	db *gorm.DB
}

func NewStudentsItemsRepository(db *gorm.DB) *StudentsItemsRepository {
	return &StudentsItemsRepository{db: db}
}

func (r *StudentsItemsRepository) ReadAll(ctx context.Context) ([]*models.Item, error) {
	var studentsItems []*models.Item
	err := r.db.WithContext(ctx).Find(&studentsItems).Error
	if err != nil {
		return nil, err
	}
	return studentsItems, nil
}

func (r *StudentsItemsRepository) GetEquipedItems(ctx context.Context, studentID uint) ([]*models.Item, error) {
	var equipedItems []*models.Item

	err := r.db.WithContext(ctx).
		Preload("Type").
		Joins("JOIN students_items si ON items.id = si.item_id").
		Where("si.student_id = ? AND si.is_equiped = ?", studentID, true).
		Find(&equipedItems).Error
	if err != nil {
		fmt.Println("lol")
		return nil, err
	}

	return equipedItems, nil
}

func (r *StudentsItemsRepository) EquipItem(ctx context.Context, studentID uint, itemID uint, typeID uint) error {
	// Проверка на наличие в students_items
	var studentsItem models.StudentsItems
	err := r.db.WithContext(ctx).
		Where("student_id = ? AND item_id = ?", studentID, itemID).
		First(&studentsItem).Error
	if err != nil {
		return err
	}

	err = r.db.WithContext(ctx).
		Model(&models.StudentsItems{}).
		Where("student_id = ? AND is_equiped = true AND item_id IN (SELECT id FROM items WHERE type_id = ?)",
			studentID, typeID).
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
