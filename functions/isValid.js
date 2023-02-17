module.exports.isValid = function (request, secret) {
    const jwt = require("jsonwebtoken")
    const token = request.cookies.token
     try {
        
        return jwt.verify(token, secret);

     }
     catch {
        return null;
     }
}