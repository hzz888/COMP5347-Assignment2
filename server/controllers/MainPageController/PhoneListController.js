const {connectToMongoDB} = require('../../models/db');
exports.getPhoneList = async (req, res) => {
    try {
        const db = await connectToMongoDB();
        const phonelist = db.collection("phonelist");

        // Retrieve all documents from the phonelist collection
        const documents = await phonelist.find().toArray();

        // Render the 'phoneList' as a JSON response
        res.json(documents)
    } catch (error) {
        console.log("Error retrieving phone collection:", error);
        res.status(500).send("Error retrieving phone collection");
    }
};