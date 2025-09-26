import React, { useState, useEffect, useCallback, useRef } from 'react'
import styled, { keyframes } from 'styled-components'

// Импорт спрайтов
import spaceShip from '../sprite/space=ship.png'
import monster from '../sprite/monster.png'
import spaceBackground from '../sprite/space-image.jpg'

// Анимации
const moveUp = keyframes`
  from { transform: translateY(100vh); }
  to { transform: translateY(-100px); }
`

const explosion = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.8; }
  100% { transform: scale(2); opacity: 0; }
`

// Стили
const GameContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url(${spaceBackground}) center/cover;
  overflow: hidden;
  cursor: none;
  z-index: 1000;
`

const GameArea = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const SpaceShip = styled.div<{ x: number }>`
  position: absolute;
  width: 60px;
  height: 60px;
  background: url(${spaceShip}) center/contain no-repeat;
  left: ${props => props.x}px;
  bottom: 50px;
  z-index: 10;
  transition: left 0.1s ease;
`

const Monster = styled.div<{ x: number; y: number; isDestroyed: boolean }>`
  position: absolute;
  width: 40px;
  height: 40px;
  background: url(${monster}) center/contain no-repeat;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  z-index: 5;
  animation: ${props => props.isDestroyed ? explosion : moveUp} ${props => props.isDestroyed ? '0.5s' : '3s'} ease-out;
  opacity: ${props => props.isDestroyed ? 0 : 1};
`

const Bullet = styled.div<{ x: number; y: number }>`
  position: absolute;
  width: 4px;
  height: 20px;
  background: linear-gradient(to top, #00ff00, #ffff00);
  border-radius: 2px;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  z-index: 8;
  box-shadow: 0 0 10px #00ff00;
`

const Explosion = styled.div<{ x: number; y: number }>`
  position: absolute;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, #ff4444, #ff8800, transparent);
  border-radius: 50%;
  left: ${props => props.x - 10}px;
  top: ${props => props.y - 10}px;
  z-index: 15;
  animation: ${explosion} 0.5s ease-out forwards;
`

const UI = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  font-family: 'Orbitron', monospace;
  z-index: 20;
  text-shadow: 0 0 10px #00ff00;
`

const GameOverScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: 'Orbitron', monospace;
  z-index: 30;
  text-align: center;
`

const RestartButton = styled.button`
  background: linear-gradient(45deg, #00ff00, #0088ff);
  border: none;
  color: white;
  padding: 15px 30px;
  font-size: 18px;
  font-family: 'Orbitron', monospace;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
  }
`

// Типы
interface Position {
  x: number
  y: number
}

interface Monster extends Position {
  id: number
  isDestroyed: boolean
}

interface Bullet extends Position {
  id: number
}

interface Explosion extends Position {
  id: number
}

const SpaceInvadersGame: React.FC = () => {
  // Состояние игры
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [shipX, setShipX] = useState(400)
  const [monsters, setMonsters] = useState<Monster[]>([])
  const [bullets, setBullets] = useState<Bullet[]>([])
  const [explosions, setExplosions] = useState<Explosion[]>([])
  
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const lastMonsterSpawn = useRef(0)
  const bulletIdRef = useRef(0)
  const monsterIdRef = useRef(0)
  const explosionIdRef = useRef(0)

  // Создание монстра
  const createMonster = useCallback((): Monster => {
    const x = Math.random() * (window.innerWidth - 40)
    return {
      id: monsterIdRef.current++,
      x,
      y: -40,
      isDestroyed: false
    }
  }, [])

  // Создание пули
  const createBullet = useCallback((): Bullet => {
    return {
      id: bulletIdRef.current++,
      x: shipX + 28, // Центр корабля
      y: window.innerHeight - 100
    }
  }, [shipX])

  // Создание взрыва
  const createExplosion = useCallback((x: number, y: number): Explosion => {
    return {
      id: explosionIdRef.current++,
      x,
      y
    }
  }, [])

  // Проверка столкновений
  const checkCollisions = useCallback(() => {
    // Пули с монстрами
    setBullets(prevBullets => {
      const newBullets = [...prevBullets]
      
      setMonsters(prevMonsters => {
        const newMonsters = [...prevMonsters]
        const newExplosions = [...explosions]

        for (let i = newBullets.length - 1; i >= 0; i--) {
          const bullet = newBullets[i]
          
          for (let j = newMonsters.length - 1; j >= 0; j--) {
            const monster = newMonsters[j]
            
            if (!monster.isDestroyed &&
                bullet.x < monster.x + 40 &&
                bullet.x + 4 > monster.x &&
                bullet.y < monster.y + 40 &&
                bullet.y + 20 > monster.y) {
              
              // Уничтожение монстра
              newMonsters[j] = { ...monster, isDestroyed: true }
              newBullets.splice(i, 1)
              
              // Создание взрыва
              newExplosions.push(createExplosion(monster.x + 20, monster.y + 20))
              
              // Увеличение счета
              setScore(prev => prev + 10)
              break
            }
          }
        }

        setExplosions(newExplosions)
        return newMonsters
      })
      
      return newBullets
    })

    // Корабль с монстрами
    setMonsters(prevMonsters => {
      for (const monster of prevMonsters) {
        if (!monster.isDestroyed &&
            monster.y > window.innerHeight - 120 &&
            shipX < monster.x + 40 &&
            shipX + 60 > monster.x) {
          
          // Столкновение!
          setLives(prev => {
            const newLives = prev - 1
            if (newLives <= 0) {
              setGameOver(true)
            }
            return newLives
          })
          
          // Создание взрыва
          setExplosions(prev => [...prev, createExplosion(shipX + 30, window.innerHeight - 80)])
          
          // Удаление монстра
          return prevMonsters.filter(m => m.id !== monster.id)
        }
      }
      return prevMonsters
    })
  }, [shipX, createExplosion])

  // Обновление игры
  const updateGame = useCallback(() => {
    if (gameOver || !gameStarted) return

    // Обновление пуль
    setBullets(prev => 
      prev
        .map(bullet => ({ ...bullet, y: bullet.y - 8 }))
        .filter(bullet => bullet.y > -20)
    )

    // Обновление монстров
    setMonsters(prev => 
      prev
        .map(monster => ({ ...monster, y: monster.y + 2 }))
        .filter(monster => monster.y < window.innerHeight + 50)
    )

    // Создание новых монстров
    const now = Date.now()
    if (now - lastMonsterSpawn.current > 2000) {
      setMonsters(prev => [...prev, createMonster()])
      lastMonsterSpawn.current = now
    }

    // Удаление старых взрывов
    setExplosions(prev => prev.filter(exp => Date.now() - exp.id < 500))

    // Проверка столкновений
    checkCollisions()
  }, [gameOver, gameStarted, createMonster, checkCollisions])

  // Обработка клавиатуры
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (gameOver) return

    switch (e.key) {
      case 'ArrowLeft':
        setShipX(prev => Math.max(0, prev - 20))
        break
      case 'ArrowRight':
        setShipX(prev => Math.min(window.innerWidth - 60, prev + 20))
        break
      case ' ':
        e.preventDefault()
        setBullets(prev => [...prev, createBullet()])
        break
    }
  }, [gameOver, createBullet])

  // Обработка мыши
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (gameOver) return
    setShipX(e.clientX - 30)
  }, [gameOver])

  // Обработка клика мыши
  const handleMouseClick = useCallback((e: MouseEvent) => {
    if (gameOver) return
    e.preventDefault()
    setBullets(prev => [...prev, createBullet()])
  }, [gameOver, createBullet])

  // Эффекты
  useEffect(() => {
    if (gameStarted && !gameOver) {
      const gameLoop = setInterval(updateGame, 16) // ~60 FPS
      return () => clearInterval(gameLoop)
    }
  }, [gameStarted, gameOver, updateGame])

  useEffect(() => {
    if (gameStarted) {
      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('click', handleMouseClick)
      
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('click', handleMouseClick)
      }
    }
  }, [gameStarted, handleKeyDown, handleMouseMove, handleMouseClick])

  // Перезапуск игры
  const restartGame = () => {
    setGameOver(false)
    setGameStarted(true)
    setScore(0)
    setLives(3)
    setShipX(400)
    setMonsters([])
    setBullets([])
    setExplosions([])
    lastMonsterSpawn.current = 0
  }

  // Начало игры
  const startGame = () => {
    setGameStarted(true)
    lastMonsterSpawn.current = Date.now()
  }

  if (!gameStarted) {
    return (
      <GameContainer>
        <GameOverScreen>
          <h1>🚀 КОСМИЧЕСКИЕ ЗАХВАТЧИКИ</h1>
          <p>Управление: стрелки ← → или мышь</p>
          <p>Стрельба: Пробел или клик мыши</p>
          <p>Уничтожай монстров и не дай им добраться до корабля!</p>
          <RestartButton onClick={startGame}>
            НАЧАТЬ ИГРУ
          </RestartButton>
        </GameOverScreen>
      </GameContainer>
    )
  }

  if (gameOver) {
    return (
      <GameContainer>
        <GameOverScreen>
          <h1>💥 ИГРА ОКОНЧЕНА</h1>
          <p>Ваш счет: {score}</p>
          <RestartButton onClick={restartGame}>
            ИГРАТЬ СНОВА
          </RestartButton>
        </GameOverScreen>
      </GameContainer>
    )
  }

  return (
    <GameContainer ref={gameAreaRef}>
      <UI>
        <div>Счет: {score}</div>
        <div>Жизни: {'❤️'.repeat(lives)}</div>
      </UI>

      <GameArea>
        <SpaceShip x={shipX} />
        
        {monsters.map(monster => (
          <Monster
            key={monster.id}
            x={monster.x}
            y={monster.y}
            isDestroyed={monster.isDestroyed}
          />
        ))}
        
        {bullets.map(bullet => (
          <Bullet
            key={bullet.id}
            x={bullet.x}
            y={bullet.y}
          />
        ))}
        
        {explosions.map(explosion => (
          <Explosion
            key={explosion.id}
            x={explosion.x}
            y={explosion.y}
          />
        ))}
      </GameArea>
    </GameContainer>
  )
}

export default SpaceInvadersGame
