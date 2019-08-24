/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */

var storage = require('@google-cloud/storage')();
const {Spanner} = require('@google-cloud/spanner');
var csv = require('fast-csv');

const projectId = 'yourprojectid';
const instanceId = 'yourinstanceid';
const databaseId = 'yourdbid';

// Creates a client
const spanner = new Spanner({
  projectId:projectId
});

// Gets a reference to a Cloud Spanner instance and database
const instance = spanner.instance(instanceId);
const database = instance.database(databaseId);	
const customerTable = database.table('customerTable');

var dataArray=[];
var output={};

exports.helloGCS = (event, context) => {
   var datastream=storage
  .bucket('testbucketforpoc')
  .file('test.csv')
  .createReadStream();
  
  csv.parseStream(datastream,{headers:true})
  .on('data',function(data){
    dataArray.push(data);
  })
  .on('end',()=>{
  	  console.log(dataArray);
      output['Rows processed']=dataArray.length;
      console.log(output);
  });
  async function upload(){
      console.log("Reading Completed. Now Inserting...");
      try {
      await customerTable.insert(dataArray);
      console.log('Insert Complete.');
      } 
      catch (err) {
      console.error('THIS IS THE ERROR:', err);
      } 
      finally {
      await database.close();
      }
  }
  upload();
};
