const { Schema, model, ObjectId } = require('mongoose');

const gameSchema = Schema({
  gamers: {
    type: [
      {
        type: ObjectId,
        ref: 'Player'
      }
    ],
    require: true
  },
  inProgress: {
    type: Boolean,
    default: false
  },
  winner: {
    type: ObjectId,
    ref: 'Player',
    default: null
  }
});

module.exports = model('Game', gameSchema);
