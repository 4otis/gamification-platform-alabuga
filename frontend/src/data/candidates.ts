import { Candidate, Anomaly } from '../types/game';
import { generateRandomCharacter } from '../utils/characterGenerator';

// Генерируем кандидатов с различными аномалиями
export const generateCandidates = (): Candidate[] => {
  return [
    // Мимик с множественными аномалиями
    {
      id: '1',
      name: 'Карл Джонсон',
      age: 24,
      birthPlanet: 'Марс',
      birthDate: '32.06.2001', // Аномалия: 32 июня не существует
      position: 'Инженер по жизнеобеспечению',
      previousWorkplace: 'Лунная база "Серенити"',
      responsibilities: 'Приготовление еды для экипажа', // Аномалия: не соответствует профессии
      hobbies: 'Шахматы и фотография',
      contact: 'carl.johnson@mars.ter',
      appearance: 'disguised',
      isMimic: true,
      anomalies: [
        { type: 'birthDate', description: 'Невозможная дата рождения (32 июня)', severity: 'high' },
        { type: 'responsibilities', description: 'Обязанности не соответствуют профессии инженера', severity: 'medium' },
        { type: 'appearance', description: 'Красные глаза при осмотре', severity: 'high' }
      ]
    },
    
    // Обычный человек без аномалий
    {
      id: '2',
      name: 'Сара Мейер',
      age: 26,
      birthPlanet: 'Земля (Европа-Сектор)',
      birthDate: '14.03.1999',
      position: 'Инженер по системам связи',
      previousWorkplace: 'Орбитальная станция "Горизонт-7"',
      responsibilities: 'Обслуживание и ремонт коммуникационного оборудования, обеспечение стабильной связи с Землей и другими кораблями',
      hobbies: 'Бег на беговой дорожке и просмотр классических фильмов 21 века',
      contact: 's.meyer.hz7@earthcom.ter',
      appearance: 'normal',
      isMimic: false,
      anomalies: []
    },

    // Мимик с аномалиями в имени и хобби
    {
      id: '3',
      name: 'Xqr\'tylbn Zyxwvut',
      age: 28,
      birthPlanet: 'Земля (Азия-Сектор)',
      birthDate: '15.08.1997',
      position: 'Пилот-навигатор',
      previousWorkplace: 'Космический порт "Альфа-Центавра"',
      responsibilities: 'Управление навигационными системами, планирование маршрутов, контроль полетных параметров',
      hobbies: 'Коллекционирование образцов земной флоры и фауны (особенно костной ткани)',
      contact: 'xqr.tylbn@alpha.ter',
      appearance: 'disguised',
      isMimic: true,
      anomalies: [
        { type: 'name', description: 'Невероятно сложное и бессмысленное имя', severity: 'high' },
        { type: 'hobbies', description: 'Откровенно инопланетные увлечения', severity: 'high' }
      ]
    },

    // Мимик с аномалиями в возрасте и контактах
    {
      id: '4',
      name: 'Иван Иванов Иванович',
      age: 150, // Аномалия: невозможный возраст
      birthPlanet: 'Зета-Сетки IV', // Аномалия: мифическая планета
      birthDate: '01.01.1875',
      position: 'Медицинский техник',
      previousWorkplace: 'Госпиталь "Новая Земля"',
      responsibilities: 'Обслуживание медицинского оборудования, помощь врачам в операциях',
      hobbies: 'Социализация, потребление питательных веществ, отдых',
      contact: 'alien@gmail.com', // Аномалия: подозрительная почта
      appearance: 'disguised',
      isMimic: true,
      anomalies: [
        { type: 'age', description: 'Невозможный возраст для стандартного колониста', severity: 'high' },
        { type: 'birthPlanet', description: 'Указана мифическая планета', severity: 'high' },
        { type: 'name', description: 'Слишком шаблонное имя из учебников', severity: 'medium' },
        { type: 'hobbies', description: 'Слишком общие и бездушные ответы', severity: 'medium' },
        { type: 'contact', description: 'Подозрительная почта с упоминанием инопланетного', severity: 'high' }
      ]
    },

    // Обычный человек
    {
      id: '5',
      name: 'Алексей Петров',
      age: 33,
      birthPlanet: 'Земля (Россия-Сектор)',
      birthDate: '22.11.1992',
      position: 'Инженер-механик',
      previousWorkplace: 'Космическая станция "Мир-2"',
      responsibilities: 'Техническое обслуживание двигательных систем, ремонт механического оборудования',
      hobbies: 'Шахматы, чтение научной фантастики, игра на гитаре',
      contact: 'a.petrov.mir2@earthcom.ter',
      appearance: 'normal',
      isMimic: false,
      anomalies: []
    },

    // Мимик с аномалиями в дате и обязанностях
    {
      id: '6',
      name: 'Мария Сидорова',
      age: 25,
      birthPlanet: 'Земля (Америка-Сектор)',
      birthDate: '29.02.2000', // Високосный год, но выглядит подозрительно
      position: 'Шеф-повар',
      previousWorkplace: 'Ресторан "Звездный путь"',
      responsibilities: 'Отвечал за обслуживание реактора и уничтожение человечества', // Аномалия!
      hobbies: 'Классическая музыка (особенно звуки работы дренажного насоса)',
      contact: 'm.sidorova@starway.ter',
      appearance: 'disguised',
      isMimic: true,
      anomalies: [
        { type: 'position', description: 'Должность не соответствует навыкам для вакансии', severity: 'high' },
        { type: 'responsibilities', description: 'Странная фраза в обязанностях', severity: 'high' },
        { type: 'hobbies', description: 'Странные детали в увлечениях', severity: 'medium' }
      ]
    }
  ];
};

export const getRandomCandidate = (candidates: Candidate[]): Candidate => {
  const randomIndex = Math.floor(Math.random() * candidates.length);
  const candidate = candidates[randomIndex];
  
  // Добавляем случайные части персонажа
  const characterParts = generateRandomCharacter();
  
  return {
    ...candidate,
    characterParts
  };
};
