const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const {CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN} = require('../config/variables')

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );        

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN})  


async function notificationMail(fullname, email, option, topic) {

    try {
        const showTopic = topic || 'a'
        const accessToken = await oauth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'webackup2022@gamil.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        const mailIdea = {
            from: 'CMS ENTERPRISE 🚀 <webackup2022@gmail.com>',
            to: email,
            subject: 'Someone has commented in your Idea - Check it now',
            html: `<h3>Hi ${fullname}, we notice that you have a comment in your idea.</h3>`
          }
      
        const mailReply = {
            from: 'CMS ENTERPRISE 🚀 <webackup2022@gmail.com>',
            to: email,
            subject: 'Someone has replied in your Comment - Check it now',
            html: `<h3>Hi ${fullname}, we notice that you have a reply in your comment.</h3>`
        }

        const mailCoordinator = {
            from: 'CMS ENTERPRISE 🚀 <webackup2022@gmail.com>',
            to: email,
            subject: `A new idea has just been submitted in ${showTopic} topic - Check it now`,
            html: `<h3>Hi ${fullname}, a new idea has been submitted.</h3>`
        }

        //? Do stuff by option 
        if(option === 'idea') {
            const resultIdea = await transport.sendMail(mailIdea)
            return resultIdea
        }
      
        if(option === 'reply') {
            const resultReply = await transport.sendMail(mailReply)
            return resultReply
        }
       
        if(option === 'coordinator') {
            const resultCoordinator = await transport.sendMail(mailCoordinator)
            return resultCoordinator
        }

    } catch (error) {
        return error
    }
        
}


module.exports = notificationMail