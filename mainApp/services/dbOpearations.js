const User = require('../models/userModel'); // Assuming 'userModel.js' is where your User model is defined

// Function to create a new user
async function createUser(id, username, apiKey, tokens) {
    try {
        const newUser = new User({
            id,
            username,
            apiKey,
            tokens,
        });
        await newUser.save();
        return newUser;
    } catch (error) {
        throw error;
    }
}

// Function to get a user by a token
async function getUserByToken(token) {
    try {
        const user = await User.findOne({ tokens: token });
        return user;
    } catch (error) {
        throw error;
    }
}

async function getUserById(userId) {
    try {
        const user = await User.findOne({ id: userId });
        return user;
    } catch (error) {
        throw error;
    }
}

// Function to update tokens by a token
async function updateTokenByToken(oldToken, newToken) {
    try {
        // Find and update the user document where the 'tokens' array contains the oldToken
        const user = await User.findOneAndUpdate(
            { tokens: oldToken },      // Find the user by the oldToken
            { $set: { 'tokens.$': newToken } }, // Set the first occurrence of oldToken in 'tokens' to newToken
            { new: true }             // Return the updated user document
        );

        // If no user is found or oldToken is not found in user's tokens, throw an error
        if (!user) {
            throw new Error('User not found or token not found');
        }

        // Return the updated user document
        return user;
    } catch (error) {
        throw error;
    }
}


async function addToken(userId, newToken) {
    try {
        const user = await User.findOne({ id: userId });

        if (!user) {
            throw new Error('User not found');
        }

        user.tokens.push(newToken); // Add the new token to the user's tokens array
        await user.save(); // Save the updated user document

        return user;
    } catch (error) {
        throw error;
    }
}

async function removeToken(tokenToRemove) {
    try {
        const user = await User.findOne({ tokens: tokenToRemove });

        if (!user) {
            throw new Error('User not found or token not found in user\'s tokens');
        }

        user.tokens = user.tokens.filter(token => token !== tokenToRemove); // Remove the specified token from the array
        await user.save(); // Save the updated user document

        return user;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    createUser,
    getUserByToken,
    updateTokenByToken,
    getUserById,
    addToken,
    removeToken,
};
