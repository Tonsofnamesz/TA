export interface UserRole {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  roles: UserRole[];
}

export interface LoginResponse {
  user: User;
  token: string;
}