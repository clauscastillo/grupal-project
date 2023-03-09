const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const User = require('../models/users.model');

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Established a connection to the database');
    User.findOne({admin: true})
    .then((res) => {
      if(res == null) {
        User.create({
          admin: true,
          name: 'admin',
          password: process.env.PW
        })
        .then(console.log('Admin creado'))
      }else {
        console.log('Admin existente')
      }
    })
    
  })
.catch(err => console.log("Something went wrong when connecting to the database", err));