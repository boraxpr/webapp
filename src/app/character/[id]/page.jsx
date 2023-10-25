import CharacterDetail from '@/components/CharacterDetail/CharacterDetail';

function CharacterPage({ params }) {

  return <CharacterDetail characterId={params.id} />;
}

export default CharacterPage;
