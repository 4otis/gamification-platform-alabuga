import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Home, Target, User, ShoppingBag, BookOpen } from 'lucide-react'

const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  transition: all ${({ theme }) => theme.animations.normal};
  position: relative;
  
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.textPrimary};
    transform: translateX(5px);
  }
  
  &.active {
    background: ${({ theme }) => theme.colors.nebulaGradient};
    color: ${({ theme }) => theme.colors.textPrimary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
    
    &::before {
      content: '';
      position: absolute;
      left: -${({ theme }) => theme.spacing.lg};
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 20px;
      background: ${({ theme }) => theme.colors.highlight};
      border-radius: 0 2px 2px 0;
    }
  }
`

const NavIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`

const NavText = styled.span`
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

const Navigation: React.FC = () => {
  const navItems = [
    { to: '/', icon: <Home size={20} />, text: 'Главная' },
    { to: '/missions', icon: <Target size={20} />, text: 'Миссии' },
    { to: '/profile', icon: <User size={20} />, text: 'Профиль' },
    { to: '/store', icon: <ShoppingBag size={20} />, text: 'Хранилище' },
    { to: '/journal', icon: <BookOpen size={20} />, text: 'Журнал' },
  ]

  return (
    <NavContainer>
      {navItems.map((item) => (
        <NavItem key={item.to} to={item.to}>
          <NavIcon>{item.icon}</NavIcon>
          <NavText>{item.text}</NavText>
        </NavItem>
      ))}
    </NavContainer>
  )
}

export default Navigation
