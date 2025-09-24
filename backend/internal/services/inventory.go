package services

import (
 	"context"

 	"github.com/4otis/gamification-platform-alabuga/internal/models"
)

type InventoryService interface {
 	GetItemByID(ctx context.Context, id uint) (*models.Item, error)
 	// GetEquipedItems(ctx context.Context, studentID uint) ([]*models.Item, error)
	// GetAllItems(ctx context.Context, studentID uint) (*models.Item, error)
	// GetAvailableItems(ctx context.Context, studentID uint) (*models.Item, error)
	// GetItemTypes(ctx context.Context, studentID uint) (*models.ItemType, error)
	// EquipItems(ctx context.Context, studentID uint) (*models.Item, error)
}

type inventoryService struct {
 	itemRepo          repository.ItemRepository
	itemTypeRepo      repository.ItemTypeRepository
	studentsItemsRepo repository.StudentsItemsRepository
}

func NewInventoryService(
	itemRepo          	repository.ItemRepository,
	itemTypeRepo        repository.ItemTypeRepository,
	studentsItemsRepo 	repository.StudentsItemsRepository,
) *inventoryService {
	return &inventoryService {
		itemRepo:			itemRepo,
		itemTypeRepo        itemTypeRepository,
		studentsItemsRepo 	studentsItemsRepo,
	}
}

func (s *itemService) GetItemByID(ctx context.Context, id uint) (*models.Item, error) {
	result s.itemRepo.Read(ctx, id)
}


func (s *itemService) GetAllItems(ctx context.Context, student_id uint) (*models.Item, error) {
	return s.itemRepo.ReadAll(ctx, id)
}

func (s *itemService) GetAvailableItems(ctx context.Context, student_id uint) (*models.Item, error) {
	allItems, err = s.itemRepo.ReadAll(ctx)
	if err != nil {
		return nil, err
	}

	student, err = s.studentRepo.Read(ctx, id)
	if err != nil {
		return nil, err
	}

	var availableItems []*models.Item
	for _, item := range allItems {
		if item.MinExp <= student.Exp {
			availableItems = append(availableItems, item)
		}
	}

	return availableItems, nil
}

func (s *itemTypeService) GetItemTypes(ctx context.Context) (*models.ItemType, error) {
	return s.itemTypeRepo.ReadAll(ctx)
}

func (s *itemTypeService) EquipItems(ctx context.Context, req *EquipItemRequest) error {	

}
