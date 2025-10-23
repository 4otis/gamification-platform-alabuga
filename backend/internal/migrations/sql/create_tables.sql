-- Таблицы без внешних ключей
CREATE TABLE IF NOT EXISTS student_rank (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    min_exp INT
);

CREATE TABLE IF NOT EXISTS hr (
    id SERIAL PRIMARY KEY,
    login VARCHAR(255),
    password VARCHAR(255),
    name VARCHAR(255),
    surname VARCHAR(255),
    patronymic VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS mission_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS skill (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS rarity (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

-- Таблицы с внешними ключами
CREATE TABLE IF NOT EXISTS student (
    id SERIAL PRIMARY KEY,
    login VARCHAR(255),
    password VARCHAR(255),
    name VARCHAR(255),
    surname VARCHAR(255),
    patronymic VARCHAR(255),
    exp INT,
    mana INT,
    rank_id INT,
    male BOOLEAN,
    FOREIGN KEY (rank_id) REFERENCES student_rank(id)
);

CREATE TABLE IF NOT EXISTS artifact (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    descr TEXT,
    file_path VARCHAR(255),
    rarity_id INT,
    FOREIGN KEY (rarity_id) REFERENCES rarity(id)
);

CREATE TABLE IF NOT EXISTS course (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    descr TEXT,
    rank_id INT,
    artifact_id INT,
    FOREIGN KEY (rank_id) REFERENCES student_rank(id),
    FOREIGN KEY (artifact_id) REFERENCES artifact(id)
);

CREATE TABLE IF NOT EXISTS mission (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    descr TEXT,
    exp_reward INT,
    mana_reward INT,
    node_lvl INT,
    artifact_id INT,
    type_id INT,
    course_id INT,
    FOREIGN KEY (artifact_id) REFERENCES artifact(id),
    FOREIGN KEY (type_id) REFERENCES mission_type(id),
    FOREIGN KEY (course_id) REFERENCES course(id)
);

-- Смежные таблицы для связи многие ко многим
CREATE TABLE IF NOT EXISTS students_skills (
    id SERIAL PRIMARY KEY,
    score FLOAT,
    student_id INT,
    skill_id INT,
    FOREIGN KEY (student_id) REFERENCES student(id),
    FOREIGN KEY (skill_id) REFERENCES skill(id)
);

CREATE TABLE IF NOT EXISTS missions_skills (
    id SERIAL PRIMARY KEY,
    score_reward FLOAT NOT NULL,
    mission_id INT,
    skill_id INT,
    FOREIGN KEY (mission_id) REFERENCES mission(id),
    FOREIGN KEY (skill_id) REFERENCES skill(id)
);