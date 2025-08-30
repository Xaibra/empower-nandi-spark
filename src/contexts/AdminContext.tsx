import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'editor';
}

interface AdminContextType {
  user: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing admin session on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const savedUser = localStorage.getItem('admin_user');
      const token = localStorage.getItem('admin_token');
      
      if (savedUser && token) {
        try {
          const userData = JSON.parse(savedUser);
          // In a real app, you'd validate the token with your backend
          setUser(userData);
        } catch (error) {
          console.error('Error parsing saved user data:', error);
          localStorage.removeItem('admin_user');
          localStorage.removeItem('admin_token');
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Demo authentication - replace with real API call
      const demoUsers = [
        {
          id: '1',
          email: 'admin@tujitume.org',
          password: 'admin123',
          name: 'Sarah Kimutai',
          role: 'super_admin' as const
        },
        {
          id: '2',
          email: 'editor@tujitume.org',
          password: 'editor123',
          name: 'James Kosgei',
          role: 'admin' as const
        }
      ];

      const foundUser = demoUsers.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        const token = `demo_token_${foundUser.id}_${Date.now()}`;
        
        setUser(userWithoutPassword);
        localStorage.setItem('admin_user', JSON.stringify(userWithoutPassword));
        localStorage.setItem('admin_token', token);
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_token');
  };

  const isAuthenticated = !!user;

  return (
    <AdminContext.Provider value={{
      user,
      isLoading,
      login,
      logout,
      isAuthenticated
    }}>
      {children}
    </AdminContext.Provider>
  );
};
