const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
// DB access file
const Users = require('../database/helpers/users-helpers');
// Custom Middleware
const check = require('./auth-middleware');
// JWT secret
const jwtCofig = require('./secrets')

router.post('/register', check.checkRegister, (req, res) => {
  
  // Grab the incoming req body
  const reqUser = req.body
  
  // Hash the password for the body
  const newUser = {
    ...reqUser,
    password: bcrypt.hashSync(reqUser.password)
  }

  // insert the new user and return the newly created user
  Users.createUser(newUser)
    .then(user => res.status(201).json({data: user}))
    .catch(err => res.status(500).json({message: "The server ran into a issue while creating the user", err}))
})

// Login a user and give them a token
router.post('/login', (req, res) => {
    
    const {username, password} = req.body;

    // find a user
    Users.findBy({ username })
      .first()
      .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){ //check the password provided
          const token = generateToken(user) //generate a token for the user
          
          res.status(200)
            .json({
              message: "You are now signed in!",
              token: token
            })

        } else {
          res.status(401).json({message: "You have provided the wrong credentials"})
        }
      })
      .catch(err => res.status(500).json({message: "The DB ran into a issue", err}))
})

// used to generate a JWT
function generateToken(user){
  
  const payload = {
    subject: user.id,
    username: user.username,
  }
  
  const options = {
    expiresIn: '1d',
  }

  return jwt.sign(payload, jwtCofig.jwtSecret, options)
}

module.exports = router;