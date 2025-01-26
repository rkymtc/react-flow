import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useTeamOperations } from '../../hooks/useTeamOperations';

export const TeamBarChart = () => {
  const { teams, users } = useTeamOperations();

  const barData = teams.map(team => ({
    team: team.name,
    users: users.filter(user => user.teamId === team.id).length
  }));

  return (
    <ResponsiveBar
      data={barData}
      keys={['users']}
      indexBy="team"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
    />
  );
}; 