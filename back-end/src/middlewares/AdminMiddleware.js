const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()
// admin
const adminMiddleware = (req, res, next) => {
    const Authorization = req?.header('Authorization');
    const token = Authorization?.replace('Bearer ', '');
    if (!token) {
        return res.status(404).json({
            status: 'ERR',
            message: 'Token is required'
        })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The authentication'
            })
        }
        if (user?.roleId === 1) {
            req.user = user;
            next()
        } else {
            return res.status(404).json({
                status: 'ERR',
                message: 'Access denied'
            })
        }
    })
}

// staff
const staffMiddleware = (req, res, next) => {
    const Authorization = req?.header('Authorization');
    const token = Authorization?.replace('Bearer ', '');
    if (!token) {
        return res.status(404).json({
            status: 'ERR',
            message: 'Token is required'
        })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The authentication'
            })
        }
        if (user?.roleId === 2) {
            req.user = user;
            next()
        } else {
            return res.status(404).json({
                status: 'ERR',
                message: 'Access denied'
            })
        }
    })
}
// shipper
const shipperMiddleware = (req, res, next) => {
    const Authorization = req?.header('Authorization');
    const token = Authorization?.replace('Bearer ', '');
    if (!token) {
        return res.status(404).json({
            status: 'ERR',
            message: 'Token is required'
        })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The authentication'
            })
        }
        if (user?.roleId === 3) {
            req.user = user;
            next()
        } else {
            return res.status(404).json({
                status: 'ERR',
                message: 'Access denied'
            })
        }
    })
}

const auth = (req, res, next) => {
    try {
        const Authorization = req?.header('Authorization');
        const token = Authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Token is required'
            })
        }
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) {
                console.log("err", err.message);
                return res.status(400).json({
                    status: 'ERR',
                    message: 'Invalid Authentication'
                });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({ status: 'ERR', message: error });
    }
};
const checkTokenExpired = (req, res, next) => {
    try {
        const Authorization = req?.header('Authorization');
        const token = Authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Token is required'
            })
        }
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            console.log("vao day")
            if (err.message === 'jwt expired') {
                next();
            }
        });
    } catch (error) {
        return res.status(500).json({ status: 'ERR', message: error });
    }
};

const socketAuthMiddleware = (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Token is required'));
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        return next(new Error('Invalid Authentication'));
      }
  
      socket.user = user;
      next();
    });
  };


module.exports = {
    adminMiddleware, auth, staffMiddleware, shipperMiddleware, checkTokenExpired, socketAuthMiddleware
}