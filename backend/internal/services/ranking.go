package services

import (
	"context"
	"errors"
	"sort"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"github.com/4otis/gamification-platform-alabuga/internal/repository"
)

type RankingService interface {
	GetLeaderboard(ctx context.Context, limit, offset int) ([]*LeaderboardEntry, error)
	GetStudentPosition(ctx context.Context, studentID uint) (int, error)
	GetTopStudentsByExp(ctx context.Context, limit int) ([]*models.Student, error)
}

type rankingService struct {
	studentRepo repository.StudentRepository
}

func NewRankingService(studentRepo repository.StudentRepository) RankingService {
	return &rankingService{
		studentRepo: studentRepo,
	}
}

func (s *rankingService) GetLeaderboard(ctx context.Context, limit, offset int) ([]*LeaderboardEntry, error) {
	students, err := s.studentRepo.ReadAll()
	if err != nil {
		return nil, err
	}

	sort.Slice(students, func(i, j int) bool {
		return students[i].Exp > students[j].Exp
	})

	var leaderboard []*LeaderboardEntry
	for i, student := range students {
		if i >= offset && i < offset+limit {
			leaderboard = append(leaderboard, &LeaderboardEntry{
				Position: i + 1,
				Student:  student,
			})
		}
	}

	return leaderboard, nil
}

func (s *rankingService) GetStudentPosition(ctx context.Context, studentID uint) (int, error) {
	students, err := s.studentRepo.ReadAll()
	if err != nil {
		return 0, err
	}

	sort.Slice(students, func(i, j int) bool {
		return students[i].Exp > students[j].Exp
	})

	for i, student := range students {
		if student.ID == studentID {
			return i + 1, nil
		}
	}

	return 0, errors.New("student not found in leaderboard")
}

func (s *rankingService) GetTopStudentsByExp(ctx context.Context, limit int) ([]*models.Student, error) {
	students, err := s.studentRepo.ReadAll()
	if err != nil {
		return nil, err
	}

	sort.Slice(students, func(i, j int) bool {
		return students[i].Exp > students[j].Exp
	})

	if limit > len(students) {
		limit = len(students)
	}

	return students[:limit], nil
}

type LeaderboardEntry struct {
	Position int
	Student  *models.Student
}
