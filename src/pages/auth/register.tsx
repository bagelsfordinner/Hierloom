// src/pages/auth/register.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  AuthBox,
  AuthContainer,
  AuthTitle,
  AuthInput,
  AuthButton,
  AuthLink
} from '../../components/ui/AuthBox';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, error, loading } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(email, password);
  };

  return (
    <AuthContainer>
      <AuthBox>
        <AuthTitle>Create Account</AuthTitle>
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
            {loading ? 'Loading...' : 'Register'}
          </AuthButton>
        </form>
        <AuthLink>
          Already have an account? <Link to="/login">Login</Link>
        </AuthLink>
      </AuthBox>
    </AuthContainer>
  );
};