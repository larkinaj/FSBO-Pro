
const db = require('../models/database');

const sessionController = {};

sessionController.createUser = async (req, res, next) => {
  console.log('createUser middleware')
  const { fnameSignup, lnameSignup, userLogin, passLogin } = req.body
  const params = [fnameSignup, lnameSignup, userLogin, passLogin]
  const createUser = await db.query('INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)', params)
  return next()
}

sessionController.verifyUser = async (req, res, next) => {
  console.log('verifyUser middleware')
  if (req.session.authenticated) {
    return next()
  }
  req.session.authenticated = false;
  return res.status(200).json({session: req.session})
}

sessionController.createSession = async (req, res, next) => {
  console.log('createSession middleware')
  const { userLogin, passLogin } = req.body
  const params = [userLogin]
  const userList = await db.query('SELECT * FROM users WHERE email = $1', params)
  if (!userList.rows[0] || userList.rows[0].password !== passLogin) {
    req.session.authenticated = false;
    return res.status(404).json({session: req.session})
  }
  if (userList.rows[0].password === passLogin) {
    req.session.authenticated = true
    req.session.username = userLogin
    req.session.userID = userList.rows[0].id
    req.session.firstName = userList.rows[0].first_name
    req.session.lastName = userList.rows[0].last_name
    return next()
  }
}

module.exports = sessionController;