import { useState, useEffect } from 'react';
import { Grid, Typography, TextField, Select, MenuItem, FormControl, CircularProgress } from '@mui/material';
import CharacterCard from '../CharacterCard/CharacterCard';
import { getCharacters } from '@/components/http';
import { InputLabel } from '@mui/material';

function CharacterList() {
  const [filter, setFilter] = useState('');
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedGender, setSelectedGender] = useState('all');

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  }

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await getCharacters();
        setCharacters(response.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCharacters();
  }, []);

  if (isLoading) {
    return <CircularProgress color="success" />;
  }

  if (isError) {
    return <Typography variant="body1">Error fetching characters</Typography>;
  }

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
      <div className="flex mb-10 justify-between">
        <FormControl className="w-1/4">
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='mb-10'
          />
        </FormControl>
        <FormControl className="w-1/4">
          <InputLabel id='gender' color='primary'>Gender</InputLabel>
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
