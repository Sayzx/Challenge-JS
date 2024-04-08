// Fonction pour créer une suite de chiffres aléatoires à trier
function createNumberSequence() {
    const bubbleSortBox = document.getElementById('bubble-sort-box');
    bubbleSortBox.innerHTML = ''; // Efface le contenu précédent
    const numbers = new Set(); // Utilisation d'un ensemble pour garantir l'unicité des chiffres
    while (numbers.size < 9) {
        numbers.add(Math.floor(Math.random() * 9) + 1); // Ajoute un chiffre aléatoire unique à l'ensemble
    }
    numbers.forEach(number => {
        const box = document.createElement('div');
        box.className = 'number-box';
        box.textContent = number;
        bubbleSortBox.appendChild(box);
    });
}

// Fonction pour effectuer le tri à bulle visuel
// Fonction pour effectuer le tri à bulle visuel
async function bubbleSort() {
    const numberBoxes = document.querySelectorAll('.number-box');
    let sorted = false;
    while (!sorted) {
        sorted = true;
        for (let i = 0; i < numberBoxes.length - 1; i++) {
            const currentBox = numberBoxes[i];
            const nextBox = numberBoxes[i + 1];
            if (parseInt(currentBox.textContent) > parseInt(nextBox.textContent)) {
                sorted = false;
                currentBox.style.backgroundColor = '#FF6347';
                nextBox.style.backgroundColor = '#FF6347';
                await sleep(500); // Attendre 0.5 seconde
                currentBox.style.backgroundColor = '';
                nextBox.style.backgroundColor = '';
                currentBox.parentNode.insertBefore(nextBox, currentBox);
                await sleep(500); // Attendre 0.5 seconde
                break; // Sortir de la boucle pour réexaminer à partir du début
            }
        }
    }
    alert('Le tri est terminé !');
}


// Fonction pour démarrer le tri à bulle visuel
async function startBubbleSort() {
    createNumberSequence(); // Générer une nouvelle suite de chiffres
    await bubbleSort(); // Effectuer le tri à bulle visuel
}

// Fonction pour attendre un certain temps
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Appel de la fonction pour générer une suite de chiffres au chargement de la page
window.onload = createNumberSequence;
