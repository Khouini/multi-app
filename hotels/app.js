const express = require('express');
const app = express();
const port = 8002;
const cookieParser = require('cookie-parser'); // Add cookie-parser
const ejs = require('ejs'); // Import EJS
const hotelsRoutes = require('./routes/hotels');

app.set('view engine', 'ejs');

// Use cookie-parser middleware
app.use(cookieParser());

// Main app routes
app.use('/hotels', hotelsRoutes); // Use a prefix for hotels app routes

app.listen(port, () => {
  console.log(`/hotels app is running on port ${port}`);
});
