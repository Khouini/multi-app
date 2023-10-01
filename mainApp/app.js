// mainApp/mainApp.js
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // Add cookie-parser

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Parse request bodies as JSON
app.use(bodyParser.urlencoded({ extended: false }));

// Use cookie-parser middleware
app.use(cookieParser());

// Secret key for JWT (replace with a strong secret)
const jwtSecret = 'your-secret-key';

// Simulated user data (replace with your user data)
const users = [
  { id: 1, username: 'admin', password: 'admin', apiKey: "xxx" },
];

// Generate a JWT token
function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, jwtSecret, {
    expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
  });
}

// Middleware to verify JWT token
function isAuthenticated(req, res, next) {
  const token = req.cookies.token; // Retrieve the token from the cookie
  if (!token) {
    return res.redirect('/login'); // Redirect to login if no token is provided
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.redirect('/login'); // Redirect to login if the token is invalid
    }

    req.user = user;
    next();
  });
}

// Main app routes
app.get('/', isAuthenticated, (req, res) => {
  res.render('index');
});

// Updated /login route to handle redirection
app.get('/login', (req, res) => {
  const token = req.cookies.token; // Retrieve the token from the cookie

  if (token) {
    //! if the user is already logged in, so we verify it and we redirect him to the index route
    jwt.verify(token, jwtSecret, (err, user) => {
      if (!err) {
        // Token is valid, so redirect to the index route
        return res.redirect('/');
      }
    });
  }

  res.render('login');
});

// POST route for login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Implement your actual authentication logic here
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.send('Login failed. Please try again.');
  }

  //! must add redis or mongo logic to store the user.apikey and in authentification we can get the api key from the database

  //* Also in every authentification(request) we can check if token exist in redis database for more security. for sure we must verify the token with its secret key

  const token =   generateToken(user);

  // Set the JWT token as an HTTP-only cookie with the Domain attribute
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 3600000, // Cookie expires in 1 hour (adjust as needed)
    domain: '.localhost', // Make the cookie available to all subdomains of localhost
  });

  res.redirect('/'); // Redirect to the index route after successful login
});


// Logout route
app.get('/logout', (req, res) => {
  // Clear the JWT token by setting an expired cookie
  res.cookie('token', '', { expires: new Date(0) });

  res.redirect('/login'); // Redirect to the login page after logout
});

// Start the main app on port 8000
app.listen(port, () => {
  console.log(`Main app is running on port ${port}`);
});
