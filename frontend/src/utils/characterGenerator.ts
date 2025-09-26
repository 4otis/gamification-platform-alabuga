// Система генерации уникальных персонажей
export interface CharacterParts {
  body: string;
  mouth: string;
  nose: string;
  eyes: string;
  eyebrows: string;
  hair: string;
}

// Доступные части персонажа
const CHARACTER_PARTS = {
  body: ['туловище.png'],
  mouth: ['рот1.png', 'рот2.png', 'рот3.png', 'рот4.png'],
  nose: ['нос1.png', 'нос2.png'],
  eyes: ['глаза1.png', 'глаза2.png', 'глаза3.png', 'глаза4.png'],
  eyebrows: ['брови1.png', 'брови2.png', 'брови3.png', 'брови4.png'],
  hair: ['волосы1.png', 'волосы2.png']
};

// Проверяем, что все части существуют
const validateParts = (parts: CharacterParts): CharacterParts => {
  const validatedParts = { ...parts };
  
  // Убеждаемся, что все части имеют значения
  if (!validatedParts.mouth) {
    validatedParts.mouth = CHARACTER_PARTS.mouth[0];
  }
  if (!validatedParts.nose) {
    validatedParts.nose = CHARACTER_PARTS.nose[0];
  }
  if (!validatedParts.eyes) {
    validatedParts.eyes = CHARACTER_PARTS.eyes[0];
  }
  if (!validatedParts.eyebrows) {
    validatedParts.eyebrows = CHARACTER_PARTS.eyebrows[0];
  }
  if (!validatedParts.hair) {
    validatedParts.hair = CHARACTER_PARTS.hair[0];
  }
  
  return validatedParts;
};

// Генерирует случайные части персонажа
export const generateRandomCharacter = (): CharacterParts => {
  const getRandomPart = (parts: string[]) => 
    parts[Math.floor(Math.random() * parts.length)];

  const parts = {
    body: getRandomPart(CHARACTER_PARTS.body),
    mouth: getRandomPart(CHARACTER_PARTS.mouth),
    nose: getRandomPart(CHARACTER_PARTS.nose),
    eyes: getRandomPart(CHARACTER_PARTS.eyes),
    eyebrows: getRandomPart(CHARACTER_PARTS.eyebrows),
    hair: getRandomPart(CHARACTER_PARTS.hair)
  };

  const validatedParts = validateParts(parts);
  
  // Отладочная информация
  console.log('Generated character parts:', validatedParts);
  
  return validatedParts;
};

// Создает пути к изображениям
export const getCharacterImagePaths = (parts: CharacterParts) => {
  const basePath = '/src/sprite/человек/';
  return {
    body: `${basePath}${parts.body}`,
    mouth: `${basePath}рот/${parts.mouth}`,
    nose: `${basePath}нос/${parts.nose}`,
    eyes: `${basePath}глаза/${parts.eyes}`,
    eyebrows: `${basePath}брови/${parts.eyebrows}`,
    hair: `${basePath}волосы/${parts.hair}`
  };
};
