import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box } from '@mui/material';
import { useTeamOperations } from '../../hooks/useTeamOperations';
import { teamSchema, TeamFormData } from '../../schemas/teamSchemas';

export const TeamForm = () => {
  const { handleAddTeam } = useTeamOperations();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TeamFormData>({
    resolver: zodResolver(teamSchema)
  });

  const onSubmit = (data: TeamFormData) => {
    handleAddTeam(data);
    reset();
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit(onSubmit)} 
      sx={{ display: 'flex', gap: 2 }}
      role="form"
      aria-label="Add Team Form"
    >
      <TextField
        {...register('name')}
        label="Team Name"
        error={!!errors.name}
        helperText={errors.name?.message}
        aria-required="true"
        aria-invalid={!!errors.name}
      />
      <TextField
        {...register('description')}
        label="Description"
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <Button type="submit" variant="contained">Add Team</Button>
    </Box>
  );
}; 