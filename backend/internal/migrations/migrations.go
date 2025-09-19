package migrations

import (
	"encoding/json"
	"os"
	"path/filepath"
	"time"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

func RunInitDBMigrations(db *gorm.DB) error {

	


	// err := RunStudentMigrations(db)
	// if err != nil {
	// 	return err
	// }

	return nil
}

func CreateAllTables(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		sqlPath := filepath.Join("internal", "migrations", "sql", "init_students.sql")
			sqlBytes, err := os.ReadFile(sqlPath)
			if err != nil {
				return err
			}

			if err := tx.Exec(string(sqlBytes)).Error; err != nil {
				return err
			}
			return nil
	}
}

func RunStudentMigrations(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		sqlPath := filepath.Join("internal", "migrations", "sql", "init_students.sql")
		sqlBytes, err := os.ReadFile(sqlPath)
		if err != nil {
			return err
		}

		if err := tx.Exec(string(sqlBytes)).Error; err != nil {
			return err
		}

		jsonPath := filepath.Join("internal", "migrations", "data", "student.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		_ = jsonBytes

		var students []models.Student
		if err := json.Unmarshal(jsonBytes, &students); err != nil {
			return err
		}

		for _, student := range students {
			if err := tx.Exec(`
			INSERT INTO assets
			(id, name, surname, patronymic, exp, mana, rank_id)
			VALUES (?, ?, ?, ?, ?, ?, ?)`,
				time.Now(), time.Now(),
				student.ID, student.Name,
				student.Surname, student.Patronymic,
				student.Mana, student.RankId,
			).Error; err != nil {
				return err
			}
		}

		return nil
	})
}
