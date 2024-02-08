document.addEventListener("DOMContentLoaded", function () {
    const userGuess = document.getElementById("userGuess");
    const checkButton = document.getElementById("checkButton");
    const message = document.getElementById("message");
    const attemptsDisplay = document.getElementById("attempts");
    const userNameInput = document.getElementById("userName");

    let maxAttempts = 10;
    let attempts = 0;
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let userName = "";

    startButton.addEventListener("click", function () {
        userName = userNameInput.value.trim();
        if (userName === "") {
            alert("Please enter your name.");
            return;
        }
        gameSetup();
    });
    
    function gameSetup() {
        gameArea.style.display = "block";
        startButton.disabled = true;
        userNameInput.disabled = true;
        attempts = 0;
        updateAttemptsDisplay();
        generateRandomNumber();
    }
    
    function updateAttemptsDisplay() {
        const attemptsLeft = maxAttempts - attempts;
        attemptsDisplay.textContent = `Attempts left: ${attemptsLeft}`;
    }

    function checkGameResult(guess) {
        attempts++;
        if (guess === randomNumber) {
            message.textContent = `Congratulations, ${userName}! You guessed the number ${randomNumber} in ${attempts} attempts.`;
            checkButton.disabled = true;
            endGame();
        }else if (guess < randomNumber) {
            message.textContent = `The secret number is greater than the number you have chosen. Try again!`;
        } else {
            message.textContent = `The secret number is smaller than the number you have chosen. Try again!`;
        }

        updateAttemptsDisplay();

        if (attempts === maxAttempts) {
            message.textContent = `Game over, ${userName}. The secret number was ${randomNumber}.`;
            checkButton.disabled = true;
        }
    }

    function startGame(difficulty) {
        maxAttempts = difficulty;
        attempts = 0;
        updateAttemptsDisplay();
        message.textContent = "";
        checkButton.disabled = false;
        randomNumber = Math.floor(Math.random() * 100) + 1;
    }

    checkButton.addEventListener("click", function () {
        const guess = parseInt(userGuess.value);

        if (isNaN(guess) || guess < 1 || guess > 100) {
            message.textContent = "Please enter a valid number between 1 and 100.";
        } else {
            checkGameResult(guess);
        }
    });

    document.getElementById("easyButton").addEventListener("click", function () {
        startGame(10);
    });

    document.getElementById("mediumButton").addEventListener("click", function () {
        startGame(7);
    });

    document.getElementById("hardButton").addEventListener("click", function () {
        startGame(5);
    });

    userNameInput.addEventListener("input", function () {
        userName = userNameInput.value;
    });

    startGame(10); // Start with Easy difficulty by default
});
