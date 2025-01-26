// src/hooks/useAuth.ts
import { useState } from 'react';
import { auth } from '../lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError('');
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/campaigns');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError('');
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/campaigns');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign out failed');
    }
  };

  return { register, login, signOut, error, loading };
};