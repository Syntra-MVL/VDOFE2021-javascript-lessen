const randomWords = [
  'condition',
  'bottom',
  'lineage',
  'trip',
  'reporter',
  'paper',
  'colorful',
  'agent',
  'justify',
  'torture',
  'cap',
  'earthflax',
  'payment',
  'research',
  'picture',
  'garage',
  'honor',
  'memorial',
  'planet',
  'biography',
  'profound',
  'rumor',
  'gear',
  'bedroom',
  'orthodox',
  'penalty',
  'grief',
  'promote',
  'roof',
  'suite',
  'moving',
  'killer',
  'museum',
  'essay',
  'fever',
  'dignity',
  'shadow',
  'enjoy',
  'kill',
  'shy',
  'counter',
  'pawn',
  'button',
  'bullet',
  'skin',
  'rate',
  'shop',
  'consider',
  'other',
  'prospect',
];

const gameState = {
  word: [],
  hangman: 1,
  lettersFound: 0,
  won: false,
  lost: false,
};

// reset
// > select random word
// > generate correct amount of .solution-letter inside solution-container
//    > empty for now
// > remove all failed and success classes from .letter elements
// > update #image src > images/hangman01.png

// game turn
//  > on letter click
//    > check if letter was not clicked before
//      > if true > do nothing
//      > if false
//        > check if letter is in word
//          > if false
//            > add failed class to letter
//            > update #image src
//          > if true
//            > add success class to letter
//            > add letter in textContent of correct .solution-letter
//    > check if game is over
//      > all letters found -> game won
//        > #win-lose-container.textContent -> You won!!
//      > 8 failed letters -> game lost
//        > #win-lose-container.textContent -> You lost!! The word was: ...

// if game over
//  > click on #win-lose-container for reset
