import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import { useTeam } from '../context/TeamContext';
import { Box } from '@mui/material';

export const TeamCharts: React.FC = () => {
  const { teams, users } = useTeam();

  const pieData = teams.map(team => ({
    id: team.name,
    label: team.name,
    value: users.filter(user => user.teamId === team.id).length,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`
  }));

  const barData = teams.map(team => ({
    team: team.name,
    users: users.filter(user => user.teamId === team.id).length
  }));

  return (
    <Box sx={{ display: 'flex', gap: 4, height: 400 }}>
      <Box sx={{ flex: 1 }}>
        <ResponsivePie
          data={pieData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <ResponsiveBar
          data={barData}
          keys={['users']}
          indexBy="team"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
        />
      </Box>
    </Box>
  );
}; 