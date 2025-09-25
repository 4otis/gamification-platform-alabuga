package services

import (
	"context"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
)

type LoggingService interface {
	GetTransactionByStudentID(context context.Context, StudentID uint) ([]*TransactionEntry, error)
}

type loggingService struct {
	missionService MissionService
	// studentRankRepo
}

func NewLoggingService(
	missionService MissionService,
) CourseService {
	return &courseService{
		missionService: missionService,
	}
}

type TransactionEntry struct {
	Title    string           `json:"title"`
	Descr    string           `json:"descr"`
	Type     string           `json:"type"`
	Mana     int              `json:"mana"`
	Exp      int              `json:"exp"`
	Skills   []*models.Skill  `json:"skills"`
	Artifact *models.Artifact `json:"artifacts"`
}

func (s *loggingService) GetTransactionByStudentID(context context.Context, StudentID uint) ([]*TransactionEntry, error) {
	// TODO: получить все CompletedMissions для конкретного студента StudentID
	completedMissions, err := ...
	if err != nil {
		return nil, err
	}

	// TODO: начинаем формировать TransactionEntry заполняя миссиями
	var transactions []*TransactionEntry
	for _, mission := range completedMissions {
		
	}

}
