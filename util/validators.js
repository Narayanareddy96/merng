module.exports.validateLoginInput = (username,password) => {
    const errors = {};
    if(username.trim() === ""){
        errors.username = "Username must not empty"
    }
    if(password.trim() === ""){
        errors.username = "Passowrd must not empty"
    }
    
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }

}
module.exports.validateRergisterInput = (
    username,
    email,
    password,
    confirmPassword
    ) => {
    const errors = {};
    if(username.trim() === ""){
        errors.username = "Username must not empty"
    }
    if(email.trim() === ""){
        errors.email = "Email must not empty"    
    }else {
        const regEx =   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!email.match(regEx)){
            errors.email = "Email must be valid email "
        }
    }

    if(password === ""){
        errors.password = "Password must not be empty"
    }else if (password !=confirmPassword){
        errors.confirmPassword = "Password must match"
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}