import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';

export function useRequireAuth(redirectUrl = '/login') {
  const { user } = useAuthContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.replace(redirectUrl);
    } else {
      setIsLoading(false);
    }
  }, [user, router, redirectUrl]);

  return { user, isLoading };
}