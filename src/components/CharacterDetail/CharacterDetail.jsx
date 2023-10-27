import { Card, CardContent, CardMedia, Typography, Grid, List, ListItem, ListItemText } from '@mui/material';
import { getCharacterById } from '../http';

async function CharacterDetail({ characterId }) {
  const character = await getCharacterById(characterId);

  const {
    name,
    status,
    species,
    gender,
    origin,
    location,
    image,
    episode
  } = character;
  const episodes = episode
    .map(ep => ep.replace('https://rickandmortyapi.com/api/episode/', ''))
    .join(', ');

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-50 p-6 rounded-lg shadow-lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            {/* <Card className="h-full p-1"> */}
            <div className="flex items-center justify-center h-full">
              <CardMedia component="img" height="100%" image={image} title={name} className='border border-gray-800 shadow-lg' />
            </div>
            {/* </Card> */}
          </Grid>

          <Grid item xs={12} sm={8}>
            <Card className="h-full">
              <CardContent className="h-full">
                <Typography variant="h5" gutterBottom>
                  {name}
                </Typography>
                <List className="flex-1 overflow-auto">
                  <ListItem>
                    <ListItemText primary={`Status: ${status}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Species: ${species}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Gender: ${gender}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Origin: ${origin?.name || 'Unknown'}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Location: ${location?.name || 'Unknown'}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Location: ${episodes || 'Unknown'}`} />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default CharacterDetail;
