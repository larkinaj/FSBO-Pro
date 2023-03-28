
const db = require('../models/database');

const sessionController = {};

sessionController.createUser = async (req, res, next) => {
  // const userList = await db.query('SELECT * FROM users')
  // console.log(userList)
  return next()
  // db.query('SELECT * FROM users')
  // .then((data)=>{
  //   console.log(data)
  //   return next()
  // })
}

sessionController.verifyUser = async (req, res, next) => {
  //req.session.authenticated = true
  console.log('verifyUser')
  if (req.session.authenticated) {
    return next()
  }
  console.log('req.session ', req.session)
  console.log('req.sessionID', req.sessionID)
  res.status(200).json({ authenticated: false })

}

sessionController.createSession = async (req, res, next) => {
  const { userLogin, passLogin } = req.body
  const params = [userLogin]
  const userList = await db.query('SELECT * FROM users WHERE email = $1', params)
  console.log(userList.rows[0])
  if (!userList.rows[0] || userList.rows[0].password !== passLogin) {
    return res.status(404).json({authenticated: false})
  }
  if (userList.rows[0].password === passLogin) {
    req.session.authenticated = true
    req.session.user = userLogin
    return next()
  }
}

module.exports = sessionController;