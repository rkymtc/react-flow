import React from 'react';
import { Grid, Card, CardContent, CardHeader, Divider, Box } from '@mui/material';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import { useTeam } from '../context/TeamContext';

const ChartsPage = () => {
  const { teams, users } = useTeam();

  const pieData = teams.map(team => ({
    id: team.name,
    label: team.name,
    value: users.filter(user => user.teamId === team.id).length,
  }));

  const barData = teams.map(team => {
    const teamUsers = users.filter(user => user.teamId === team.id);
    const roles = new Map<string, number>();
    
    teamUsers.forEach(user => {
      roles.set(user.role, (roles.get(user.role) || 0) + 1);
    });

    return {
      team: team.name,
      ...Object.fromEntries(roles.entries()),
    };
  });

  const allRoles = Array.from(
    new Set(users.map(user => user.role))
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Team Size Distribution" />
          <Divider />
          <CardContent>
            <Box sx={{ height: 400 }}>
              <ResponsivePie
                data={pieData}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.6}
                padAngle={0.5}
                cornerRadius={8}
                activeOuterRadiusOffset={8}
                colors={{ scheme: 'category10' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#94a3b8"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor="#f1f5f9"
                theme={{
                  text: {
                    fill: '#94a3b8',
                  },
                  tooltip: {
                    container: {
                      background: '#1e293b',
                      color: '#f1f5f9',
                      fontSize: 12,
                    },
                  },
                }}
                defs={[
                  {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                  },
                ]}
                fill={[{ match: '*', id: 'dots' }]}
                motionConfig="gentle"
                transitionMode="pushIn"
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Role Distribution by Team" />
          <Divider />
          <CardContent>
            <Box sx={{ height: 400 }}>
              <ResponsiveBar
                data={barData}
                keys={allRoles}
                indexBy="team"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'category10' }}
                borderRadius={4}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: -45,
                  legend: 'Teams',
                  legendPosition: 'middle',
                  legendOffset: 45,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Number of Members',
                  legendPosition: 'middle',
                  legendOffset: -40,
                }}
                theme={{
                  text: {
                    fill: '#94a3b8',
                  },
                  tooltip: {
                    container: {
                      background: '#1e293b',
                      color: '#f1f5f9',
                      fontSize: 12,
                    },
                  },
                  grid: {
                    line: {
                      stroke: '#334155',
                    },
                  },
                  axis: {
                    ticks: {
                      line: {
                        stroke: '#334155',
                      },
                      text: {
                        fill: '#94a3b8',
                      },
                    },
                    legend: {
                      text: {
                        fill: '#94a3b8',
                      },
                    },
                  },
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor="#f1f5f9"
                legends={[
                  {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    itemTextColor: '#94a3b8',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemOpacity: 1
                        }
                      }
                    ]
                  }
                ]}
                motionConfig="gentle"
                role="application"
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ChartsPage; 