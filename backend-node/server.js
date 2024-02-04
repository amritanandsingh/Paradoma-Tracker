// server.js
const express = require('express');
const app = express();
const port = 3000;
const db = require("./config/mongoose");
const cors = require('cors');
const jsonwebtoken = require('jsonwebtoken');
const jwksRsa = require("jwks-rsa");

const authConfig = {
  domain: 'dev-7d0ygutb8yledbnb.us.auth0.com',
  audience: 'sr90NTWpUqYxMBupqN2L8HRDz4rDbAyM',
};

app.use(cors());
app.use(express.json());

const checkJwt = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  jsonwebtoken.verify(token, jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }), (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

app.use("/", require("./routes/index"));

app.get('/hello', checkJwt, (req, res) => {
  res.json({ message: 'Hello, this is a simple Express API!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
