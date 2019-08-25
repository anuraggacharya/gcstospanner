# Cloud Function-GCS to Spanner

The nodejs code is for ceating a cloud function on Google Cloud Platform(GCP). The function is triggered Finalize/Create event occured in specified bucket on Google Cloud Storage on which it is keeping a watch for creation of file. 
A specific csv file is streamed, parsed and finally inserted into Spanner, a RDBMS on GCP.

## Getting Started

* Create a bucket on GCS on which we want to create a trigger.
* Create a Spanner Instance,Database and Table with required schema.
```
CREATE TABLE customerTable (
	ID STRING(MAX) NOT NULL,
	ADDRESS STRING(MAX) NOT NULL,
	AGE STRING(MAX) NOT NULL,
	NAME STRING(MAX) NOT NULL,
	PHONE STRING(MAX) NOT NULL,
) PRIMARY KEY (ID)

```
* Create Cloud Function which will executed when triggered. 

### Prerequisites

* Nodejs Client APIs for Sapnner,GCS and other dependencies like fast-csv must be updated in package.json with there correct versions.

```
{
  "name": "sample-cloud-storage",
  "version": "0.0.1",
  "dependencies": {
    "@google-cloud/storage": "^1.6.0",
    "csv-parser": "^2.3.0",
    "fast-csv": "^3.4.0",
    "@google-cloud/spanner":"^4.0.2"
  }
}

```
## Running the tests

Upload a file on bucket with specified name and view logs for checking the execution status of the cloud function.


## Deployment

* You can use inline editor for writing your own fucntion in browser window or you can upload a zip file or copy it from github repository.

## Built With

* Google Cloud Function, a FaaS offered by Google. (https://cloud.google.com/functions/docs/)
