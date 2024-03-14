const {connectToMongoDB} = require('../../models/db');
const ObjectId = require('mongodb').ObjectId;

exports.editComment = async (req, res) => {
    try {
        const db = await connectToMongoDB()
        const phonelistings = db.collection('phonelist')
        const {Reviewer, Listing_id, Is_shown} = req.body

        const listing_id = new ObjectId(Listing_id)
        const filter = {_id: listing_id, "reviews.reviewer": Reviewer}
        const update = {$set: {"reviews.$.is_shown": Is_shown}}
        const result = await phonelistings.updateOne(filter, update)
        //Toggle whether a comment is visible or not
        console.log("Comment edit successfully")
        res.send(true)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error fetching listings")
    }
}