'use strict';

// Initialize scores and dice
const totalScoreDisplayP1 = document.querySelector('#score--0');
const totalScoreDisplayP2 = document.querySelector('#score--1');
const currentScoreDisplayP1 = document.querySelector('#current--0');
const currentScoreDisplayP2 = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
totalScoreDisplayP1.textContent = '0';
totalScoreDisplayP2.textContent = '0';
dice.style.display = 'none';

// Roll Dice
const rollDiceBtn = document.querySelector('.btn--roll');
rollDiceBtn.addEventListener('click', rollDice);

// Current Score and Player Initialization
let currentScore = 0;
let currentPlayer = 0;
let totalScore;
const currentActivePlayer = document.querySelectorAll('.player');

function rollDice() {
  // Initiate a roll
  const roll = Math.floor(Math.random() * 6) + 1;
  updateDiceDisplay(roll);
  if (roll !== 1) {
    // Add roll to current scroll and display it and the dice
    currentScore += roll;
    updateCurrentScoreDisplay();
  } else {
    currentScore = 0;
    resetCurrentScoreDisplay(currentPlayer);
    currentActivePlayer.forEach(player => {
      player.classList.remove('player--active');
    });
    if (currentPlayer === 0) {
      currentPlayer = 1;
      updatePlayerDisplay(currentPlayer);
    } else if (currentPlayer === 1) {
      currentPlayer = 0;
      updatePlayerDisplay(currentPlayer);
    }
  }
}

function updateDiceDisplay(roll) {
  dice.src = `dice-${roll}.png`;
  dice.style.display = 'block';
}

function updateCurrentScoreDisplay() {
  if (currentPlayer === 0) {
    currentScoreDisplayP1.textContent = currentScore;
  } else if (currentPlayer === 1) {
    currentScoreDisplayP2.textContent = currentScore;
  }
}

function resetCurrentScoreDisplay(player) {
  document.querySelector(`#current--${player}`).textContent = 0;
}

function updatePlayerDisplay(index) {
  currentActivePlayer[index].classList.add('player--active');
}

// Hold
const holdBtn = document.querySelector('.btn--hold');
holdBtn.addEventListener('click', hold);

function hold() {
  if (currentPlayer === 0) {
    // Grab totalScore
    totalScore = Number(totalScoreDisplayP1.textContent) + currentScore;
    // Add Current Score to Total Score
    totalScoreDisplayP1.textContent = totalScore;
    // Reset CurrentScore
    resetCurrentScoreDisplay(currentPlayer);
    currentScore = 0;
    // Check if there's a winner
    if (totalScore >= 100) {
      winner(currentPlayer);
      return;
    }
    // Turnover Current player
    currentActivePlayer.forEach(player => {
      player.classList.remove('player--active');
    });
    if (currentPlayer === 0) {
      currentPlayer = 1;
      updatePlayerDisplay(currentPlayer);
    } else if (currentPlayer === 1) {
      currentPlayer = 0;
      updatePlayerDisplay(currentPlayer);
    }
  } else if (currentPlayer === 1) {
    // Grab totalScore
    totalScore = Number(totalScoreDisplayP2.textContent) + currentScore;
    // Add Current Score to Total Score
    totalScoreDisplayP2.textContent = totalScore;
    // Reset CurrentScore
    resetCurrentScoreDisplay(currentPlayer);
    currentScore = 0;
    // Check if there's a winner
    if (totalScore >= 100) {
      winner(currentPlayer);
      return;
    }
    // Turnover Current player
    currentActivePlayer.forEach(player => {
      player.classList.remove('player--active');
    });
    if (currentPlayer === 0) {
      currentPlayer = 1;
      updatePlayerDisplay(currentPlayer);
    } else if (currentPlayer === 1) {
      currentPlayer = 0;
      updatePlayerDisplay(currentPlayer);
    }
  }
}

function winner(index) {
  currentActivePlayer[index].classList.add('player--winner');
  document.querySelector(`#current--${index}`).textContent = '🎉Winner🎉';
  document.querySelector(`#current--${index}`).style.fontSize = '2rem';
  document.querySelectorAll('.current-label')[index].style.display = 'none';
  holdBtn.disabled = true;
  rollDiceBtn.disabled = true;
  dice.style.display = 'none';
}

// NewGame

const resetBtn = document.querySelector('.btn--new');
resetBtn.addEventListener('click', restartGame);

function restartGame() {
  totalScoreDisplayP1.textContent = 0;
  totalScoreDisplayP2.textContent = 0;
  currentScore = 0;
  totalScore = 0;
  currentPlayer = 0;
  currentScoreDisplayP1.textContent = 0;
  currentScoreDisplayP2.textContent = 0;
  dice.style.display = 'none';
  document.querySelector(`#current--0`).style.fontSize = '3.5rem';
  document.querySelector(`#current--1`).style.fontSize = '3.5rem';
  holdBtn.disabled = false;
  rollDiceBtn.disabled = false;
  document.querySelectorAll('.current-label')[0].style.display = 'block';
  document.querySelectorAll('.current-label')[1].style.display = 'block';
  currentActivePlayer.forEach(player => {
    player.classList.remove('player--active');
    player.classList.remove('player--winner');
  });
  currentActivePlayer[0].classList.add('player--active');
}

// Modal
const showBtns = document.querySelectorAll('.show-modal');

showBtns.forEach(btn => {
  btn.addEventListener('click', showModal);
});

const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close-modal');

function showModal() {
  // Show Modal
  overlay.classList.remove('hidden');
  modal.classList.remove('hidden');
  // Initialize modal closers
  closeModalBtn.addEventListener('click', closeModal);
}

function closeModal() {
  overlay.classList.add('hidden');
  modal.classList.add('hidden');
}

overlay.addEventListener('click', closeModal);
window.addEventListener('keyup', keyPress);

function keyPress(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}
