import React from 'react';
import { TextField, Button, Select, MenuItem, Box } from '@mui/material';
import { useTeam } from '../context/TeamContext';

export const UserForm: React.FC = () => {
  const { teams, addUser } = useTeam();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    addUser({
      id: crypto.randomUUID(),
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      teamId: formData.get('teamId') as string,
      isActive: true
    });
    
    form.reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
      <TextField name="name" label="User Name" required />
      <TextField name="role" label="Role" required />
      <Select name="teamId" label="Team" required>
        {teams.map(team => (
          <MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>
        ))}
      </Select>
      <Button type="submit" variant="contained">Add User</Button>
    </Box>
  );
}; 