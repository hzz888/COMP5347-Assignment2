const { connectToMongoDB } = require('../../models/db');

exports.viewComments = async (req,res) => {
    try{

        const db = await connectToMongoDB()
        const phonelistings = db.collection('phonelist')

        const {seller_id} = req.body

        const listings = await phonelistings.find({seller:seller_id})
        

    }catch(error){
        console.log(error)
        res.status(500).send("Error fetching listings")
    }
}