import { useCallback } from 'react';
import { useTeam } from '../context/TeamContext';

interface TeamFormData {
  name: string;
  description?: string;
}

export const useTeamOperations = () => {
  const { teams, users, addTeam, addUser, removeTeam, removeUserFromTeam } = useTeam();

  const handleAddTeam = useCallback((data: TeamFormData) => {
    addTeam({
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description || ''
    });
  }, [addTeam]);

  return {
    teams,
    users,
    handleAddTeam,
    removeTeam,
    removeUserFromTeam
  };
}; 