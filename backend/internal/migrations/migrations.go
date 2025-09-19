package migrations

import (
	"os"
	"path/filepath"

	"gorm.io/gorm"
)

func RunInitDBMigrations(db *gorm.DB) error {

	err := RunStudentMigrations(db)
	if err != nil {
		return err
	}

	return nil
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

		// var assets []models.Student
		// if err := json.Unmarshal(jsonBytes, &assets); err != nil {
		// 	return err
		// }

		// for _, asset := range assets {
		// 	if err := tx.Exec(`
		// 	INSERT INTO assets
		// 	(created_at, updated_at, title, descr, type_id, price, cashflow)
		// 	VALUES (?, ?, ?, ?, ?, ?, ?)`,
		// 		time.Now(), time.Now(),
		// 		asset.Title, asset.Descr,
		// 		asset.TypeID, asset.Price, asset.Cashflow,
		// 	).Error; err != nil {
		// 		return err
		// 	}
		// }

		return nil
	})
}
