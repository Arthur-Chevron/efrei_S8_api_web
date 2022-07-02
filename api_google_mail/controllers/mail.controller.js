const { google } = require('googleapis')


exports.listAllMail = async (req, response) => {
    const auth = req.userId
    const pageToken = req.query.pageToken

    // if (!pageToken || pageToken < 0) return response.status(400).send({message: "Required Paramaters page is undefined or invalid"})

    try {
        const service = google.gmail({version: 'v1', auth});

        // get all mails of the user; limit = 100 default value
        const res = await service.users.messages.list({
            // maxResults: 20,
            userId: 'me',
            pageToken: pageToken
        })

        // return all informations
        return response.status(200).send({data: res})

    } catch(err) {
        return response.status(500).send({err: err})
    }
}

exports.getAMail = async (req, response) => {
    const auth = req.userId
    const id = req.query.id

    if (!id) return response.status(400).send({message: "Required Paramaters id is undefined or invalid"})

    try {
        const service = google.gmail({version: 'v1', auth});

        // get a specific message
        const res = await service.users.messages.get({
            // maxResults: 20,
            userId: 'me',
            id: id
        })

        // return all informations
        return response.status(200).send({data: res})

    } catch(err) {
        return response.status(500).send({err: err})
    }
}