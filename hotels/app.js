// hotelsApp/hotelsApp.js
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 8002;
const cookieParser = require('cookie-parser'); // Add cookie-parser
const ejs = require('ejs'); // Import EJS

app.set('view engine', 'ejs');

// Use cookie-parser middleware
app.use(cookieParser());

// Secret key for JWT (must match the key in the main app)
const jwtSecret = 'your-secret-key'; // Use the same secret key as in the main app

// Middleware to verify JWT token
function isAuthenticated(req, res, next) {
  const token = req.cookies.token; // Retrieve the token from the cookie
  if (!token) {
    return res.redirect('http://localhost:8000/login'); // Redirect to login if no token is provided
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.redirect('http://localhost:8000/login'); // Redirect to login if the token is invalid
    }
    //* we check also for token existence in the redis database for more security
    //* we search in the redis database for the user's api key by using the token because it is unique
    //* req.user.apiKey = getFromRedis(token).apiKey
    req.user = user;
    next();
  });
}

// Protected route (index) in the /hotels app
app.get('/', isAuthenticated, (req, res) => {
  // Only accessible if the user is authenticated with a valid token
  console.log("Logged User: ", req.user);
  //* we have req.user.apiKey
  //* With the api key we can make a request to the hotels api. beacuase the apikey must not be present in the frontend (even token payload is visible in the frontend)
  res.render('index');
});

app.listen(port, () => {
  console.log(`/hotels app is running on port ${port}`);
});
