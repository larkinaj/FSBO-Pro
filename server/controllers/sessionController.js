
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
  console.log('verifyUser middleware')
  //console.log('session!!', req.session)
  if (req.session.authenticated) {
    return next()
  }
  req.session.authenticated = false;
  // res.status(200).json({ authenticated: false })
  return res.status(200).json(req.session)

}

sessionController.createSession = async (req, res, next) => {
  console.log('createSession middleware')
  const { userLogin, passLogin } = req.body
  const params = [userLogin]
  const userList = await db.query('SELECT * FROM users WHERE email = $1', params)
  if (!userList.rows[0] || userList.rows[0].password !== passLogin) {
    // return res.status(404).json({authenticated: false})
    req.session.authenticated = false;
    return res.status(404).json(req.session)
  }
  if (userList.rows[0].password === passLogin) {
    req.session.authenticated = true
    req.session.username = userLogin
    req.session.userID = userList.rows[0].id
    return next()
  }
}

module.exports = sessionController;