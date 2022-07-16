const prompts = require('prompts');
const words = require('./words');
const chalk = require('chalk');

class Wordle {
  constructor(letters, totalTries) {
    this.letters = letters;
    this.totalTries = totalTries;
    this.currentTry = 0;
    this.word = undefined;
    this.set = undefined;
  }

  check(wrd){
    for(let i=0; i<wrd.length; i++) {
      if(wrd[i] === this.word[i]) process.stdout.write(chalk.green(` ${wrd[i]} `));
      else if(this.set.has(wrd[i])) process.stdout.write(chalk.yellow(` ${wrd[i]} `));
      else process.stdout.write(chalk.grey(` ${wrd[i]} `));
    }
  }

  setWord() {
    const random = Math.floor(Math.random() * (words.length));
    this.word = words[random].toUpperCase();
    this.set = new Set(this.word.split(''));
  }

  async start(){
    try {
      while(this.currentTry < this.totalTries) {
        const promptModel = {
          type: 'text',
          name: 'word',
          message: `Enter ${this.letters} letters, Guess No.: ${this.currentTry+1} = `,
          validate: val => !/^[a-zA-Z]+$/.test(val) || val.length !== 5 ? `Only alphabets upto ${this.letters} characters allowed! Plese try again` : true
        };
        const tmp = await prompts(promptModel);
        const answer = tmp?.word?.toUpperCase();

        if(answer === this.word) {
          console.log('Correct Guess!');
          console.log(chalk.green(answer))
          break;
        } else {
          this.check(answer);
          process.stdout.write("\n");
        }

        this.currentTry++;
      }
    } catch(err) {
      console.log(err);
    }
    
  }
};

module.exports = Wordle;