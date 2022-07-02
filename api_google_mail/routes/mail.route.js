module.exports = (app) =>{
  const router = require('express').Router()
  const mail = require("../controllers/mail.controller")
  const { verify } = require('../controllers/auth.controller')

  router.get('/', verify, mail.listAllMail)  

  router.get('/one', verify, mail.getAMail)

  router.put('/one', verify, mail.readAMail)

  app.use("/mail", router)
}
