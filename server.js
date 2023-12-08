const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 8000;

const contentType = {
  '.html': 'text/html',
  // '.css': 'text/css',
  // '.js': 'application/javascript',
  // '.json': 'application/json',
  // '.png': 'image/png',
};

app.use(cors());

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('*', (req, res) => {
  const filePath = path.join(__dirname, 'public', req.url);

  res.sendFile(filePath, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.status(404).send('File Not Found');
      } else {
        res.status(500).send('Server Error');
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
