'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { getCharacterById } from '../http';
import Link from 'next/navigation';

function CharacterDetail({ characterId }) {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await getCharacterById(characterId);
        setCharacter(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [characterId]);

  const [episodeDetails] = useState([]);


  if (loading) {
    return <CircularProgress color="success" />;
  }

  if (error) {
    return <Typography variant="body1">Error fetching character: {error.message}</Typography>;
  }

  if (!character) {
    return <Typography variant="body1">No Character Exists</Typography>;
  }

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
                    <ListItemText primary="Episodes:" />
                    <div className="max-h-48 overflow-y-auto">
                      <List>
                        {episodeDetails.map((episode, index) => {
                          // Extract the number suffix from the episode URL
                          const episodeNumber = episode.url.split('/').pop();

                          return (
                            <ListItem key={index}>
                              {/* Create a link for each episode with only the number suffix */}
                              <Link href={episode.url}>
                                <a>
                                  <ListItemText primary={`Episode ${episodeNumber}: ${episode?.name || 'Unknown'} (${episode?.air_date || 'Unknown'})`} />
                                </a>
                              </Link>
                            </ListItem>
                          );
                        })}
                      </List>
                    </div>
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
