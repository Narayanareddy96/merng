const { UserInputError } = require("apollo-server");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
require('dotenv').config();

const JSON_SECRET_KEY = process.env.JSON_SECRET_KEY;

const {validateRergisterInput,validateLoginInput} = require("../../util/validators"); 
const registorjwt = (user) =>{
    return jwt.sign({
        id:user.id,
        email:user.email,
        username:user.username
    },JSON_SECRET_KEY,{expiresIn:'1h'})
}
module.exports = {
    Mutation: {
        async login(_,{username,password}){
            const {errors,valid} = validateLoginInput(username,password);
            // console.log(errors,valid)
            if(!valid){
                throw new UserInputError('Errors', { errors });
            }

            const user = await User.findOne({username});
            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }
            const match = await bcryptjs.compare(password,user.password);
            if (!match) {
                errors.general = 'Wrong crendetials';
                throw new UserInputError('Wrong crendetials', { errors });
            }
            const token  = await registorjwt(user)

            return {
                ...user._doc,
                id: user._id,
                token:token
              };

        },
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
            // console.log(errors,valid)
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
            const token  = await registorjwt(res)

            return {
                ...res._doc,
                id: res._id,
                token:token
              };
        }
    }
}