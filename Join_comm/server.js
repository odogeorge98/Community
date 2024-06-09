const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rocketpower',
  database: 'community'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/add-user', (req, res) => {
  const { first_name, last_name, email } = req.body;
  const sql = 'INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?)';
  
  db.query(sql, [first_name, last_name, email], (err, result) => {
    if (err) {
      return res.status(500).send('Error: ' + err );
    }
    
    // Redirect the user to the chatroom join page
    res.redirect('http://localhost:7000/');
  });
});

  

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
