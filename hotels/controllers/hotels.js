exports.index = (req, res) => {
    // Only accessible if the user is authenticated with a valid token
    console.log("Logged User: ", req.user);
    // * You can use req.user.apiKey here to make requests to the hotels API
    res.render('index');
  };
  