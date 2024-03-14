const sgMail = require('@sendgrid/mail')
const SENDGRID_API_KEY = ''
sgMail.setApiKey(SENDGRID_API_KEY)

exports.PwUpdateNotification = async (req, res) => {
    try {
        const {Email} = req.body
        console.log(Email)
        const msg = {
            to: Email,
            from: 'tobyblack19990312@gmail.com',
            subject: 'Password Update successfully',
            html: `
            <p>Hello,</p>
            <p>You have successfully updated your password!</p>
          `,
            personalizations: [
                {
                    to: [{email: Email}],
                },
            ],
        }

        await sgMail.send(msg);
        console.log("Notification sent")
        res.send(true)

    } catch (error) {
        console.log(error)
        res.status(500).send(false)
    }
}