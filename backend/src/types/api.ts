export interface ApiError {
  error: string;
}

export interface MeResponse {
  clerkUserId: string;
  spotify: {
    id: string;
    displayName: string | null;
    email?: string;
    country?: string;
    product?: string;
    imageUrl: string | null;
    profileUrl: string | null;
  };
}
