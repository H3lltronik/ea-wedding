export interface Database {
  public: {
    Tables: {
      root_invitations: {
        Row: {
          id: string;
          created_at: string;
          name: string | null;
          invitations_amount: number | null;
          menu: string | null;
          table_number: string | null;
          gender: string | null;
          has_answered: boolean | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name?: string | null;
          invitations_amount?: number | null;
          menu?: string | null;
          table_number?: string | null;
          gender?: string | null;
          has_answered?: boolean | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string | null;
          invitations_amount?: number | null;
          menu?: string | null;
          table_number?: string | null;
          gender?: string | null;
          has_answered?: boolean | null;
        };
      };
      guests: {
        Row: {
          id: string;
          created_at: string;
          root_invitation_id: string | null;
          name: string | null;
          is_root: boolean | null;
          attending: boolean | null;
          is_fixed: boolean | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          root_invitation_id?: string | null;
          name?: string | null;
          is_root?: boolean | null;
          attending?: boolean | null;
          is_fixed?: boolean | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          root_invitation_id?: string | null;
          name?: string | null;
          is_root?: boolean | null;
          attending?: boolean | null;
          is_fixed?: boolean | null;
        };
      };
    };
  };
} 