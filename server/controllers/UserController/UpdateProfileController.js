const {connectToMongoDB} = require('../../models/db');
const ObjectId = require('mongodb').ObjectId;


exports.updateProfile = async (req, res) => {
    try {
        const db = await connectToMongoDB()
        const userlist = db.collection('userlist')
        const {Email, FirstName, LastName, ID} = req.body

        console.log(req.body.FirstName)
        console.log(ID)
        // var userinfo = await userlist.findOne({_id:id})
        const id = new ObjectId(ID)


        if (typeof FirstName !== "undefined") {
            await userlist.updateOne({_id: id}, {"$set": {firstname: FirstName}})
            console.log(FirstName)
            console.log("First Name updated!")
        }
        if (typeof LastName !== "undefined") {
            await userlist.updateOne({_id: id}, {"$set": {lastname: LastName}})
            console.log(LastName)
            console.log("Last Name updated!")
        }
        if (typeof Email !== "undefined") {
            await userlist.updateOne({_id: id}, {"$set": {email: Email}})
            console.log("Email updated!")
        }
        res.send(true)


    } catch (error) {
        console.log(error)
        res.status(500).send("Error updating profile")
    }

}