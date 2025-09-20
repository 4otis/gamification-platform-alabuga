package migrations

import (
	"encoding/json"
	"os"
	"path/filepath"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

func RunInitDbMigrations(db *gorm.DB) error {

	err := CreateAllTables(db)
	if err != nil {
		return err
	}

	err = AddAllConstraints(db)
	if err != nil {
		return err
	}

	// err = RunStudentMigrations(db)
	// if err != nil {
	// 	return err
	// }

	return nil
}

func CreateAllTables(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		sqlPath := filepath.Join("internal", "migrations", "sql", "create_tables.sql")
		sqlBytes, err := os.ReadFile(sqlPath)
		if err != nil {
			return err
		}

		if err := tx.Exec(string(sqlBytes)).Error; err != nil {
			return err
		}
		return nil
	})
}

func AddAllConstraints(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		sqlPath := filepath.Join("internal", "migrations", "sql", "create_tables.sql")
		sqlBytes, err := os.ReadFile(sqlPath)
		if err != nil {
			return err
		}

		if err := tx.Exec(string(sqlBytes)).Error; err != nil {
			return err
		}
		return nil
	})
}

func RunStudentMigrations(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
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
			INSERT INTO Student
			(id, login, password, name, surname, patronymic, exp, mana, rank_id)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
				student.ID, student.Login,
				student.Password, student.Name,
				student.Surname, student.Patronymic,
				student.Mana, student.Exp, student.RankId,
			).Error; err != nil {
				return err
			}
		}

		return nil
	})
}
