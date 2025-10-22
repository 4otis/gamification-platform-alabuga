// shared/avatar/avatarComposer.js

// Порядок отрисовки слоев (должен соответствовать type_id с сервера)
const LAYER_ORDER = {
  0: 0, // background
  1: 1, // body
  2: 2, // clothes
  3: 3, // eyes
  4: 4, // mouth
  5: 5, // hair
  6: 6  // accessories
};

class AvatarComposer {
  constructor() {
    this.cache = new Map(); // Кэш для собранных аватаров
  }

  // Основная функция для получения аватара
  async getAvatar(studentId) {
    const cacheKey = `avatar_${studentId}`;
    
    // Проверяем кэш
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // 1. Получаем данные с сервера
      const avatarData = await this.fetchAvatarData(studentId);
      
      // 2. Собираем слои в правильном порядке
      const avatarLayers = this.composeAvatarLayers(avatarData);
      
      // 3. Создаем финальное изображение
      const avatarImage = await this.renderAvatar(avatarLayers);
      
      // 4. Кэшируем результат
      this.cache.set(cacheKey, avatarImage);
      
      return avatarImage;
    } catch (error) {
      console.error('Error composing avatar:', error);
      throw error;
    }
  }

  // Запрос к серверу за данными
  async fetchAvatarData(studentId) {
    const response = await fetch(`/api/avatar-data/${studentId}`);
    if (!response.ok) throw new Error('Failed to fetch avatar data');
    return await response.json();
  }

  // Композиция слоев
  composeAvatarLayers(avatarData) {
    const { profile, items } = avatarData;
    
    // Создаем карту всех предметов для быстрого доступа
    const itemsMap = new Map(items.map(item => [item.file_path, item]));
    
    // Сортируем экипированные предметы по порядку слоев
    return profile.equiped_items
      .map(item => ({
        ...item,
        zIndex: LAYER_ORDER[item.type_id] || 0
      }))
      .sort((a, b) => a.zIndex - b.zIndex)
      .map(item => item.file_path);
  }

  // Рендер аватара (возвращает URL blob или Promise с изображением)
  async renderAvatar(layers) {
    // Создаем временный canvas для композиции
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Устанавливаем размеры (можно настроить под ваши требования)
    canvas.width = 200;
    canvas.height = 200;

    // Очищаем canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Загружаем и рисуем каждый слой последовательно
    for (const layerPath of layers) {
      await this.drawLayer(ctx, layerPath, canvas.width, canvas.height);
    }

    // Возвращаем как Data URL (можно оптимизировать под ваши нужды)
    return canvas.toDataURL('image/png');
  }

  // Загрузка и отрисовка одного слоя
  drawLayer(ctx, imagePath, width, height) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        resolve();
      };
      img.onerror = reject;
      img.src = imagePath;
    });
  }

  // Очистка кэша (например, при выходе пользователя)
  clearCache(studentId = null) {
    if (studentId) {
      this.cache.delete(`avatar_${studentId}`);
    } else {
      this.cache.clear();
    }
  }
}

// Создаем синглтон экземпляр
export const avatarComposer = new AvatarComposer();