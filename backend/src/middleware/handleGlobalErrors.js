// Express recognizes error handlers by their 4-argument signature, so `next` must stay.
export default function handleGlobalErrors(err, req, res, next) {
  if (!err.status) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }

  res.status(err.status).json({ error: err.message });
}
