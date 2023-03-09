const mongoose = require('mongoose');



const ServiceSchema = mongoose.Schema({
    client: {
      type: String,
      required: [true, 'client is required']
    },
    idClient: {
    type: String,
    required: [true, 'id of client is required'],
    },
    date: {
      type: String,
      required: [true, 'date is required']
    },
    title: {
      type: String,
      required: [true, 'title is required']
    },
    status: {
      type: String,
      required: [true, 'status is required']
    },
    description: {
      type: String,
      required: [true, 'description is required']
    },
    comments: {
      type: Array
    }
}, {timestamps: true})

const Service = mongoose.model('services', ServiceSchema)

module.exports = Service;