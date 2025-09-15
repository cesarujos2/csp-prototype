import { Role } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
      role: Role;
      address: string | null;
      postalCode: string | null;
      profileComplete: boolean;
    };
  }

  interface User {
    id: string;
    role: Role;
    address?: string | null;
    postalCode?: string | null;
    profileComplete?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: Role;
    address?: string | null;
    postalCode?: string | null;
    profileComplete?: boolean;
  }
}