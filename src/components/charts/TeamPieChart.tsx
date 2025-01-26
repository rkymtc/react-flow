import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { useTeamOperations } from '../../hooks/useTeamOperations';

export const TeamPieChart = () => {
  const { teams, users } = useTeamOperations();

  const pieData = teams.map(team => ({
    id: team.name,
    label: team.name,
    value: users.filter(user => user.teamId === team.id).length,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`
  }));

  return (
    <ResponsivePie
      data={pieData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
    />
  );
}; 