import React from 'react';
import {
  TextField,
  Button,
  Box,
  Stack,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import {
  Person as PersonIcon,
  Work as WorkIcon,
  Group as GroupIcon
} from '@mui/icons-material';
import { useTeam } from '../../context/TeamContext';

export const UserForm: React.FC = () => {
  const { addUser, teams } = useTeam();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    addUser({
      id: crypto.randomUUID(),
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      teamId: formData.get('teamId') as string,
      isActive: true,
    });

    form.reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          name="name"
          label="User Name"
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="role"
          label="Role"
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <WorkIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <FormControl fullWidth required>
          <InputLabel id="team-select-label">Team</InputLabel>
          <Select
            labelId="team-select-label"
            name="teamId"
            label="Team"
            defaultValue=""
            startAdornment={
              <InputAdornment position="start">
                <GroupIcon color="action" />
              </InputAdornment>
            }
          >
            {teams.map(team => (
              <MenuItem key={team.id} value={team.id}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          size="large"
        >
          Add User
        </Button>
      </Stack>
    </Box>
  );
}; 