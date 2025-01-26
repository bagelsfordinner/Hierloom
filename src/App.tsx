import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './organisms/navigation/NavBar'

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
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
        </main>
      </div>
    </Router>
  )
}

export default App