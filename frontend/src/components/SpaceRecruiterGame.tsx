import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Candidate, GameState, GameStats } from '../types/game';
import { generateCandidates, getRandomCandidate } from '../data/candidates';
import CharacterDisplay from './CharacterDisplay';

// Импорты спрайтов
const backgroundImage = '/src/sprite/фон.png';
const tabletImage = '/src/sprite/планешет.png';
const checkIcon = '/src/sprite/галочка.png';
const crossIcon = '/src/sprite/крест.png';

const slideInFromBottom = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOutToBottom = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const GameContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 100vh;
    height: 100dvh; /* Для мобильных браузеров */
  }
`;

const GameArea = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const TabletContainer = styled.div<{ isVisible: boolean; isLeaving: boolean }>`
  position: absolute;
  bottom: 0;
  right: 32%;
  width: 80%;
  max-width: 600px;
  aspect-ratio: 3/4;
  background-image: url(${tabletImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  z-index: 10;

  animation: ${props => {
    if (props.isLeaving) return slideOutToBottom;
    if (props.isVisible) return slideInFromBottom;
    return 'none';
  }} 1.2s cubic-bezier(0.4, 0.0, 0.2, 1);

  @media (max-width: 768px) {
    width: 95%;
    min-height: 500px;
    right: 15%;
  }

  @media (max-width: 480px) {
    width: 98%;
    min-height: 450px;
    right: 15%;
  }
`;


const FormContainer = styled.div`
  position: absolute;
  top: calc(50% - 80px); /* 494px от верха изображения - 457px (центр) = -37px, но с учетом масштабирования */
  left: calc(50% + 90px); /* 425px от левого края - 376px (центр) = 49px */
  transform: translate(-50%, -50%);
  width: 280px;
  height: 350px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: 'Press Start 2P', 'Courier New', monospace;
  font-size: 14px;
  color: #000080;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 15px;
  box-sizing: border-box;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    gap: 6px;
    font-size: 12px;
    width: 200px;
    height: 300px;
    padding: 12px;
    top: calc(50% - 200px);
    left: calc(50% + 45px);
  }
  
  @media (max-width: 480px) {
    gap: 4px;
    font-size: 10px;
    width: 180px;
    height: 250px;
    padding: 10px;
    top: calc(50% - 50px);
    left: calc(50% + 60px);
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 6px;
  
  @media (max-width: 480px) {
    margin-bottom: 4px;
  }
`;

const FieldLabel = styled.label`
  font-family: 'Press Start 2P', 'Courier New', monospace;
  font-weight: bold;
  color: #000080;
  margin-bottom: 4px;
  font-size: 12px;
  
  @media (max-width: 768px) {
    font-size: 10px;
  }
  
  @media (max-width: 480px) {
    font-size: 8px;
  }
`;

const FieldValue = styled.div<{ hasAnomaly?: boolean }>`
  background: rgba(240, 240, 240, 0.9);
  border: 2px solid #000080;
  border-radius: 0;
  padding: 6px 8px;
  font-family: 'Press Start 2P', 'Courier New', monospace;
  font-size: 11px;
  line-height: 1.4;
  min-height: 24px;
  display: flex;
  align-items: flex-start;
  color: #000080;
  word-wrap: break-word;
  word-break: break-all;
  overflow-wrap: break-word;
  white-space: normal;
  overflow: hidden;
  
  @media (max-width: 768px) {
    font-size: 9px;
    padding: 4px 6px;
    min-height: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 7px;
    padding: 3px 5px;
    min-height: 18px;
    line-height: 1.3;
  }
`;

const DecisionButtons = styled.div`
  position: absolute;
  top: calc(50% + 100px); /* В нижней части планшета */
  left: calc(50% + 80px); /* Центрированы относительно планшета */
  transform: translateX(-50%);
  display: flex;
  gap: 60px;
  z-index: 15;
  
  @media (max-width: 768px) {
    gap: 50px;
    top: calc(50% + 60px);
    left: calc(50% + 45px);
  }
  
  @media (max-width: 480px) {
    gap: 40px;
    top: calc(50% + 75px);
    left: calc(50% + 55px);
  }
`;

const DecisionButton = styled.button<{ decisionType: 'hire' | 'reject' }>`
  width: 50px;
  height: 50px;
  background-image: url(${props => props.decisionType === 'hire' ? checkIcon : crossIcon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 50%;
  
  &:hover {
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  }
  
  &:active {
    opacity: 0.8;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
`;

const GameStatsContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0,0,0,0.9);
  color: #00ff00;
  padding: 15px;
  border: 2px solid #00ff00;
  border-radius: 0;
  font-family: 'Press Start 2P', 'Courier New', monospace;
  font-size: 12px;
  min-width: 200px;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
    padding: 10px;
    font-size: 10px;
    min-width: 150px;
  }
  
  @media (max-width: 480px) {
    position: fixed;
    top: 5px;
    right: 5px;
    left: 5px;
    padding: 8px;
    font-size: 8px;
    min-width: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    
    > div {
      margin: 2px 5px;
    }
  }
`;

const ResultModal = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  display: ${props => props.isVisible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ResultContent = styled.div`
  background: #000;
  padding: 30px;
  border: 3px solid #00ff00;
  border-radius: 0;
  text-align: center;
  max-width: 500px;
  margin: 20px;
  font-family: 'Press Start 2P', 'Courier New', monospace;
  color: #00ff00;
  
  h2 {
    font-family: 'Press Start 2P', 'Courier New', monospace;
    color: #00ff00;
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  h3 {
    font-family: 'Press Start 2P', 'Courier New', monospace;
    color: #00ff00;
    font-size: 14px;
    margin: 15px 0 10px 0;
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    margin: 15px;
    max-width: 90%;
    
    h2 {
      font-size: 14px;
    }
    
    h3 {
      font-size: 12px;
    }
  }
  
  @media (max-width: 480px) {
    padding: 15px;
    margin: 10px;
    max-width: 95%;
    
    h2 {
      font-size: 12px;
    }
    
    h3 {
      font-size: 10px;
    }
  }
`;

const AnomalyList = styled.div`
  margin: 15px 0;
  text-align: left;
  
  @media (max-width: 480px) {
    margin: 10px 0;
  }
`;

const AnomalyItem = styled.div<{ severity: 'low' | 'medium' | 'high' }>`
  padding: 8px 12px;
  margin: 8px 0;
  border-radius: 0;
  background: ${props => 
    props.severity === 'high' ? 'rgba(255, 0, 0, 0.2)' : 
    props.severity === 'medium' ? 'rgba(255, 165, 0, 0.2)' : 'rgba(0, 255, 0, 0.2)'
  };
  border: 2px solid ${props => 
    props.severity === 'high' ? '#ff0000' : 
    props.severity === 'medium' ? '#ffa500' : '#00ff00'
  };
  font-family: 'Press Start 2P', 'Courier New', monospace;
  font-size: 10px;
  color: ${props => 
    props.severity === 'high' ? '#ff0000' : 
    props.severity === 'medium' ? '#ffa500' : '#00ff00'
  };
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 9px;
    padding: 6px 10px;
  }
  
  @media (max-width: 480px) {
    font-size: 8px;
    padding: 4px 8px;
    margin: 4px 0;
  }
`;

const SpaceRecruiterGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentCandidate: null,
    score: 0,
    correctDecisions: 0,
    wrongDecisions: 0,
    totalCandidates: 0,
    gamePhase: 'characterEntering',
    revealedMimic: false,
    showTablet: false,
    characterLeaving: false,
    lastDecision: null,
    characterEntered: false
  });

  const [candidates] = useState<Candidate[]>(generateCandidates());
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    startNewInterview();
  }, []);

  const startNewInterview = () => {
    const newCandidate = getRandomCandidate(candidates);
    setGameState(prev => ({
      ...prev,
      currentCandidate: newCandidate,
      gamePhase: 'characterEntering',
      revealedMimic: false,
      showTablet: false,
      characterLeaving: false,
      lastDecision: null,
      characterEntered: false,
      totalCandidates: prev.totalCandidates + 1
    }));
    setShowResult(false);
    
    // Переход к состоянию ожидания после входа персонажа
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        gamePhase: 'characterWaiting',
        characterEntered: true
      }));
    }, 1000);
  };

  const openTablet = () => {
    if (gameState.gamePhase === 'characterWaiting') {
      setGameState(prev => ({
        ...prev,
        gamePhase: 'tabletOpen',
        showTablet: true
      }));
    }
  };

  const makeDecision = (decision: 'hire' | 'reject') => {
    if (!gameState.currentCandidate) return;

    const isCorrect = decision === 'reject' ? gameState.currentCandidate.isMimic : !gameState.currentCandidate.isMimic;
    
    setGameState(prev => ({
      ...prev,
      gamePhase: 'tabletClosing',
      lastDecision: decision,
      score: prev.score + (isCorrect ? 100 : -50),
      correctDecisions: prev.correctDecisions + (isCorrect ? 1 : 0),
      wrongDecisions: prev.wrongDecisions + (isCorrect ? 0 : 1)
    }));
    
    // Убираем планшет через 0.5 секунды (задержка перед началом анимации скрытия)
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        gamePhase: 'characterReveal'
      }));
      
      // Полностью скрываем планшет после анимации
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          showTablet: false
        }));
      }, 1200); // Время анимации slideOutToBottom
      
      // Показываем настоящее лицо мимика после скрытия планшета
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          revealedMimic: prev.currentCandidate?.isMimic || false
        }));
        
        // Показываем результат через 1 секунду (было 2000ms)
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            gamePhase: 'result'
          }));
          setShowResult(true);
          
          // Начинаем уход персонажа через 2 секунды (было 3000ms)
          setTimeout(() => {
            setGameState(prev => ({
              ...prev,
              gamePhase: 'characterLeaving',
              characterLeaving: true
            }));
            
            // Показываем нового персонажа через 1 секунду (остается 1000ms)
            setTimeout(() => {
              startNewInterview();
            }, 1000);
          }, 1000); // Время показа модального окна с результатом
        }, 500); // Время показа настоящего лица мимика
      }, 1200); // Время анимации скрытия планшета (slideOutToBottom)
    }, 500); // Задержка перед началом анимации скрытия планшета
  };

  const getAnomaliesForField = (fieldType: string) => {
    if (!gameState.currentCandidate) return [];
    return gameState.currentCandidate.anomalies.filter(anomaly => anomaly.type === fieldType);
  };

  const hasAnomaly = (fieldType: string) => {
    return getAnomaliesForField(fieldType).length > 0;
  };

  const getStats = (): GameStats => {
    const total = gameState.correctDecisions + gameState.wrongDecisions;
    return {
      totalScore: gameState.score,
      accuracy: total > 0 ? Math.round((gameState.correctDecisions / total) * 100) : 0,
      mimicsCaught: gameState.correctDecisions,
      humansHired: gameState.correctDecisions,
      humansRejected: gameState.wrongDecisions
    };
  };

  const stats = getStats();

  if (!gameState.currentCandidate) {
    return <div>Загрузка...</div>;
  }

  return (
    <GameContainer>
      <GameArea>
        {/* Персонаж */}
        {gameState.currentCandidate && gameState.currentCandidate.characterParts && (
          <CharacterDisplay
            characterParts={gameState.currentCandidate.characterParts}
            isVisible={gameState.gamePhase === 'characterEntering' || gameState.characterEntered}
            isLeaving={gameState.characterLeaving}
            isRevealed={gameState.revealedMimic}
            position={gameState.characterLeaving ? 'right' : 'center'}
            hasEntered={gameState.characterEntered}
            onClick={gameState.gamePhase === 'characterWaiting' ? openTablet : undefined}
          />
        )}

        {/* Планшет */}
        {gameState.showTablet && gameState.currentCandidate && (gameState.gamePhase === 'tabletOpen' || gameState.gamePhase === 'tabletClosing') && (
          <TabletContainer isVisible={gameState.gamePhase === 'tabletOpen'} isLeaving={gameState.gamePhase === 'tabletClosing'}>
            <FormContainer>
              <FormField>
                <FieldLabel>Имя и Фамилия:</FieldLabel>
                <FieldValue hasAnomaly={hasAnomaly('name')}>
                  {gameState.currentCandidate.name}
                </FieldValue>
              </FormField>

              <FormField>
                <FieldLabel>Возраст:</FieldLabel>
                <FieldValue hasAnomaly={hasAnomaly('age')}>
                  {gameState.currentCandidate.age} лет
                </FieldValue>
              </FormField>

              <FormField>
                <FieldLabel>Планета рождения:</FieldLabel>
                <FieldValue hasAnomaly={hasAnomaly('birthPlanet')}>
                  {gameState.currentCandidate.birthPlanet}
                </FieldValue>
              </FormField>

              <FormField>
                <FieldLabel>Дата рождения:</FieldLabel>
                <FieldValue hasAnomaly={hasAnomaly('birthDate')}>
                  {gameState.currentCandidate.birthDate}
                </FieldValue>
              </FormField>

              <FormField>
                <FieldLabel>Должность:</FieldLabel>
                <FieldValue hasAnomaly={hasAnomaly('position')}>
                  {gameState.currentCandidate.position}
                </FieldValue>
              </FormField>

              <FormField>
                <FieldLabel>Предыдущее место работы:</FieldLabel>
                <FieldValue>
                  {gameState.currentCandidate.previousWorkplace}
                </FieldValue>
              </FormField>

              <FormField>
                <FieldLabel>Обязанности:</FieldLabel>
                <FieldValue hasAnomaly={hasAnomaly('responsibilities')}>
                  {gameState.currentCandidate.responsibilities}
                </FieldValue>
              </FormField>

              <FormField>
                <FieldLabel>Хобби:</FieldLabel>
                <FieldValue hasAnomaly={hasAnomaly('hobbies')}>
                  {gameState.currentCandidate.hobbies}
                </FieldValue>
              </FormField>

              <FormField>
                <FieldLabel>Контактная информация:</FieldLabel>
                <FieldValue hasAnomaly={hasAnomaly('contact')}>
                  {gameState.currentCandidate.contact}
                </FieldValue>
              </FormField>
            </FormContainer>

            {gameState.gamePhase === 'tabletOpen' && (
              <DecisionButtons>
                <DecisionButton 
                  decisionType="reject" 
                  onClick={() => makeDecision('reject')}
                  title="Отклонить кандидата"
                />
                <DecisionButton 
                  decisionType="hire" 
                  onClick={() => makeDecision('hire')}
                  title="Нанять кандидата"
                />
              </DecisionButtons>
            )}
          </TabletContainer>
        )}

        <GameStatsContainer>
          <div>Очки: {stats.totalScore}</div>
          <div>Точность: {stats.accuracy}%</div>
          <div>Правильных решений: {stats.mimicsCaught}</div>
          <div>Неправильных: {stats.humansRejected}</div>
        </GameStatsContainer>
      </GameArea>

      <ResultModal isVisible={showResult && gameState.gamePhase === 'result'}>
        <ResultContent>
          <h2>
            {gameState.lastDecision === 'reject' && gameState.currentCandidate?.isMimic ? 
              'Правильно! Мимик обнаружен!' :
              gameState.lastDecision === 'hire' && !gameState.currentCandidate?.isMimic ?
              'Правильно! Ценный кадр нанят!' :
              gameState.lastDecision === 'reject' && !gameState.currentCandidate?.isMimic ?
              'Ошибка! Вы отклонили человека!' :
              'Катастрофа! Мимик проник на корабль!'
            }
          </h2>
          
          {gameState.currentCandidate?.anomalies && gameState.currentCandidate.anomalies.length > 0 && (
            <div>
              <h3>Обнаруженные аномалии:</h3>
              <AnomalyList>
                {gameState.currentCandidate.anomalies.map((anomaly, index) => (
                  <AnomalyItem key={index} severity={anomaly.severity}>
                    <strong>{anomaly.type}:</strong> {anomaly.description}
                  </AnomalyItem>
                ))}
              </AnomalyList>
            </div>
          )}
        </ResultContent>
      </ResultModal>
    </GameContainer>
  );
};

export default SpaceRecruiterGame;
