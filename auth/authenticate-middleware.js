/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken')
const jwtConfig = require('./secrets')

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token){
    // check the token is valid
    jwt.verify(token, jwtConfig.jwtSecret, (err, decodedToken) => {
      
      if(err){
        // foul play
        res.status(401).json({message: "YOU SHALL NOT PASS!"})
      } else {
        // Token is gooooooooooood
        next();
      }

    })
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};
