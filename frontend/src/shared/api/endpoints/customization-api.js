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

  async patchCustomisation(studentId, updateData){
    return httpClient.patch(`/student/${studentId}/inventory/equip`, updateData);
  }
}

// Создаем и экспортируем экземпляр API
export const customisationApi = new CustomisationApi();