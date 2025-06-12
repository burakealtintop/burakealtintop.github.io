const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5500;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const DATA_FILE = 'posts.json';

// Blog yazılarını getir
app.get('/posts', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Hata');
    res.json(JSON.parse(data || '[]'));
  });
});

// Yeni yazı ekle
app.post('/posts', (req, res) => {
  const newPost = req.body;
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    const posts = data ? JSON.parse(data) : [];
    posts.unshift(newPost);
    fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2), (err) => {
      if (err) return res.status(500).send('Kaydedilemedi');
      res.status(201).send('OK');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});