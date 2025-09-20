package repository

import (
	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type ArtifactRepository struct {
	db *gorm.DB
}

func NewSkillRepository(db *gorm.DB) *ArtifactRepository {
	return &ArtifactRepository{db: db}
}

func (r ArtifactRepository) Create(artifact *models.Artifact) error {
	return r.db.Create(artifact).Error
}

func (r ArtifactRepository) Read(id uint) (*models.Artifact, error) {
	var artifact models.Artifact
	err := r.db.First(&artifact, id).Error
	if err != nil {
		return nil, err
	}
	return &artifact, nil
}

func (r ArtifactRepository) UpdateFields(id uint, updates map[string]interface{}) error {
	return r.db.Model(&models.Artifact{}).Where("id = ?", id).Updates(updates).Error
}

func (r ArtifactRepository) Delete(id uint) error {
	return r.db.Delete(&models.Artifact{}, id).Error
}
