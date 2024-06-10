// This function creates a sequence of 9 numbers between 1 and 9 and displays them in a box.
function createNumberSequence() {
    const bubbleSortBox = document.getElementById('bubble-sort-box');
    bubbleSortBox.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 9) {
        numbers.add(Math.floor(Math.random() * 9) + 1);
    }
    numbers.forEach(number => {
        const box = document.createElement('div');
        box.className = 'number-box';
        box.textContent = number;
        bubbleSortBox.appendChild(box);
    });
}

// This is an asynchronous function that sorts the numbers in the box using the bubble sort algorithm.
async function bubbleSort() {
    let numberBoxes = document.querySelectorAll('.number-box');
    let sorted = false;
    while (!sorted) {
        sorted = true;
        for (let i = 0; i < numberBoxes.length - 1; i++) {
            let currentBox = numberBoxes[i];
            let nextBox = numberBoxes[i + 1];
            if (parseInt(currentBox.textContent) > parseInt(nextBox.textContent)) {
                sorted = false;
                currentBox.style.backgroundColor = '#FF6347';
                nextBox.style.backgroundColor = '#FF6347';
                await sleep(500);
                swapElements(currentBox, nextBox);
                currentBox.style.backgroundColor = '';
                nextBox.style.backgroundColor = '';
                await sleep(500);
                numberBoxes = document.querySelectorAll('.number-box');
            }
        }
    }
    alert('Le tri est terminé !');
}

function swapElements(el1, el2) {
    const temp = document.createElement("div");
    el1.parentNode.insertBefore(temp, el1);
    el2.parentNode.insertBefore(el1, el2);
    temp.parentNode.insertBefore(el2, temp);
    temp.parentNode.removeChild(temp);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startBubbleSort() {
    createNumberSequence();
    await bubbleSort();
}

window.onload = createNumberSequence;
