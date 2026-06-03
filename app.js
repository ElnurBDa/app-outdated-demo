const express = require('express');
const _ = require('lodash');
const minimist = require('minimist');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const args = minimist(process.argv.slice(2));
const PORT = args.port || 4000;
const SECRET = 'demo-secret';

app.get('/', (req, res) => {
	res.send('Vulnerable demo app running');
});

// Uses lodash merge (vulnerable to prototype pollution in 4.17.4)
app.post('/merge', (req, res) => {
	const target = {};
	_.merge(target, req.body);
	res.json(target);
});

// Uses axios (SSRF in old versions)
app.get('/fetch', async (req, res) => {
	try {
		const r = await axios.get(req.query.url);
		res.send(r.data);
	} catch (e) {
		res.status(500).send(e.message);
	}
});

// JWT signing (algorithm confusion in old jsonwebtoken)
app.post('/token', (req, res) => {
	const token = jwt.sign({ user: req.body.user }, SECRET);
	res.json({ token });
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
