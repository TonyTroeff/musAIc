import express from 'express';

const app = express();

app.use(express.json());

app.get('/healthcheck', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default app;
