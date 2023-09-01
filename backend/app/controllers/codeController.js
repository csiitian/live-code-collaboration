const cacheService = require('../services/cacheService');
const Code = require('../models/Code');

// Function to get code from cache or database and store in cache
async function getCodeFromCacheOrDatabase(roomId) {
  let code = cacheService.getFromCache(roomId);

  if (code === undefined) {
    const response = await Code.findOne({ room: roomId }).exec();

    if (response && response.code) {
      code = response.code;
      cacheService.setInCache(roomId, code); // Cache the code
    }
  }

  return code || null; // Return null if code is still undefined
}

module.exports = {
  setCode: async (req, res) => {
    try {
      const { room, code } = req.body;
  
      if (!room || !code) {
        return res.status(400).send('Bad Request: Missing room or code in the request body');
      }
  
      const filter = { room: room };
      const update = { code: code };
      const options = { upsert: true, new: true }; // Upsert will insert or update, new: true returns the updated document
  
      const response = await Code.findOneAndUpdate(filter, update, options).exec();
  
      console.log("Updated in database:", response);
      return res.status(200).send('OK');
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).send('Internal Server Error');
    }
  },
  
  getCode: async (req, res) => {
    try {
      const { roomId } = req.query;
      const code = await getCodeFromCacheOrDatabase(roomId);

      if (code) {
        res.send(code);
      } else {
        res.status(404).send('Code not found');
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  },
};
