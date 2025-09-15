export enum Role {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MONITORING = 'MONITORING',
  OFFICER = 'OFFICER',
  USER = 'USER'
}

export interface AuthUser {
  id: string;
  name?: string | null;
  email: string;
  image?: string | null;
  role: Role;
  address?: string | null;
  postalCode?: string | null;
  profileComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthSession {
  user: AuthUser;
  expires: string;
}