import { useState, useEffect } from 'react';
import { Box, Button, Grid, Typography, TextField, Select, MenuItem, FormControl, CircularProgress } from '@mui/material';
import CharacterCard from '../CharacterCard/CharacterCard';
import { getCharacters } from '@/http';
import { InputLabel } from '@mui/material';
import LogoutButton from '../logout/logout';
function CharacterList() {
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedGender, setSelectedGender] = useState('all');

  // const handleGenderChange = (e) => {
  //   setSelectedGender(e.target.value);
  // }

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoading(true);
      try {
        // server-side filtering (recommended for large datasets)
        const response = await getCharacters(page, filterName, selectedGender);
        setCharacters(response.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCharacters();
  }, [page, filterName, selectedGender]);


  if (isError) {
    return <Typography variant="body1">Error fetching characters</Typography>;
  }
  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    if (name === 'filterName') {
      setFilterName(value);
    } else if (name === 'selectedGender') {
      setSelectedGender(value);
    }
  };
  // Client-sided filtering (not recommended for large datasets)
  // const filteredCharacters = characters.filter((character) => {
  //   // Check if the character name includes the filter text (case-insensitive)
  //   const nameFilter = character.name.toLowerCase().includes(filter.toLowerCase());

  //   // Check if the character's status matches the selected status filter
  //   const statusFilter = character.status.toLowerCase().includes(filter.toLowerCase());

  //   // Check if the character's location name includes the selected location filter
  //   const locationFilter = character.location.name.toLowerCase().includes(filter.toLowerCase());

  //   // Check if the character's species matches the selected species filter
  //   const speciesFilter = character.species.toLowerCase().includes(filter.toLowerCase());

  //   // Check if the character's gender matches the selected gender filter
  //   const genderFilter = character.gender.toLowerCase() === selectedGender.toLowerCase() || selectedGender === 'all';

  //   // Combine all the filters using logical AND (&&) operator
  //   return (nameFilter || statusFilter || locationFilter || speciesFilter) && genderFilter;
  // });

  return (
    <div className='mt-10'>
      <div className='flex justify-center'>
        <Typography variant="h2" gutterBottom color="#b2daed">
          Rick and Morty Characters
        </Typography>
      </div>

      <div className="flex mb-10 justify-end">
        <LogoutButton />
      </div>
      <div className="flex mb-10 justify-between">
        <FormControl className="w-1/4">
          <TextField
            name='filterName'
            label="Search"
            variant="outlined"
            fullWidth
            value={filterName}
            // onChange={(e) => setFilter(e.target.value)}
            onChange={handleFilterChange}
            className='mb-10'
          />
        </FormControl>
        <FormControl className="w-1/4">
          <InputLabel id='gender' color='primary'>Gender</InputLabel>
          <Select
            name='selectedGender'
            labelId="gender-label"
            label="Gender"
            id="gender"
            fullWidth
            value={selectedGender}
            onChange={handleFilterChange}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Grid container spacing={2}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" width="100%">
            <CircularProgress color="success" />
          </Box>
        ) : !characters || characters.length === 0 ? (
          <Typography variant="body1">There are no characters to display.</Typography>
        ) : (
          characters.map((character) => (
            <Grid item key={character.id} xs={12} sm={6} md={4} lg={3}>
              <CharacterCard character={character} />
            </Grid>
          ))
        )}
      </Grid>
      <Box display="flex" justifyContent="center" mt={5} className="bg-blue-100 p-5 rounded shadow-lg">
        {
          page > 1 && (
            <Button
              variant="contained"
              color="primary"
              className="text-white bg-blue-500 hover:bg-blue-700"
              onClick={() => setPage(page => page - 1)
              }
            >
              Previous Page
            </Button>
          )
        }
        <Box mx={4}>
          <Button
            variant="contained"
            color="primary"
            className="text-white bg-blue-500 hover:bg-blue-700"
            onClick={() => setPage(page => page + 1)}
          >
            Next Page
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default CharacterList;
