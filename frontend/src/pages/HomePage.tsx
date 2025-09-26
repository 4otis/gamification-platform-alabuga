import React from 'react'
import styled from 'styled-components'
import { Rocket, Target, Award, Zap, Star, Compass } from 'lucide-react'

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['2xl']};
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`

const WelcomeSection = styled.section`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
  background: ${({ theme }) => theme.colors.spaceGradient};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 30% 20%, rgba(102, 126, 234, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(118, 75, 162, 0.3) 0%, transparent 50%);
    z-index: 0;
  }
`

const WelcomeContent = styled.div`
  position: relative;
  z-index: 1;
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes['5xl']};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-shadow: 0 0 20px ${({ theme }) => theme.colors.highlight};
  animation: fadeIn 1s ease-out;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }
`

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  animation: fadeIn 1s ease-out 0.2s both;
`

const ProgressSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`

const ProgressCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  backdrop-filter: blur(10px);
  transition: all ${({ theme }) => theme.animations.normal};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const CardIcon = styled.div`
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.colors.nebulaGradient};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textPrimary};
`

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
  margin: ${({ theme }) => theme.spacing.md} 0;
`

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => progress * 100}%;
  background: ${({ theme }) => theme.colors.nebulaGradient};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: width ${({ theme }) => theme.animations.slow};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: shimmer 2s infinite;
  }
`

const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`

const QuickActions = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`

const ActionCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.normal};
  text-decoration: none;
  color: inherit;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
    border-color: ${({ theme }) => theme.colors.highlight};
  }
`

const ActionIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${({ theme }) => theme.colors.nebulaGradient};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textPrimary};
`

const ActionTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const ActionDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.5;
`

const HomePage: React.FC = () => {
  return (
    <HomeContainer>
      <WelcomeSection>
        <WelcomeContent>
          <Title>Добро пожаловать в космос, Алексей!</Title>
          <Subtitle>
            Твой путь от космического пилота-кандидата до командира космического поселения начинается здесь.
            Выполняй миссии, прокачивай компетенции и покоряй звезды!
          </Subtitle>
        </WelcomeContent>
      </WelcomeSection>

      <ProgressSection>
        <ProgressCard>
          <CardHeader>
            <CardIcon>
              <Award size={24} />
            </CardIcon>
            <CardTitle>Текущий ранг</CardTitle>
          </CardHeader>
          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#fff' }}>
              Искатель
            </h4>
            <ProgressBar>
              <ProgressFill progress={0.35} />
            </ProgressBar>
            <ProgressText>
              <span>1250 / 3500 опыта</span>
              <span>35%</span>
            </ProgressText>
          </div>
        </ProgressCard>

        <ProgressCard>
          <CardHeader>
            <CardIcon>
              <Target size={24} />
            </CardIcon>
            <CardTitle>Миссии</CardTitle>
          </CardHeader>
          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#fff' }}>
              3 из 12 выполнено
            </h4>
            <ProgressBar>
              <ProgressFill progress={0.25} />
            </ProgressBar>
            <ProgressText>
              <span>Выполнено миссий</span>
              <span>25%</span>
            </ProgressText>
          </div>
        </ProgressCard>

        <ProgressCard>
          <CardHeader>
            <CardIcon>
              <Zap size={24} />
            </CardIcon>
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
        </ProgressCard>
      </ProgressSection>

      <QuickActions>
        <ActionCard>
          <ActionIcon>
            <Rocket size={28} />
          </ActionIcon>
          <ActionTitle>Миссии</ActionTitle>
          <ActionDescription>
            Выбери свою миссию и отправляйся покорять космос
          </ActionDescription>
        </ActionCard>

        <ActionCard>
          <ActionIcon>
            <Star size={28} />
          </ActionIcon>
          <ActionTitle>Хранилище</ActionTitle>
          <ActionDescription>
            Потрать заработанную ману на космические артефакты
          </ActionDescription>
        </ActionCard>

        <ActionCard>
          <ActionIcon>
            <Compass size={28} />
          </ActionIcon>
          <ActionTitle>Бортовой журнал</ActionTitle>
          <ActionDescription>
            Отслеживай свой прогресс и достижения
          </ActionDescription>
        </ActionCard>
      </QuickActions>
    </HomeContainer>
  )
}

export default HomePage
