module.exports = (app) =>{
  const router = require('express').Router()
  const tasks = require("../controllers/tasks.controller")
  const { verify } = require('../controllers/auth.controller')

  router.get('/', verify, tasks.listAllTasks)

  router.post('/list', verify, tasks.insertAListOfTask)

  router.post('/', verify, tasks.insertATask)

  router.delete('/', verify, tasks.deleteATask)

  router.delete('/list', verify, tasks.deleteAListOfTask)

  app.use("/tasks", router)
}
