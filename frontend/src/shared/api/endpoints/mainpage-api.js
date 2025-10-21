import { httpClient } from '../client/http-client';

class MainPageApi {
  /**
   * Получить профиль студента
   * @param {number} studentId - ID студента
   * @returns {Promise} Promise с данными профиля
   */
  async getMainPage(studentId) {
    // Используем наш httpClient вместо прямого fetch
    return httpClient.get(`/student/${studentId}/main`);
  }

  /**
   * Обновить профиль студента
   * @param {number} studentId - ID студента
   * @param {Object} profileData - данные профиля
   * @returns {Promise} Promise с обновленными данными
   */
  async updateMainPage(studentId, profileData) {
    return httpClient.post(`/student/${studentId}/main`, profileData);
  }

  // Позже можно добавить другие методы:
  // async getGrades(studentId) { ... }
  // async getCourses(studentId) { ... }
}

// Создаем и экспортируем экземпляр API
export const mainPageApi = new MainPageApi();