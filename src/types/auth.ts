
export interface Profile {
  id: string;
  username: string;
  full_name?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthUser {
  id: string;
  email: string;
  profile?: Profile;
}
