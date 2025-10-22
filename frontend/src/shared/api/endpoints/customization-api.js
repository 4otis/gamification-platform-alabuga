import { httpClient } from '../client/http-client';

class CustomisationApi {
  /**
   * Получить профиль студента
   * @param {number} studentId - ID студента
   * @returns {Promise} Promise с данными профиля
   */
  async getCustomisation(studentId) {
    // Используем наш httpClient вместо прямого fetch
    return httpClient.get(`/student/${studentId}/inventory`);
  }

  /**
   * Обновить профиль студента
   * @param {number} studentId - ID студента
   * @param {Object} customisationData - данные 
   * @returns {Promise} Promise с обновленными данными
   */
  async updateCustomisation(studentId, customisationData) {
    return httpClient.post(`/student/${studentId}/inventory`, customisationData);
  }

  // Позже можно добавить другие методы:
  // async getGrades(studentId) { ... }
  // async getCourses(studentId) { ... }
}

// Создаем и экспортируем экземпляр API
export const customisationApi = new CustomisationApi();