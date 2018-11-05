const Joi = require('joi');
const db = require('../db/connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const users = db.get('users');
//it will be faster when we're quering for email
users.createIndex('email', {unique: true});

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

function respondError422(res, next, message) {
  res.status(422)
  const err = new Error(message);
  next(err);
};

function createTokenSendResponse(user, res, next) {
  const payload = {
    _id: user._id,
    email: user.email
  };
  jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: '1d'}, (err, token) => {
    if (err) {
      respondError422(res, next, 'Something went wrong');
    } else {
      res.json({user, token});
    }
  })
}

//SIGNUP
function signupUser(req, res, next) {
  const result = Joi.validate(req.body, schema)
  if (result.error === null) {
    //We check that the email is unique in the db
    users
      .findOne({email: req.body.email})
      .then(user =>{
        if (user) {
          //We already got a user with that email signed in
          const err = new Error('This email already exists. Please choose another one.');
          next(err);
        } else {
           //We add the user in the db
          bcrypt.hash(req.body.password, 12, (err, hash) => {
            if (err) {
              next(err);
            } else {
              const newUser = {email: req.body.email, hash};
              users
                .insert(newUser)
                .then(insertedUser => {
                  delete insertedUser.hash;
                  createTokenSendResponse(insertedUser, res, next);
                })
                .catch(err => next(err))
            }
          })
        }
      })
  } else {
    //res.status(404);
    next(result.error);
  }
}

//SIGNIN
function signinUser(req, res, next) {
  const result = Joi.validate(req.body, schema)
  if (result.error === null) {
    //Check if the email exists in the database
    users
      .findOne({email: req.body.email})
      .then(user =>{
        if (user) {
          bcrypt.compare(req.body.password, user.hash)
            .then(result => {
              if (result) {
                //Correct password
                delete user.hash;
                createTokenSendResponse(user, res, next);
              } else {
                //Wrong password
                respondError422(res, next, 'The Email or Password you entered is incorrect.');
              }
            })
        } else {
          respondError422(res, next, 'The Email or Password you entered is incorrect.');
        }
      })
  } else {
    respondError422(res, next, result.error);
  }
}


module.exports = {
  signupUser,
  signinUser
}