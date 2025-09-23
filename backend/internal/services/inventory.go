package services

type InventoryService interface {
}

type inventoryService struct {
}

func NewInventoryService() *inventoryService {
	return &inventoryService{}
}
