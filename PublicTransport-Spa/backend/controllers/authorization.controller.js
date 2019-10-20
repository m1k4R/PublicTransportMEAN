const authorizationController = {};

const User = require('../models/user');
const UserModel = User.model;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

authorizationController.register = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new UserModel({
        userName: req.body.userName,
        userType: req.body.userType,
        email: req.body.email,
        password: hash,
        name: req.body.name,
        surname: req.body.surname,
        city: req.body.city,
        street: req.body.street,
        number: req.body.number,
        dateOfBirth: req.body.dateOfBirth,
        documentUrl: req.body.documentUrl,
        accountStatus: req.body.accountStatus,
        publicId: req.body.publicId,
        verified: req.body.verified,
        tickets: req.body.tickets,
        userRole: 'Passenger'
      });
      user.save()
        .then(result => {
          res.status(201).json({
            'status': 'User Created',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
};

authorizationController.login = async (req, res) => {
  let loginUser;
  await UserModel.find({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(401).json({
        message: 'Login Failed'
      });
    }
    console.log(user.password);     // undefined
    console.log(user[0].password);  // good
    loginUser = user;
    return bcrypt.compare(req.body.password, user[0].password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: 'Login Failed'
      });
    }
    // create web token
    console.log(loginUser.email);     // undefined
    console.log(loginUser[0].email);  // good
    const token = jwt.sign(
      { email: loginUser[0].email, userId: loginUser[0]._id, userRole: loginUser[0].userRole },
      'secret_pass_moi',
      { expiresIn: '1h' }
    );
    res.status(200).json({
      token: token,
      user: loginUser
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: 'Login Failed'
    });
  });


  /* const user = await UserModel.find({ email: req.body.email });
  console.log(user);
  console.log(user[0].password);
  console.log(req.body.password);
  if(bcrypt.compare(req.body.password, user[0].password))
  {
    console.log('jednake su');
    res.json(user);
  }

  res.json({
    'status': 'Login Failed'
  }); */
};

module.exports = authorizationController;
