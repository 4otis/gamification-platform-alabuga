import React, { useState, useRef, useCallback, useEffect } from 'react';
import './MissionMap.css';

const MissionMap = ({ stages = [], containerHeight = 450 }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  
  const containerRef = useRef(null);
  const backgroundRef = useRef(null);

  // Эффект для получения реальных размеров контейнера
  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };

    updateContainerSize();
    
    const resizeObserver = new ResizeObserver(updateContainerSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Расчет размеров фонового пространства на основе реальных размеров
  const backgroundWidth = containerSize.width * 1.5;
  const backgroundHeight = containerSize.height * 1.5;
  
  // Ограничение перемещения фона
  const maxX = backgroundWidth - containerSize.width;
  const maxY = backgroundHeight - containerSize.height;

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
      y: 30 + (Math.random()) * 10   // ±10px по Y
    };
  };

  // Расчет позиции флажка на этапе (вертикальное расположение)
  const getMissionPosition = (stageIndex, missionIndex, totalMissionsInStage) => {
    if (containerSize.width === 0 || backgroundHeight === 0) {
      return { x: 0, y: 0 };
    }

    // Высота каждого этапа
    const stageHeight = backgroundHeight / stages.length;
    
    // Позиция этапа по Y
    const stageTop = 0;
    
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
        height: containerHeight,
        width: '100%' // Добавляем 100% ширину
      }}
      ref={containerRef}
    >
      {containerSize.width > 0 && (
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
                        <div className="cource-mission-description">
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
      )}
      
      {/* Границы видимой области */}
      <div className="viewport-border" />
      
      {/* Информация о перетаскивании */}
      
      <div className="drag-hint">
        Зажмите и перетащите фон для перемещения по карте
      </div>
    </div>
  );
};

export default MissionMap;