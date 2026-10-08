import { useEffect, useState } from 'react';

export default function SpotifyProfile() {
  const [me, setMe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    // Same origin: the Clerk session cookie is sent automatically.
    fetch('/api/me')
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw new Error(body.error ?? `Request failed (${res.status})`);
        return body;
      })
      .then((body) => !ignore && setMe(body))
      .catch((err) => !ignore && setError(err.message));

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
