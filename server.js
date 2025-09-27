const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const dbPath = path.join(__dirname, 'database.json');

function loadUsers() {
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

function saveUsers(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Create account
app.post('/api/create', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Missing username or password' });

    const data = loadUsers();
    if (data.users.find(u => u.username === username)) return res.status(400).json({ error: 'Username already exists' });

    data.users.push({ username, password });
    saveUsers(data);
    res.json({ message: 'Account created successfully' });
});

// Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Missing username or password' });

    const data = loadUsers();
    const user = data.users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    res.json({ message: 'Login successful' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
