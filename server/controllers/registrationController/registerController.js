const {connectToMongoDB} = require('../../models/db');
const uuid = require('uuid').v4
const sgMail = require('@sendgrid/mail')
const SENDGRID_API_KEY = ''
sgMail.setApiKey(SENDGRID_API_KEY)


exports.registerUser = async (req, res) => {
    const db = await connectToMongoDB()

    //DB connection 
    const userlist = db.collection('userlist')


    //insert new UserPage data into the database

    try {
        //generate a token for account verification
        const token = uuid()

        const {Email, Firstname, Lastname, Password} = req.body

        // console.log(req.body)

        // console.log(await userlist.findOne({email:Email}))
        const duplicate_account = await userlist.findOne({email: Email});

        if (duplicate_account == null) {
            const newUser = {
                firstname: Firstname,
                lastname: Lastname,
                email: Email,
                password: Password,
                token: token,
                verified: false,
            };

            //insert a new UserPage data into the database
            const useUserInfo = await userlist.insertOne(
                newUser, function (err, res) {
                    if (err) throw err
                    console.log("Data inserted")
                }
            );

            const userinfo = await userlist.find({email: Email}).toArray();
            console.log(userinfo)
            const userToken = userinfo[0]['token']
            const msg = {
                to: Email,
                from: 'tobyblack19990312@gmail.com',
                subject: 'Verify your account',
                html: `<p>Please click on the following link to verify your account</p>
                    <p><a href="http://localhost:3001/verify-email?token=${userToken}&email=${Email}">Verify Account</a></p>`
                ,
                personalizations: [
                    {
                        to: [{email: Email}],
                    },
                ],
            }

            try {
                await sgMail.send(msg)
                console.log("Verification link sent")
                res.status(200).send(true)

            } catch (error) {
                console.log(error)
                res.send(false)
            }

        } else {
            console.log("There is an account associated with this email already")
            res.send(false)
        }

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

