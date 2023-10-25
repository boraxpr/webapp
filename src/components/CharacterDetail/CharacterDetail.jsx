'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { getCharacterById, getEpisodeById } from '../http';

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

  const [episodeDetails, setEpisodeDetails] = useState([]);

  useEffect(() => {
    if (character && character.episode) {
      Promise.all(character.episode.map(getEpisodeDetails))
        .then((episodes) => {
          setEpisodeDetails(episodes);
        })
        .catch((error) => {
          console.error('Error fetching episode details:', error);
        });
    }
  }, [character]);

  const getEpisodeDetails = async (episodeUrl) => {
    try {
      const episode = await getEpisodeById(episodeUrl);
      return episode;
    } catch (error) {
      console.error('Error fetching episode details:', error);
      return null;
    }
  };

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
  } = character;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={3}>
        <Card>
          <CardMedia component="img" height="100%" image={image} title={name} />
        </Card>
      </Grid>
      <Grid item xs={6} sm={3}></Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {name}
            </Typography>
            <List>
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
              {episodeDetails.length > 0 && (
                <ListItem>
                  <ListItemText primary="Episodes:" />
                  <List>
                    {episodeDetails.map((episode, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={`Episode ${index + 1}: ${episode?.name || 'Unknown'} (${episode?.air_date || 'Unknown'})`} />
                      </ListItem>
                    ))}
                  </List>
                </ListItem>
              )}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default CharacterDetail;
