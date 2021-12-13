const { response } = require("express");


const isAdminRole = (req, res = response, next) => {


    if( !req.user){
        return res.status(500).json({
            ok: false,
            msg: "the role cannot be verified without first verifying the auth token"
        })
    }

    const { isAdmin } =  req.user;
    if (isAdmin!== true){
        return res.status(401).json({
            ok: false,
            msg: 'this user is not an administrator '
        })
    }
    
    next();
}

module.exports = {
    isAdminRole
}