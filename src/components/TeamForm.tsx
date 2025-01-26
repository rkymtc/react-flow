import React from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Stack,
  InputAdornment
} from '@mui/material';
import { 
  Group as GroupIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';
import { useTeam } from '../context/TeamContext';

export const TeamForm: React.FC = () => {
  const { addTeam } = useTeam();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    addTeam({
      id: crypto.randomUUID(),
      name: formData.get('name') as string,
      description: formData.get('description') as string
    });
    
    form.reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          name="name"
          label="Team Name"
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <GroupIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="description"
          label="Description"
          fullWidth
          multiline
          rows={2}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DescriptionIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth
          size="large"
        >
          Add Team
        </Button>
      </Stack>
    </Box>
  );
}; 