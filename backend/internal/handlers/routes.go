package handlers

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"gorm.io/gorm"
)

func SetupRoutes(g *gin.Engine, db *gorm.DB) {
	hrRepo := repository.NewHRRepository(db)
	studentRepo := repository.NewStudentRepository(db)
	courseRepo := repository.NewAssetRepository(db)
	missionRepo := repository.NewMarketRepository(db)

	studentService := services.NewSessionService(sessionRepo, playerRepo)
	hrService := services.NewGameService(sessionRepo, playerRepo)

	// hrHandler := NewSessionHandler()
	// studentHandler := NewGameHandler(gameService)

	g.StaticFile("/", "./index.html")
	g.StaticFile("/index.html", "./index.html")

	g.POST("/courses", courseHandler.GetAllCourses)

	g.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
}
