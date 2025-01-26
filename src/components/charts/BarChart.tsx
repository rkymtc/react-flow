import React from 'react';
import { BarChart as RechartsChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useTeamOperations } from '../../hooks/useTeamOperations';

export const BarChart = () => {
  const { teams, users } = useTeamOperations();

  const data = teams.map(team => ({
    name: team.name,
    users: users.filter(user => user.teamId === team.id).length,
  }));

  return (
    <RechartsChart width={500} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="users" fill="#8884d8" />
    </RechartsChart>
  );
}; 