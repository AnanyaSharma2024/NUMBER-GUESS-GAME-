// Generate a random number between 1 and 100
let randomNumber = parseInt(Math.random() * 100 + 1);

// Selecting required DOM elements
const submit = document.querySelector('#subt');        // Submit button
const userInput = document.querySelector('#guessField'); // Input field
const guessSlot = document.querySelector('.guesses');  // Previous guesses
const remaining = document.querySelector('.lastResult'); // Remaining attempts
const lowOrHi = document.querySelector('.lowOrHi');    // Low / High message
const startOver = document.querySelector('.resultParas'); // Result container

// Create a paragraph for "Start New Game" button
const p = document.createElement('p');

// Store previous guesses
let prevGuess = [];

// Number of guesses made
let numGuess = 1;

// Flag to control game state
let playGame = true;

// If game is active, listen for submit button click
if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent form reload
        const guess = parseInt(userInput.value); // Convert input to number
        validateGuess(guess); // Validate the guess
    });
}

// Validate user input
function validateGuess(guess) {

    // Check if input is not a number
    if (isNaN(guess)) {
        alert('Enter a valid number');
    }
    // Check lower limit
    else if (guess < 1) {
        alert('Enter a number greater than 1');
    }
    // Check upper limit
    else if (guess > 100) {
        alert('Enter a number less than 100');
    }
    // Valid guess
    else {
        prevGuess.push(guess);

        // If maximum attempts reached
        if (numGuess === 11) {
            displayGuess(guess);
            displayMessage(`Game Over. Random number was ${randomNumber}`);
            endGame();
        } 
        // Continue game
        else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

// Compare guess with random number
function checkGuess(guess) {

    // Correct guess
    if (guess === randomNumber) {
        displayMessage('You guessed it right!');
        endGame();
    }
    // Guess is too low
    else if (guess < randomNumber) {
        displayMessage('Number is low');
    }
    // Guess is too high
    else if (guess > randomNumber) {
        displayMessage('Number is high');
    }
}

// Display previous guesses and update remaining attempts
function displayGuess(guess) {
    userInput.value = ''; // Clear input field
    guessSlot.innerHTML += `${guess}  `; // Show previous guesses
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`; // Update attempts left
}

// Display low / high / win messages
function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

// End the game
function endGame() {

    userInput.value = '';
    userInput.setAttribute('disabled', ''); // Disable input

    // Create "Start New Game" button
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
    startOver.appendChild(p);

    playGame = false;
    newGame(); // Initialize new game logic
}

// Restart the game
function newGame() {

    const newGameButton = document.querySelector('#newGame');

    newGameButton.addEventListener('click', function () {

        // Reset all values
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 1;

        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11 - numGuess}`;

        userInput.removeAttribute('disabled');
        startOver.removeChild(p);

        playGame = true;
    });
}
