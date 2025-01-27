// src/lib/auth.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile 
} from 'firebase/auth';
import { auth } from './firebase';
import { createUserProfile, isUsernameAvailable } from './firestore';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  register: (email: string, password: string, username: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  register: async () => {},
  login: async () => {},
  signOut: async () => {},
  error: '',
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email: string, password: string, username: string) => {
    try {
      setError('');
      console.log('Starting registration process...');
      
      // Check username availability
      console.log('Checking username availability...');
      const available = await isUsernameAvailable(username);
      if (!available) {
        throw new Error('Username is already taken');
      }
      console.log('Username is available');

      // Create auth user
      console.log('Creating auth user...');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Auth user created');
      
      // Update profile with username
      console.log('Updating profile...');
      await updateProfile(userCredential.user, {
        displayName: username
      });
      console.log('Profile updated');

      // Create user profile in Firestore
      console.log('Creating Firestore profile...');
      await createUserProfile(userCredential.user.uid, email, username);
      console.log('Firestore profile created');
      
      console.log('Registration complete, navigating...');
      navigate('/campaigns');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError('');
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/campaigns');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign out failed');
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, signOut, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);