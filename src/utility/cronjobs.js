const cron = require('node-cron');
const ConnectionRequestModel = require("../models/connectionRequest")
cron.schedule('0 0 * * *', async () => {
  try{

  }catch(err){

    console.log("Error: "+err)
  }
});