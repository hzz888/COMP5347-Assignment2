const {connectToMongoDB} = require('../../models/db');
const {ObjectId} = require("mongodb");

exports.fetchUserData = async (req, res) => {
    try {
        const db = await connectToMongoDB()
        const userlist = db.collection('userlist')

        const userid = req.params["userid"].toString()
        // console.log(userid)
        let idObject = new ObjectId(userid)
        let userinfo = await userlist.findOne({"_id": idObject})
        res.send(userinfo)

    } catch (error) {
        console.log(error)
        res.status(500).send("Error retrieving UserPage info");
    }
}