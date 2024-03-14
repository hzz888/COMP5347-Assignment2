const {connectToMongoDB} = require('../../models/db');

exports.fetchUserData2 = async (req, res) => {
    try {
        const db = await connectToMongoDB()
        const userlist = db.collection('userlist')
        //assuming using the email as the identifier
        const {Email} = req.query
        const userinfo = await userlist.find({email: Email}).toArray()
    

        await console.log(Email)
        console.log("Here")
        res.json(userinfo)

    } catch (error) {
        console.log(error)
        res.status(500).send("Error retrieving user info");
    }
}