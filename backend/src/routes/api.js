import { Router } from 'express';
import requireUser from '../middleware/requireUser.js';
import { spotifyFetch } from '../services/spotify.js';

const router = Router();

router.get('/me', requireUser, async (req, res) => {
  const profile = await spotifyFetch(req.userId, '/me');

  res.json({
    clerkUserId: req.userId,
    spotify: {
      id: profile.id,
      displayName: profile.display_name,
      email: profile.email,
      country: profile.country,
      product: profile.product,
      imageUrl: profile.images?.[0]?.url ?? null,
      profileUrl: profile.external_urls?.spotify ?? null,
    },
  });
});

export default router;
