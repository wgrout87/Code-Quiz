import { questions } from "./questions.js";

// BEGIN QUERY SELECTORS
var highScoreInitials = document.querySelector("#highScoreInitials");
var highScorePoints = document.querySelector("#highScorePoints");
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
var timeRemaining = null;
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
var newHighScorePosition = null;
// END GLOBAL VARIABLES

// Changes display for the game elements, sets values within the display, and adds the first question
var beginQuiz = function () {
    // Sets the timer
    timeRemaining = 10;
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
};

// Retrieves the current saved array of high scores
var retrieveHighScores = function () {
    // Retrieves the saved high score string and turns it back into an array of objects
    highScores = JSON.parse(localStorage.getItem("highScores"));
    // Displays the high score
    if (highScores) {
        highScoreInitials.textContent = highScores[0].initials;
        highScorePoints.textContent = highScores[0].highScore;
    }

    // If no high scores are saved, the current high score will display as blank
    else {
        highScoreInitials.textContent = "---";
        highScorePoints.textContent = "-";
    }
};

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
    if (currentScore > 0) {
        compareHighScores();
    }
    
    else {
        playAgainPrompt();
    }
};

// Compares currentScore to any saved high score values
var compareHighScores = function () {
    // If highScores is null, the array is empty, and a high score is automatic
    if (highScores === null) {
        // Sets the highScore property of the highScoreRecord object in preparation for saving to local storage
        highScoreRecord.highScore = currentScore;
        newHighScoreDisplay();
    }
    // Compares the current high score against each score in the saved array
    else {
        // For loop looks at each saved high score and compares the currentScore
        for (let i = 0; i < highScores.length; i++) {
            // Starting at the end of the array, the currentScore is compared 
            if (currentScore > highScores[highScores.length - 1 - i].highScore) {
                // Sets the highScore property of the highScoreRecord object in preparation for saving to local storage
                highScoreRecord.highScore = currentScore;
                // newHighScorePosition is set to the number corresponding to the last position the currentScore was greater than. This value will be used to splice the currentScore into the correct position
                newHighScorePosition = highScores.length - 1 - i;
            }
        }
    };

    // If newHighScorePosition was given a value, then a new high score was achieved that beat out at least one of the saved high scores
    if (newHighScorePosition !== null) {
        newHighScoreDisplay();
        // Sets the highScore property of the highScoreRecord object in preparation for saving to local storage
        highScoreRecord.highScore = currentScore;
    }

    if (highScores !== null) {
        // If there is space in the highScores array, but the currentScore did not beat any of the saved scores, a new high score was still achieved and newHighScoreDisplay() is called
        if (highScores.length < 10 && newHighScorePosition == null) {
            newHighScoreDisplay();
            // Sets the highScore property of the highScoreRecord object in preparation for saving to local storage
            highScoreRecord.highScore = currentScore;
        }

        if (highScores.length == 10 && newHighScorePosition == null) {
            playAgainPrompt();
        }
    };
};

var newHighScoreDisplay = function () {
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
    initialsContainer.className = "initials centered";
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
    btnDivEl.className = "btnDiv centered";
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

// Saves the new high score in the highScores array
var saveHighScore = function () {
    // If there are currently high scores saved and the newHighScorePosition has been given a value, this if statement will insert the new high score into its properly ordered position provided by the compareHighScores() function
    if (highScores !== null && newHighScorePosition !== null) {
        highScores.splice(newHighScorePosition, 0, highScoreRecord);
        console.log(highScores);
        if (highScores.length > 10) {
            highScores.pop();
        };
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }

    // If there are currently high scores saved and the currentScore did not beat any of the saved high scores, this if statement will add the highScoreRecord at the end of the list
    else if (highScores !== null) {
        highScores.push(highScoreRecord);
        console.log(highScores);
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }

    // If the highScores array is null, this is the first saved high score, and it will simply be saved as the only item in the array
    else {
        console.log(highScoreRecord);
        highScores = [highScoreRecord];
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }
};

var displayHighScores = function () {
    removeQuizContent();
    var displayHighScoresEl = document.createElement("h2");
    displayHighScoresEl.textContent = "High Scores";
    displayHighScoresEl.className = "highScoreListTitle centered";
    quiz.appendChild(displayHighScoresEl);
    var highScoreListEl = document.createElement("ol");
    highScoreListEl.className = "highScoreList";
    if (highScores !== null) {
        for (let i = 0; i < highScores.length; i++) {
            var highScoreListItemEl = document.createElement("li");
            highScoreListItemEl.className = "highScoreListItem";
            var highScoreInitialsEl = document.createElement("p");
            if (i === 9) {
                highScoreInitialsEl.textContent = (i + 1) + ". " + highScores[i].initials;
            }

            else {
                highScoreInitialsEl.textContent = "0" + (i + 1) + ". " + highScores[i].initials;
            }
            highScoreListItemEl.appendChild(highScoreInitialsEl);
            var highScoreEl = document.createElement("p");
            highScoreEl.textContent = highScores[i].highScore;
            highScoreListItemEl.appendChild(highScoreEl);
            highScoreListEl.appendChild(highScoreListItemEl);
        }
    }
    quiz.appendChild(highScoreListEl);
    var playAgainEl = document.createElement("button");
    playAgainEl.id = "playAgain";
    playAgainEl.textContent = "Play Again";
    quiz.appendChild(playAgainEl);
};

var playAgainPrompt = function () {
    var promptEl = document.createElement("div");
    promptEl.className = "prompt centered";
    var promptQuestionEl = document.createElement("h2");
    promptQuestionEl.textContent = "Would you like to play again?";
    promptEl.appendChild(promptQuestionEl);
    var promptBtnDivEl = document.createElement("div");
    promptBtnDivEl.className = "promptButtons";
    var promptBtnYEl = document.createElement("button");
    promptBtnYEl.className = "charBtn";
    promptBtnYEl.textContent = "Y";
    promptBtnYEl.id = "Y";
    promptBtnDivEl.appendChild(promptBtnYEl);
    var promptBtnBetween = document.createElement("div");
    promptBtnBetween.className = "btnBetween";
    promptBtnBetween.textContent = "/";
    promptBtnDivEl.appendChild(promptBtnBetween);
    var promptBtnNEl = document.createElement("button");
    promptBtnNEl.className = "charBtn";
    promptBtnNEl.textContent = "N";
    promptBtnNEl.id = "N";
    promptBtnDivEl.appendChild(promptBtnNEl);
    promptEl.appendChild(promptBtnDivEl);
    quiz.appendChild(promptEl);
};

var totalReset = function () {
    combo = 0;
    pointsMultiplier = 1;
    currentScore = 0;
    initials = "";
    highScoreRecord = {
        initials: "",
        highScore: ""
    };
    newHighScorePosition = null;
};

// Calls the retrieveHighScores() function to display the current high score
retrieveHighScores();

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
    if (clicked.target.className == "charBtn" && clicked.target.id !== "Y" && clicked.target.id !== "N") {
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
            saveHighScore();
            console.log(JSON.stringify(highScoreRecord));
            retrieveHighScores();
            displayHighScores();
        }
    }

    if (clicked.target.id == "Y") {
        totalReset();
        beginQuiz();
    }

    if (clicked.target.id == "N") {
        displayHighScores();
    }
    
    if (clicked.target.id == "playAgain") {
        totalReset();
        beginQuiz();
    }
});