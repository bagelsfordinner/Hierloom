// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from './lib/auth'
import { Navbar } from './organisms/navigation/NavBar'
import { theme } from './styles/theme'
import { GlobalStyles } from './styles/GlobalStyles'
import { Login } from './pages/auth/login'
import { Register } from './pages/auth/register'
import { Cartographer } from './pages/campaign/cartographer'
import { Atlas } from './pages/campaign/atlas'
import { Players } from './pages/campaign/players'
import { Dashboard } from './pages/campaign/dashboard'
import { Settings } from './pages/settings'

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Campaign Routes */}
        <Route path="/campaign/:id">
          <Route path="atlas" element={<Atlas />} />
          <Route path="cartographer" element={<Cartographer />} />
          <Route path="players" element={<Players />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* Settings */}
        <Route path="/settings" element={<Settings />} />
        
        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;