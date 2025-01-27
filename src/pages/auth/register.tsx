// src/pages/auth/register.tsx
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

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { register, error } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(email, password, username);
    } catch {
      // Error is handled in auth context
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthBox>
        <AuthTitle>Create Account</AuthTitle>
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <AuthInput
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
            {loading ? 'Creating Account...' : 'Register'}
          </AuthButton>
        </form>
        <AuthLink>
          Already have an account? <Link to="/login">Login</Link>
        </AuthLink>
      </AuthBox>
    </AuthContainer>
  );
};