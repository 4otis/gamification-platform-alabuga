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

	err = CreateAllTables(db)
	if err != nil {
		return err
	}

	err = AddAllConstraints(db)
	if err != nil {
		return err
	}

	err = InsertData(db)
	if err != nil {
		return err
	}

	return nil
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

	if err := InsertStudentsSkills(db); err != nil {
		return err
	}

	if err := InsertMissionsSkills(db); err != nil {
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

		_ = jsonBytes

		var studentRanks []models.StudentRank
		if err := json.Unmarshal(jsonBytes, &studentRanks); err != nil {
			return err
		}

		for _, studentRank := range studentRanks {
			if err := tx.Exec(`
			INSERT INTO student_rank
			(id, name, min_exp)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
				studentRank.ID,
				studentRank.Name,
				studentRank.MinExp,
			).Error; err != nil {
				return err
			}
		}

		return nil
	})
}

func InsertHR(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "hr.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		_ = jsonBytes

		var hrs []models.HR
		if err := json.Unmarshal(jsonBytes, &hrs); err != nil {
			return err
		}

		for _, hr := range hrs {
			if err := tx.Exec(`
			INSERT INTO hr
			(id, login, password, name, surname, patronymic)
			VALUES (?, ?, ?, ?, ?, ?);`,
				hr.ID, hr.Login,
				hr.Password, hr.Name,
				hr.Surname, hr.Patronymic,
			).Error; err != nil {
				return err
			}
		}

		return nil
	})
}

func InsertMissionType(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "mission_type.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		_ = jsonBytes

		var mts []models.MissionType
		if err := json.Unmarshal(jsonBytes, &mts); err != nil {
			return err
		}

		for _, mt := range mts {
			if err := tx.Exec(`
			INSERT INTO mission_type
			(id, name)
			VALUES (?, ?);`,
				mts.ID, mts.Name,
			).Error; err != nil {
				return err
			}
		}

		return nil
	})
}

func InsertSkill(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "skill.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		_ = jsonBytes

		var skills []models.Skill
		if err := json.Unmarshal(jsonBytes, &skills); err != nil {
			return err
		}

		for _, skill := range skills {
			if err := tx.Exec(`
			INSERT INTO skill
			(id, name)
			VALUES (?, ?);`,
				skill.ID, skill.Name,
			).Error; err != nil {
				return err
			}
		}

		return nil
	})
}

func InsertRarity(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "rarity.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		_ = jsonBytes

		var rs []models.Rarity
		if err := json.Unmarshal(jsonBytes, &rs); err != nil {
			return err
		}

		for _, r := range rs {
			if err := tx.Exec(`
			INSERT INTO rarity
			(id, name)
			VALUES (?, ?);`,
				r.ID, r.Name,
			).Error; err != nil {
				return err
			}
		}

		return nil
	})
}

func InsertStudent(db *gorm.DB) error {
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
				student.Mana, student.Exp, student.RankID,
			).Error; err != nil {
				return err
			}
		}

		return nil
	})
}

func InsertArtifact(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "artifact.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		_ = jsonBytes

		var artifacts []models.Artifact
		if err := json.Unmarshal(jsonBytes, &artifacts); err != nil {
			return err
		}

		for _, a := range artifacts {
			if err := tx.Exec(`
			INSERT INTO artifact
			(id, title, descr, file_path, rarity_id)
			VALUES (?, ?, ?, ?, ?, ?);`,
				a.ID, a.Title,
				a.Descr, a.RankID,
				a.FilePath, a.RarityID,
			).Error; err != nil {
				return err
			}
		}

		return nil
	})
}

func InsertCourse(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "course.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		_ = jsonBytes

		var courses []models.Course
		if err := json.Unmarshal(jsonBytes, &courses); err != nil {
			return err
		}

		for _, c := range courses {
			if err := tx.Exec(`
			INSERT INTO course
			(id, title, descr, rank_id, artifact_id)
			VALUES (?, ?, ?, ?, ?,);`,
				c.ID, c.Title,
				c.Descr, c.RankID,
				c.ArtifactID,
			).Error; err != nil {
				return err
			}
		}

		return nil
	})
}

func InsertMission(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "mission.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		_ = jsonBytes

		var missions []models.Mission
		if err := json.Unmarshal(jsonBytes, &missions); err != nil {
			return err
		}

		for _, m := range missions {
			if err := tx.Exec(`
			INSERT INTO mission
			(id, title, descr, exp_reward, mana_reward, node_lvl, artifact_id, type_id, course_id)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
				m.ID, m.Title,
				m.Descr, m.ExpReward,
				m.ManaReward, m.NodeLvl,
				m.ArtifactID, m.TypeID,
				m.CourseID,
			).Error; err != nil {
				return err
			}
		}

		return nil
	})
}

func InsertStudentsSkills(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "students_skills.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		_ = jsonBytes

		var ss []models.StudentSkills
		if err := json.Unmarshal(jsonBytes, &ss); err != nil {
			return err
		}

		for _, s := range ss {
			if err := tx.Exec(`
			INSERT INTO students_skills
			(id, score, student_id, skill_id)
			VALUES (?, ?, ?, ?);`,
				s.ID, s.Score,
				s.StudentID, s.SkillID,
			).Error; err != nil {
				return err
			}
		}

		return nil
	})
}

func InsertMissionsSkills(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		jsonPath := filepath.Join("internal", "migrations", "data", "missions_skills.json")
		jsonBytes, err := os.ReadFile(jsonPath)
		if err != nil {
			return err
		}

		_ = jsonBytes

		var ms []models.MissionsSkills
		if err := json.Unmarshal(jsonBytes, &ms); err != nil {
			return err
		}

		for _, m := range ms {
			if err := tx.Exec(`
			INSERT INTO missions_skills
			(id, score_reward, mission_id, skill_id)
			VALUES (?, ?, ?, ?);`,
				m.ID, m.ScoreReward,
				m.MissionID, m.SkillID,
			).Error; err != nil {
				return err
			}
		}

		return nil
	})
}
