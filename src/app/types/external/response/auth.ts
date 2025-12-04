export interface TokenResponse {
  access_token: string;
  access_token_token_expired: Date;
  token_type: string;
  expires_in: number;
}

export interface TokenRevokeResponse {
  code?: string;
  message?: string;
}

export interface SocketResponse {
  approval_key: string;
}
