document.addEventListener('DOMContentLoaded', function() {
    let words = ['manger', 'frite', 'banane', 'agrumes'];
    let sentenceBox = document.getElementById('sentence-box');
    let userInput = document.getElementById('user-input');
    let errorCountDisplay = document.getElementById('error-count');
    let timerDisplay = document.getElementById('timer');
    let resultDisplay = document.getElementById('result');
    let timer;
    let timeLeft;
    let isTestRunning = false;
    let currentWordIndex = 0;

    function displaySentence() {
        sentenceBox.textContent = '';
        words.forEach((word, index) => {
            let span = document.createElement('span');
            span.textContent = word + ' ';
            sentenceBox.appendChild(span);
        });
    }

    function startTimer() {
        timeLeft = 60;
        timerDisplay.textContent = 'Temps restant: 1:00';
        timer = setInterval(function() {
            timeLeft--;
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            timerDisplay.textContent = `Temps restant: ${minutes}:${seconds}`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                endTest();
            }
        }, 1000);
    }

    function startTest() {
        if (!isTestRunning) {
            isTestRunning = true;
            displaySentence();
            userInput.value = '';
            userInput.focus();
            errorCountDisplay.textContent = 'Erreurs: 0';
            startTimer();
        }
    }

    function endTest() {
        isTestRunning = false;
        resultDisplay.textContent = `Test terminé!`;
    }

    function validateWord() {
        let inputWord = userInput.value.trim();
        let currentWord = words[currentWordIndex];
        let span = sentenceBox.childNodes[currentWordIndex];
        if (inputWord === currentWord) {
            span.classList.remove('incorrect');
            span.classList.add('correct');
        } else {
            span.classList.add('incorrect');
            errorCountDisplay.textContent = `Erreurs: ${parseInt(errorCountDisplay.textContent.split(' ')[1]) + 1}`;
        }
        currentWordIndex++;
        userInput.value = '';
        userInput.focus();
        if (currentWordIndex >= words.length) {
            endTest();
        }
    }

    userInput.addEventListener('input', function() {
        let inputWord = userInput.value.trim();
        let currentWord = words[currentWordIndex];
        let span = sentenceBox.childNodes[currentWordIndex];
        if (inputWord === currentWord) {
            span.classList.remove('incorrect');
        } else {
            span.classList.add('incorrect');
        }
    });

    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            validateWord();
        }
    });
});
