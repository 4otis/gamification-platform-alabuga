import React from 'react'
import styled from 'styled-components'
import { Rocket, Target, Book, Gamepad2 } from 'lucide-react'

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`

const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  text-align: center;
`

const MissionBranches = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`

const BranchCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  transition: all ${({ theme }) => theme.animations.normal};
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
    border-color: ${({ theme }) => theme.colors.highlight};
  }
`

const BranchIcon = styled.div`
  width: 80px;
  height: 80px;
  background: ${({ theme }) => theme.colors.nebulaGradient};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textPrimary};
`

const BranchTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const BranchDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const BranchStats = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

const ComingSoon = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['3xl']};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
`

const ComingSoonTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ComingSoonText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`

const MissionsPage: React.FC = () => {
  const branches = [
    {
      id: 1,
      name: 'Квесты',
      description: 'Базовые онлайн и офлайн задачи для освоения космоса',
      icon: <Target size={40} />,
      missions: 12,
      completed: 3
    },
    {
      id: 2,
      name: 'Рекрутинг',
      description: 'Задания, направленные на привлечение новых кандидатов',
      icon: <Rocket size={40} />,
      missions: 8,
      completed: 1
    },
    {
      id: 3,
      name: 'Лекторий',
      description: 'Задания, направленные на обучение коллег и кандидатов',
      icon: <Book size={40} />,
      missions: 15,
      completed: 5
    },
    {
      id: 4,
      name: 'Симулятор',
      description: 'Задания, направленные на проверку знаний и навыков',
      icon: <Gamepad2 size={40} />,
      missions: 6,
      completed: 2
    }
  ]

  return (
    <PageContainer>
      <PageTitle>Миссии</PageTitle>
      
      <MissionBranches>
        {branches.map((branch) => (
          <BranchCard key={branch.id}>
            <BranchIcon>
              {branch.icon}
            </BranchIcon>
            <BranchTitle>{branch.name}</BranchTitle>
            <BranchDescription>{branch.description}</BranchDescription>
            <BranchStats>
              <span>{branch.completed} из {branch.missions} выполнено</span>
              <span>{Math.round((branch.completed / branch.missions) * 100)}%</span>
            </BranchStats>
          </BranchCard>
        ))}
      </MissionBranches>

      <ComingSoon>
        <ComingSoonTitle>🚀 Скоро будет доступно</ComingSoonTitle>
        <ComingSoonText>
          Детальный просмотр миссий, система ветвления и выполнение заданий
        </ComingSoonText>
      </ComingSoon>
    </PageContainer>
  )
}

export default MissionsPage
