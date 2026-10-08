import { Router } from 'express';
import requireUser from '../middleware/requireUser.js';
import { spotifyFetch } from '../services/spotify.js';
import type { MeResponse, ApiError } from '../types/api.js';
import type { SpotifyUserProfile } from '../types/spotify.js';

const router = Router();

router.get('/me', requireUser, async (req, res) => {
  const userId = res.locals.userId;
  if (typeof userId !== 'string') {
    res.status(401).json({ error: 'Unauthorized' } satisfies ApiError);
    return;
  }
  const profile = await spotifyFetch<SpotifyUserProfile>(userId, '/me');

  res.json({
    clerkUserId: userId,
    spotify: {
      id: profile.id,
      displayName: profile.display_name,
      email: profile.email,
      country: profile.country,
      product: profile.product,
      imageUrl: profile.images?.[0]?.url ?? null,
      profileUrl: profile.external_urls?.spotify ?? null,
    },
  } satisfies MeResponse);
});

export default router;
