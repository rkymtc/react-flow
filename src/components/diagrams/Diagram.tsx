import React, { useState, useCallback } from 'react';
import ReactFlow, { 

  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionMode
} from 'reactflow';
import { TeamNode } from './TeamNode';
import { UserNode } from './UserNode';
import { useTeamOperations } from '../../hooks/useTeamOperations';
import 'reactflow/dist/style.css';




const nodeTypes = {
  team: TeamNode,
  user: UserNode,
};

export const Diagram = () => {
  const { teams, users, removeUserFromTeam } = useTeamOperations();
  const [expandedTeams, setExpandedTeams] = useState<Set<string>>(new Set());

  const initialNodes = teams.map(team => ({
    id: team.id,
    type: 'team',
    position: { x: 0, y: teams.indexOf(team) * 150 },
    data: {
      label: team.name,
      isExpanded: expandedTeams.has(team.id),
      onToggle: () => {
        setExpandedTeams(prev => {
          const next = new Set(prev);
          if (next.has(team.id)) {
            next.delete(team.id);
          } else {
            next.add(team.id);
          }
          return next;
        });
      }
    }
  }));

  const initialEdges = users
    .filter(user => expandedTeams.has(user.teamId))
    .map(user => ({
      id: `${user.teamId}-${user.id}`,
      source: user.teamId,
      target: user.id,
      type: 'smoothstep'
    }));

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const userNodes = users
    .filter(user => expandedTeams.has(user.teamId))
    .map(user => ({
      id: user.id,
      type: 'user',
      position: { x: 300, y: users.indexOf(user) * 100 },
      data: {
        label: user.name,
        role: user.role,
        onRemove: () => removeUserFromTeam(user.id, user.teamId)
      }
    }));

  const updateNodes = useCallback(() => {
    setNodes([...initialNodes, ...userNodes]);
    setEdges(initialEdges);
  }, [teams, users, expandedTeams]);

  React.useEffect(() => {
    updateNodes();
  }, [updateNodes]);

  const layout = {
    fitView: true,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50
  };

  return (
    <div style={{ height: 600 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionMode={ConnectionMode.Strict}
        fitViewOptions={layout}
        minZoom={0.5}
        maxZoom={2}
        nodesDraggable={false}
        elementsSelectable={false}
        snapToGrid
        snapGrid={[15, 15]}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}; 