const userModel = require("./model");
const helpers = require('./helpers')

const signup = (req, res, next) => {
    const { email, password, name } = req.body
    userModel.find({email})
        .then(helpers.userShouldntExist)
        .then(() => helpers.generateHash(password))
        .then((hash) => userModel.create({ name: name, email: email, password: hash }))
        .then((data) => { if (data) { res.send({ error: false, message: 'User Created Successfully!', content: { jwt: helpers.encodeJwtToken({ userId: data.userId }) } }) } })
        .catch((error) => { console.log(error); res.send({ error: true, message: error.toString() }) })
}

const login = (req, res, next) => {
    const { email, password } = req.body
    userModel.find({ email: email })
        .then(helpers.userShouldExist)
        .then((user) => helpers.comparePasswords(user[0], password))
        .then((user) => res.send({ error: false, message: 'User verified Successfully!', content: { jwt: helpers.encodeJwtToken({ userId: user.userId }) } }))
        .catch((error) => { console.log(error); res.send({ error: true, message: error.toString() }) })
}

const token = (req, res, next) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"]
    const { userId } = helpers.decodeJwtToken(token)
    res.send({ error: false, message: 'Token Refreshed Successfully!', content: { jwt: helpers.encodeJwtToken({ userId }) } })
}

module.exports = { login, signup, token }