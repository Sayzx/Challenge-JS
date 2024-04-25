document.addEventListener('DOMContentLoaded', function() {
    const clickButton = document.getElementById('start');
    let scoreCount = document.getElementById('scoreCount');
    let timerCount = document.getElementById('timerCount');
    let clicksCount = document.getElementById('clicksCount');
    let counter = 0;
    let isStarted = false;
    let startTime;
    let intervalId;
    const resultModal = document.getElementById('resultModal');
    const finalCps = document.getElementById('finalCps');
    const totalClicks = document.getElementById('totalClicks');
    const closeModal = document.getElementById('closeModal');
    const retryButton = document.getElementById('retryButton');

    clickButton.addEventListener('click', function() {
        if (!isStarted) {
            counter = 0;
            isStarted = true;
            scoreCount.textContent = ' ' + counter;
            clicksCount.textContent = ' 0.00';
            startTime = 15; // Durée du jeu en secondes
            timerCount.textContent = ' ' + startTime.toFixed(2);

            intervalId = setInterval(function() {
                startTime -= 0.01;
                timerCount.textContent = ' ' + startTime.toFixed(2);
                clicksCount.textContent = ' ' + (counter / (15 - startTime)).toFixed(2);
                if (startTime <= 0) {
                    clearInterval(intervalId);
                    isStarted = false;
                    timerCount.textContent = ' 0.00';
                    let cpsScore = (counter / 15).toFixed(2);
                    clicksCount.textContent = ' ' + cpsScore;
                    finalCps.textContent = cpsScore;
                    totalClicks.textContent = counter.toString();
                    resultModal.style.display = "block";
                }
            }, 10);
        } else {
            counter++;
            scoreCount.textContent = ' ' + counter;
        }
    });

    closeModal.onclick = function() {
        resultModal.style.display = "none";
    };

    retryButton.onclick = function() {
        resultModal.style.display = "none";
        counter = 0;
        scoreCount.textContent = ' 0';
        clicksCount.textContent = ' 0.00';
        isStarted = false;
    };

    closeModal.onclick = function() {
        resultModal.style.display = "none";
        counter = 0;
        scoreCount.textContent = ' 0';
        clicksCount.textContent = ' 0.00';
        isStarted = false;
    };
});
