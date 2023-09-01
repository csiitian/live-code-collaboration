// currently no use, only for testing purpose
const Bull = require('bull');
const Code = require('../models/Code');

const testQueue = new Bull('testQueue');

testQueue.process(async (job) => {
  const { key, value } = job.data;

  try {
    console.log(key, value);    
  } catch (err) {
    // Unable to update the database, log the error
    console.error("Error updating in database:", err);
  }
});

module.exports = {
  addToTestQueue: (data) => {
    testQueue.add(data);
  },
};
