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
	artifactRepo := repository.NewArtifactRepository(db)
	missionRepo := repository.NewMissionRepository(db)
	courseRepo := repository.NewCourseRepository(db)
	itemRepo := repository.NewItemRepository(db)
	itemTypeRepo := repository.NewItemTypeRepository(db)
	studentsMissionsRepo := repository.NewStudentsMissionsRepository(db)
	studentsCoursesRepo := repository.NewStudentsCoursesRepository(db)
	studentsItemsRepo := repository.NewStudentsItemsRepository(db)
	studentsSkillsRepo := repository.NewStudentsSkillsRepository(db)
	missionsSkillsRepo := repository.NewMissionsSkillsRepository(db)
	studentsMerchesRepo := repository.NewStudentsMerchesRepository(db)

	studentService := services.NewStudentService(*studentRepo, *studentRankRepo, *skillRepo, *missionRepo, *studentsMissionsRepo, *studentsCoursesRepo)
	missionService := services.NewMissionService(*missionRepo, *studentRepo, *studentsMissionsRepo, *missionsSkillsRepo, studentService)
	courseService := services.NewCourseService(*courseRepo, *missionRepo, *studentRepo, *studentsCoursesRepo)
	rankingService := services.NewRankingService(*studentRepo, *skillRepo, *artifactRepo, *studentsSkillsRepo)
	inventoryService := services.NewInventoryService(*itemRepo, *itemTypeRepo, *studentsItemsRepo, *studentRepo)
	shopService := services.NewShopService(*studentRepo, *studentsMerchesRepo)
	loggingService := services.NewLoggingService(missionService, rankingService, courseService, shopService)

	mainHandler := student.NewMainHandler(studentService, missionService, courseService, rankingService, inventoryService)
	profileHandler := student.NewProfileHandler(studentService, inventoryService, rankingService, loggingService)
	inventoryHandler := student.NewInventoryHandler(inventoryService, studentService)

	// g.StaticFile("/", "./index.html")
	// g.StaticFile("/index.html", "./index.html")

	g.GET("/student/:student_id/main", mainHandler.GetMainPage)

	g.GET("/student/:student_id/profile", profileHandler.GetProfile)

	// g.GET("/student/profile/items/:student_id", itemsHandler.GetProfile)
	// g.GET("/student/profile/items/:student_id", itemsHandler.GetAllItems)
	// g.GET("/student/profile/items/:student_id", itemsHandler.GetAvailableItems)
	// g.GET("/student/profile/items", itemsHandler.GetItemTypes)
	// g.PATCH("/student/profile/items/:student_id", itemsHandler.EquipItem) // ожидаем пачку

	g.GET("/student/:student_id/inventory", inventoryHandler.GetInventoryPage)
	g.PATCH("/student/:student_id/inventory/equip", inventoryHandler.EquipItem)

	// g.GET("/hr/analytic/courses/", analyticHandler.GetAllCoursesConversion)
	// g.GET("/hr/:hr_id/analytic/courses/", analyticHandler.GetAllCoursesConversionByHRID)
	// g.GET("/hr/analytic/courses/detailed/:course_id", analyticHandler.GetDetailedCourse) // student + course + mission + students_missions + students_courses

	// // курсы
	// g.GET("/student/:student_id/courses", coursesHandler.GetAllCourses) // вообще все курсы (доступные, завершенные, неначатые)
	// g.GET("/student/:student_id/courses/:course_id", coursesHandler.GetCourse)
	// g.POST("/student/:student_id/courses/:course_id/join", coursesHandler.JoinCourse)
	// g.POST("/student/:student_id/missions/:mission_id", missionHandler.CompleteMission)

	// g.GET("/hr/courses/new/artifacts", coursesHandler.GetAllArtifacts)
	// g.GET("/hr/courses/new/ranks", coursesHandler.GetAllRanks)
	// g.POST("/hr/hr_id/courses/new/", coursesHandler.CreateCourse) // course + mission
	// g.PATCH("/hr/hr_id/courses/:course_id/edit", courseHandler.PatchCourse)
	// g.DELETE("/hr/hr_id/courses/:course_id/edit", courseHandler.DeleteCourse)

	// // миссии
	// g.GET("/hr/courses/new/missiontype", coursesHandler.GetAllMissionTypes)
	// g.POST("/hr/:hr_id/courses/:course_id/edit", courseHandler.CreateMission)
	// g.PATCH("/hr/:hr_id/courses/edit/mission_id", courseHandler.PatchMission)
	// g.DELETE("/hr/:hr_id/courses/edit/mission_id", courseHandler.DeleteMission)

	g.GET("/student/:student_id/missions/:mission_id", missionHandler.GetMission)
	g.POST("/student/:student_id/missions/:mission_id", missionHandler.UploadFile)
	g.POST("/student/:student_id/missions/:mission_id", missionHandler.CompleteMission)

	// // ранги + артифакта
	// g.GET("/hr/assets/rarities", coursesHandler.GetAllRarities)
	// g.GET("/hr/assets/itemtype", coursesHandler.GetAllItemTypes)
	// g.POST("/hr/:hr_id/assets/studentrank/new", rankingHandler.CreateRank)
	// g.PATCH("/hr/:hr_id/assets/studentrank/:rank_id/edit", rankingHandler.PatchRank)
	// g.POST("/hr/:hr_id/assets/artifact/new", rankingHandler.CreateArtifact)
	// g.PATCH("/hr/:hr_id/assets/artifact/:artifact_id/edit", rankingHandler.PatchArtifact)
	// g.POST("/hr/:hr_id/assets/rarity/new", rankingHandler.CreateRarity)
	// g.PATCH("/hr/:hr_id/assets/rarity/:rarity_id/edit", rankingHandler.PatchRarity)
	// g.POST("/hr/:hr_id/assets/rarity/new", rankingHandler.CreateRarity)
	// g.PATCH("/hr/:hr_id/assets/rarity/:rarity_id/edit", rankingHandler.PatchRarity)

	// // магазин
	// g.GET("/student/shop/", shopHandler.GetAllMerch)
	// g.POST("/student/shop/order/:merch_id", shopHandler.OrderMerch)

	// g.GET("/hr/shop/report/download", shopHandler.ExportOrdersReport)
	// g.POST("/hr/:hr_id/shop/new", shopHandler.CreateMerch)
	// g.PATCH("/hr/:hr_id/shop/:merch_id/edit", shopHandler.PatchMerch)

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
