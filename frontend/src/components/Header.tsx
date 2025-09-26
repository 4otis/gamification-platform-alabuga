import React from 'react'
import styled from 'styled-components'
import { Star, Zap, User } from 'lucide-react'

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: ${({ theme }) => theme.colors.spaceGradient};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 70px;
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-shadow: 0 0 10px ${({ theme }) => theme.colors.highlight};
`

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.nebulaGradient};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: glow 2s ease-in-out infinite alternate;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`

const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.glass};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(10px);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  }
`

const StatIcon = styled.div`
  color: ${({ theme }) => theme.colors.highlight};
  display: flex;
  align-items: center;
  justify-content: center;
`

const StatValue = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.glass};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.normal};
  
  &:hover {
    background: ${({ theme }) => theme.colors.glassHover};
    transform: translateY(-2px);
  }
`

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.nebulaGradient};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 600;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 32px;
    height: 32px;
  }
`

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`

const UserName = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

const UserRank = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo>
        <LogoIcon>
          <Star size={24} />
        </LogoIcon>
        <span>Алабуга Космос</span>
      </Logo>

      <UserInfo>
        <Stats>
          <StatItem>
            <StatIcon>
              <Zap size={16} />
            </StatIcon>
            <StatValue>1250</StatValue>
          </StatItem>
          <StatItem>
            <StatIcon>
              <Star size={16} />
            </StatIcon>
            <StatValue>340</StatValue>
          </StatItem>
        </Stats>

        <UserProfile>
          <Avatar>
            <User size={20} />
          </Avatar>
          <UserDetails>
            <UserName>Алексей</UserName>
            <UserRank>Искатель</UserRank>
          </UserDetails>
        </UserProfile>
      </UserInfo>
    </HeaderContainer>
  )
}

export default Header
