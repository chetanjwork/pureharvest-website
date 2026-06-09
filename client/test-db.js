const mongoose = require('mongoose');
async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Database Name:', mongoose.connection.name);
  console.log('Collection Name:', mongoose.connection.collection('leads').name);
  
  const leads = await mongoose.connection.collection('leads').find().sort({_id: -1}).limit(5).toArray();
  console.log('Latest 5 records:');
  console.log(JSON.stringify(leads, null, 2));
  
  process.exit(0);
}
run();
