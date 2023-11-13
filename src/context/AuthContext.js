'use client'
import React from 'react';
import { auth } from '../components/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';

export const AuthContext = React.createContext({});
export const useAuthContext = () => React.useContext(AuthContext);
export const AuthContextProvider = ({
  children,
}) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(
    () => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("Check user: " + JSON.stringify(user));
          setUser(user);
        } else {
          setUser(null);
          router.push('/login').then(() => setLoading(false));
        }
      });

      return () => unsubscribe();
    }, [router]
  );

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="primary" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
