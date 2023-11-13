'use client'
import { Card, CardContent, Typography, Box } from "@mui/material";
import { getUsers } from "@/http";
import { useState, useEffect } from 'react';

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getUsers();
        if (response.ok) {
          const data = await response.json();
          const userData = data.result.rows;
          setUsers(userData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" component="div" gutterBottom>
        Users
      </Typography>
      {users.map((user) => (
        <Card key={user.uid} sx={{ minWidth: 275, marginBottom: 2, backgroundColor: '#f5f5f5' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {user.first_name} {user.last_name}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UsersPage;