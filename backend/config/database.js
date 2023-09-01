const mongoose = require('mongoose');

mongoose.connect('mongodb://root:example@localhost:27017?authMechanism=DEFAULT')
  .then(() => console.log('Database Connected Successfully'))
  .catch(error => console.log('Failed to connect', error));
