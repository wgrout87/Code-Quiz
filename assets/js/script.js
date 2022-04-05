import { questions } from "./questions.js";

// BEGIN QUERY SELECTORS
var score = document.querySelector("#score");
var currentScoreDisplay = document.querySelector("#currentScore");
var quiz = document.querySelector("#quiz");
var beginBtn = document.querySelector("#beginBtn");
var timerBar = document.querySelector("#timerBar");
var challengeContent = document.querySelector("#challengeContent");
var timeRemainingDisplay = document.querySelector("#timeRemaining");
var currentCombo = document.querySelector("#currentCombo");
var currentPointsMultiplier = document.querySelector("#currentPointsMultiplier");
// END QUERY SELECTORS

// BEGIN GLOBAL VARIABLES
var combo = 0;
var pointsMultiplier = 1;
var timeRemaining = 0;
var currentScore = 0;
var quizQuestions = [];
var quizAnswers = [];
var currentQuestion = 0;
var quizAnswersValues = [];
var currentQuestionObj = null;
var questionAnswer1 = null;
var questionAnswer2 = null;
var questionAnswer3 = null;
var questionAnswer4 = null;
var timeoutID = null;
var intervalID = null;
var timerBarWidth = 550;
var timerIntervalID = null;
var highScores = [];
var highScoreRecord = {
    initials: "",
    highScore: ""
};
var cursor = null;
var cursorIntervalID = null;
var cursorAltIntervalID = null;
var cursorTimeoutID = null;
var cursorAltTimeoutID = null;
var initialsContainer = null;
var initials = "";
// END GLOBAL VARIABLES

// Changes display for the game elements, sets values within the display, and adds the first question
var beginQuiz = function () {
    // Reveals the game elements
    score.style.opacity = "1";
    timerBar.style.opacity = "1";
    challengeContent.style.opacity = "1";
    // Sets the game element read-outs
    currentScoreDisplay.textContent = currentScore;
    timeRemainingDisplay.textContent = timeRemaining;
    currentCombo.textContent = combo;
    currentPointsMultiplier.textContent = pointsMultiplier.toPrecision(2);
    // Removes the quiz instructions
    removeQuizContent();
    beginBtn.remove();
    // Randomly selects 15 questions from the questions array for this quiz
    randomizeQuestions();
    // Adds the first question
    addQuestion();
    // Starts the timer
    runTimer();
}

// Removes the content of the quiz div
var removeQuizContent = function () {
    // Sets variable to identify the last child within the quiz <div>
    var child = quiz.lastElementChild;
    // Systematically removes the last child element from the quiz <div> until none remain
    while (child) {
        quiz.removeChild(child);
        child = quiz.lastElementChild;
    }
};

// This function randomizes the order of the questions from the questions array
var randomizeQuestions = function () {
    while (quizQuestions.length < 15) {
        // A random number is generated that corresponds to a question in the question array
        var possibleQuestion = Math.floor(Math.random() * questions.length);
        // The new number possibleQuestion is checked against the existing array and only added in if it is not already present
        if (quizQuestions.indexOf(possibleQuestion) === -1) {
            quizQuestions.push(possibleQuestion);
        }
    }
};

// Adds a question to the quiz div
var addQuestion = function () {
    // Only 15 questions will be chosen per quiz
    if (currentQuestion < 15) {
        console.log(quizAnswersValues);
        // The question object selected from the questions array is referenced here
        currentQuestionObj = questions[quizQuestions[currentQuestion]];
        // HTML elements are created referencing the question object properties and added into the DOM
        var questionEl = document.createElement("p");
        questionEl.className = "question";
        questionEl.textContent = currentQuestionObj.question;
        quiz.appendChild(questionEl);
        // randomizeAnswers() is called to rearrange the order of the answers every time the quiz is taken
        randomizeAnswers();
        // The quizAnswersValues array is reset from previous question
        quizAnswersValues = [];
        addAnswers();
        // The currentQuestion counter advances
        currentQuestion++;
    }

    // Runs the endQuiz function if 15 questions have been answered
    else {
        endQuiz();
    }
}

// Adds answers to the quiz div
var addAnswers = function () {
    // Creates the <div> to which the questions will be added
    var fourAnswersEl = document.createElement("div");
    // Adds a class to the <div>
    fourAnswersEl.className = "quizAnswers";
    // Adds answers from the current question object according to the array that was established by the randomizeAnswers() function
    for (let i = 0; i < 4; i++) {
        // Creates a <button> for each answer
        var answerEl = document.createElement("button");
        // Gives each <button> a class
        answerEl.className = "questionAnswer";
        // Adds in the answer as text content
        answerEl.textContent = currentQuestionObj.answers[quizAnswers[i]].answerString;
        // Appends the answer <button> to the previously created fourAnswersEl <div>
        fourAnswersEl.appendChild(answerEl);
        // Tracks the answers' values in the quizAnswersValues array
        quizAnswersValues[i] = currentQuestionObj.answers[quizAnswers[i]].answerValue;
    }
    // Appends the fourAnswersEl <div> which now contains four <button> elements that contain the answers as text content
    quiz.appendChild(fourAnswersEl);
    console.log(quizAnswersValues);
    // Establishes references for each of the newly added <button> elements
    questionAnswer1 = document.querySelector("button:nth-child(1)");
    questionAnswer2 = document.querySelector("button:nth-child(2)");
    questionAnswer3 = document.querySelector("button:nth-child(3)");
    questionAnswer4 = document.querySelector("button:nth-child(4)");
}

// This function randomizes the order of the answers for the current question
var randomizeAnswers = function () {
    while (quizAnswers.length < 4) {
        // A random number is generated that corresponds to an answer
        var possibleAnswer = Math.floor(Math.random() * 4);
        // The new number possibleAnswer is checked against the existing array and only added in if it is not already present
        if (quizAnswers.indexOf(possibleAnswer) === -1) {
            quizAnswers.push(possibleAnswer);
        }
    }
};

// Adds the next question when a correct answer is given
var correctAnswer = function () {
    // Resets the timer bar
    timerBarReset();
    // Starts the timer bar counting down again
    timerBarShrink();
    // Resets the quizAnswersValues array for subsequent questions
    quizAnswersValues = [];
    // Removes the answered question
    removeQuizContent();
    // Adds in the next question
    addQuestion();
    // Updates the score
    scoreAdjust(1000);
    // Updates the combo
    comboAdjust();
    // Updates the points multiplier
    pointsMultiplierAdjust();
};

// Incorrect answer function
var incorrectAnswer = function () {
    console.log("Incorrect");
    // Resets the combo
    comboReset();
    // Resets the points multiplier
    pointsMultiplierReset();
    // Resets the timer bar
    timerBarReset();
    timeRemaining -= 3;
    timeRemainingDisplay.textContent = timeRemaining;
};

// Adjusts the score after a correct answer was chosen
var scoreAdjust = function (pointValue) {
    currentScore += pointValue * pointsMultiplier;
    currentScoreDisplay.textContent = currentScore;
};

// Adjusts the combo after a correct answer was chosen
var comboAdjust = function () {
    combo++;
    currentCombo.textContent = combo;
};

// Resets the combo and updates the display
var comboReset = function () {
    combo = 0;
    currentCombo.textContent = combo;
};

// Resets the points multiplier and updates the display
var pointsMultiplierReset = function () {
    pointsMultiplier = 1;
    currentPointsMultiplier.textContent = pointsMultiplier.toPrecision(2);
};

// Adjusts the score after a correct answer was chosen
var pointsMultiplierAdjust = function () {
    pointsMultiplier = pointsMultiplier + 0.1;
    currentPointsMultiplier.textContent = pointsMultiplier.toPrecision(2);
};

// Shrinks the timer bar 
var timerBarShrink = function () {
    // Starts the timer bar shrinking during the first second
    timerBarWidth = 513;
    timerBar.style.width = timerBarWidth + "px";
    // setTimeout function will reset the combo and point multiplier if a correct answer isn't given in time
    timeoutID = setTimeout(() => {
        comboReset();
        pointsMultiplierReset();
    }, 15000);
    // Shrinks the timer bar once every second
    intervalID = setInterval(function () {
        // Shrinks the bar by 37 pixels until the last second
        if (timerBarWidth > 32) {
            timerBarWidth -= 37;
        }

        // Sets the bar width to zero for the last second
        else if (timerBarWidth === 32) {
            timerBarWidth = 0;
        }
        timerBar.style.width = timerBarWidth + "px";
    }, 1000);
};

// Resets the timer bar
var timerBarReset = function () {
    // Clears the setTimeout function from line 684
    clearInterval(intervalID);
    // Returns the timer bar to its default width
    timerBarWidth = 550;
    timerBar.style.width = timerBarWidth + "px";
    // Clears the setInterval function from line 689
    clearTimeout(timeoutID);
};

// This function runs the timer
var runTimer = function () {
    timerIntervalID = setInterval(() => {
        // If there is time remaining, the timer will be updated every second
        if (timeRemaining > 0) {
            timeRemaining--;
            timeRemainingDisplay.textContent = timeRemaining;
        }

        // If time has run out, the quiz is ended
        else {
            endQuiz();
        }
    }, 1000)
};

// Function handles the endgame logic
var endQuiz = function () {
    // Stops the timer
    clearInterval(timerIntervalID);
    // Resets the timer bar
    timerBarReset();
    // Converts timeRemaining to a value for points
    var timeRemainingPoints = timeRemaining * 10;
    // Adds points for the time remaining adjusted by the points multiplier
    scoreAdjust(timeRemainingPoints);
    // Hides the game elements
    score.style.opacity = "0";
    timerBar.style.opacity = "0";
    challengeContent.style.opacity = "0";
    removeQuizContent();
    results();
};

// Displays the quiz results and prompts for high score initials if applicable
var results = function () {
    var displayResultsEl = document.createElement("h2");
    displayResultsEl.className = "results";
    displayResultsEl.textContent = "You scored " + currentScore + " points!";
    quiz.appendChild(displayResultsEl);
    if (compareHighScores() > 0) {
        newHighScoreDisplay();
    }

    else {
        console.log("Play again?")
    }
};

// Retrieves saved high scores for comparison
var compareHighScores = function () {
    highScores = JSON.parse(localStorage.getItem("highScores"));
    // If highScores is null, the array is empty, and a high score is automatic
    if (highScores === null) {
        console.log("New high score! - The array is empty");
        return 1;
    }
    // Compares the current high score against each score in the saved array
    else {
        for (let i = 0; i < highScores.length; i++) {
            if (currentScore > highScores[i].highScore) {
                console.log("New high score!");
                return 2;
            }
        }
    }
};

var newHighScoreDisplay = function () {
    // Sets the highScore property of the highScoreRecord object in preparation for saving to local storage
    highScoreRecord.highScore = currentScore;
    // Creates a new <p> element
    var displayResultsEl = document.createElement("p");
    // Gives it the class name "results"
    displayResultsEl.className = "results";
    // Adds the text
    displayResultsEl.textContent = "New high score!";
    // Appends it to the quiz <div>
    quiz.appendChild(displayResultsEl);
    // Runs the addInitials() function which appends three <div> elements for initials input
    addInitials();
    // Creates an <h2> element
    displayResultsEl = document.createElement("h2");
    // Gives it the class name "results"
    displayResultsEl.className = "results";
    // Adds the text
    displayResultsEl.textContent = "Please enter your initials:";
    // Appends it to the quiz <div>
    quiz.appendChild(displayResultsEl);
    // Runs the addInitialsInput() function which adds buttons for each individual letter for initials input
    addInitialsInput();
    // Runs the waitForInput() function which adds a flashing cursor to any <div> element with the "cursor" class
    waitForInput();
};

// Adds 3 <div> elements that will be used for initials input. Each <div> will receive its own initial upon entry
var addInitials = function () {
    // Creates a new <div> element to hold the remaining 3
    initialsContainer = document.createElement("div");
    // Gives it the class name "initials"
    initialsContainer.className = "initials";
    // Loops until 3 <div> elements are created and added within the previous <div>
    for (let i = 0; i < 3; i++) {
        var initialsEl = document.createElement("div");
        // The first nested <div> is given the class name "cursor"
        if (i === 0) {
            initialsEl.className = "cursor";
        }
        initialsContainer.appendChild(initialsEl);
    }
    // The new <div> with 3 nested <div> elements is appended to the quiz space
    quiz.appendChild(initialsContainer);
};

// Adds buttons to receive input when initials are requested
var addInitialsInput = function () {
    // Creates a new <div> element that will hold the buttons this function will create
    var btnDivEl = document.createElement("div");
    // Gives it the class name "btnDiv"
    btnDivEl.className = "btnDiv";
    // This string of characters will provide the text content of the buttons that will be generated
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // Loops until a button for each letter in the above string has been created
    for (let i = 0; i < chars.length; i++) {
        // Creates a new <button> element
        var charBtnEl = document.createElement("button");
        // Gives it the class name "charBtn"
        charBtnEl.className = "charBtn";
        // As i increments, it will simultaneously be used to reference a character position in the "chars" string, which will become the text content of the new button
        charBtnEl.textContent = chars.charAt(i);
        // The new button is appended to the previously created <div>
        btnDivEl.appendChild(charBtnEl);
    }
    // The whole thing is added to the quiz section
    quiz.appendChild(btnDivEl);
};

// This function handles the flashing of the border bottom for the initials input
var waitForInput = function () {
    // The current <div> with the "cursor" class is identified and assigned to the cursor global variable
    cursor = document.querySelector(".cursor");
    // The timeout ID for this setTimeout function is captured
    cursorTimeoutID = setTimeout(() => {
        // The "cursor" class will be removed in 400ms. The <div> with the "cursor" class will begin with the border bottom established by the CSS for those first 400 ms
        cursor.classList.remove("cursor");
    }, 400)
    // The timeout ID for this setTimeout function is captured. After 400ms, an interval will begin
    cursorAltTimeoutID = setTimeout(() => {
        // The interval ID for this setInterval function is captured
        cursorIntervalID = setInterval(() => {
            // Every 800 ms the "cursor" class will be removed. So far the "cursor" class will be removed 400ms in, then 1200ms, 2000ms, 2800ms, etc.
            cursor.classList.remove("cursor");
        }, 800);
    }, 400);
    // The interval ID for this setInterval function is captured
    cursorAltIntervalID = setInterval(() => {
        // Every 800 ms the "cursor" class will be added again. So it will be added back 800ms in, then 1600ms, 2400ms, etc. This will return it evenly spaced out with the class being removed, causing the flashing effect.
        cursor.classList.add("cursor");
    }, 800);
};

// Halts the flashing cursor
var clearCursor = function () {
    // Removes the cursor class which adds the border bottom
    cursor.classList.remove("cursor");
    // Clears intervals and timeouts for a smooth transition when necessary
    clearInterval(cursorIntervalID);
    clearInterval(cursorAltIntervalID);
    clearTimeout(cursorTimeoutID);
    clearTimeout(cursorAltTimeoutID);
};

// Evenet listener for the beginQuiz button
beginBtn.addEventListener("click", beginQuiz);

// Adds an event listener to the entire quiz section, but only pays attention to questionAnswer class elements 
quiz.addEventListener("click", function (clicked) {
    if (clicked.target.className == "questionAnswer" && clicked.target === questionAnswer1) {
        // Checks if the answer is correct against the quizAnswersValues array that was established by the addAnswers() function
        if (quizAnswersValues[0]) {
            correctAnswer();
        } else {
            incorrectAnswer();
        }
    }
    if (clicked.target.className == "questionAnswer" && clicked.target === questionAnswer2) {
        // Checks if the answer is correct against the quizAnswersValues array that was established by the addAnswers() function
        if (quizAnswersValues[1]) {
            correctAnswer();
        } else {
            incorrectAnswer();
        }
    }
    if (clicked.target.className == "questionAnswer" && clicked.target === questionAnswer3) {
        // Checks if the answer is correct against the quizAnswersValues array that was established by the addAnswers() function
        if (quizAnswersValues[2]) {
            correctAnswer();
        } else {
            incorrectAnswer();
        }
    }
    if (clicked.target.className == "questionAnswer" && clicked.target === questionAnswer4) {
        // Checks if the answer is correct against the quizAnswersValues array that was established by the addAnswers() function
        if (quizAnswersValues[3]) {
            correctAnswer();
        } else {
            incorrectAnswer();
        }
    }
    if (clicked.target.className == "charBtn") {
        // Asks for input for the user's initials and gets the values from the clicked buttons
        cursor.textContent = clicked.target.textContent;
        // Adds the input intials to the initials string so that it can be added to the highScoreRecord object for storage
        initials += clicked.target.textContent;
        // This if statement handles entry for the first initial after an initial has been selected
        if (cursor == initialsContainer.querySelector("div:nth-child(1)")) {
            // The cursor is halted
            clearCursor();
            // The cursor variable is assigned the second initial
            cursor = initialsContainer.querySelector("div:nth-child(2)");
            // The cursor class is added to the second initial so that its border can appear and begin to blink
            cursor.classList.add("cursor");
            // waitForInput() is called to start the border blinking
            waitForInput();
        }
        // This if statement handles entry for the second initial after an initial has been selected
        else if (cursor == initialsContainer.querySelector("div:nth-child(2)")) {
            // The cursor is halted
            clearCursor();
            // The cursor variable is assigned the third initial
            cursor = initialsContainer.querySelector("div:nth-child(3)");
            // The cursor class is added to the third initial so that its border can appear and begin to blink
            cursor.classList.add("cursor");
            // waitForInput() is called to start the border blinking
            waitForInput();
        }
        // This if statement handles entry for the third initial after an initial has been selected
        else if (cursor == initialsContainer.querySelector("div:nth-child(3)")) {
            // The cursor is halted
            clearCursor();
            // Initials input has been received, and the string is added to the highScoreRecord object for storage
            highScoreRecord.initials = initials;
            console.log(JSON.stringify(highScoreRecord));
        }
    }
});