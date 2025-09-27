package repository

import (
	"context"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type StudentsMissionsRepository struct {
	db *gorm.DB
}

func NewStudentsMissionsRepository(db *gorm.DB) *StudentsMissionsRepository {
	return &StudentsMissionsRepository{db: db}
}

func (r *StudentsMissionsRepository) GetAvailableMissions(ctx context.Context, studentID uint) ([]*models.Mission, error) {
	var availableMissions []*models.Mission
	err := r.db.WithContext(ctx).
		Preload("Artifact").
		Joins("JOIN students_missions sm ON missions.id = sm.mission_id").
		Where("sm.student_id = ? AND sm.is_active = ?", studentID, true).
		Find(&availableMissions).Error
	if err != nil {
		return nil, err
	}

	return availableMissions, err
}

func (r *StudentsMissionsRepository) GetCompletedMissions(ctx context.Context, studentID uint) ([]*models.Mission, error) {
	var completedMissions []*models.Mission
	err := r.db.WithContext(ctx).
		Preload("Artifact").
		Joins("JOIN students_missions sm ON missions.id = sm.mission_id").
		Where("sm.student_id = ? AND sm.is_completed = ?", studentID, true).
		Find(&completedMissions).Error
	if err != nil {
		return nil, err
	}

	return completedMissions, err
}

func (r *StudentsMissionsRepository) AssignCourseMissionsToStudent(ctx context.Context, studentID uint, courseID uint) error {
	// Сначала восстанавливаем sequence
	err := r.db.Exec("SELECT setval('students_missions_id_seq', (SELECT COALESCE(MAX(id), 1) FROM students_missions))").Error
	if err != nil {
		return err
	}

	// Прямая вставка только тех миссий, которых еще нет у студента
	err = r.db.WithContext(ctx).Exec(`
        INSERT INTO students_missions (id, student_id, mission_id, is_active)
        SELECT nextval('students_missions_id_seq'), ?, missions.id, false
        FROM missions
        WHERE missions.course_id = ?
        AND missions.id NOT IN (
            SELECT mission_id FROM students_missions WHERE student_id = ?
        )
    `, studentID, courseID, studentID).Error

	// ВОЗМОЖНО СТОИТ ДОБАВИТЬ АКТИВАЦИЮ МИССИИ

	return err
}

func (r *StudentsMissionsRepository) GetStudentsMissionsByCourseID(ctx context.Context, studentID uint, courseID uint) ([]*models.Mission, error) {
	var missions []*models.Mission

	err := r.db.WithContext(ctx).
		Preload("Artifact").
		Joins("JOIN students_missions sm ON sm.mission_id = missions.id").
		Where("sm.student_id = ? AND missions.course_id = ?", studentID, courseID).
		Find(&missions).Error
	if err != nil {
		return nil, err
	}

	return missions, nil
}
