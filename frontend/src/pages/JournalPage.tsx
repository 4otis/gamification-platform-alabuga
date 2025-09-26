import React from 'react'
import styled from 'styled-components'

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

const JournalPage: React.FC = () => {
  return (
    <PageContainer>
      <PageTitle>Бортовой журнал</PageTitle>
      
      <ComingSoon>
        <ComingSoonTitle>📊 Скоро будет доступно</ComingSoonTitle>
        <ComingSoonText>
          История действий, прогресс и рейтинги космических пилотов
        </ComingSoonText>
      </ComingSoon>
    </PageContainer>
  )
}

export default JournalPage
