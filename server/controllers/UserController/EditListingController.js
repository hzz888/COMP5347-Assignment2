const {connectToMongoDB} = require('../../models/db');
const ObjectId = require('mongodb').ObjectId;

exports.editListing = async (req, res) => {
    try {
        const db = await connectToMongoDB()
        const phonelistings = db.collection('phonelist')

        const {Listing_id, Method} = req.body

        const id = new ObjectId(Listing_id)
        if (Method === 'disable') {
            await phonelistings.updateOne({_id: id}, {"$set": {disabled: "true"}})
            console.log("Item set to disable")
        }
        if (Method === 'enable') {
            await phonelistings.updateOne({_id: id}, {"$set": {disabled: "false"}})
            console.log("Item set to enable")
        }
        if (Method === 'delete') {
            await phonelistings.deleteOne({_id: id})
            console.log('item deleted')
        }
        //Enable, Disable or Delete a product in the list
        res.send(true)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error editing listings")
    }
}