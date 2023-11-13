import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { UseAuthContext } from '@/context/AuthContext';

export function useAuth() {
  const { user, loading } = UseAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  if (loading) {
    return <div>Loading...</div>; // Replace this with your loading component or spinner
  }
}
