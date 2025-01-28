import React, { createContext, useContext, useState, useEffect } from 'react';
import { Team, TeamContextType, User } from '../types/team';
const TeamContext = createContext<TeamContextType | undefined>(undefined);
const STORAGE_KEY = 'teamManagement';
const getStoredData = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const { teams, users } = JSON.parse(stored);
      return { teams, users };
    } catch (error) {
      console.error('Error parsing stored data:', error);
    }
  }
  return { teams: [], users: [] };
};

export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>(() => getStoredData().teams);
  const [users, setUsers] = useState<User[]>(() => getStoredData().users);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ teams, users }));
  }, [teams, users]);

  const addTeam = (team: Team) => {
    setTeams(prev => [...prev, team]);
  };

  const addUser = (user: User) => {
    setUsers(prev => [...prev, user]);
  };

  const updateUser = (userId: string, updatedUser: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, ...updatedUser } : user
    ));
  };

  const removeTeam = (teamId: string) => {
    setTeams(prev => prev.filter(team => team.id !== teamId));
    setUsers(prev => prev.map(user => 
      user.teamId === teamId ? { ...user, teamId: '' } : user
    ));
  };

  const removeUserFromTeam = (userId: string, teamId: string) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId && user.teamId === teamId
          ? { ...user, teamId: '' }
          : user
      )
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ teams, users: users.map(user =>
      user.id === userId && user.teamId === teamId
        ? { ...user, teamId: '' }
        : user
    ) }));
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ 
      teams, 
      users: users.filter(user => user.id !== userId) 
    }));
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(user =>
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
  };

  return (
    <TeamContext.Provider value={{ 
      teams, 
      users, 
      addTeam, 
      addUser, 
      updateUser,
      removeTeam, 
      removeUserFromTeam,
      deleteUser,
      toggleUserStatus
    }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
}; 