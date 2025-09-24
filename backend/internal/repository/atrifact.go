package repository

import (
	"context"

	"github.com/4otis/gamification-platform-alabuga/internal/models"
	"gorm.io/gorm"
)

type ArtifactRepository struct {
	db *gorm.DB
}

func NewArtifactRepository(db *gorm.DB) *ArtifactRepository {
	return &ArtifactRepository{db: db}
}

func (r *ArtifactRepository) Create(ctx context.Context, artifact *models.Artifact) error {
	return r.db.WithContext(ctx).Create(artifact).Error
}

func (r *ArtifactRepository) Read(ctx context.Context, id uint) (*models.Artifact, error) {
	var artifact models.Artifact
	err := r.db.WithContext(ctx).First(&artifact, id).Error
	if err != nil {
		return nil, err
	}
	return &artifact, nil
}

func (r *ArtifactRepository) UpdateFields(ctx context.Context, id uint, updates map[string]interface{}) error {
	result := r.db.WithContext(ctx).Model(&models.Artifact{}).Where("id = ?", id).Updates(updates)
	return result.Error
}

func (r *ArtifactRepository) Delete(ctx context.Context, id uint) error {
	result := r.db.WithContext(ctx).Delete(&models.Artifact{}, id)
	return result.Error
}

func (r *ArtifactRepository) GetArtifactsByStudentID(ctx context.Context, studentID uint) ([]*models.Artifact, error) {
	var artifacts []*models.Artifact
	err := r.db.WithContext(ctx).
		Preload("Student").Find(&artifacts).Error
	if err != nil {
		return nil, err
	}

	return artifacts, nil
}
