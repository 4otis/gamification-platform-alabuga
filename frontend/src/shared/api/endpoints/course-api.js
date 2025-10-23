import { httpClient } from '../client/http-client';

class CourseApi {
  /**
   * Получить профиль студента
   * @param {number} studentId - ID студента
   * @returns {Promise} Promise с данными профиля
   */
  async getDetailCourse(studentId, courseId) {
    // Используем наш httpClient вместо прямого fetch
    return httpClient.get(`/student/${studentId}/courses/${courseId}`);
  }
}

// Создаем и экспортируем экземпляр API
export const courseApi = new CourseApi();