export interface SpotifyUserProfile {
  id: string;
  display_name: string | null;
  email?: string;
  country?: string;
  product?: string;
  images?: { url: string }[];
  external_urls?: { spotify?: string };
}
