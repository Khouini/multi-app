const express = require('express');
const cors = require('cors');

const connectToDatabase = require('./config/mongo'); // Import the connection function
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // Add cookie-parser
const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/auth');


app.use(
  cors({
    origin: 'http://localhost', // Replace with your main app's domain
    credentials: true,
  })
);


// Set EJS as the view engine
app.set('view engine', 'ejs');

// Parse request bodies as JSON
app.use(bodyParser.urlencoded({ extended: false }));

// Use cookie-parser middleware
app.use(cookieParser());

// Main app routes
app.use('/', mainRoutes);
app.use('/', authRoutes); // Use a prefix for authentication routes

connectToDatabase(); // Connect to the database
// Start the main app on port 8000
app.listen(port, () => {
  console.log(`Main app is running on port ${port}`);
});
