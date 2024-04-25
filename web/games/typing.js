let words = ["Manger", "Fruit", "Ils", "furent", "heureux", "aléatoirement", "valorant", "des", "la", "mousline", "aujourd'hui", "voiture", "maison", "chien", "chat", "ami", "bien", "café", "bonjour", "soir", "matin", "nuit", "soleil", "lune", "pluie", "merci", "pain", "lait", "eau", "jardin", "fleur", "arbre", "forêt", "oiseau", "femme", "homme", "enfant", "bébé", "frère", "amour", "grand", "petit", "mère", "père", "amour", "aubergine", "rire", "pleurer", "triste", "heureux", "généreux", "méchant", "gentil", "doux", "fort", "faible", "courage", "peur", "espoir", "rêve", "souvenir", "livre", "lecture", "écrire", "plume", "papier", "stylo", "crayon", "table", "chaise", "lit", "fenêtre", "porte", "mur", "maison", "appartement", "ville", "pays", "monde", "terre", "ciel", "nuage", "étoile", "univers", "temps", "passé", "présent", "futur", "hier", "demain", "maintenant", "toujours", "jamais", "parfois", "souvent", "peut-être", "vrai", "faux", "beau", "laid", "vivre", "mourir", "naissance", "mort"];
let currentWordIndex = 0;
let errors = 0;
let startTime;
let timerInterval;

function startTest() {
    resetGame(); 
    shuffleWords(); 
    startTime = Date.now();
    document.getElementById("sentence-box").textContent = ""; 
    showNextWord();
    timerInterval = setInterval(updateTimer, 1000);

    // Ajouter un écouteur pour keydown sur l'élément d'entrée de l'utilisateur
    document.getElementById("user-input").addEventListener("keydown", function(event) {
        if (event.key === " " && this.value === " ") {
            // Empêcher l'espace supplémentaire
            event.preventDefault();
            // Simuler une entrée erronée et passer au mot suivant
            this.value = ""; // Réinitialiser la valeur pour éviter de compter comme double espace
            errors++;
            document.getElementById("error-count").textContent = "Erreurs: " + errors;
            currentWordIndex++;
            showNextWord();
        }
    });
}

function shuffleWords() {
    for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
    }
}

function resetGame() {
    currentWordIndex = 0;
    errors = 0;
}

function showNextWord() {
    if (currentWordIndex < words.length) {
        let sentenceBox = document.getElementById("sentence-box");
        let displayText = "";

        for (let i = 0; i < words.length; i++) {
            if (i < currentWordIndex) {
                displayText += "<span style='color: green'>" + words[i] + "</span> ";
            } else {
                displayText += words[i] + " ";
            }
        }

        sentenceBox.innerHTML = displayText;
        document.getElementById("user-input").value = "";
        document.getElementById("user-input").style.color = "black";

        document.getElementById("user-input").focus();
        document.getElementById("user-input").addEventListener("input", userInputHandler);
    } else {
        finishTest();
    }
}

function updateTimer() {
    let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    let remainingTime = 60 - elapsedTime;
    document.getElementById("timer").textContent = "Temps restant: " + remainingTime + "s";
    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        finishTest();
    }
}

function finishTest() {
    clearInterval(timerInterval); 
    let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    let wordsPerMinute = Math.floor(currentWordIndex / (elapsedTime / 60));
    let errorsPerWord = Math.round(errors / currentWordIndex * 100) / 100;
    let result = "Vous avez tapé " + currentWordIndex + " mots en " + elapsedTime + " secondes avec " + errorsPerWord + " Erreur(s) par mots";

    document.getElementById("sentence-box").textContent = result;
    document.getElementById("user-input").value = "";
}

function userInputHandler() {
    let userInput = this.value.trim();
    let currentWord = words[currentWordIndex];

    // Vérifier si l'utilisateur a appuyé deux fois sur espace
    if (userInput === "" && this.value.endsWith("  ")) { // Deux espaces à la fin
        markWordAsSkipped(currentWordIndex); // Marquer le mot en rouge dans le sentence-box
        errors++; // Augmenter le compteur d'erreurs
        document.getElementById("error-count").textContent = "Erreurs: " + errors;
        currentWordIndex++; // Passer au mot suivant
        showNextWord(); // Afficher le mot suivant
        this.value = ""; // Réinitialiser l'input
    } else if (userInput === currentWord) {
        this.style.color = "green"; // Colorer en vert si le mot est correct
        currentWordIndex++; // Passer au mot suivant
        showNextWord(); // Afficher le mot suivant
    } else if (currentWord.startsWith(userInput)) {
        this.style.color = "black"; // Garder en noir si c'est partiellement correct
    } else {
        this.style.color = "red"; // Colorer en rouge si incorrect
        errors++; // Augmenter le compteur d'erreurs
        document.getElementById("error-count").textContent = "Erreurs: " + errors;
    }
}

function markWordAsSkipped(index) {
    let sentenceBox = document.getElementById("sentence-box");
    let wordsSpan = sentenceBox.getElementsByTagName("span");
    if (wordsSpan[index]) {
        wordsSpan[index].style.color = "red"; // Colorer le mot à l'index en rouge
    }
}



