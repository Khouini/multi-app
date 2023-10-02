const { users, cookie } = require('../config/config');
const { validateAndRenewToken, generateToken } = require('../services/jwt');

const { createUser, getUserById, addToken, removeToken } = require('../services/dbOpearations');
const { isAuthenticated } = require('../middlewares/authentication');
exports.login = async (req, res) => {
  // Implement your actual authentication logic here
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.send('Login failed. Please try again.');
  }

  const token = generateToken(user);

  // create a new user in the database if the user doesn't exist we add a token to the user

  const userInDb = await getUserById(user.id);
  console.log("🚀 ~ file: auth.js:21 ~ userInDb:", userInDb);
  if (!userInDb) {
    createUser(user.id, user.username, user.apiKey, [token]);
  } else {
    addToken(user.id, token);
  }

  // Set the JWT token as an HTTP-only cookie with the Domain attribute
  res.cookie('token', token, cookie);

  res.redirect('/');
};

exports.loginPage = (req, res) => {
  console.log("Calling login page");
  const token = req.cookies.token; // Retrieve the token from the cookie
  console.log("token:", token);

  if (!token) {
    console.log("No token found, redirecting to login page");
    return res.render('login');
  }

  isAuthenticated(req, res, () => {
    // If authenticated, redirect to the home page
    console.log("User is authenticated, redirecting to home page");
    return res.redirect('/');
  });
};

exports.logout = async (req, res) => {
  try {
    await removeToken(req.cookies.token);
  } catch (error) {
    return res.redirect('/login');
  }
  // Clear the JWT token by setting an expired cookie
  res.cookie('token', '', { expires: new Date(0) });

  res.redirect('/login'); // Redirect to the login page after logout
};





