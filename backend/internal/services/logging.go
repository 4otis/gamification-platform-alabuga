package services

import (
	"context"
	"sort"
	"time"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
)

type LoggingService interface {
	GetTransactionByStudentID(context context.Context, StudentID uint) ([]*TransactionEntry, error)
}

type loggingService struct {
	missionService MissionService
	rankingService RankingService
	courseService  CourseService
	shopService    ShopService
}

func NewLoggingService(
	missionService MissionService,
	rankingService RankingService,
	courseService CourseService,
	shopService ShopService,
) LoggingService {
	return &loggingService{
		missionService: missionService,
		rankingService: rankingService,
		courseService:  courseService,
		shopService:    shopService,
	}
}

type TransactionEntry struct {
	Position  int                      `json:"position"`
	Timestamp time.Time                `json:"timestamp"`
	Title     string                   `json:"title"`
	Descr     string                   `json:"descr"`
	Type      string                   `json:"type"`
	Mana      int                      `json:"mana"`
	Exp       int                      `json:"exp"`
	Skills    []*models.MissionsSkills `json:"skills"`
	Artifact  *models.Artifact         `json:"artifacts"`
}

func (s *loggingService) GetTransactionByStudentID(ctx context.Context, StudentID uint) ([]*TransactionEntry, error) {
	var transactions []*TransactionEntry
	// TODO: получить все CompletedMissions для конкретного студента StudentID
	completedMissions, err := s.missionService.GetCompletedMissions(ctx, StudentID)
	if err != nil {
		return nil, err
	}

	// TODO: начинаем формировать TransactionEntry заполняя миссиями
	for _, mission := range completedMissions {
		var skills []*models.MissionsSkills
		skills, err := s.rankingService.GetSkillsByMissionID(ctx, mission.ID)
		if err != nil {
			return nil, err
		}

		transactions = append(transactions, &TransactionEntry{
			Position:  0,
			Timestamp: mission.DeletedTime,
			Title:     mission.Title,
			Descr:     mission.Descr,
			Type:      "mission",
			Mana:      int(mission.ManaReward),
			Exp:       int(mission.ExpReward),
			Skills:    skills,
			Artifact:  &mission.Artifact,
		})
	}

	// TODO: получить все CompletedCourses для конкретного студента StudentID
	completedCourses, err := s.courseService.GetCompletedCourses(ctx, StudentID)
	if err != nil {
		return nil, err
	}

	for _, course := range completedCourses {
		transactions = append(transactions, &TransactionEntry{
			Position:  0,
			Timestamp: course.DeletedTime,
			Title:     course.Title,
			Descr:     course.Descr,
			Type:      "course",
			Mana:      0,
			Exp:       0,
			Skills:    []*models.MissionsSkills{},
			Artifact:  &course.Artifact,
		})
	}

	orderedMerches, err := s.shopService.GetOrderedMerchesByStudentID(ctx, StudentID)
	if err != nil {
		return nil, err
	}

	for _, merch := range orderedMerches {
		transactions = append(transactions, &TransactionEntry{
			Position:  0,
			Timestamp: merch.CreatedTime,
			Title:     merch.Title,
			Descr:     merch.Descr,
			Type:      "merch",
			Mana:      -int(merch.Price),
			Exp:       0,
			Skills:    []*models.MissionsSkills{},
			Artifact:  &models.Artifact{},
		})
	}

	sort.Slice(transactions, func(i, j int) bool {
		return transactions[i].Timestamp.After(transactions[j].Timestamp)
	})

	for i := range transactions {
		transactions[i].Position = i + 1
	}

	return transactions, nil
}
