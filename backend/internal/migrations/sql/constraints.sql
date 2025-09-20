-- Ограничения таблицы student_rank
ALTER TABLE student_rank
ALTER COLUMN name SET NOT NULL,
ALTER COLUMN min_exp SET NOT NULL;

ALTER TABLE student_rank
ALTER COLUMN min_exp SET DEFAULT 0;

ALTER TABLE student_rank
ADD CONSTRAINT check_if_min_exp_is_not_negative CHECK (min_exp >= 0);

-- Ограничения таблицы hr
ALTER TABLE hr
ALTER COLUMN login SET NOT NULL,
ALTER COLUMN password SET NOT NULL,
ALTER COLUMN name SET NOT NULL,
ALTER COLUMN surname SET NOT NULL;

ALTER TABLE hr
ADD CONSTRAINT unique_hr_login UNIQUE (login);

-- Ограничения таблицы mission_type
ALTER TABLE mission_type
ALTER COLUMN name SET NOT NULL;

ALTER TABLE mission_type
ADD CONSTRAINT unique_mission_type_name UNIQUE (name);

-- Ограничения таблицы skill
ALTER TABLE skill
ALTER COLUMN name SET NOT NULL;

ALTER TABLE skill
ADD CONSTRAINT unique_skill_name UNIQUE (name);

-- Ограничения таблицы rarity
ALTER TABLE rarity
ALTER COLUMN name SET NOT NULL;

ALTER TABLE rarity
ADD CONSTRAINT unique_rarity_name UNIQUE (name);

-- Ограничения таблицы student
ALTER TABLE student
ALTER COLUMN login SET NOT NULL,
ALTER COLUMN password SET NOT NULL,
ALTER COLUMN name SET NOT NULL,
ALTER COLUMN surname SET NOT NULL,
ALTER COLUMN exp SET NOT NULL,
ALTER COLUMN mana SET NOT NULL;

ALTER TABLE student
ALTER COLUMN exp SET DEFAULT 0,
ALTER COLUMN mana SET DEFAULT 0;

ALTER TABLE student
ADD CONSTRAINT unique_student_login UNIQUE (login);

ALTER TABLE student
ADD CONSTRAINT check_if_exp_is_not_negative CHECK (exp >= 0),
ADD CONSTRAINT check_if_mana_is_not_negative CHECK (mana >= 0);

-- Ограничения таблицы artifact
ALTER TABLE artifact
ALTER COLUMN title SET NOT NULL,
ALTER COLUMN file_path SET NOT NULL;

ALTER TABLE artifact
ADD CONSTRAINT unique_artifact_title UNIQUE (title);

-- Ограничения таблицы course
ALTER TABLE course
ALTER COLUMN title SET NOT NULL;

ALTER TABLE course
ADD CONSTRAINT unique_course_title UNIQUE (title);

-- Ограничения таблицы mission
ALTER TABLE mission
ALTER COLUMN title SET NOT NULL,
ALTER COLUMN mana_reward SET NOT NULL,
ALTER COLUMN exp_reward SET NOT NULL,
ALTER COLUMN node_lvl SET NOT NULL;

ALTER TABLE mission
ADD CONSTRAINT check_if_exp_reward_is_not_negative CHECK (exp_reward >= 0),
ADD CONSTRAINT check_if_mana_reward_is_not_negative CHECK (mana_reward >= 0);

-- Ограничения таблицы students_skills
ALTER TABLE students_skills
ALTER COLUMN score SET NOT NULL;

ALTER TABLE students_skills
ALTER COLUMN score SET DEFAULT 0.0;

ALTER TABLE students_skills
ADD CONSTRAINT check_if_score_is_not_negative CHECK (score >= 0.0);

-- Ограничения таблицы missions_skills
ALTER TABLE missions_skills
ALTER COLUMN score_reward SET NOT NULL;

ALTER TABLE missions_skills
ALTER COLUMN score_reward SET DEFAULT 0.0;

ALTER TABLE missions_skills
ADD CONSTRAINT check_if_score_reward_is_not_negative CHECK (score_reward >= 0.0);