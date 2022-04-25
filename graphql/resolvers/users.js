const { UserInputError } = require("apollo-server");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
require('dotenv').config();

const JSON_SECRET_KEY = process.env.JSON_SECRET_KEY;

const {validateRergisterInput} = require("../../util/validators"); 

module.exports = {
    Mutation: {
        async register(
            _,
            {
                registerInput: { username, email, password, confirmPassword }
            },
            context,
            info
        ){

            // validate the user data
            const {errors,valid} = validateRergisterInput(username,email,password,confirmPassword);
            console.log(errors,valid)
            if(!valid){
                throw new UserInputError('Errors', { errors });
            }
            // check if user already in the database 
            const user = await User.findOne({username});
            if(user){
               throw new UserInputError("username is taken",{
                   errors:{
                       username:"This username is already taken"
                   }
               }) 
            }
            // hash the password using bcrypt 
            password = await bcryptjs.hash(password,12);
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
              });
            const res = await newUser.save();
            const token  = await jwt.sign({
                id:res.id,
                email:res.email,
                username:res.username
            },JSON_SECRET_KEY,{expiresIn:'1h'})

            return {
                ...res._doc,
                id: res._id,
                token:token
              };
        }
    }
}