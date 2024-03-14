var sha256 = require('js-sha256')

var pw = sha256('abc12345')
console.log(pw)


function checkpassword(email,password){
    
    var password_hash = sha256(password)

    // need to call an api to pass the email and the hash password

}

