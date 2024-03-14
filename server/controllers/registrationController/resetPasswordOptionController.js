const sgMail = require('@sendgrid/mail')
const {connectToMongoDB} = require('../../models/db');
const SENDGRID_API_KEY = ''
sgMail.setApiKey(SENDGRID_API_KEY)

exports.resetPasswordOption = async (req, res) => {
    try {
        const db = await connectToMongoDB()
        console.log(req.body)
        //assign the request body to the variable name email
        const {Email} = req.body;
        //verify if the email is valid (exist in the DB)
        const userlist = db.collection('userlist')
        const existing_account = await userlist.findOne({email: Email});

        // var user_Token = existing_account['token']
        if (existing_account === null) {
            res.send(false)
        } else {
            //Skip token to simplify this feature
            //Create the email message
            const msg = {
                to: Email,
                from: 'tobyblack19990312@gmail.com',
                subject: 'Password Reset Request',
                html: `
          <p>Hello,</p>
          <p>You have requested a password reset for your account. Please click on the link below to reset your password:</p>
          <p><a href="http://localhost:3000/resetpassword?email=${Email}">reset-password</a></p>
          <p>If you did not request this password reset, you can safely ignore this email.</p>
        `,
                personalizations: [
                    {
                        to: [{email: Email}],
                    },
                ],
            }
            try {
                await sgMail.send(msg);
                console.log('Password reset email sent')
                res.status(200).send(Email);
            } catch (error) {
                console.error(error.response.body.errors);
                res.status(500).send('Error sending password reset email');
            }
        }
    } catch (error) {
        console.log('DB error')
        console.log(error)
        res.status(500).send(false)
    }
}
