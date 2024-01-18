const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = socketIo(server);

// Use the existing SQLite database file
const db = new sqlite3.Database('./db/idol.db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/submit', (req, res) => {
  const { name } = req.body;

  // Insert data into the 'names' table
  db.run('INSERT INTO names (name) VALUES (?)', [name], function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row inserted with id ${this.lastID}`);
    res.send('Data stored successfully');
  });
});

io.on('connection', (socket) => {
  console.log('A client connected');

  socket.on('npmStop', () => {
    console.log('Received npmStop signal. Shutting down gracefully...');
    server.close(() => {
      console.log('Server closed. Exiting process.');
      process.exit(0);
    });
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
