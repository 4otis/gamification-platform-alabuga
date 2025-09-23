package dto

type ErrorResponse struct {
	Error   string `json:"error" example:"not_found"`
	Message string `json:"message" example:"Student not found"`
	Details string `json:"details,omitempty" example:"Student with ID 123 not found"`
}

var (
	ErrStudentNotFound = ErrorResponse{
		Error:   "student_not_found",
		Message: "Student not found",
	}

	ErrInvalidID = ErrorResponse{
		Error:   "invalid_id",
		Message: "Invalid ID format",
	}

	ErrInternal = ErrorResponse{
		Error:   "internal_error",
		Message: "Internal server error",
	}
)
