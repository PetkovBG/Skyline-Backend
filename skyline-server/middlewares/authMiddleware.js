const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.auth) {
        token = req.cookies.auth;
    }

    if (!token) {
        return res.status(401).json({ status: false, error: 'Not authorized to access this route' })
    }

    try {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedToken.id);
        next();
    } catch (error) {
        return res.status(401).json({ status: false, error: 'Not authorized to access this route' })
    }
}