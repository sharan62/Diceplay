'use strict';

//SELECTING ELEMENTS
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const currentS0 = document.querySelector('#current--0');
const currentS1 = document.querySelector('#current--1');
const rollEl = document.querySelector('.btn--roll');
const holdEl = document.querySelector('.btn--hold');
const newEl = document.querySelector('.btn--new');

//INITIAL CONDITIONS
let activePlayer, scores, playing, totalScores;

let init = () => {
    activePlayer = 0; //which player is playing
    playing = true;
    totalScores = [0, 0]; // total scores
    scores = 0; //initial scores

    score0.textContent = 0; // to show score 0
    score1.textContent = 0; //to show score 1
    currentS0.textContent = 0;
    currentS1.textContent = 0;

    diceEl.classList.add('hidden'); //to make dice hidden
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
};
init();
// MAIN PROGRAM
const switchPlayer = () => {
    document.querySelector(`#current--${activePlayer}`).textContent = 0; //dynamic prog
    scores = 0;
    activePlayer = activePlayer == 0 ? 1 : 0;
    //toggled applied to classList to change bg when switch player done
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
};
let roll = () => {
    if (playing) {
        //generate random number!
        let random = Math.floor(Math.random() * 6) + 1; // to generate no
        console.log('random :', random);
        //display the number!
        diceEl.classList.remove('hidden');
        diceEl.src = `./img/dice-${random}.png`;
        //if not store random no in scores and display in current
        //check if it's 1 or not!!
        if (random != 1) {
            scores += random;
            document.querySelector(`#current--${activePlayer}`).textContent = scores;
        }
        // if yes switch player  set 0= display current score , scores
        else {
            switchPlayer();
            console.log('active player:', activePlayer);
        }
    }
};
let hold = () => {
    //adding scores to total and dsplaying it
    if (playing) {
        totalScores[activePlayer] += scores;
        document.querySelector(`#score--${activePlayer}`).textContent =
            totalScores[activePlayer];
        console.log(totalScores[activePlayer]);
        //condition for winning pts
        if (totalScores[activePlayer] >= 50) {
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
            playing = false;
        } else {
            switchPlayer();
        }
    }
};
//EVENT LISTENERS
newEl.addEventListener('click', init);
holdEl.addEventListener('click', hold);
rollEl.addEventListener('click', roll);