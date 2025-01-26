import React from 'react';
import { PieChart as RechartsChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useTeamOperations } from '../../hooks/useTeamOperations';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const PieChart = () => {
  const { teams, users } = useTeamOperations();

  const data = teams.map(team => ({
    name: team.name,
    value: users.filter(user => user.teamId === team.id).length,
  }));

  return (
    <RechartsChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </RechartsChart>
  );
}; 