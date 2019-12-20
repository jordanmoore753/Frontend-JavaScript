const NUMBER_OF_GUESSES = 6;
const POSSIBLE_KEYS = 'abcdefghijklmnopqrstuvwxyz';

let words = ['pencil', 'arachnid', 'almost', 'wheel',
             'therefore', 'thermos', 'quotient', 'product',
             'flippant', 'fountain', 'sandwich', 'victory',
             'tremendous', 'horrifying', 'cluttered', 'cromulent',
             'impassabilities', 'imperiousnesses', 'impassiveness'];

let Game = {
  init: function() {
    this.reset();
  },

  reset: function() {
    this.word = this.getRandomWord();
    this.guesses = [];
    this.currentGuess = undefined;
    this.incorrectGuessCount = 0;
  },

  playerWon: function() {
    if (this.allLettersOfWordGuessed()) {
      return true;
    } 

    return false;
  },

  playerLost: function() {
    if (this.incorrectGuessCount >= NUMBER_OF_GUESSES) {
      return true;
    }

    return false;
  },

  getRandomWord: function() {
    let wordIndex = Math.floor(Math.random() * Math.floor(words.length));
    let word = words[wordIndex];

    words.splice(wordIndex, 1);
    return word;
  },

  gameNotOver: function() {
    let body = document.querySelector('body');
    return !body.classList.contains('win') && !body.classList.contains('lose');
  },

  validKey: function(key) {
    return POSSIBLE_KEYS.includes(key) && this.guesses.indexOf(key) === -1;
  },
};

let UI = Object.create(Game);

UI.guessLetter = function(letter) {
  let matchingIndexes = [];

  this.currentGuess = letter.toLowerCase();

  if (this.word.indexOf(this.currentGuess) !== -1) {
    for (let i = 0; i < this.word.length; i += 1) {
      if (this.word[i] === letter.toLowerCase()) {
        matchingIndexes.push(i);
      }
    }

    this.addLetterToWord(matchingIndexes);    
  } else {
    this.incorrectGuessCount += 1;
    this.removeApple();
  }
  
  this.addGuessToGuesses();
  return;
};

UI.resetUI = function() {
  this.createEmptyWord();
  this.emptyGuessSpans();
  this.resetTree();
  $('body').removeClass();
  $('#message').text('');
  return true;
};

UI.emptyGuessSpans = function() {
  $('#guesses span').each(function() {
    $(this).remove();
  });

  return true;
};

UI.resetTree = function() {
  let $appleTree = $('#apples');
  $appleTree.removeClass();
  return true;
};

UI.addLetterToWord = function(matchingIndexes) {
  let $wordSpanTags = $('#spaces span');
  let letter = this.currentGuess;

  matchingIndexes.forEach(function(i) {
    $wordSpanTags.eq(i).text(letter);
  });

  return;
};

UI.addGuessToGuesses = function() {
  this.guesses.push(this.currentGuess);

  let newSpan = document.createElement('span');
  newSpan.textContent = this.currentGuess;

  document.getElementById('guesses').appendChild(newSpan);

  this.currentGuess = undefined;
  return;
};

UI.createEmptyWord = function() {
  $('#spaces span').each(function() {
    $(this).remove();
  });

  for (let i = 0; i < this.word.length; i += 1) {
    let span = document.createElement('span');
    document.getElementById('spaces').appendChild(span);
  }
};

UI.displayLoss = function() {
  $('body').addClass('lose');
  $('#message').text('You are out of guesses!');
};

UI.displayWin = function() {
  $('body').addClass('win'); 
  $('#message').text('You won!'); 
};

UI.playerWonOrLost = function() {
  if (this.playerWon()) {
    this.displayWin();
  } else if (this.playerLost()) {
    this.displayLoss();
  }

  return false;
};

UI.allLettersOfWordGuessed = function() {
  for (let i = 0; i < this.word.length; i += 1) {
    if (!this.guesses.includes(this.word[i])) {
      return false;
    }
  }

  return true;
};

UI.removeApple = function() {
  let $appleTree = $('#apples');
  $appleTree.removeClass();
  $appleTree.addClass(`guess_${this.incorrectGuessCount}`);
  return true;
};

$(function() {
  let ourGame = Object.create(UI);
  ourGame.init();
  ourGame.resetUI();

  $('#replay').on('click', function(e) {
    e.preventDefault();

    ourGame.reset();
    ourGame.resetUI();
  });

  document.addEventListener('keypress', function(e) {
    e.preventDefault();

    let key = e.key.toLowerCase();
    let body = document.querySelector('body');

    if (ourGame.validKey(key) && ourGame.gameNotOver()) {
      ourGame.guessLetter(key);
    } 

    ourGame.playerWonOrLost();

    return;
  });
});