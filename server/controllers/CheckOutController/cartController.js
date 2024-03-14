const {connectToMongoDB} = require('../../models/db');
const ObjectId = require('mongodb').ObjectId;

exports.updateStock = async (req, res) => {
    try {
        const db = await connectToMongoDB()
        const phonelistings = db.collection('phonelist')

        const {cartArray} = req.body
        //Each Json object expect to have the format of {listing_id, quantity}
        console.log(cartArray)
        cartArray && Array.isArray(cartArray) && cartArray.forEach(element => {
            let {Listing_id, Quantity} = element
            let listing_id = new ObjectId(Listing_id)
            phonelistings.updateOne(
                {_id: listing_id},
                {$inc: {stock: -Quantity}}
            )
        });
        console.log("Cart sent!")
        res.send(true)

    } catch (error) {
        console.log(error)
        res.status(500).send("Error sending cart to the system")
    }


}