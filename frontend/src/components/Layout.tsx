import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Navigation from './Navigation'

interface LayoutProps {
  children: React.ReactNode
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 80px; /* Высота хедера */
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: 70px;
  }
`

const Content = styled.div`
  flex: 1;
  display: flex;
  min-height: calc(100vh - 80px);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: calc(100vh - 70px);
  }
`

const Sidebar = styled.aside`
  width: 280px;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`

const PageContent = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <Main>
        <Content>
          <Sidebar>
            <Navigation />
          </Sidebar>
          <PageContent>
            {children}
          </PageContent>
        </Content>
      </Main>
    </LayoutContainer>
  )
}

export default Layout
