const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve static files FIRST (CSS, JS, images)
app.use(express.static(__dirname));

// Explicit route for home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Explicit route for analytics
app.get('/analytics', (req, res) => {
    res.sendFile(path.join(__dirname, 'analytics.html'));
});

app.get('/analytics.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'analytics.html'));
});

// Explicit route for tasks
app.get('/task', (req, res) => {
    res.sendFile(path.join(__dirname, 'task.html'));
});

app.get('/task.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'task.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🍅 AshDoro is running on port ${PORT}`);
});