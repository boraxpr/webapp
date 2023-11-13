'use client'
import CharacterDetail from '@/components/CharacterDetail/CharacterDetail';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { AuthLoadingUI } from '@/components/Loading/authLoading';

function CharacterPage({ params }) {
  const { isLoading } = useRequireAuth();

  if (isLoading) {
    return <AuthLoadingUI />;
  }
  return (
    <div className='bg-red-50'>
      <CharacterDetail characterId={params.id} />
    </div>
  );
}

export default CharacterPage;
