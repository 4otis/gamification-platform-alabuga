package services

import (
	"context"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"github.com/4otis/gamification-platform-alabuga/internal/repository"
)

type ShopService interface {
	GetOrderedMerchesByStudentID(ctx context.Context, studentID uint) ([]*models.Merch, error)
	GetCompletedMerchesByStudentID(ctx context.Context, studentID uint) ([]*models.Merch, error)
}

type shopService struct {
	studentRepo         repository.StudentRepository
	studentsMerchesRepo repository.StudentsMerchesRepository
}

func NewShopService(
	studentRepo repository.StudentRepository,
	studentsMerchesRepo repository.StudentsMerchesRepository,
) ShopService {
	return &ShopService{
		studentRepo:         studentRepo,
		studentsMerchesRepo: studentsMerchesRepo,
	}
}

func (s *shopService) GetOrderedMerchesByStudentID(ctx context.Context, studentID uint) ([]*models.Merch, error) {
	return s.studentsMerchesRepo.GetOrderedMerchesByStudentID(ctx, studentID)
}

func (s *shopService) GetCompletedMerchesByStudentID(ctx context.Context, studentID uint) ([]*models.Merch, error) {
	return s.studentsMerchesRepo.GetCompletedMerchesByStudentID(ctx, studentID)
}
