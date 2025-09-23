package handlers

import (
	_ "github.com/4otis/gamification-platform-alabuga/docs"
	"github.com/4otis/gamification-platform-alabuga/internal/handlers/student"
	"github.com/4otis/gamification-platform-alabuga/internal/repository"
	"github.com/4otis/gamification-platform-alabuga/internal/services"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"gorm.io/gorm"
)

func SetupRoutes(g *gin.Engine, db *gorm.DB) {
	studentRepo := repository.NewStudentRepository(db)
	studentRankRepo := repository.NewStudentRankRepository(db)
	skillRepo := repository.NewSkillRepository(db)
	missionRepo := repository.NewMissionRepository(db)
	courseRepo := repository.NewCourseRepository(db)
	studentsMissionsRepo := repository.NewStudentsMissionsRepository(db)
	studentsCoursesRepo := repository.NewStudentsCoursesRepository(db)

	studentService := services.NewStudentService(*studentRepo, *studentRankRepo, *skillRepo, *missionRepo, *studentsMissionsRepo, *studentsCoursesRepo)
	missionService := services.NewMissionService(*missionRepo, *studentRepo, *studentsMissionsRepo, studentService)
	courseService := services.NewCourseService(*courseRepo, *missionRepo, *studentRepo)
	rankingService := services.NewRankingService(*studentRepo)

	mainHandler := student.NewMainHandler(studentService, missionService, courseService, rankingService)

	// g.StaticFile("/", "./index.html")
	// g.StaticFile("/index.html", "./index.html")

	// g.POST("/courses", courseHandler.GetAllCourses)
	g.GET("/student/:student_id/main", mainHandler.GetMainPage)
	g.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// g.Use(cors.New(cors.Config{
	// 	AllowOrigins:     []string{"*"},
	// 	AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
	// 	AllowHeaders:     []string{"Origin", "Content-Type"},
	// 	ExposeHeaders:    []string{"Content-Length"},
	// 	AllowCredentials: true,
	// 	MaxAge:           12 * time.Hour,
	// }))
}
