const {connectToMongoDB} = require('../../models/db');

exports.verifyLogin = async (req, res) => {
    //Received the hashed password from front-end and compare it with the database, if correct then grant login session
    try {
        // console.log(req.body)
        const db = await connectToMongoDB()
        const {Email, Password} = req.body
        console.log(req.body)
        console.log(Email)

        const userlist = db.collection('userlist')

        //Try to query the UserPage email
        //Verify if account exist
        const account_existence = await userlist.findOne({email: Email});
        const userinfo = await userlist.find({email: Email}).toArray()
 
        if (account_existence == null) {
            res.send(false)
        } else {
            if(userinfo[0]['verified']){
                if (userinfo[0]['password'] === Password) {
                    //Provide a session ID
                    req.session.userId = userinfo[0]._id
                    res.send(true)
                } else {
                    return res.send(false)
                }
            }else{
                return res.send(false)
            }

        }


        // res.json(userinfo)
        // console.log(userinfo[0]['password'])
        // res.json(userinfo)

    } catch (error) {
        console.log('Error retrieving UserPage info, please check if UserPage exist in the db')
        console.log(error)
    }
}