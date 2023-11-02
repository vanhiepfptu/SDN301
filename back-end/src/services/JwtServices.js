const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const generalAccessToken = async (payload) => {
    const accessToken = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '10d' })
    return accessToken
}
const generalRefreshToken = async (payload) => {
    const refreshToken = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })
    return refreshToken
}
const refreshTokenServices = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: 'ERROR',
                        message: 'The authentication'
                    })
                }
                const accessToken = await generalAccessToken({
                    id: user?.id,
                    roleId: user?.roleId,
                    roleName: user?.roleName
                })
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    accessToken
                })
            })

        } catch (err) {
            reject(err)
        }
    })
}
module.exports = {
    generalAccessToken, generalRefreshToken,
    refreshTokenServices
}