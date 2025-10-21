import { httpClient } from '../client/http-client';

class StudentProfileApi {
  /**
   * Получить профиль студента
   * @param {number} studentId - ID студента
   * @returns {Promise} Promise с данными профиля
   */
  async getProfile(studentId) {
    // Используем наш httpClient вместо прямого fetch
    return httpClient.get(`/student/${studentId}/profile`);
  }

  /**
   * Обновить профиль студента
   * @param {number} studentId - ID студента
   * @param {Object} profileData - данные профиля
   * @returns {Promise} Promise с обновленными данными
   */
  async updateProfile(studentId, profileData) {
    return httpClient.post(`/student/${studentId}/profile`, profileData);
  }

  // Позже можно добавить другие методы:
  // async getGrades(studentId) { ... }
  // async getCourses(studentId) { ... }
}

// Создаем и экспортируем экземпляр API
export const studentProfileApi = new StudentProfileApi();