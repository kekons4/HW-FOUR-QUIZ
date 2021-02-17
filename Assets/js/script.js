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

// Stats object
var stats = 0;

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

startBtn.addEventListener("click", function () {
    startBtn.style.display = "none";
    timerEl.style.display = "inline";
    timerEl.textContent = "Time: " + timer;
    body.style.display = "flex";
    started();
    // getQuestion();
});

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

function getQuestion() {
    ansDiv.style.display = "none";
    count++;
    qt = questions.pop();
    if (timer !== 0 && qt === undefined) {
        clearInterval(timed);
        showStats()
    } else {
        questionTitle.textContent = "Question " + (count);
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
        ansDiv.style.display = "block";
        ans.textContent = "Correct!";
        stats += 5;
        getQuestion();
    } else {
        ansDiv.style.display = "block";
        ans.textContent = "Wrong!";
        stats -= 5;
        getQuestion();
    }
}

// Displays the number of correct and wrong to the user
// And make sure none of the other html elements are being displayed
function showStats() {
    body.style.display = "none";
    ansDiv.style.display = "none";
    statsEl.style.display = "flex";
    correctEl.textContent = "Score: " + stats;    
}