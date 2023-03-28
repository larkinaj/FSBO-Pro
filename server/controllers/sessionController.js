const db = require('../models/starWarsModels');

const sessionController = {};

sessionController.createUser = () => {
  db.query('SELECT * FROM users')
}

sessionController.verifyUser = () => {

}

sessionController.createSession = () => {

}