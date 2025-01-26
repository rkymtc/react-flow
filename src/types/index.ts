export interface User {
  id: string;
  name: string;
  role: string;
  teamId: string;
}

export interface UserNodeData {
  label: string;
  role: string;
  onRemove: () => void;
}

export interface NodeProps {
  data: {
    label: string;
  };
  type: 'team' | 'user';
}

export interface Team {
  id: string;
  name: string;
  description: string;
} 

export interface TeamNodeData {
  label: string;
  isExpanded: boolean;
  onToggle: () => void;
}
  