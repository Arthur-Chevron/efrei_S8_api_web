module.exports = (app) =>{
  const router = require('express').Router()
  const auth = require("../controllers/auth.controller")

  // authorize from oAuth
  router.get('/', auth.login)

  router.get('/redirect', auth.confirmLogin)

  app.use("/auth", router)
}
