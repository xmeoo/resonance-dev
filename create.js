import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Missing username or password' });
    }

    const dbPath = path.join(process.cwd(), 'database.json');
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    const exists = data.users.find(u => u.username === username);
    if (exists) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    data.users.push({ username, password });
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

    res.status(200).json({ message: 'Account created successfully' });
}
