// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from './lib/auth'
import { Navbar } from './organisms/navigation/NavBar'
import { theme } from './styles/theme'
import { GlobalStyles } from './styles/GlobalStyles'
import { Login } from './pages/auth/login'
import { Register } from './pages/auth/register'
import { CampaignsPage } from './pages/campaigns'

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/campaigns" element={<CampaignsPage />} />
        
        {/* Campaign Routes */}
        <Route path="/campaign/:id">
          <Route path="atlas" element={<div>Atlas</div>} />
          <Route path="cartographer" element={<div>Cartographer</div>} />
          <Route path="players" element={<div>Players</div>} />
          <Route path="dashboard" element={<div>Dashboard</div>} />
        </Route>

        {/* Settings */}
        <Route path="/settings" element={<div>Settings</div>} />
        
        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;