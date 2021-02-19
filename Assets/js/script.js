// All Query selectors
var startBtn = document.querySelector("#start");
var timerEl = document.querySelector("#timer");
var body = document.querySelector("#body");
var questionTitle = document.querySelector("#q-title");
var question = document.querySelector("#question");
var ansOne = document.querySelector("#a1");
var ansTwo = document.querySelector("#a2");
var ansThree = document.querySelector("#a3");
var ansFour = document.querySelector("#a4");
var statsEl = document.querySelector("#stats");
var correctEl = document.querySelector("#correct");
var wrongEl = document.querySelector("#wrong");
var unansweredEl = document.querySelector("#unanswered");
var ansDiv = document.querySelector("#answer-div");
var ans = document.querySelector("#answer");
var initials = document.querySelector("#initials");
var initialsInput = document.querySelector("#init-input");
var highscoresEl = document.querySelector("#highscores");
var highscoresBox = document.querySelector("#scores");
var goBack = document.querySelector("#goBack");
var clearHighscores = document.querySelector("#clearHighscores");

// Stats and highscore
var stats = 0;
var highscores = [];

// Timer
var timer = 10;

//Interval
var timed;

// Questions popped
var count = 0;

// Bellow are all the questions 
var q1 = {
    q: "What is 2+2",
    a1: "1",
    a2: "4",
    a3: "5",
    a4: "2",
    correctAns: "4"
}

var q2 = {
    q: "What does DOM stand for?",
    a1: "Demonstrative Object Model",
    a2: "What ever you want it to be.",
    a3: "Document Object Model",
    a4: "Days on Market",
    correctAns: "Document Object Model"
}

var q3 = {
    q: "In JS what is the answer to the following: '2' + 2",
    a1: "String 2",
    a2: "Truthy 2",
    a3: "undefined",
    a4: "Number 2",
    correctAns: "Number 2"
}

var q4 = {
    q: "What Does API stand for?",
    a1: "Application Programming Interface",
    a2: "Additive Programming Interface",
    a3: "American Petroleum Institute",
    a4: "Addictive Programming Interest",
    correctAns: "Application Programming Interface"
}

// Array of questions
var questions = [q1, q2, q3, q4];

// Chosen answer
var qt = "";

// Starts the quiz
startBtn.addEventListener("click", function () {
    startBtn.style.display = "none";
    timerEl.style.display = "inline";
    timerEl.textContent = "Time: " + timer;
    body.style.display = "flex";
    started();
    // getQuestion();
});

// Start the timer and display first question to the user.
function started() {
    getQuestion();
    timed = setInterval(function () {
            timer--;
            timerEl.textContent = "Time: " + timer;
            if (timer === 0) {
                clearInterval(timed);
                showStats();
            }
        },
        1000);
}

// Display question to the user.
function getQuestion() {
    // ansDiv.style.display = "none";
    qt = questions[count];
    if (timer !== 0 && qt === undefined) {
        clearInterval(timed);
        showStats()
    } else {
        questionTitle.textContent = "Question " + (count + 1);
        question.textContent = qt.q;
        ansOne.textContent = qt.a1;
        ansTwo.textContent = qt.a2;
        ansThree.textContent = qt.a3;
        ansFour.textContent = qt.a4;
        ansOne.setAttribute("data-value", qt.a1);
        ansTwo.setAttribute("data-value", qt.a2);
        ansThree.setAttribute("data-value", qt.a3);
        ansFour.setAttribute("data-value", qt.a4);
    }
    count++;
}

// All Answer Buttons click events
// Answer Button 1
ansOne.addEventListener("click", function () {
    checkAns(ansOne.getAttribute("data-value"));
});
// Answer Button 2
ansTwo.addEventListener("click", function () {
    checkAns(ansTwo.getAttribute("data-value"));
});
// Answer Button 3
ansThree.addEventListener("click", function () {
    checkAns(ansThree.getAttribute("data-value"));
});
// Answer Button 4
ansFour.addEventListener("click", function () {
    checkAns(ansFour.getAttribute("data-value"));
});

// Checks if the selected answer is correct
function checkAns(guess) {
    if (guess === qt.correctAns) {
        ans.textContent = "Correct!";
        setTimeout(function() {
            ansDiv.style.display = "none";
        }, 600);
        ansDiv.style.display = "block";
        stats += 5;
        getQuestion();
    } else {
        ans.textContent = "Wrong!";
        setTimeout(function() {
            ansDiv.style.display = "none";
        }, 600);
        ansDiv.style.display = "block";
        stats -= 2;
        // If the user gets an question wrong 1 second is deducted
        timer--;
        getQuestion();
    }
}

// Displays the users final score.
// And make sure none of the other html elements are being displayed
function showStats() {
    body.style.display = "none";
    ansDiv.style.display = "none";
    statsEl.style.display = "flex";
    correctEl.textContent = "Score: " + stats;
}

// When After the user submits their initials then it will store into highscore array.
initials.addEventListener("submit", function (event) {
    event.preventDefault();
    if (initialsInput.value !== "" && initialsInput.value !== undefined) {
        highscores.push(initialsInput.value + " " + stats);
        showHighscores();
    } else {
        alert("You must enter at least one character to enter.");
    }
});

// Show all highscores to the user
function showHighscores() {
    statsEl.style.display = "none";
    highscoresEl.style.display = "flex";
    for (let i = 0; i < highscores.length; i++) {
        let entry = document.createElement("span");
        entry.textContent = (i + 1) + ". " + highscores[i];
        highscoresBox.appendChild(entry);
    }
}

// Reset all counts, timers, stats and sends the user back to the start screen
goBack.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    startBtn.style.display = "inline";
    timerEl.style.display = "none";
    count = 0;
    stats = 0;
    timer = 10;
    // Remove all children in the highscore box
    while (highscoresBox.firstChild) {
        highscoresBox.removeChild(highscoresBox.firstChild);
    }
});

// Handles the removal of all scores in the highscore box but doesnt remove from the
// highscores array.
clearHighscores.addEventListener("click", function () {
    // Remove all children in the highscore box
    while (highscoresBox.firstChild) {
        highscoresBox.removeChild(highscoresBox.firstChild);
    }
    highscores = [];
});