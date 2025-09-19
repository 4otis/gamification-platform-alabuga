CREATE DATABASE gamification_platform_db;

\c gamification_platform_db

-- Таблицы без внешних ключей
CREATE TABLE IF NOT EXISTS Student_Rank (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    minExp INT
);

CREATE TABLE IF NOT EXISTS HR (
    id SERIAL PRIMARY KEY,
    login VARCHAR(255),
    password VARCHAR(255),
    name VARCHAR(255),
    surname VARCHAR(255),
    patronymic VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Mission_Type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Skill (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Rarity (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

-- Таблицы с внешними ключами
CREATE TABLE IF NOT EXISTS Student (
    id SERIAL PRIMARY KEY,
    login VARCHAR(255),
    password VARCHAR(255),
    name VARCHAR(255),
    surname VARCHAR(255),
    patronymic VARCHAR(255),
    exp INT,
    mana INT,
    rankId INT,
    FOREIGN KEY (rankId) REFERENCES Student_Rank(id)
);

CREATE TABLE IF NOT EXISTS Artifact (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    descr TEXT,
    filePath VARCHAR(255),
    rarityId INT,
    FOREIGN KEY (rarityId) REFERENCES Rarity(id)
);

CREATE TABLE IF NOT EXISTS Course (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    descr TEXT,
    rankId INT,
    artifactId INT,
    FOREIGN KEY (rankId) REFERENCES Student_Rank(id),
    FOREIGN KEY (artifactId) REFERENCES Artifact(id)
);

CREATE TABLE IF NOT EXISTS Mission (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    descr TEXT,
    expReward INT,
    manaReward INT,
    nodeLvl INT,
    artifactId INT,
    typeId INT,
    courseId INT,
    FOREIGN KEY (artifactId) REFERENCES Artifact(id),
    FOREIGN KEY (typeId) REFERENCES Mission_Type(id),
    FOREIGN KEY (courseId) REFERENCES Course(id)
);

-- Смежные таблицы для связи многие ко многим
CREATE TABLE IF NOT EXISTS Students_Skills (
    id SERIAL PRIMARY KEY,
    score FLOAT,
    studentId INT,
    skillId INT,
    FOREIGN KEY (studentId) REFERENCES Student(id),
    FOREIGN KEY (skillId) REFERENCES Skill(id)
);

CREATE TABLE IF NOT EXISTS Mission_Skills (
    id SERIAL PRIMARY KEY,
    scoreReward FLOAT NOT NULL,
    missionId INT,
    skillId INT,
    FOREIGN KEY (missionId) REFERENCES Mission(id),
    FOREIGN KEY (skillId) REFERENCES Skill(id)
);