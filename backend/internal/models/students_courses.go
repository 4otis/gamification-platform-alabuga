package models

type StudentsCourses struct {
	ID        uint `json:"id"`
	studentID uint `json:"student_id"`
	courseID  uint `json:"course_id"`
}