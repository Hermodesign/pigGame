'use strict';

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const players = [player1, player2];

class Player {
  constructor() {
    this.totalScore = 0;
  }
}

let currentPlayer = 0;
let cube;
let tScore = 0;
let player1Object = new Player();
let player2Object = new Player();

function holdScore(playerObject, currentScoreElement) {
  playerObject.totalScore += tScore;
  document.querySelector(currentScoreElement).textContent =
    playerObject.totalScore;
  document.querySelector('#current--' + currentPlayer).textContent = '0';
  switchPlayers();

  if (playerObject.totalScore >= 50) {
    console.log(`Player ${currentPlayer + 1} wins!`);
    document.querySelector('.fixed-h2').textContent = `Player ${
      currentPlayer == 1 ? '1' : '2'
    } wins!`;
    document.querySelector('.fixed-div').classList.remove('hidden');
    document.querySelector('.btn--roll').disabled = true;
    document.querySelector('.btn--hold').disabled = true;
  }
}

function switchPlayers() {
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  players.forEach((player, index) => {
    if (index === currentPlayer) {
      player.classList.add('player--active');
    } else {
      player.classList.remove('player--active');
      tScore = 0;
    }
  });
}

document.querySelector('.btn--roll').addEventListener('click', function () {
  cube = Math.trunc(Math.random() * 6) + 1;
  tScore += cube;
  document.querySelector('.dice').src = `dice-${cube}.png`;
  document.querySelector('.dice').classList.remove('hidden');
  document.querySelector('.dice').alt = `Playing dice with a value of ${cube}`;
  if (cube === 1) {
    document.querySelector('#current--' + currentPlayer).textContent = '0';
    switchPlayers();
    return;
  }
  document.querySelector('#current--' + currentPlayer).textContent = tScore;
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  document.querySelector('.dice').classList.add('hidden');
  if (players[currentPlayer].classList.contains('player--active')) {
    if (currentPlayer === 0) {
      holdScore(player1Object, '#score--0');
    } else {
      holdScore(player2Object, '#score--1');
    }
  }
});

document.querySelector('.btn--new').addEventListener('click', function () {
  player1Object.totalScore = 0;
  player2Object.totalScore = 0;
  document.querySelector('#score--0').textContent = '0';
  document.querySelector('#score--1').textContent = '0';
  document.querySelector('#current--0').textContent = '0';
  document.querySelector('#current--1').textContent = '0';
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  currentPlayer = 0;
  document.querySelector('.fixed-div').classList.add('hidden');
  document.querySelector('.btn--roll').disabled = false;
  document.querySelector('.btn--hold').disabled = false;
});
