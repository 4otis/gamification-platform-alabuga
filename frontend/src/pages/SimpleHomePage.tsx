import React, { useState } from 'react'
import styled from 'styled-components'
import SpaceInvadersGame from '../components/SpaceInvadersGame'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: white;
  padding: 1rem;
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow-x: hidden;
  margin: 0;
  width: 100%;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
    z-index: 0;
  }

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(2px 2px at 20px 30px, #eee, transparent),
      radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
      radial-gradient(1px 1px at 90px 40px, #fff, transparent),
      radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
      radial-gradient(2px 2px at 160px 30px, #ddd, transparent);
    background-repeat: repeat;
    background-size: 200px 100px;
    z-index: 0;
  }

`

const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  padding: 0 1rem;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 0 10px #e94560;
`

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
`

const Title = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 2rem;
  text-align: center;
  text-shadow: 0 0 20px #e94560;
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #b8c5d6;
  margin-bottom: 3rem;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  width: 100%;
  box-sizing: border-box;
`

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const CardIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin: 0;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0;
`

const ProgressFill = styled.div<{ width: number }>`
  height: 100%;
  width: ${({ width }) => width}%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  }
`

const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #8a9ba8;
`

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
`

const ActionCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
    border-color: #e94560;
  }
`

const ActionIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
`

const ActionTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
`

const ActionDescription = styled.p`
  color: #b8c5d6;
  font-size: 0.875rem;
  line-height: 1.5;
`


const SimpleHomePage: React.FC = () => {
  const [showGame, setShowGame] = useState(false)

  if (showGame) {
    return <SpaceInvadersGame />
  }

  return (
    <Container>
      <Content>
        <Header>
          <Logo>
            <LogoIcon>🚀</LogoIcon>
            <span>Алабуга Космос</span>
          </Logo>
          <UserInfo>
            <StatItem>
              <span>⚡</span>
              <span>1250</span>
            </StatItem>
            <StatItem>
              <span>⭐</span>
              <span>340</span>
            </StatItem>
            <StatItem>
              <span>👤</span>
              <span>Алексей</span>
            </StatItem>
          </UserInfo>
        </Header>

        <Title>Добро пожаловать в космос, Алексей!</Title>
        <Subtitle>
          Твой путь от космического пилота-кандидата до командира космического поселения начинается здесь.
          Выполняй миссии, прокачивай компетенции и покоряй звезды!
        </Subtitle>

        <CardsGrid>
          <Card>
            <CardHeader>
              <CardIcon>🏆</CardIcon>
              <CardTitle>Текущий ранг</CardTitle>
            </CardHeader>
            <div>
              <h4 style={{ margin: '0 0 8px 0', color: '#fff' }}>
                Искатель
              </h4>
              <ProgressBar>
                <ProgressFill width={35} />
              </ProgressBar>
              <ProgressText>
                <span>1250 / 3500 опыта</span>
                <span>35%</span>
              </ProgressText>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardIcon>🎯</CardIcon>
              <CardTitle>Миссии</CardTitle>
            </CardHeader>
            <div>
              <h4 style={{ margin: '0 0 8px 0', color: '#fff' }}>
                3 из 12 выполнено
              </h4>
              <ProgressBar>
                <ProgressFill width={25} />
              </ProgressBar>
              <ProgressText>
                <span>Выполнено миссий</span>
                <span>25%</span>
              </ProgressText>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardIcon>⚡</CardIcon>
              <CardTitle>Компетенции</CardTitle>
            </CardHeader>
            <div>
              <h4 style={{ margin: '0 0 8px 0', color: '#fff' }}>
                5 из 9 навыков
              </h4>
              <ProgressText>
                <span>Прокачано компетенций</span>
                <span>Уровень 2.3</span>
              </ProgressText>
            </div>
          </Card>
        </CardsGrid>

        <QuickActions>
          <ActionCard onClick={() => setShowGame(true)} style={{ cursor: 'pointer' }}>
            <ActionIcon>🎮</ActionIcon>
            <ActionTitle>Космическая Игра</ActionTitle>
            <ActionDescription>
              Сражайся с космическими захватчиками!
            </ActionDescription>
          </ActionCard>

          <ActionCard>
            <ActionIcon>🚀</ActionIcon>
            <ActionTitle>Миссии</ActionTitle>
            <ActionDescription>
              Выбери свою миссию и отправляйся покорять космос
            </ActionDescription>
          </ActionCard>

          <ActionCard>
            <ActionIcon>⭐</ActionIcon>
            <ActionTitle>Хранилище</ActionTitle>
            <ActionDescription>
              Потрать заработанную ману на космические артефакты
            </ActionDescription>
          </ActionCard>

          <ActionCard>
            <ActionIcon>📊</ActionIcon>
            <ActionTitle>Бортовой журнал</ActionTitle>
            <ActionDescription>
              Отслеживай свой прогресс и достижения
            </ActionDescription>
          </ActionCard>
        </QuickActions>
      </Content>
    </Container>
  )
}

export default SimpleHomePage
