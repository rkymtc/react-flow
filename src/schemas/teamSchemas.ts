import { z } from 'zod';

export const teamSchema = z.object({
  name: z.string().min(1, 'Team name is required'),
  description: z.string().optional(),
});

export const userSchema = z.object({
  name: z.string().min(1, 'User name is required'),
  role: z.string().min(1, 'Role is required'),
  teamId: z.string().min(1, 'Team selection is required'),
});

export type TeamFormData = z.infer<typeof teamSchema>;
export type UserFormData = z.infer<typeof userSchema>; 