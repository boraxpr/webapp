import CharacterDetail from '@/components/CharacterDetail/CharacterDetail';


function CharacterPage({ params }) {

  return (
    <div className='bg-red-50'>
      <CharacterDetail characterId={params.id} />
    </div>
  );
}

export default CharacterPage;
