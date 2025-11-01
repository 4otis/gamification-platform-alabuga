import { API_CONFIG, getApiUrl } from '../config/api-config';

class HttpClient {
    /*
    * Базовый метод для выполнения HTTP запросов
    * @param {string} url - endpoint API
    * @param {Object} options - опции fetch
    * @returns {Promise} Promise с данными ответа
    */
    async request(url, options = {}) {
        const fullUrl = getApiUrl(url);

        const headers = {
            ...API_CONFIG.DEFAULT_HEADERS,
            ...options.headers,
        };

        // Создаем конфигурацию запроса с таймаутом
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

        try {
            console.log(`Making request to: ${fullUrl}`);
            
            const response = await fetch(fullUrl, {
                ...options,
                headers,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            console.log(`Response status: ${response.status}`);

            // Проверяем, успешен ли запрос
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }

            // Парсим JSON ответ
            const data = await response.json();
            console.log('Data received:', data);
            
            return data;

        } catch (error) {
            clearTimeout(timeoutId);
            console.error('Request failed:', error);
            
            // Улучшаем сообщение об ошибке
            if (error.name === 'AbortError') {
                throw new Error(`Request timeout: ${API_CONFIG.TIMEOUT}ms`);
            }
            
            throw error;
        }
    }

    /**
     * GET запрос
     * @param {string} url - endpoint
     * @param {Object} options - дополнительные опции
     */
    async get(url, options = {}) {
        return this.request(url, {
            ...options,
            method: 'GET',
        });
    }

    /**
     * POST запрос
     * @param {string} url - endpoint
     * @param {Object} data - данные для отправки
     * @param {Object} options - дополнительные опции
     */
    async post(url, data, options = {}) {
        return this.request(url, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    /**
     * PATCH запрос
     * @param {string} url - endpoint
     * @param {Object} data - данные для обновления
     * @param {Object} options - дополнительные опции
     */
    async patch(url, data, options = {}) {
        return this.request(url, {
            ...options,
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }
}

export const httpClient = new HttpClient();