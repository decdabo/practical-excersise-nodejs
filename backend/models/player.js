const { Schema, model } = require('mongoose');

const playerSchema = Schema({
  name: {
    type: String,
    require: true
  },
  bet: {
    type: Number,
    default: 0
  }
});

module.exports = model('Player', playerSchema);
