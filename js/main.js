const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
const progressBar = document.querySelector('.progress-bar');


const questionsAnalais = [
  {
    "question": "What is the capital of France?",
    "reponses": {
      "choice1": "London",
      "choice2": "Paris",
      "choice3": "Berlin",
      "choice4": "Rome",
      "answer": "2"
    }
  },
  {
    "question": "Who wrote 'Romeo and Juliet'?",
    "reponses": {
      "choice1": "William Shakespeare",
      "choice2": "Charles Dickens",
      "choice3": "Jane Austen",
      "choice4": "Mark Twain",
      "answer": "1"
    }
  },
  {
    "question": "Which planet is known as the Red Planet?",
    "reponses": {
      "choice1": "Jupiter",
      "choice2": "Mars",
      "choice3": "Venus",
      "choice4": "Mercury",
      "answer": "2"
    }
  },
  {
    "question": "What is the chemical symbol for water?",
    "reponses": {
      "choice1": "Wo",
      "choice2": "Wa",
      "choice3": "H2O",
      "choice4": "Hy",
      "answer": "3"
    }
  }
];

const questionsIQ = [
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
  }
];

const CORRECT_BONUS = 0;
const MAX_QUESTIONS = 16;

// Calculate the percentage of questions answered
function updateProgress() {
  const percentage = (questionCounter / MAX_QUESTIONS) * 100;
  progressBar.style.width = percentage + '%';
  progressBar.setAttribute('aria-valuenow', percentage);
}

// Start the game
function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questionsAnalais, ...questionsIQ];
  availableQuestions.sort(() => Math.random() - 0.5);
  getNewQuestion();
}

// Function to get a new question
function getNewQuestion() {
  if (questionCounter >= MAX_QUESTIONS || availableQuestions.length === 0) {
    finishQuiz();
    return;
  }

  currentQuestion = availableQuestions[questionCounter];
  question.innerHTML = getQuestionCategoryHTML(currentQuestion);
  choices.forEach((choice, index) => {
    const choiceKey = "choice" + (index + 1);
    choice.innerText = currentQuestion.reponses[choiceKey];
    choice.dataset.number = currentQuestion.reponses[choiceKey];
  });

  acceptingAnswers = true;
  questionCounter++;
  updateProgress();
}

// Event listener for choice selection
choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];
    const correctAnswer = currentQuestion.reponses['answer'];

    const classToApply = selectedAnswer === correctAnswer ? "correct" : "incorrect";
    selectedChoice.classList.add(classToApply);

    if (classToApply === "correct") {
      score += CORRECT_BONUS;
    }

    setTimeout(() => {
      selectedChoice.classList.remove('correct', 'incorrect');
      getNewQuestion();
    }, 1000);
  });
});

// Timer
const timerDisplay = document.getElementById('time');
let minutes = 4;
let seconds = 59;
let timerInterval;

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}

// Function to update the timer display
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

// Function to finish the quiz
function finishQuiz() {
  clearInterval(timerInterval);
  if (score >= 12) {
    window.location.href = "SUCCES.html";
  } else {
    window.location.href = "fail.html";
  }
}

function getQuestionCategoryHTML(question) {
  let categoryHTML = "";
  const category = getQuestionCategory(question);
  if (category === "ANGLAIS") {
    categoryHTML = '<h4 class="mb-4 bg-primary">ANGLAIS</h4>';
  } else if (category === "IQ") {
    categoryHTML = '<h4 class="mb-4 bg-success">IQ</h4>';
  } else if (category === "Technique") {
    categoryHTML = '<h4 class="mb-4 bg-info">Technique</h4>';
  }
  return categoryHTML;
}

function getQuestionCategory(question) {
  return question.category; // Assuming category property exists in each question object
}

// Start the timer when the quiz starts
startTimer();
startGame();