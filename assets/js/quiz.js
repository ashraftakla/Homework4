// All the questions and answers go here
var allItems = [
    {
        question: "which JavaScript is also called client-side JavaScript?",
        answers: [
            { text: "Microsoft", correct: false },
            { text: "LiveWire", correct: false },
            { text: "Navigator", correct: true },
            { text: "Native", correct: false }
        ]
    },

    {
        question: "What are variables used for in JavaScript Programs?",
        answers: [
            { text: "Storing numbers, dates, or other values", correct: true },
            { text: "Varying randomly", correct: false },
            { text: "Causing high-school algebra flashbacks", correct: false },
            { text: "None of the above", correct: false }
        ]
    },

    {
        question: "What should appear at the very end of your JavaScript?",
        answers: [
            { text: "The </script>", correct: true },
            { text: "The <script>", correct: false },
            { text: "The END statement", correct: false },
            { text: "None of the above", correct: false }
        ]
    },


];

var questionH1Tag = document.getElementById("question-here");
var answerList = document.getElementById("answers-here");
var guessResult = document.getElementById("guess-result");
var currentScore = document.getElementById("current-score");
var timeLeft = document.getElementById("time-left");

var currQuestionIdx = 0;
var score = 0;
var correctAnswers = 0;
var quizSeconds = 90;        // CHANGE TO A BIGGER NUMBER WHEN FINISHED
var quizInterval;
var isGameOver = false;



function populateQuestion(question) {
    questionH1Tag.textContent = question;
}

function populateAnswers(answers) {
    answerList.innerHTML = "";
    for (var i = 0; i < answers.length; i++) {
        // Create li tag for the answer
        var liTag = document.createElement("li");

        // Create button for user to click
        var button = document.createElement("button");
        button.setAttribute("class", "answer");
        button.textContent = "Choose";

        // Set the attribute of this button to indicate if it's the correct answer
        button.setAttribute("data-isCorrect", answers[i].correct);

        // Event lustener for when the button is clicked
        button.addEventListener("click", function (event) {
            var isCorrectAnswer = event.target.getAttribute("data-isCorrect");
            console.log(isCorrectAnswer);
            if (isCorrectAnswer == "true") {
                answerIsRight();
            } else {
                answerIsWrong();
            }
            updateCurrentScore();
            // TODO: move to next question
        });

        liTag.textContent = answers[i].text;
        liTag.appendChild(button);
        answerList.appendChild(liTag);
    }
}

function updateCurrentScore() {
    currentScore.textContent = score;
}

function showRemainingSeconds() {
    timeLeft.textContent = quizSeconds;
}


function answerIsWrong() {
    guessResult.textContent = "Wrong!";
    currQuestionIdx++;
    runQuestion();
}

function answerIsRight() {
    score += quizSeconds;
    correctAnswers++;
    guessResult.textContent = "Right!";
    currQuestionIdx++;
    runQuestion();
}


// Displays the current question in the queue
function runQuestion() {
    if (currQuestionIdx < allItems.length) {
        var currItem = allItems[currQuestionIdx];
        populateQuestion(currItem.question);
        populateAnswers(currItem.answers);
    } else {
        isGameOver = true;
        alert("Game Over, Man!");
    }
}

// Start looping through the quiz items
function startQuiz() {
    runQuestion();
    quizInterval = setInterval(function () {
        quizSeconds--;
        showRemainingSeconds();

        if (quizSeconds == 0) {
            if (!isGameOver) {
                alert("Game Over, Man!");
            }
            clearInterval(quizInterval);
        }
    }, 1000);
}

updateCurrentScore();
startQuiz();