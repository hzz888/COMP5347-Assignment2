const {connectToMongoDB} = require('../../models/db');

exports.verifyEmail = async (req, res) => {

    const db = await connectToMongoDB()
    const userlist = db.collection('userlist')

    const Token = req.query.token
    const Email = req.query.email

    console.log(req.query)
    const userinfo = await userlist.findOne({email: Email})
    console.log(Email)

    if (userinfo['token'] === Token) {
        let setVerifyTrue = await userlist.updateOne({email: Email}, {$set: {verified:true}});
        console.log("Email verified!")
        res.redirect('http://localhost:3000/signin')
    } else {
        console.log("wrong token")
        res.send("wrong token")
    }


}