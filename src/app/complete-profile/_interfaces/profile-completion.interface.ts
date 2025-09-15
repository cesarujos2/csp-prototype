// API response types
export interface ProfileCompletionResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    name: string;
    address: string;
    postalCode: string;
    profileComplete: boolean;
  };
}

export interface ProfileCompletionError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}