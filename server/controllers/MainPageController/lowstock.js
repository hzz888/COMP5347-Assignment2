const {connectToMongoDB} = require('../../models/db')

exports.lowstock =  async (req,res) => {
    try{
        const db = await connectToMongoDB()
        const phonelist = db.collection('phonelist')

        const output = await phonelist
            .find({stock: { $gt: 0 } ,disabled: false})
            .sort({ stock: 1 })
            .limit(5)
            .toArray();
         
        // console.log(output)
        res.json(output)
    }catch(error){  
        res.send(error)
    }

}
