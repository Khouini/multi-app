
const { validateAndRenewToken } = require('../services/jwt.js');
const cookieConfig = require('../config/config').cookie;
exports.isAuthenticated = async (req, res, next) => {
    console.log("Calling isAuthenticated");
    const token = req.cookies.token; // Retrieve the token from the cookie
    console.log("🚀 ~ file: authentication.js:7 ~ exports.isAuthenticated= ~ token:", token);

    if (!token) {
        console.log("No token found, redirecting to login page");
        return res.redirect('/login'); // Redirect to login if no token is provided
    }

    try {
        const { newToken, user } = await validateAndRenewToken(token);
        console.log(`User is authenticated, new token is ${newToken}`);

        res.cookie('token', newToken, cookieConfig);

        req.user = user;
        console.log("isAuthenticated: calling next");
        next();
    } catch (err) {
        console.log("🚀 ~ file: authentication.js:26 ~ exports.isAuthenticated= ~ err:", err);
        // Token is invalid, so clear the token and then redirect to login
        res.cookie('token', '', { expires: new Date(0) });
        return res.redirect('/login');
    }
};
