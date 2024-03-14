const { connectToMongoDB } = require('../../models/db');
const ObjectId = require('mongodb').ObjectId;

exports.newComment =async (req,res) => {
    try{
        const db = await connectToMongoDB()
        const phonelistings = db.collection('phonelist')
        const {User_id,Listing_id,Comment,Rating} = req.body

        const listing_id = new ObjectId(Listing_id)

        const new_comment = await phonelistings.updateOne(
            {_id:listing_id},
            {
                $push:{
                    reviews:{
                        reviewer: User_id,
                        rating: Rating,
                        comment: Comment,
                        is_shown: "true"
                    }
                }
            }

        )
        console.log("New comment added to the listing!")
        res.send(true)

    }catch(error){
        console.log(error)
        res.status(500).send("Error posting new comment")
    }




}