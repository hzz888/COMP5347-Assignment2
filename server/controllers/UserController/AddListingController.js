const {connectToMongoDB} = require('../../models/db');


exports.editListing = async (req, res) => {
    try {

        const db = await connectToMongoDB()
        const phonelistings = db.collection('phonelist')

        const {Title, Brand, Image, Stock, Seller, Price, Disabled} = req.body

        const new_listing = {
            title: Title,
            brand: Brand,
            image: 'imageurl',
            stock: Stock,
            seller: Seller,
            price: Price,
            reviews:[],
            disabled: Disabled
        }

        await phonelistings.insertOne(new_listing)

        console.log(new_listing)

        console.log("New listing insert successfully!")
        res.send(true)


    } catch (error) {
        console.log(error)
        res.status(500).send("Error fetching listings")
    }
}