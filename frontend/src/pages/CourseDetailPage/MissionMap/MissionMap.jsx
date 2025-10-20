import React, { useState, useRef, useCallback, useEffect } from 'react';
import './MissionMap.css';

const MissionMap = ({ stages = [], containerWidth = 800, containerHeight = 450 }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const containerRef = useRef(null);
  const backgroundRef = useRef(null);

  // Расчет размеров фонового пространства
  const backgroundWidth = containerWidth * 1.5;
  const backgroundHeight = containerHeight * 1.5;
  
  // Ограничение перемещения фона
  const maxX = backgroundWidth - containerWidth;
  const maxY = backgroundHeight - containerHeight;

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return; // Только левая кнопка мыши
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    
    e.preventDefault();
  }, [position]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Ограничение перемещения в пределах фона
    const constrainedX = Math.max(-maxX, Math.min(0, newX));
    const constrainedY = Math.max(-maxY, Math.min(0, newY));
    
    setPosition({ 
      x: constrainedX, 
      y: constrainedY 
    });
  }, [isDragging, dragStart, maxX, maxY]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Добавляем обработчики событий
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      handleMouseMove(e);
    };

    const handleGlobalMouseUp = () => {
      handleMouseUp();
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.body.style.cursor = 'grabbing';
    } else {
      document.body.style.cursor = 'default';
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.body.style.cursor = 'default';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Функция для генерации случайного смещения флажка
  const getRandomOffset = () => {
    return {
      x: (Math.random() - 0.5) * 30,  // ±15px по X
      y: 30+(Math.random()) * 10   // ±10px по Y
    };
  };

  // Расчет позиции флажка на этапе (вертикальное расположение)
  const getMissionPosition = (stageIndex, missionIndex, totalMissionsInStage) => {
    // Высота каждого этапа
    const stageHeight =  backgroundHeight / stages.length 
    
    // Позиция этапа по Y
    const stageTop =  0;
    
    // Центр этапа по вертикали
    const stageCenterY = stageTop + stageHeight / 2;
    
    // Распределяем миссии по всей ширине этапа
    const missionSpacing = backgroundWidth / (totalMissionsInStage + 1);
    const baseX = missionSpacing * (missionIndex + 1);
    
    // Базовое положение по Y - в центре этапа
    const baseY = stageCenterY;
    
    const randomOffset = getRandomOffset();
    
    return {
      x: baseX + randomOffset.x,
      y: baseY + randomOffset.y
    };
  };

  return (
    <div 
      className="mission-map-container"
      style={{
        width: containerWidth,
        height: containerHeight
      }}
      ref={containerRef}
    >
      <div 
        className="mission-map-background"
        ref={backgroundRef}
        style={{
          width: backgroundWidth,
          height: backgroundHeight,
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Визуализация этапов (вертикально) */}
        {stages.map((stage, stageIndex) => (
          <div 
            key={stage.id || stageIndex}
            className="stage-area vertical"
            style={{
              top: (stageIndex * backgroundHeight) / stages.length,
              width: backgroundWidth,
              height: backgroundHeight / stages.length
            }}
          >
            <div className="stage-label vertical">
              {stage.name || `Этап ${stageIndex + 1}`}
            </div>
            
            {/* Флажки миссий */}
            {stage.missions?.map((mission, missionIndex) => {
              const missionPos = getMissionPosition(
                stageIndex, 
                missionIndex, 
                stage.missions.length
              );
              
              return (
                <div
                  key={mission.id || missionIndex}
                  className={`mission-flag ${mission.completed ? 'completed' : ''} ${mission.current ? 'current' : ''}`}
                  style={{
                    left: missionPos.x,
                    top: missionPos.y
                  }}
                  title={mission.name || `Миссия ${missionIndex + 1}`}
                >
                  <div className="flag-pole"></div>
                  <div className="flag">
                    {missionIndex + 1}
                  </div>
                  <div className="mission-tooltip">
                    {mission.name || `Миссия ${missionIndex + 1}`}
                    {mission.description && (
                      <div className="mission-description">
                        {mission.description}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        
        {/* Вспомогательная сетка */}
        <div className="background-grid" />
        
        {/* Центральная метка для ориентира */}
        <div 
          className="center-marker"
          style={{
            left: backgroundWidth / 2,
            top: backgroundHeight / 2
          }}
        />
      </div>
      
      {/* Границы видимой области */}
      <div className="viewport-border" />
      
      {/* Информация о перетаскивании */}
      <div className="drag-hint">
        Зажмите и перетащите фон для перемещения по карте
      </div>
      
      {/* Индикатор положения */}
      <div className="position-indicator">
        Положение: {Math.round(-position.x)}px, {Math.round(-position.y)}px
      </div>
    </div>
  );
};

// Компонент по умолчанию с демо-данными
const MissionMapWithDemo = (props) => {
  const demoStages = [
    {
      id: 1,
      name: "Начальный этап",
      missions: [
        { id: 1, name: "Знакомство", description: "Познакомьтесь с системой", completed: true },
        { id: 2, name: "Обучение", description: "Пройдите обучение", completed: true },
        { id: 3, name: "Первая задача", description: "Выполните первую задачу", current: true },
        { id: 4, name: "Базовые настройки", description: "Настройте профиль", completed: true }
      ]
    },
    {
      id: 2,
      name: "Развитие навыков",
      missions: [
        { id: 5, name: "Исследование", description: "Исследуйте возможности" },
        { id: 6, name: "Эксперименты", description: "Проведите эксперименты" },
        { id: 7, name: "Практика", description: "Закрепите навыки" }
      ]
    },
    {
      id: 3,
      name: "Продвинутый уровень",
      missions: [
        { id: 8, name: "Сложные задачи", description: "Решите сложные задачи" },
        { id: 9, name: "Оптимизация", description: "Оптимизируйте процессы" }
      ]
    },
    {
      id: 4,
      name: "Завершение и сертификация",
      missions: [
        { id: 10, name: "Финальный тест", description: "Пройдите финальный тест" },
        { id: 11, name: "Достижение", description: "Получите достижение" },
        { id: 12, name: "Сертификация", description: "Получите сертификат" }
      ]
    },
  ];

  return <MissionMap stages={demoStages} {...props} />;
};

export default MissionMapWithDemo;