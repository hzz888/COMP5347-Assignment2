//Testing Database connection
const {connectToMongoDB} = require('./db');

async function testPhoneList() {
    try {
        const db = await connectToMongoDB();
        const phonelist = db.collection("phonelist");

        // Retrieve all documents from the phonelist collection
        const documents = await phonelist.find().toArray();
        console.log(documents);
    } catch (error) {
        console.log("Error testing phone collection:", error);
    }
}

testPhoneList().then(() => {
        console.log("\n Test Success");
        process.exit(0);
    }, () => {
        console.log("\n Test Failed");
        process.exit(1);
    }
);
