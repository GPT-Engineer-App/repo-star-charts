require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Repository Schema
const repoSchema = new mongoose.Schema({
  url: String,
  stars: [{ date: Date, count: Number }]
});

const Repo = mongoose.model('Repo', repoSchema);

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Register Route
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword
    });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch {
    res.status(500).send('Error registering user');
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user == null) {
    return res.status(400).send('Cannot find user');
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
      res.json({ accessToken: accessToken });
    } else {
      res.send('Not Allowed');
    }
  } catch {
    res.status(500).send('Error logging in');
  }
});

// Fetch GitHub Stars Route
app.post('/fetch-stars', authenticateToken, async (req, res) => {
  const { repo1, repo2 } = req.body;

  try {
    const data1 = await fetchStars(repo1);
    const data2 = await fetchStars(repo2);

    res.json({ repo1: data1, repo2: data2 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function fetchStars(repoUrl) {
  const existingRepo = await Repo.findOne({ url: repoUrl });
  if (existingRepo) {
    return existingRepo.stars;
  }

  const [owner, repo] = repoUrl.split('/').slice(-2);
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/stargazers`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3.star+json'
      }
    });

    const stars = response.data.map(item => ({
      date: new Date(item.starred_at),
      count: item.user.id // This is a simplification, actual count would require more complex logic
    }));

    const newRepo = new Repo({ url: repoUrl, stars });
    await newRepo.save();

    return stars;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('Repository not found or not public');
    }
    throw error;
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
