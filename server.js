const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/health', (_req, res) => res.json({ status: 'ok', app: 'DevGuard', timestamp: new Date().toISOString() }));
app.post('/api/checklist', (req, res) => {
  const { completed } = req.body || {};
  if (!Array.isArray(completed) || completed.some(v => typeof v !== 'string')) return res.status(400).json({ error: 'completed must be an array of strings' });
  res.json({ received: completed.length, message: 'Checklist progress received.' });
});
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
app.listen(PORT, () => console.log(`DevGuard running at http://localhost:${PORT}`));
