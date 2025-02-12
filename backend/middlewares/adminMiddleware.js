const User = require('../models/User');

const adminMiddleware = async (req, res, next) => {
    try {
        const isAdmin = req.user.isAdmin;
        console.log(isAdmin)
        if(!isAdmin){
            return res.send("Unauthorized..");
        }
        next();
    } catch (error) {
        console.log(error)
        next();
    }
}

module.exports = adminMiddleware;