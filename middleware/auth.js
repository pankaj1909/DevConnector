const jwt = require('jsonwebtoken')
const config = require('../config/production')

const authentication = (req, res, next) =>{

    const token = req.header('x-auth-token')

    if(!token){
        return res.status(401).json({msg: 'No token, authorization denied'})
    }

    try{
        const decoded = jwt.verify(token, config.jwtSecret)
        req.user = decoded.user
        next()
    }catch (e) {
        res.status(401).json({msg: 'Token is not valid'})
    }

}

module.exports = authentication