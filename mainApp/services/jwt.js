const { updateTokenByToken, getUserByToken, removeToken } = require('../services/dbOpearations');
const jwtSecret = 'your-secret-key';
const jwt = require('jsonwebtoken');

async function validateAndRenewToken(token) {
    try {
        console.log("Calling validateAndRenewToken");
        const tokenVerif = verifyToken(token);
        // very token exist in the database

        if (!tokenVerif) {
            const tokenRemove = await removeToken(token);
            console.log(`Token ${token} is not valid, removed from the database`, `Token removed: ${tokenRemove}`);
            throw new Error('Token is not valid');

        }
        const user = await getUserByToken(token);

        if (!user) {
            throw new Error('Token not found in the database');
        }
        // Token is valid, so refresh it and send a new one
        const newToken = generateToken(user);

        // Update the token in the database
        await updateTokenByToken(token, newToken);

        return { newToken, user };
    } catch (err) {
        throw err;
    }
}

const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, jwtSecret, {
        expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
    });
};

const verifyToken = (token) => {
    try {
        jwt.verify(token, jwtSecret);
        return true; // Token is valid
    } catch (err) {
        return false; // Token is not valid
    }
};


module.exports = {
    validateAndRenewToken,
    generateToken,
    verifyToken

};