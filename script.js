'use strict';

//selecting elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold'); // dont forget the '.' before the class

//scoping
let scores, currentScore, activePlayer, playing; 
//initial conditions
const init = function(){

  
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--acive');
  player1El.classList.remove('player--active');

}

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; /*if the active player is 0,
  then change to 1. Other way around, change to 0*/
  currentScore = 0;
  player0El.classList.toggle('player--active'); //if the class is there, remove it. if not, add it.
  player1El.classList.toggle('player--active');
};

btnNew.addEventListener('click', init);


btnRoll.addEventListener('click', function () {
  if(playing){
  //1 - Generating random diceroll;
  const dice = Math.trunc(Math.random() * 6) + 1;
  //2 - Display Dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  //check if dice is 1; r
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //if true, switch to the next player
    switchPlayer();
  }
}
});

btnHold.addEventListener('click', function () {
  if(playing){
  //1. add current score to the score of the active player
  scores[activePlayer] += currentScore;
  //scores[1] = scores[1] + currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  //2. check if player's score is >100; finish game

  if (scores[activePlayer] >= 100) {
    //finish the game
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    alert(`player--${activePlayer} has won!`);
  } else {
    //switch to next player
    switchPlayer();
  }
}
});
