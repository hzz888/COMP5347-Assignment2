const {connectToMongoDB} = require('../../models/db')
const {ObjectId} = require("mongodb");

exports.search = async (req, res) => {
    try {
        const db = await connectToMongoDB()
        const phonelist = db.collection('phonelist')

        let Title = req.query['Title']
        let Brand = req.query['Brand']
        let Price = Number(req.query['Price'])

        // console.log(Title, Brand, Price)

        const query = {}

        if (Brand === 'All'){
            query.price = {$lte: Price}
            query.title = {$regex: Title, $options: 'i'}
        }else {
            query.brand = Brand
            query.price = {$lte: Price}
            query.title = {$regex: Title, $options: 'i'}
        }
        // console.log(query)

        const output = await phonelist.find(query).toArray()

        // console.log(output);

        res.json(output)

    } catch (error) {
        // console.log(error)
        res.send(error)
    }
}

exports.maxPrice = async (req, res) => {
    try {
        const db = await connectToMongoDB()
        const phonelist = db.collection('phonelist')
        const output = await phonelist.find().sort({price: -1}).limit(1).toArray()
        const existingMaxPrice = output[0].price
        res.json(existingMaxPrice)
    } catch (error) {
        res.send(error)
    }
}

exports.minPrice = async (req, res) => {
    try {
        const db = await connectToMongoDB()
        const phonelist = db.collection('phonelist')
        const output = await phonelist.find({price: {$ne: null}}).sort({price: 1}).limit(1).toArray()
        const existingMinPrice = output[0].price
        res.json(existingMinPrice)
    } catch (error) {
        res.send(error)
    }
}

exports.brands = async (req, res) => {
    try {
        const brandList = []
        const db = await connectToMongoDB()
        const phonelist = db.collection('phonelist')
        const distinctBrands = await phonelist.aggregate([
            {$group: {_id: "$brand"}},
            {$project: {_id: 0, brand: "$_id"}}
        ]).toArray()
        distinctBrands.forEach((item) => {
            if(item.brand != null) brandList.push(item.brand)
        })
        res.json(brandList)
    }catch (error){
        res.send(error)
    }
}

exports.getItemById = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id.toString())
        // console.log(typeof id)
        const db = await connectToMongoDB()
        const phonelist = db.collection('phonelist')
        const phone = await phonelist.findOne({ "_id": id })
        res.json(phone)
    } catch (error) {
        res.send(error)
        // console.log(error)
    }
    

}