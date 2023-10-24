import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Link from 'next/link'; // Import Link from Next.js

function CharacterCard({ character }) {
  // Define a CSS class for the card container
  const cardContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: '100%', // Ensure the container takes the full height
  };
  const cardMediaStyle = {
    height: 'auto', // Set height to auto
    maxWidth: '100%', // Ensure the image scales with its container
  };

  return (
    <Card style={cardContainerStyle}>
      <CardMedia sx={{ height: 300, }} image={character.image} title={character.name} />
      <CardContent>
        {/* Wrap the character name in a Next.js Link */}
        <Link href={`/character/${character.id}`}>
          <Typography variant="body2" align="center" fontSize={'1.5rem'}>
            {character.name}
          </Typography>

        </Link>
      </CardContent>
    </Card>
  );
}

CharacterCard.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CharacterCard;
