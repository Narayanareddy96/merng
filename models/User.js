const mongoose = require('mongoose');
const { Schema,model } = mongoose;

const UserSchema = new Schema({
    username :  String,
    password : String,
    email:   String,
    createdAt:{ type: Date, default: Date.now },
});

module.exports = model('User',UserSchema);