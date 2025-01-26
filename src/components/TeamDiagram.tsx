import React, { useState } from 'react';
import ReactFlow, { 
  Node, 
  Edge,
  Controls,
  Background,
  NodeMouseHandler
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useTeam } from '../context/TeamContext';

export const TeamDiagram: React.FC = () => {
  const { teams, users, removeUserFromTeam } = useTeam();
  const [hiddenTeams, setHiddenTeams] = useState<string[]>([]);

  const nodes: Node[] = [
    ...teams.map(team => ({
      id: team.id,
      type: 'team',
      data: { label: team.name },
      position: { x: 100, y: 100 * teams.indexOf(team) }
    })),
    ...users
      .filter(user => !hiddenTeams.includes(user.teamId))
      .map(user => ({
        id: user.id,
        type: 'user',
        data: { label: `${user.name} (${user.role})` },
        position: { x: 300, y: 100 * users.indexOf(user) }
      }))
  ];

  const edges: Edge[] = users
    .filter(user => !hiddenTeams.includes(user.teamId))
    .map(user => ({
      id: `${user.teamId}-${user.id}`,
      source: user.teamId,
      target: user.id
    }));

  const onNodeContextMenu: NodeMouseHandler = (event, node) => {
    event.preventDefault();
    if (node.type === 'team') {
      setHiddenTeams(prev => 
        prev.includes(node.id) 
          ? prev.filter(id => id !== node.id)
          : [...prev, node.id]
      );
    } else if (node.type === 'user') {
      const user = users.find(u => u.id === node.id);
      if (user) removeUserFromTeam(user.id, user.teamId);
    }
  };

  const layout = {
    padding: 50,
    includeHiddenNodes: false,
    minX: 0,
    minY: 0
  };

  return (
    <div style={{ height: 600 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeContextMenu={onNodeContextMenu}
        fitView
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        minZoom={0.5}
        maxZoom={2}
        fitViewOptions={layout}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}; 