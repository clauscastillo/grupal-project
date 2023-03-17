const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
  admin: Boolean,
  name: {
    type: String,
    required: [true, "Name is required"],
    validate: {
      validator: val => /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(val),
      message: "Use valid characters"
    }
  },
  business: {
    type: Boolean,
    required: false
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [8, "Password must be 8 characters or longer"]
  },
  phone: {
    type: Number,
    required: [true, "phone is required"],
    minlength: [10, "Phone number must have 10 numbers"]
  },
  email: {
    type: String,
    required: [true, "email is required"],
    validate: {
      validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email"
    }
  },
  collaborator: {
    type: Boolean,
    required: false
  }
}, { timestamps: true })
// Password encrypted
UserSchema.pre('save', async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword
  } catch {
    console.log('Error at save user')
  }
})


const User = mongoose.model('users', UserSchema);

module.exports = User