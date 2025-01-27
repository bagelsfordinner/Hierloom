// src/pages/auth/login.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../lib/auth';
import {
  AuthBox,
  AuthContainer,
  AuthTitle,
  AuthInput,
  AuthButton,
  AuthLink
} from '../../components/ui/AuthBox';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } catch {
      // Error is handled in auth context
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthBox>
        <AuthTitle>Login to Hierloom</AuthTitle>
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <AuthInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <AuthInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <AuthButton type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </AuthButton>
        </form>
        <AuthLink>
          Don't have an account? <Link to="/register">Register</Link>
        </AuthLink>
      </AuthBox>
    </AuthContainer>
  );
};