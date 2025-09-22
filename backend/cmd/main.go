package main

import (
	"log"
	"os"

	"github.com/4otis/gamification-platform-alabuga/internal/config"
	"github.com/4otis/gamification-platform-alabuga/internal/handlers"
	"github.com/4otis/gamification-platform-alabuga/internal/migrations"
	"github.com/gin-gonic/gin"
)

// @title Gamification Platform API
// @version 1.0
// @description API для геймифицированной образовательной платформы
func main() {
	db, err := config.InitDB(config.Load().DB)
	if err != nil {
		log.Fatal("Database connection error:", err)
	}

	err = migrations.RunInitDbMigrations(db)
	if err != nil {
		log.Printf("Error. Failed to migrated db. err: %e", err)
	}

	g := gin.Default()
	handlers.SetupRoutes(g, db)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server running on port %s", port)
	log.Fatal(g.Run(":" + port))

}
