import { Team, User } from '../types/team';

export type TeamAction =
  | { type: 'ADD_TEAM'; payload: Omit<Team, 'id'> & { id: string } }
  | { type: 'ADD_USER'; payload: Omit<User, 'id'> & { id: string } }
  | { type: 'REMOVE_USER'; payload: string }
  | { type: 'REMOVE_USER_FROM_TEAM'; payload: { userId: string; teamId: string } };

export interface TeamState {
  teams: Team[];
  users: User[];
}

export const teamReducer = (state: TeamState, action: TeamAction): TeamState => {
  switch (action.type) {
    case 'ADD_TEAM':
      return {
        ...state,
        teams: [...state.teams, action.payload]
      };
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      };
    case 'REMOVE_USER_FROM_TEAM':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.userId && user.teamId === action.payload.teamId
            ? { ...user, teamId: '' }
            : user
        )
      };
    default:
      return state;
  }
}; 