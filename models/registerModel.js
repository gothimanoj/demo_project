const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    Name: { type: String, require: true },
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true, unique: true },
    imgurl: { type: String, required: true },
    location: { type: String, required: true }
})

const Register = mongoose.model("register", registerSchema);

module.exports = Register;