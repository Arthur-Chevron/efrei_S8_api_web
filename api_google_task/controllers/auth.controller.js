const fs = require('fs')
const { google } = require('googleapis')

exports.verify = async(req, res, next) => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_ID_CLIENT,
    process.env.GOOGLE_SECRET_CLIENT,
    process.env.LINK + process.env.PORT
  )

  // Check if we have previously stored a token.
  fs.readFile(process.env.TOKEN_PATH, (err, token) => {
    if (err) return res.status(401).send({message: "Please login"})
    oAuth2Client.setCredentials(JSON.parse(token))
    req.userId = oAuth2Client
    next()
  })
}


exports.login = async (req, res) => {
  try {
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_ID_CLIENT,
      process.env.GOOGLE_SECRET_CLIENT,
      process.env.LINK + process.env.PORT + process.env.GOOGLE_REDIRECT
    )

    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [process.env.GOOGLE_SCOPE]
    })

    return res.redirect(authUrl)

  } catch(err) {
    return res.status(500).send({err: err})
  } 
}


exports.confirmLogin = async (req, res) => {
  const code = req.query.code

  if (!code) return res.status(400).send({message: "Code parameters is missing"})

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_ID_CLIENT,
    process.env.GOOGLE_SECRET_CLIENT,
    process.env.LINK + process.env.PORT + process.env.GOOGLE_REDIRECT
  )

  try {
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err)
      oAuth2Client.setCredentials(token)

      // Store the token to disk for later program executions
      fs.writeFile(process.env.TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return res.status(500).send({err: err})
        req.userId = oAuth2Client
        console.log(req.userId)
        return res.status(200).send({message: 'Token stored to ' + process.env.TOKEN_PATH})
      })

    })
  } catch(err) {
    return res.status(500).send({err: err})
  }
}