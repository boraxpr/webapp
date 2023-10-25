'use client'
import { AuthContextProvider, useAuthContext } from '@/components/context/AuthContext';
import Home from './home/home';

export default function App() {
  return (
    <AuthContextProvider>
      <Home />
    </AuthContextProvider>
  );
}
