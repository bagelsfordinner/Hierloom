// src/organisms/navigation/Navbar.tsx
import { Link } from 'react-router-dom'
import { Search, Menu, Settings } from 'lucide-react'
import styled from 'styled-components'

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface};
  background: ${({ theme }) => theme.colors.background};
  backdrop-filter: blur(10px);
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  height: 56px;
  display: flex;
  align-items: center;
`

const Logo = styled(Link)`
  font-weight: bold;
  margin-right: ${({ theme }) => theme.spacing.xl};
`

const SearchContainer = styled.div`
  flex: 1;
  margin-right: ${({ theme }) => theme.spacing.md};
`

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 300px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.surface}dd;
  }
`

const IconButton = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text};
  
  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`

export const Navbar = () => {
  return (
    <Nav>
      <Container>
        <Logo to="/">Hierloom</Logo>
        
        <SearchContainer>
          <SearchButton>
            <Search size={16} style={{ marginRight: 8 }} />
            <span>Search...</span>
          </SearchButton>
        </SearchContainer>

        <IconButton as={Link} to="/settings">
          <Settings size={20} />
        </IconButton>
        
        <IconButton style={{ marginLeft: 8 }}>
          <Menu size={20} />
        </IconButton>
      </Container>
    </Nav>
  )
}