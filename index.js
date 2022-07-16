const Wordle = require('./wordle');

const game = new Wordle(5, 6);
game.setWord();
// console.log(game.word);
game.start();