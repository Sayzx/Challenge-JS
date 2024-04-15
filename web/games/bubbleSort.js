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

function updateDisplay(numbers) {
    const bubbleSortBox = document.getElementById('bubble-sort-box');
    bubbleSortBox.innerHTML = '';
    if (displayMode === 1) { // Numbered list
        const ol = document.createElement('ol');
        numbers.forEach(number => {
            const li = document.createElement('li');
            li.textContent = number;
            ol.appendChild(li);
        });
        bubbleSortBox.appendChild(ol);
    } else if (displayMode === 2) { // Bar graph
        numbers.forEach(number => {
            const div = document.createElement('div');
            div.className = 'bar';
            div.style.height = `${number * 3}px`; // Multiplier pour ajuster la hauteur en fonction de la valeur
            div.textContent = number;
            bubbleSortBox.appendChild(div);
        });
    } else { // Default: Boxes
        numbers.forEach(number => {
            const box = document.createElement('div');
            box.className = 'number-box';
            box.textContent = number;
            bubbleSortBox.appendChild(box);
        });
    }
}
