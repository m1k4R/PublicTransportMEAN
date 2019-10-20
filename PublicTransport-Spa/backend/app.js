const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const { mongoose } = require('./database');

//Middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

//Routes

app.use('/api/employees', require('./routes/employee.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/user', require('./routes/user.routes'));

/* app.use((req, res, next) => {
  console.log('First middleware');
  next();
});

app.use((req, res, next) => {
  res.send('Hello from express!');
}); */

app.post("/api/posts" ,(req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.use("/api/posts" ,(req, res, next) => {
  const posts = [
    {
      id: "5i4b6jj5knk",
      title: "First server-side post",
      content: "This is coming from the server"
    },
    {
      id: "jkn67k6l",
      title: "Second server-side post",
      content: "This is coming from the server too"
    }
  ];

  /* res.send('Hello from express!'); */
  res.status(200).json({
    message: "Posts Successfully!",
    posts: posts
  });
});



module.exports = app;
