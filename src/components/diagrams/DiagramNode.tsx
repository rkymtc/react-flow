import React from 'react';
import { Handle, Position } from 'reactflow';
import { NodeProps } from '../../types/team';


export const DiagramNode: React.FC<NodeProps> = ({ data, type }) => (
  <div className={`diagram-node ${type}`}>
    <Handle type="target" position={Position.Left} />
    {data.label}
    <Handle type="source" position={Position.Right} />
  </div>
); 