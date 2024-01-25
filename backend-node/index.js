// server.js
const express = require('express');
const app = express();
const port = 3000;
const db = require("./config/mongoose");
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded());
app.use("/", require("./routes/index"));


app.get('/hello', (req, res) => {
  res.json({ message: 'Hello, this is a simple Express API!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
