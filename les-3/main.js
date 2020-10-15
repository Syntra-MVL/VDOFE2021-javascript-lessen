const prompRPS = function() {
    let rps = prompt('Blad, Steen of Schaar?');
    let rpsLowercase = rps.toLowerCase();

    let options = ['blad', 'steen', 'schaar'];

    while (!options.includes(rpsLowercase)) {
        rps = prompt('Blad, Steen of Schaar?');
        rpsLowercase = rps.toLowerCase();
    }

    return rpsLowercase;
    // while (rpsLowercase !== 'blad' && rpsLowercase !== 'steen' && rpsLowercase !== 'schaar') {

    // }
}

const rockPaperScissors = function() {
    // prompt 'blad', 'steen' of 'schaar'
    // select random 'blad', 'steen' of 'schaar' voor AI
    // determine winner
    // return true if player wins
    // return false if AI wins
}

const rockPaperScissorsCompetition = function () {
    // prompt player name
    // prompt number of rounds
    // play correct number of round
    // alert winner
}