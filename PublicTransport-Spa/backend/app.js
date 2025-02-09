const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const { mongoose } = require('./database');

const User = require('./models/user');
const UserModel = User.model;
const bcrypt = require('bcrypt');

//Middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')));

//CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

// Load Data
const find = async () => {
  try {
    // Admin
    const admin = await UserModel.find({ userRole: 'Admin' });
    console.log(admin.length);
    if (admin.length == 0) {
      bcrypt.hash('admin', 10)
        .then(hash => {
          const user = new UserModel({
            email: 'admin@gmail.com',
            password: hash,
            userRole: 'Admin'
          });
          user.save();
        });
    }

    // Controller
    const controller = await UserModel.find({ userRole: 'Controller' });
    console.log(controller.length);
    if (controller.length == 0) {
      bcrypt.hash('controller', 10)
        .then(hash => {
          const user = new UserModel({
            email: 'controller@gmail.com',
            password: hash,
            userRole: 'Controller'
          });
          user.save();
        });
    }
  } catch {
    console.log('some error');
  }
}

find();

//Routes

app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/authorization', require('./routes/authorization.routes'));
app.use('/api/moderator', require('./routes/moderator.routes'));

module.exports = app;
