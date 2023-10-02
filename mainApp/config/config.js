module.exports = {
  users: [
    { id: 1, username: 'admin', password: 'admin', apiKey: "xxx" },
    // Add more user data if needed
  ],
  cookie: {
    httpOnly: true,
    maxAge: 3600000, // Cookie expires in 1 hour (adjust as needed)
    domain: '.localhost', // Make the cookie available to all subdomains of localhost
    // path: '/', // Set the path to '/' to make it accessible from all routes
    // sameSite: 'None', // Adjust the SameSite attribute as needed,
  }
};
