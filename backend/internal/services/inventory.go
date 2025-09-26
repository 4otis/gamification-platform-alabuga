package services

import (
	"context"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"github.com/4otis/gamification-platform-alabuga/internal/repository"
)

type InventoryService interface {
	GetItemByID(ctx context.Context, id uint) (*models.Item, error)
	GetAllItems(ctx context.Context) ([]*models.Item, error)
	GetAvailableItems(ctx context.Context, studentID uint) ([]*models.Item, error)
	GetEquipedItems(ctx context.Context, studentID uint) ([]*models.Item, error)
	GetItemTypes(ctx context.Context) ([]*models.ItemType, error)
	EquipItem(ctx context.Context, studentID uint, itemID uint, typeID uint) error
}

type inventoryService struct {
	itemRepo          repository.ItemRepository
	itemTypeRepo      repository.ItemTypeRepository
	studentsItemsRepo repository.StudentsItemsRepository
	studentRepo       repository.StudentRepository
}

func NewInventoryService(
	itemRepo repository.ItemRepository,
	itemTypeRepo repository.ItemTypeRepository,
	studentsItemsRepo repository.StudentsItemsRepository,
	studentRepo repository.StudentRepository) *inventoryService {
	return &inventoryService{
		itemRepo:          itemRepo,
		itemTypeRepo:      itemTypeRepo,
		studentsItemsRepo: studentsItemsRepo,
		studentRepo:       studentRepo,
	}
}

func (s *inventoryService) GetItemByID(ctx context.Context, id uint) (*models.Item, error) {
	return s.itemRepo.Read(ctx, id)
}

func (s *inventoryService) GetAllItems(ctx context.Context) ([]*models.Item, error) {
	return s.itemRepo.ReadAll(ctx)
}

func (s *inventoryService) GetAvailableItems(ctx context.Context, studentID uint) ([]*models.Item, error) {
	student, err := s.studentRepo.Read(ctx, studentID)
	if err != nil {
		return nil, err
	}

	err = s.studentsItemsRepo.AssignAvailableItemsToStudent(ctx, studentID, student.Exp)
	if err != nil {
		return nil, err
	}

	return s.itemRepo.GetAvailableItems(ctx, student.Exp)
}

func (s *inventoryService) GetEquipedItems(ctx context.Context, studentID uint) ([]*models.Item, error) {
	return s.studentsItemsRepo.GetEquipedItems(ctx, studentID)
}

func (s *inventoryService) GetItemTypes(ctx context.Context) ([]*models.ItemType, error) {
	return s.itemTypeRepo.ReadAll(ctx)
}

func (s *inventoryService) EquipItem(ctx context.Context, studentID uint, itemID uint, typeID uint) error {
	return s.studentsItemsRepo.EquipItem(ctx, studentID, itemID, typeID)
}
