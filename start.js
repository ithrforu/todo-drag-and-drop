const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, 'dist')));

app.get('*', (req, res) => {
  if(!req.path.includes('/api/')) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  }
});

app.listen(PORT, () => {
  console.log('React app started on port: ' + PORT);
});