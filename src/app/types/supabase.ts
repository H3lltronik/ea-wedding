export type RootInvitation = {
  id: string;
  name: string;
  invitations_amount: number;
  created_at?: string;
}

export type Guest = {
  id: string;
  root_invitation_id: string;
  name: string;
  age: number;
  created_at?: string;
}

export type ThemePreference = {
  id: string;
  guest_id: string;
  main_preference: 'star_wars' | 'harry_potter' | 'both' | 'none';
  house?: 'gryffindor' | 'slytherin' | 'hufflepuff' | 'ravenclaw' | null;
  jedi_sith?: 'jedi' | 'sith' | null;
  created_at?: string;
} 