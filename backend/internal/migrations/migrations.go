package migrations

import (
	"encoding/json"
	"os"
	"path/filepath"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

func RunInitDbMigrations(db *gorm.DB) error {

	err := DeleteAll(db)
	if err != nil {
		return err
	}

	// err = CreateAllTables(db)
	// if err != nil {
	// 	return err
	// }

	// err = AddAllConstraints(db)
	// if err != nil {
	// 	return err
	// }

	err = AutoMigrateAll(db)
	if err != nil {
		return err
	}

	err = InsertData(db)
	if err != nil {
		return err
	}

	return nil
}

func AutoMigrateAll(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		models := []interface{}{
			&models.StudentRank{},
			&models.HR{},
			&models.MissionType{},
			&models.Skill{},
			&models.Rarity{},
			&models.QuestionType{},
			&models.ItemType{},
			&models.Student{},
			&models.Artifact{},
			&models.Course{},
			&models.Mission{},
			&models.Question{},
			&models.Item{},
			&models.Merch{},
			&models.StudentsSkills{},
			&models.StudentsCourses{},
			&models.StudentsMissions{},
			&models.StudentsItems{},
			&models.StudentsMerches{},
			&models.MissionsSkills{},
		}

		for _, model := range models {
			if err := tx.AutoMigrate(model); err != nil {
				return err
			}
		}
		return nil
	})
}

func DeleteAll(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		sqlPath := filepath.Join("internal", "migrations", "sql", "delete.sql")
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

// func CreateAllTables(db *gorm.DB) error {
// 	return db.Transaction(func(tx *gorm.DB) error {
// 		sqlPath := filepath.Join("internal", "migrations", "sql", "create_tables.sql")
// 		sqlBytes, err := os.ReadFile(sqlPath)
// 		if err != nil {
// 			return err
// 		}

// 		if err := tx.Exec(string(sqlBytes)).Error; err != nil {
// 			return err
// 		}
// 		return nil
// 	})
// }

func AddAllConstraints(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		sqlPath := filepath.Join("internal", "migrations", "sql", "constraints.sql")
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

func InsertData(db *gorm.DB) error {
	if err := InsertStudentRank(db); err != nil {
		return err
	}

	if err := InsertHR(db); err != nil {
		return err
	}

	if err := InsertMissionType(db); err != nil {
		return err
	}

	if err := InsertSkill(db); err != nil {
		return err
	}

	if err := InsertRarity(db); err != nil {
		return err
	}

	if err := InsertQuestionType(db); err != nil {
		return err
	}

	if err := InsertItemType(db); err != nil {
		return err
	}
	// НИЖЕ таблицы с внешними ключами

	if err := InsertStudent(db); err != nil {
		return err
	}

	if err := InsertArtifact(db); err != nil {
		return err
	}

	if err := InsertCourse(db); err != nil {
		return err
	}

	if err := InsertMission(db); err != nil {
		return err
	}

	if err := InsertQuestion(db); err != nil {
		return err
	}

	if err := InsertItem(db); err != nil {
		return err
	}

	if err := InsertMerch(db); err != nil {
		return err
	}

	if err := InsertStudentsSkills(db); err != nil {
		return err
	}

	if err := InsertMissionsSkills(db); err != nil {
		return err
	}

	if err := InsertStudentsMissions(db); err != nil {
		return err
	}

	if err := InsertStudentsCourses(db); err != nil {
		return err
	}

	if err := InsertStudentsItems(db); err != nil {
		return err
	}

	if err := InsertStudentsMerches(db); err != nil {
		return err
	}

	return nil
}

func InsertStudentRank(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "student_rank.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		var studentRanks []models.StudentRank
		if err := json.Unmarshal(jsonBytes, &studentRanks); err != nil {
			return err
		}

		return tx.Create(&studentRanks).Error
	})
}

func InsertHR(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "hr.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		var hrs []models.HR
		if err := json.Unmarshal(jsonBytes, &hrs); err != nil {
			return err
		}

		return tx.Create(&hrs).Error
	})
}

func InsertMissionType(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "mission_type.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		var mts []models.MissionType
		if err := json.Unmarshal(jsonBytes, &mts); err != nil {
			return err
		}

		return tx.Create(&mts).Error
	})
}

func InsertSkill(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "skill.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		var skills []models.Skill
		if err := json.Unmarshal(jsonBytes, &skills); err != nil {
			return err
		}

		return tx.Create(&skills).Error
	})
}

func InsertRarity(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "rarity.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		var rs []models.Rarity
		if err := json.Unmarshal(jsonBytes, &rs); err != nil {
			return err
		}

		return tx.Create(&rs).Error
	})
}

func InsertQuestionType(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "question_type.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		var qts []models.QuestionType
		if err := json.Unmarshal(jsonBytes, &qts); err != nil {
			return err
		}

		return tx.Create(&qts).Error
	})
}

func InsertItemType(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "item_type.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		var its []models.ItemType
		if err := json.Unmarshal(jsonBytes, &its); err != nil {
			return err
		}

		return tx.Create(&its).Error
	})
}

func InsertStudent(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "student.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		var students []models.Student
		if err := json.Unmarshal(jsonBytes, &students); err != nil {
			return err
		}

		return tx.Create(&students).Error
	})
}

func InsertArtifact(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "artifact.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		var artifacts []models.Artifact
		if err := json.Unmarshal(jsonBytes, &artifacts); err != nil {
			return err
		}

		return tx.Create(&artifacts).Error
	})
}

func InsertCourse(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "course.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		var courses []models.Course
		if err := json.Unmarshal(jsonBytes, &courses); err != nil {
			return err
		}

		return tx.Create(&courses).Error
	})
}

func InsertMission(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "mission.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		var missions []models.Mission
		if err := json.Unmarshal(jsonBytes, &missions); err != nil {
			return err
		}

		return tx.Create(&missions).Error
	})
}

func InsertQuestion(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "question.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		var questions []models.Question
		if err := json.Unmarshal(jsonBytes, &questions); err != nil {
			return err
		}

		return tx.Create(&questions).Error
	})
}

func InsertItem(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "item.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		var items []models.Item
		if err := json.Unmarshal(jsonBytes, &items); err != nil {
			return err
		}

		return tx.Create(&items).Error
	})
}

func InsertMerch(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "merch.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		var merches []models.Merch
		if err := json.Unmarshal(jsonBytes, &merches); err != nil {
			return err
		}

		return tx.Create(&merches).Error
	})
}

func InsertStudentsSkills(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "students_skills.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		var ss []models.StudentsSkills
		if err := json.Unmarshal(jsonBytes, &ss); err != nil {
			return err
		}

		return tx.Create(&ss).Error
	})
}

func InsertStudentsCourses(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "students_courses.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		var ss []models.StudentsCourses
		if err := json.Unmarshal(jsonBytes, &ss); err != nil {
			return err
		}

		return tx.Create(&ss).Error
	})
}

func InsertStudentsMissions(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "students_missions.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		var ss []models.StudentsMissions
		if err := json.Unmarshal(jsonBytes, &ss); err != nil {
			return err
		}

		return tx.Create(&ss).Error
	})
}

func InsertStudentsItems(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "students_items.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		var si []models.StudentsItems
		if err := json.Unmarshal(jsonBytes, &si); err != nil {
			return err
		}

		return tx.Create(&si).Error
	})
}

func InsertStudentsMerches(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "students_merches.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		var sm []models.StudentsMerches
		if err := json.Unmarshal(jsonBytes, &sm); err != nil {
			return err
		}

		return tx.Create(&sm).Error
	})
}

func InsertMissionsSkills(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "missions_skills.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		var ms []models.MissionsSkills
		if err := json.Unmarshal(jsonBytes, &ms); err != nil {
			return err
		}

		return tx.Create(&ms).Error
	})
}
