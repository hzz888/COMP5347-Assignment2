const {connection} = require('mongoose');
const {connectToMongoDB} = require('../../models/db');

exports.resetPassword = async (req, res) => {
    try {
        const db = await connectToMongoDB()
        const {Email, Password} = req.body
        //Password should be hashed at frontend

        const userlist = db.collection('userlist')

        //update the password
        await userlist.updateOne({'email': Email}, {"$set": {'password': Password}})
        res.send(true)
    } catch (error) {
        console.log(error)
        res.status(500).send(false)
    }
}