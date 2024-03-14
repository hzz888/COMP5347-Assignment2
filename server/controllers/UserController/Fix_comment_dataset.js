const { connectToMongoDB } = require('../../models/db');


//add reviews to those objects that do not have the attribute of reviews
// async function add_reviews() {
//     try {
//       const db = await connectToMongoDB();
//       const phonelistings = db.collection('phonelist');
  
//       await phonelistings.updateMany(
//         { reviews: { $exists: false } },
//         { $set: { reviews: [] } }
//       );
  
//       console.log("Task done");
//     } catch(error) {
//       console.log(error);
//       console.log("Something went wrong");
//     }
//   }
  
//   add_reviews().then();

  
  // async function removeStatus() {
  //   try {
  //     const db = await connectToMongoDB();
  //     const phonelistings = db.collection('phonelist');
      
  //     await phonelistings.updateMany({}, { $unset: { 'reviews.$[].is_shown': '' } });
  //     console.log('Task done');
  //   } catch(error) {
  //     console.log(error);
  //     console.log('Something went wrong');
  //   }
  // }
  
  // removeStatus().then();

  async function addIsShownAttribute() {
    try {
      const db = await connectToMongoDB();
      const phonelistings = db.collection('phonelist');
      
      await phonelistings.updateMany(
        { reviews: { $exists: true } }, // only update documents that have reviews
        { $set: { "reviews.$[].is_shown": true } } // set the is_shown attribute to true for all reviews
      );
      
      console.log("Task done");
    } catch (error) {
      console.error("Something went wrong", error);
    }
  }
  
  addIsShownAttribute().then();


async function addDisableAttribute(){
    try{
      const db = await connectToMongoDB();
      const phonelistings = db.collection('phonelist');
      await phonelistings.updateMany({ disabled: { $exists: false } }, { $set: { disabled: false } });
      await phonelistings.updateMany({ disabled: { $exists: true } }, { $set: { disabled: false } });
      console.log("done")
    }catch(error){
      console.log(error)
    }
  }

addDisableAttribute().then()


async function assigneVerified(){
  try{
    const db = await connectToMongoDB();
    const user = db.collection('userlist');
    await user.updateMany({}, {$set: {verified: true}}, (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(result.modifiedCount + " documents updated with verified=true");
    });
  }catch(error){
    console.log(error)
  }
}
assigneVerified().then()

async function updatePW(){
  try{
    const db = await connectToMongoDB();
    const user = db.collection('userlist')
    await user.updateMany({}, {$set: {password:"4ae53616a51f8b4aa895a1632902c87b1933f86e76235edaad42615be57e2797"}});
    console.log("done")
  }catch(error){
    console.log(error)
  }
}

updatePW().then()
