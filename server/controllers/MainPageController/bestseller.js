const {connectToMongoDB} = require('../../models/db')

exports.bestSeller = async (req, res) => {
    try {
        const db = await connectToMongoDB()
        const phonelist = db.collection('phonelist')

        // const output = await phonelist
        //     .aggregate([
        //         // match documents with at least two comments
        //         {
        //             $match: {
        //                 $expr: {
        //                     $gte: [{$size: "$reviews"}, 2]
        //                 }
        //             }
        //         },
        //         // deconstruct reviews array
        //         {$unwind: "$reviews"},
        //         // sort reviews by rating in descending order
        //         {$sort: {"reviews.rating": -1}},
        //         // group by document _id and push two highest rated reviews into array
        //         {
        //             $group: {
        //                 _id: "$_id",
        //                 title: {$first: "$title"},
        //                 brand: {$first: "$brand"},
        //                 image: {$first: "$image"},
        //                 stock: {$first: "$stock"},
        //                 seller: {$first: "$seller"},
        //                 price: {$first: "$price"},
        //                 reviews: {$push: "$reviews"},
        //                 top2: {$push: "$reviews"},
        //                 rating: {$max: "$reviews.rating"}
        //             }
        //         },
        //         // project fields we want to include in output
        //         {
        //             $project: {
        //                 _id: 1,
        //                 title: 1,
        //                 brand: 1,
        //                 image: 1,
        //                 stock: 1,
        //                 seller: 1,
        //                 price: 1,
        //                 rating: 1,
        //                 reviews: {
        //                     $filter: {
        //                         input: "$reviews",
        //                         as: "review",
        //                         cond: {
        //                             $in: ["$$review", "$top2"]
        //                         }
        //                     }
        //                 }
        //             }
        //         },
        //         // sort by rating of top 2 comments in descending order
        //         {$sort: {rating: -1}},
        //         // limit to top 5 documents
        //         {$limit: 5}
        //     ]).toArray();


        const output = await phonelist.aggregate([
            {
                $match: {
                    disabled: false,
                    reviews: { $exists: true, $type: "array"}
                }
                
            },
            {
                $addFields: {
                    reviewCount: {$size: "$reviews"} // Count the number of reviews for each phone
                }
            },
            {
                $match: {reviewCount: {$gte: 2}}
            },
            {
                $addFields: {
                    averageRating: {$avg: "$reviews.rating"}, // Calculate the average rating for each phone
                }
            },
            {
                $sort: {averageRating: -1} // Sort by average rating in descending order
            },
            {
                $limit: 5 // Limit the result to 5 phone items
            }
        ]).toArray();
        res.json(output)
    } catch (error) {
        res.send(error)
        console.log(error)
    }

}
