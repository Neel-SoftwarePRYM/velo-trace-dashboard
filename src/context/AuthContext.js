
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '../components/ui/sonner';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in local storage
    const savedUser = localStorage.getItem('bikeTrackingUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password, remember) => {
    // Mock authentication - in a real app, this would call an API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const userData = { 
            id: '123',
            email: email,
            name: 'Demo User',
            avatar: 'https://i.pravatar.cc/150?img=8',
            role: 'admin',
          };
          
          setUser(userData);
          if (remember) {
            localStorage.setItem('bikeTrackingUser', JSON.stringify(userData));
          }
          toast('Successfully logged in');
          resolve(userData);
        } else {
          toast('Login failed', {
            description: 'Please check your credentials and try again',
          });
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('bikeTrackingUser');
    setUser(null);
    toast('Successfully logged out');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
