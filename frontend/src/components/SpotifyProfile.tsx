import { useEffect, useState } from 'react';
import type { MeResponse, ApiError } from '../../../backend/src/types/api';

export default function SpotifyProfile() {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    // Same origin: the Clerk session cookie is sent automatically.
    fetch('/api/me')
      .then(async (res) => {
        if (!res.ok) {
          const body: ApiError = await res.json();
          throw new Error(body.error ?? `Request failed (${res.status})`);
        }
        const body: MeResponse = await res.json();
        return body;
      })
      .then((body) => !ignore && setMe(body))
      .catch((err: unknown) => {
        if (!ignore) setError(err instanceof Error ? err.message : 'Unknown error');
      });

    return () => {
      ignore = true;
    };
  }, []);

  if (error) return <p role="alert">Could not load your Spotify profile: {error}</p>;
  if (!me) return <p>Loading your Spotify profile…</p>;

  const { spotify } = me;

  return (
    <section aria-label="Spotify profile">
      {spotify.imageUrl && <img src={spotify.imageUrl} alt="" width={64} height={64} />}
      <h2>{spotify.displayName}</h2>
      <dl>
        <dt>Email</dt>
        <dd>{spotify.email}</dd>
        <dt>Country</dt>
        <dd>{spotify.country}</dd>
        <dt>Plan</dt>
        <dd>{spotify.product}</dd>
      </dl>
      {spotify.profileUrl && (
        <a href={spotify.profileUrl} target="_blank" rel="noreferrer">
          Open in Spotify
        </a>
      )}
    </section>
  );
}
