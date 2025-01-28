

export interface User {
  id: string;
  name: string;
  role: string;
  teamId: string;
  isActive: boolean;
}

export interface Team {
  id: string;
  name: string;
  description: string;
}

export interface TeamNodeData {
  label: string;
  isExpanded: boolean;
  description: string;
  onToggle: () => void;
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

export interface TeamFormData {
  name: string;
  description: string;
}

export interface UserFormData {
  name: string;
  role: string;
  teamId: string;
}

export interface TeamContextType {
  teams: Team[];
  users: User[];
  addTeam: (team: Team) => void;
  addUser: (user: User) => void;
  updateUser: (userId: string, updatedUser: Partial<User>) => void;
  removeTeam: (teamId: string) => void;
  removeUserFromTeam: (userId: string, teamId: string) => void;
  deleteUser: (userId: string) => void;
  toggleUserStatus: (userId: string) => void;
}