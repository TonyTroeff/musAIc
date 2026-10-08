import { Show, SignInButton, UserButton } from '@clerk/react';
import SpotifyProfile from '../components/SpotifyProfile';

export default function Home() {
  return (
    <>
      <header>
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button type="button">Sign in with Spotify</button>
          </SignInButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
      <main>
        <h1>musAIc</h1>
        <p>Your personal music diary — explore and reflect on your Spotify listening habits.</p>
        <Show when="signed-in">
          <SpotifyProfile />
        </Show>
      </main>
    </>
  );
}
