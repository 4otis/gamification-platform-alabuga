-- Ограничения таблицы Student_Rank
ALTER TABLE Student_Rank
ALTER COLUMN name SET NOT NULL,
ALTER COLUMN minExp SET NOT NULL;

ALTER TABLE Student_Rank
ALTER COLUMN minExp SET DEFAULT 0;

ALTER TABLE Student_Rank
ADD CONSTRAINT check_if_min_exp_is_not_negative CHECK (minExp >= 0);

-- Ограничения таблицы HR
ALTER TABLE HR
ALTER COLUMN login SET NOT NULL,
ALTER COLUMN password SET NOT NULL,
ALTER COLUMN name SET NOT NULL,
ALTER COLUMN surname SET NOT NULL;

ALTER TABLE HR
ADD CONSTRAINT unique_hr_login UNIQUE (login);

-- Ограничения таблицы Mission_Type
ALTER TABLE Mission_Type
ALTER COLUMN name SET NOT NULL;

ALTER TABLE Mission_Type
ADD CONSTRAINT unique_mission_type_name UNIQUE (name);

-- Ограничения таблицы Skill
ALTER TABLE Skill
ALTER COLUMN name SET NOT NULL;

ALTER TABLE Skill
ADD CONSTRAINT unique_skill_name UNIQUE (name);

-- Ограничения таблицы Rarity
ALTER TABLE Rarity
ALTER COLUMN name SET NOT NULL;

ALTER TABLE Rarity
ADD CONSTRAINT unique_rarity_name UNIQUE (name);

-- Ограничения таблицы Student
ALTER TABLE Student
ALTER COLUMN login SET NOT NULL,
ALTER COLUMN password SET NOT NULL,
ALTER COLUMN name SET NOT NULL,
ALTER COLUMN surname SET NOT NULL,
ALTER COLUMN exp SET NOT NULL,
ALTER COLUMN mana SET NOT NULL;

ALTER TABLE Student
ALTER COLUMN exp SET DEFAULT 0,
ALTER COLUMN mana SET DEFAULT 0;

ALTER TABLE Student
ADD CONSTRAINT unique_student_login UNIQUE (login);

ALTER TABLE Student
ADD CONSTRAINT check_if_exp_is_not_negative CHECK (exp >= 0),
ADD CONSTRAINT check_if_mana_is_not_negative CHECK (mana >= 0);

-- Ограничения таблицы Artifact
ALTER TABLE Artifact
ALTER COLUMN title SET NOT NULL,
ALTER COLUMN filePath SET NOT NULL;

ALTER TABLE Artifact
ADD CONSTRAINT unique_artifact_title UNIQUE (title);

-- Ограничения таблицы Course
ALTER TABLE Course
ALTER COLUMN title SET NOT NULL;

ALTER TABLE Course
ADD CONSTRAINT unique_course_title UNIQUE (title);

-- Ограничения таблицы Mission
ALTER TABLE Mission
ALTER COLUMN title SET NOT NULL,
ALTER COLUMN manaReward SET NOT NULL,
ALTER COLUMN expReward SET NOT NULL,
ALTER COLUMN nodeLvl SET NOT NULL;

ALTER TABLE Mission
ADD CONSTRAINT check_if_exp_reward_is_not_negative CHECK (expReward >= 0),
ADD CONSTRAINT check_if_mana_reward_is_not_negative CHECK (manaReward >= 0);

-- Ограничения таблицы Students_Skills
ALTER TABLE Students_Skills
ALTER COLUMN score SET NOT NULL;

ALTER TABLE Students_Skills
ALTER COLUMN score SET DEFAULT 0.0;

ALTER TABLE Students_Skills
ADD CONSTRAINT check_if_score_is_not_negative CHECK (score >= 0.0);

-- Ограничения таблицы Mission_Skills
ALTER TABLE Mission_Skills
ALTER COLUMN scoreReward SET NOT NULL;

ALTER TABLE Mission_Skills
ALTER COLUMN scoreReward SET DEFAULT 0.0;

ALTER TABLE Mission_Skills
ADD CONSTRAINT check_if_score_reward_is_not_negative CHECK (scoreReward >= 0.0);