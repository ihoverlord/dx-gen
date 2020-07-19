const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const config = require('../../../config')

const encodeJwtToken = (data) => jwt.sign(data, config.AUTH_TOKEN_SECRECT, { expiresIn: config.AUTH_TOKEN_EXPIRY_TIME })

const decodeJwtToken = (token) => jwt.verify(token, config.AUTH_TOKEN_SECRECT)

const generateHash = (password) => {
    return new Promise((Resolve, Reject) => {
        bcrypt.hash(password, config.BCRYPT_SALT, (err, hash) => {
            if (err) Reject(err)
            Resolve(hash)
        });
    })
}

const comparePasswords = (user, userPass) => {
    return new Promise((Resolve, Reject) => {
        bcrypt.compare(userPass, user.password, (err, hash) => {
            if (err) Reject(err)
            else if (hash) Resolve(user)
            else Reject('username / password do not match.')
        });
    })
}

const userShouldntExist = (user) => {
    return new Promise((Resolve, Reject) => {
        if (user && user.length > 0) Reject(`email already registered.`)
        Resolve()
    })
}

const userShouldExist = (user) => {
    return new Promise((Resolve, Reject) => {
        if (user && user.length > 0) Resolve(user)
        Reject(`email '${email}' not registered.`)
    })
}


module.exports = { generateHash, comparePasswords, encodeJwtToken, decodeJwtToken, userShouldntExist, userShouldExist }