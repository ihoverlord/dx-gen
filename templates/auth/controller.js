const userModel = require("./model");
const helpers = require('./helpers')

const signup = (req, res, next) => {
    const { email, password, name } = req.body
    userModel.find({email})
        .then(helpers.userDoesntExist)
        .then(() => helpers.generateHash(password))
        .then((hash) => userModel.create({ name: name, email: email, password: hash }))
        .then((data) => { if (data) { res.send({ error: false, message: 'User Created Successfully!', content: { jwt: helpers.encodeJwtToken({ email }) } }) } })
        .catch((error) => { console.log(error); res.send({ error: true, message: error }) })
}

const login = (req, res, next) => {
    const { email, password } = req.body
    userModel.find({ email: email })
        .then(helpers.userExist)
        .then((user) => helpers.comparePasswords(user[0].password, password))
        .then(() => res.send({ error: false, message: 'User verified Successfully!', content: { jwt: helpers.encodeJwtToken({ email }) } }))
        .catch((error) => { console.log(error); res.send({ error: true, message: error }) })
}

const token = (req, res, next) => {
    const { email } = helpers.decodeJwtToken(req.headers['authorization'])
    res.send({ error: false, message: 'Token Refreshed Successfully!', content: { jwt: helpers.encodeJwtToken({ email }) } })

}

module.exports = { login, signup, token }