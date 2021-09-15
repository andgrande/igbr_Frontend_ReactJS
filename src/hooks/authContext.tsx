import React, { createContext, useCallback } from 'react';
import { useContext } from 'react';
import { useState } from 'react';

import { toast } from 'react-toastify';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface User {
  id: number;
  email: string;
  password: string;
}

interface SignedInData {
  token: string;
  user: User;
}

type UserContextData = {
  user: User;
  signIn: ({ email, password }: SignInCredentials) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<UserContextData>({} as UserContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [credentialData, setCredentialData] = useState<SignedInData>(() => {
    const token = localStorage.getItem('@IGBR:token');
    const userData = localStorage.getItem('@IGBR:user');

    if (token && userData) {
      return { token, user: JSON.parse(userData) };
    }

    return {} as SignedInData;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    try {
      const { data } = await api.post(`/teacher/sessions`, {
        teacher_email: email,
        password,
      });

      const userExists = data;
      const token = 'qwertyuioplkjhjkghsdfazxcvvbnmQ';

      if (!userExists) {
        toast.error('Invalid Credentials !');
        return;
      }
      toast.success('Logged in successfully!');
      localStorage.setItem('@IGBR:user', JSON.stringify(userExists));
      localStorage.setItem('@IGBR:token', token);
      setCredentialData({ user: userExists, token });
    } catch (err) {
      toast.error(`${err.message}`);
    }
  }, []);

  const signOut = useCallback(() => {
    setCredentialData({} as SignedInData);

    localStorage.removeItem('@IGBR:user');
    localStorage.removeItem('@IGBR:token');
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: credentialData.user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): UserContextData {
  const context = useContext(AuthContext);

  return context;
}
