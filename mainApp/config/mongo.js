// dbConfig.js

const mongoose = require('mongoose');

// Define the MongoDB connection URL (replace with your actual MongoDB URL)
const dbUrl = 'mongodb://127.0.0.1:27017/multi-app';

// Create a function to establish the MongoDB connection
async function connectToDatabase() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = connectToDatabase;
