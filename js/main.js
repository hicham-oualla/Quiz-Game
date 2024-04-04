const choices = Array.from(document.getElementsByClassName('choice-text'));
const question = document.getElementById('question');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
const progressBar = document.querySelector('.progress-bar');

const availableQuestions = [
  {
    "question": "Quelle est la forme du verbe correcte dans cette phrase : 'He ______ (go) to school every day.' ?",
    "reponses": {
      "choice1": "going",
      "choice2": "goes",
      "choice3": "go",
      "choice4": "gone",
      "answer": "goes" // Correct answer placed under "reponses" object
    }
  },
  {
    "question": "Quel est le synonyme de 'happy' ?",
    "reponses": {
      "choice1": "sad",
      "choice2": "angry",
      "choice3": "joyful",
      "choice4": "tired",
      "answer": "joyful" // Correct answer placed under "reponses" object
    }
  },
  {
    "question": "Quel est l'antonyme de 'big' ?",
    "reponses": {
      "choice1": "small",
      "choice2": "large",
      "choice3": "huge",
      "choice4": "gigantic",
      "answer": "small" // Correct answer placed under "reponses" object
    }
  },
  {
    "question": "Complétez la phrase : 'I ______ (eat) lunch at 12 o'clock.'",
    "reponses": {
      "choice1": "am eating",
      "choice2": "eat",
      "choice3": "eats",
      "choice4": "ate",
      "answer": "eat" // Correct answer placed under "reponses" object
    }
  },
  {
    "question": "Quel est le résultat de 5 * 5 ?",
    "reponses": {
      "choice1": "15",
      "choice2": "20",
      "choice3": "25",
      "choice4": "30",
      "answer": "25"
    }
  },
  {
    "question": "Quel est le carré de 9 ?",
    "reponses": {
      "choice1": "64",
      "choice2": "81",
      "choice3": "100",
      "choice4": "121",
      "answer": "81"
    }
  },
  {
    "question": "Quel est le plus grand nombre premier inférieur à 20 ?",
    "reponses": {
      "choice1": "15",
      "choice2": "17",
      "choice3": "19",
      "choice4": "21",
      "answer": "19"
    }
  },
  {
    "question": "Quelle est la racine carrée de 64 ?",
    "reponses": {
      "choice1": "6",
      "choice2": "7",
      "choice3": "8",
      "choice4": "9",
      "answer": "8"
    }
  },
  {
    "question": "Quelle est la principale utilisation de JavaScript dans le développement web ?",
    "reponses": {
      "choice1": "Manipulation du style CSS",
      "choice2": "Gestion du contenu HTML",
      "choice3": "Logique et comportement interactif des pages web",
      "choice4": "Traitement des requêtes SQL",
      "answer": "Logique et comportement interactif des pages web"
    }
  },
  {
    "question": "Qu'est-ce que le DOM en JavaScript ?",
    "reponses": {
      "choice1": "Document Object Model",
      "choice2": "Data Object Model",
      "choice3": "Dynamic Object Management",
      "choice4": "Digital Output Mode",
      "answer": "Document Object Model"
    }
  },
  {
    "question": "Quelle méthode est utilisée pour ajouter un élément à la fin d'un tableau en JavaScript ?",
    "reponses": {
      "choice1": "append()",
      "choice2": "push()",
      "choice3": "addToEnd()",
      "choice4": "concat()",
      "answer": "push()"
    }
  },
  {
    "question": "Que signifie CSS ?",
    "reponses": {
      "choice1": "Cascading Style Sheets",
      "choice2": "Creative Style Solutions",
      "choice3": "Computer Style Selection",
      "choice4": "Categorized Styling System",
      "answer": "Cascading Style Sheets"
    }
  },
  {
    "question": "Quel sélecteur CSS est utilisé pour cibler un élément avec une classe spécifique ?",
    "reponses": {
      "choice1": "class",
      "choice2": "id",
      "choice3": "tag",
      "choice4": "element",
      "answer": "class"
    }
  },
  {
    "question": "Quel est l'opérateur de comparaison strict en JavaScript ?",
    "reponses": {
      "choice1": "==",
      "choice2": "===",
      "choice3": "!=",
      "choice4": "!==",
      "answer": "==="
    }
  },
  {
    "question": "Quelle méthode JavaScript est utilisée pour retirer le dernier élément d'un tableau ?",
    "reponses": {
      "choice1": "pop()",
      "choice2": "removeLast()",
      "choice3": "deleteLast()",
      "choice4": "splice()",
      "answer": "pop()"
    }
  },
  {
    "question": "Que signifie HTML ?",
    "reponses": {
      "choice1": "Hyper Text Markup Language",
      "choice2": "High Tech Modern Language",
      "choice3": "Home Tool Management Language",
      "choice4": "Human Touch Machine Language",
      "answer": "Hyper Text Markup Language"
    }
  }
];

const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 16;

// Calculer le pourcentage pour la barre de progression
function updateProgress() {
  const pourcentage = (questionCounter / MAX_QUESTIONS) * 100;
  progressBar.style.width = pourcentage + '%';
  progressBar.setAttribute('aria-valuenow', pourcentage);
}

// Démarrer le jeu
function startGame() {
  questionCounter = 0;
  score = 0;
  getNewQuestion();
}

// Fonction pour obtenir une nouvelle question
function getNewQuestion() {
  if (questionCounter >= MAX_QUESTIONS || availableQuestions.length === 0) {
    finishQuiz(); 
    return;
  }
  
 
  // Sélectionner la question actuelle
  currentQuestion = availableQuestions[questionCounter];
  question.innerText = currentQuestion.question;

  choices.forEach((choice, index) => {
    const choiceKey = "choice" + (index + 1);
    choice.innerText = currentQuestion.reponses[choiceKey];
    choice.dataset.number = currentQuestion.reponses[choiceKey];
    // Supprimer les écouteurs d'événements existants
    choice.removeEventListener('click', handleChoiceClick);
    // Ajouter un écouteur d'événements
    choice.addEventListener('click', handleChoiceClick
    );
  });

  acceptingAnswers = true;
  questionCounter++;
  updateProgress();
}

// Écouteur d'événements pour la sélection de choix
function handleChoiceClick(e) {
  if (!acceptingAnswers)
    return;

  const selectedChoice = e.target;
  const selectedAnswer = selectedChoice.dataset['number']; // Selected answer as a string
  const correctAnswer = currentQuestion.reponses['answer']; // Correct answer as a string

  const classToApply = selectedAnswer === correctAnswer ? "correct" : "incorrect";
  selectedChoice.classList.add(classToApply);

  if (classToApply === "correct") {
    score += CORRECT_BONUS;
  }

  setTimeout(() => {
    selectedChoice.classList.remove('correct', 'incorrect');
    getNewQuestion();
  }, 1000);
}

// Minuteur
const timerDisplay = document.getElementById('time');
let minutes = 4;
let seconds = 59;
let timerInterval;

// Fonction pour démarrer le minuteur
function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}

// Fonction pour mettre à jour l'affichage du minuteur
function updateTimer() {
  if (seconds > 0) {
    seconds--;
  } else if (minutes > 0) {
    minutes--;
    seconds = 59;
  } else {
    clearInterval(timerInterval);
    finishQuiz();
  }

  const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
  const displaySeconds = seconds < 10 ? "0" + seconds : seconds;
  timerDisplay.textContent = displayMinutes + ":" + displaySeconds;
}

// Fonction pour terminer le quiz
function finishQuiz() {
  clearInterval(timerInterval);
  if (score >= 12) {
    window.location.href = "SUCCES.html";
  } else {
    window.location.href = "fail.html";
  }
}

// Démarrer le minuteur lorsque le quiz commence
startTimer();
startGame();
