import React from 'react';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { getCharacters } from '@/components/http';
import { Grid, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CharacterCard from '../CharacterCard/CharacterCard';

function CharacterList() {
  const [filter, setFilter] = useState('');
  const { data, isLoading, isError } = useQuery('characters', getCharacters);
  const [selectedGender, setSelectedGender] = useState('all');

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  }

  if (isLoading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  if (isError) {
    return <Typography variant="body1">Error fetching characters</Typography>;
  }

  const characters = data.results;

  const filteredCharacters = characters.filter((character) => {
    // Check if the character name includes the filter text (case-insensitive)
    const nameFilter = character.name.toLowerCase().includes(filter.toLowerCase());

    // Check if the character's status matches the selected status filter
    const statusFilter = character.status.toLowerCase().includes(filter.toLowerCase());

    // Check if the character's location name includes the selected location filter
    const locationFilter = character.location.name.toLowerCase().includes(filter.toLowerCase());

    // Check if the character's species matches the selected species filter
    const speciesFilter = character.species.toLowerCase().includes(filter.toLowerCase());

    // Check if the character's gender matches the selected gender filter
    const genderFilter = character.gender.toLowerCase() === selectedGender.toLowerCase() || selectedGender === 'all';

    // Combine all the filters using logical AND (&&) operator
    return (nameFilter || statusFilter || locationFilter || speciesFilter) && genderFilter;
  });

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        <div className="text-center">Rick and Morty Characters</div>
      </Typography>
      <div className="flex flex-row-reverse mt-10 mb-10">
        <FormControl>
          {/* Filter input field */}
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='mb-10'
          />

          <Select
            labelId="gender-label"
            label="Gender"
            id="gender"
            fullWidth
            value={selectedGender}
            onChange={handleGenderChange}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Grid container spacing={2}>
        {filteredCharacters.map((character) => (
          <Grid item key={character.id} xs={12} sm={6} md={4} lg={3}>
            <CharacterCard character={character} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default CharacterList;
