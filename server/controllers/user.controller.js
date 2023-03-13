const User = require('../models/users.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = process.env.KEYJWT

module.exports = {

<<<<<<< HEAD
  getUser: async (req, res) => {
    const token = req.headers.user
    const user = jwt.verify(token, SECRET)
    User.findById(user._id)
      .then((response) => {
=======
    getUser: async(req, res) => {
      const token = req.headers.user
      const user = jwt.verify(token, SECRET)
      console.log(user)
      User.findById(user._id)
      .then((response) => {   
>>>>>>> main
        res.json(response)
      })
  },

<<<<<<< HEAD
  register: async (req, res) => {
    try {
      const nuevoUsuario = await User.create(req.body)
      const userToken = jwt.sign({ _id: nuevoUsuario._id }, SECRET)
      // res.status(201).cookie('userToken', userToken, {httpOnly:true, expires:new Date(Date.now() + 90000)})
      res.status(201).cookie('userToken', userToken, { httpOnly: true })
        .json({ successMessage: "Usuario registrado ", user: nuevoUsuario })
    } catch (error) {
      res.status(401).json(error)
    }
  },
  login: async (req, res) => {

    const user = await User.findOne({ email: req.body.email })
    console.log(user)
    if (!user) {
      res.status(400).json({ error: "Email/Password no valido" })
    }
    try {
      const passwordValida = await bcrypt.compare(req.body.password, user.password)
      if (!passwordValida) {
        res.status(400).json({ error: "Email/Password no valido" })
      } else {
        const userToken = jwt.sign({ _id: user._id }, SECRET)
        console.log(userToken)
        res.status(201).cookie('userToken', userToken, { httpOnly: true }).json({ successMessage: "Usuario logeado", user })
=======
    registerUser: async(req, res) => {
      try{
        User.findOne({email: req.body.email})
        .then(async(resdb) => {
          if (resdb) {
            res.status(400).json('email already exist')
          }else {
            const newUser = await User.create(req.body);
            console.log(newUser._id)
            const userToken = jwt.sign({_id:newUser._id}, SECRET)
            console.log(userToken)
            res.status(200).json({accessToken: userToken})
          }
        })
        
      }catch(error){
        res.status(404).json(error)
      }
    },
  
    loginUser: async (req, res)=>{
      const user = await User.findOne({email:req.body.email})
      if(!user){
          res.status(400).json({error: "Email no existe"})
>>>>>>> main
      }
    } catch (error) {
      res.status(400).json({ error: "Email/Password no valido" })

    }
  },
  isLogged: (req, res) => {
    console.log(req.cookies, "isLogged")
    res.json({ message: "Ok", active: true });

  },
  logOutUser: (req, res) => {
    console.log(req.cookies, "Request")
    console.log(res.cookies, "Response")
    // req.clearCookie('userToken')
    res.clearCookie('userToken')
    res.json({ success: 'Usuario salio' })

  },

  // registerUser: async(req, res) => {
  //   try{
  //     const newUser = await User.create(req.body);
  //     console.log(newUser._id)
  //     const userToken = jwt.sign({_id:newUser._id}, SECRET)
  //     console.log(userToken)
  //     res.status(200).json({accessToken: userToken})
  //   }catch(error){
  //     res.status(404).json(error)
  //   }
  // },

  // loginUser: async (req, res)=>{
  //   const user = await User.findOne({email:req.body.email})
  //   if(!user){
  //       res.status(400).json({error: "Email no existe"})
  //   }
  //   try{
  //       const passwordValida = await bcrypt.compare(req.body.password, user.password)
  //       if(!passwordValida){
  //           res.status(400).json({error: "Password incorrecto"})
  //       }else{

  //         const userToken = jwt.sign({_id: user._id}, SECRET) 
  //         res.json({accessToken: userToken}).status(200)
  //       }
  //   }catch(error){
  //     console.log(error)
  //   }
  // },

  loginUserInternal: async (req, res) => {
    const user = await User.findOne({ name: req.body.name })
    if (!user) {
      res.status(400).json({ error: "No existe" })
    }
    try {
      const passwordValida = await bcrypt.compare(req.body.password, user.password)
      if (!passwordValida) {
        res.status(400).json({ error: "Password incorrecto" })
      } else {
        if (!user.admin) {
          res.status(400).json({ error: 'No esta autorizado' })
        } else {
          const userToken = jwt.sign({ _id: user._id }, SECRET)
          res.json({ accessToken: userToken }).status(200)

        }

      }
<<<<<<< HEAD
    } catch (error) {
      console.log(error)
=======
    },

    getAllUsers: async(req, res) => {
      User.find()
      .then((resdb) => res.json(resdb))
>>>>>>> main
    }
  }
}