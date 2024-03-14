const {connectToMongoDB} = require('../../models/db');

exports.fetchListings = async (req, res) => {
    try {

        const db = await connectToMongoDB()
        const phonelistings = db.collection('phonelist')

        const {seller_id} = req.query
        console.log(req.query)
        console.log("Body above")
        const listings = await phonelistings.find({seller: seller_id}).toArray()
        console.log(listings)
        res.json(listings)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error fetching listings")
    }
}