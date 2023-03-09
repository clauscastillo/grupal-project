const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    admin: Boolean,
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    business: {
      type: Boolean,
      required: false
    },  
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be 8 characters or longer"]
    },
    phone: {
      type: Number,
      required: false
    },
    email: {
      type: String,
      required: false,
      validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"
      } 
    },
    collaborator: {
      type: Boolean,
      required: false
    }
}, {timestamps: true})

// Password encrypted
UserSchema.pre('save', async function(next){
  try{
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword
  }catch{
    console.log('Error at save user')
  }
})

// UserSchema.methods.generateAuthToken = function() {
//   const token = jwt.sign({_id: this._id}, process.env.KEYJWT, {expiresIn:"7d"})
//   return token
// }



const User = mongoose.model('users', UserSchema);

module.exports = User