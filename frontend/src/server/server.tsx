import path from 'path';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the static files
app.use(express.static(path.join(__dirname, '../dist')));

// Serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
