const axios = require('axios'); // Import Axios for making HTTP requests

exports.isAuthenticated = async (req, res, next) => {
  try {
    // Make a GET request to the checkAuth endpoint
    console.log(`Calling checkAuth with token ${req.cookies.token}`);
    const response = await axios.get('http://localhost:8000/checkAuth');

    console.log("CheckAuth response", response);
    // If the token is valid, call next()
    if (response.status === 200) {
      return next();
    }
    throw new Error('End of isAuthenticated middleware without calling next()');
  } catch (error) {
    console.log("🚀 ~ file: authentication.js:16 ~ exports.isAuthenticated= ~ error:", error?.response?.data);
    // If there's an error or the token is not valid, redirect to the login page
    // res.redirect('http://localhost:8000/login'); // Change '/login' to the actual login page URL
    return res.status(401).send({ message: error?.response?.data?.message || error.message });
  }
};
