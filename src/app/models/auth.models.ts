export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  accessTokenExpiresAt: string;
}

export interface UserProfile {
  message: string;
  userId: string;
  username: string;
  role: string;
}