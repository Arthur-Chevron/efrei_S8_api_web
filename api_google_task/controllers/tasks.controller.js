const { google } = require('googleapis')



exports.listAllTasks = async (req, response) => {
    const auth = req.userId
    const allList = []
    let res

    try {
        const service = google.tasks({version: 'v1', auth});

        // get all lists task of the user; limit = 10
        res = await service.tasklists.list({maxResults: 10})

        // get all tasks of each tasks
        res.data.items.forEach(task => {
            allList.push(task)
        })

        console.log(res.data.items)

        // get all tasks' informations of each tasks list
        for (const item of allList) {
            res = await service.tasks.list({tasklist: item.id})
            item.allTasksOfAList = res.data.items
        }

        // return all informations
        return response.status(200).send({data: allList})

    } catch(err) {
        return response.status(500).send({err: err})
    }   
}


exports.insertAListOfTask = async (req, response) => {
    const title = req.body.title
    const auth = req.userId
    
    if (!title) return response.status(400).send({message: "Required paramaters title is missing"})

    try {
        const service = google.tasks({version: 'v1', auth})

        const res = await service.tasklists.insert({
            requestBody: {
              title: title,
            }
        })

        return response.status(200).send({data: res.data})

    } catch(err) {
        return response.status(500).send({err: err})
    }
}


exports.insertATask = async (req, response) => {
    const idListTasks = req.body.idListTasks
    const title = req.body.title
    const auth = req.userId
    const notes = req.body.notes !== undefined ? req.body.notes : ""

    if (!idListTasks) return response.status(400).send({message: "Required paramaters idListTasks is missing"})
    if (!title) return response.status(400).send({message: "Required paramaters title is missing"})

    try {
        const service = google.tasks({version: 'v1', auth})

        const res = await service.tasks.insert({
            tasklist: idListTasks,
            requestBody: {
                title: title,
                notes: notes
            }
        })

        return response.status(200).send({data: res.data})

    } catch(err) {
        return response.status(500).send({err: err})
    }
}


exports.deleteATask = async (req, response) => {
    const idListTasks = req.query.idListTasks
    const idTask = req.query.idTask
    const auth = req.userId

    if (!idListTasks) return response.status(400).send({message: "Required paramaters idListTasks is missing"})
    if (!idTask) return response.status(400).send({message: "Required paramaters idTask is missing"})

    try {
        const service = google.tasks({version: 'v1', auth})

        const res = await service.tasks.delete({
            task: idTask,
            tasklist: idListTasks,
        })

        return response.status(200).send({data: res})

    } catch(err) {
        return response.status(500).send({err: err})
    }
}

exports.deleteAListOfTask = async (req, response) => {
    const idListTasks = req.query.idListTasks
    const auth = req.userId

    if (!idListTasks) return response.status(400).send({message: "Required paramaters idListTasks is missing"})

    try {
        const service = google.tasks({version: 'v1', auth})

        // see of we can delete the list (default => impossible)
        const res1 = await service.tasklists.list({maxResults: 1})
        if (res1.data.items[0].id === idListTasks) return response.status(400).send({message: "Unable to delete the default list"})

        const res = await service.tasklists.delete({
            tasklist: idListTasks
        })

        return response.status(200).send({data: res})

    } catch(err) {
        return response.status(500).send({err: err})
    }
}