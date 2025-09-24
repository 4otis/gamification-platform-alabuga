package services

import (
	"context"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
)

type InventoryService interface {
	GetItemByID(ctx context.Context, id uint) (*models.Item, error)
	GetEquipedItems(ctx context.Context, studentID uint) ([]*models.Item, error)
}

type inventoryService struct {
}

func NewInventoryService() *inventoryService {
	return &inventoryService{}
}
