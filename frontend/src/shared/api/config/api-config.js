export const API_CONFIG = {
  // Базовый URL нашего API
  BASE_URL: 'http://localhost:8080',
  TIMEOUT: 10000,
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    // Позже можно добавить: 'Authorization': `Bearer ${token}`
  }
};

/**
 * Вспомогательная функция для создания полного URL
 * @param {string} endpoint - endpoint API (например: '/student/2/profile')
 * @returns {string} Полный URL
 */
export const getApiUrl = (endpoint) => {
  // Убираем лишние слеши, чтобы избежать дублирования
  return `${API_CONFIG.BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};