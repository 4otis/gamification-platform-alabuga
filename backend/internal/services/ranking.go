package services

import (
	"context"
	"errors"
	"sort"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"github.com/4otis/gamification-platform-alabuga/internal/repository"
)

type RankingService interface {
	GetLeaderboard(ctx context.Context, limit int) ([]*LeaderboardEntry, error)
	GetStudentPosition(ctx context.Context, studentID uint) (int, error)
	GetTopStudentsByExp(ctx context.Context, limit int) ([]*models.Student, error)
	GetSkillsByStudentID(ctx context.Context, studentID uint) ([]*models.StudentsSkills, error)
	GetSkillsByMissionID(ctx context.Context, missionID uint) ([]*models.MissionsSkills, error)
	GetArtifactsByStudentID(ctx context.Context, studentID uint) ([]*models.Artifact, error)
}

type rankingService struct {
	studentRepo        repository.StudentRepository
	skillRepo          repository.SkillRepository
	artifactRepo       repository.ArtifactRepository
	studentsSkillsRepo repository.StudentsSkillsRepository
	missionsSkillsRepo repository.MissionsSkillsRepository
}

func NewRankingService(studentRepo repository.StudentRepository,
	skillRepo repository.SkillRepository,
	artifactRepo repository.ArtifactRepository,
	studentsSkillsRepo repository.StudentsSkillsRepository,
	missionsSkillsRepo repository.MissionsSkillsRepository) RankingService {
	return &rankingService{
		studentRepo:        studentRepo,
		skillRepo:          skillRepo,
		artifactRepo:       artifactRepo,
		studentsSkillsRepo: studentsSkillsRepo,
		missionsSkillsRepo: missionsSkillsRepo,
	}
}

type LeaderboardEntry struct {
	Position int
	Student  *models.Student
}

// type SkillWithScore struct {

// }

func (s *rankingService) GetLeaderboard(ctx context.Context, limit int) ([]*LeaderboardEntry, error) {
	students, err := s.studentRepo.GetSortedByExp(ctx)
	if err != nil {
		return nil, err
	}

	var leaderboard []*LeaderboardEntry

	for i, s := range students {
		if i == limit {
			break
		}
		leaderboard = append(leaderboard, &LeaderboardEntry{
			Position: i,
			Student:  s,
		})
	}

	return leaderboard, nil
}

func (s *rankingService) GetStudentPosition(ctx context.Context, studentID uint) (int, error) {
	students, err := s.studentRepo.ReadAll(ctx)
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
	students, err := s.studentRepo.ReadAll(ctx)
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

func (s *rankingService) GetSkillsByStudentID(ctx context.Context, studentID uint) ([]*models.StudentsSkills, error) {
	return s.studentsSkillsRepo.GetAllSkillsByStudentID(ctx, studentID)
}

func (s *rankingService) GetArtifactsByStudentID(ctx context.Context, studentID uint) ([]*models.Artifact, error) {
	return s.artifactRepo.GetArtifactsByStudentID(ctx, studentID)
}

func (s *rankingService) GetSkillsByMissionID(ctx context.Context, missionID uint) ([]*models.MissionsSkills, error) {
	return s.missionsSkillsRepo.GetSkillsByMissionID(ctx, missionID)
}
