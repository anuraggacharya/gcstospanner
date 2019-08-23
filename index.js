/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */

var storage = require('@google-cloud/storage')();
const {Spanner} = require('@google-cloud/spanner');
const projectId = 'gcpnodeproject';
const instanceId = 'testinstance';
const databaseId = 'customerdb';
// Creates a client
const spanner = new Spanner({
  projectId:projectId
});

// Gets a reference to a Cloud Spanner instance and database
const instance = spanner.instance(instanceId);
const database = instance.database(databaseId);	
const customerTable = database.table('customerTable');


var csv = require('fast-csv');
var dataArray=[]
exports.helloGCS = (event, context) => {
   var datastream=storage
  .bucket('testbucketforpoc')
  .file('test.csv')
  .createReadStream();
  
  csv.parseStream(datastream,{headers:true})
  .on('data',function(data){
    dataArray.push(data);
  })
  .on('end',async function(data){
      console.log("Reading Completed.");
      console.log(dataArray);
      console.log(dataArray.length);
      try {
      await customerTable.insert(dataArray);
      console.log('Inserted data.');
      } 
      catch (err) {
      console.error('THIS IS THE ERROR:', err);
      } 
      finally {
      await database.close();
      }
  })
};
