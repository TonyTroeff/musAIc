import { getAuth } from '@clerk/express';

// API-friendly guard: responds with 401 JSON instead of redirecting to sign-in.
export default function requireUser(req, res, next) {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  req.userId = userId;
  next();
}
