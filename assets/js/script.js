// Imports the questions from questions.js
import { questions } from "./questions.js";



// BEGIN QUERY SELECTORS
// <p> whose text is the initials of the saved highest score
var highScoreInitials = document.querySelector("#highScoreInitials");
// <p> whose text is the saved highest score
var highScorePoints = document.querySelector("#highScorePoints");
// <div> for displaying the current score
var score = document.querySelector("#score");
// <p> whose text is the current score
var currentScoreDisplay = document.querySelector("#currentScore");
// <div> for holding all of the generated quiz content
var quiz = document.querySelector("#quiz");
// <button> for beginning the quiz
var beginBtn = document.querySelector("#beginBtn");
// <div> that is the timer bar - no content, only style
var timerBar = document.querySelector("#timerBar");
// <div> that holds the game content (timer, combo counter, and points multiplier)
var gameContent = document.querySelector("#gameContent");
// <span> that will be given text content to display the time remaining
var timeRemainingDisplay = document.querySelector("#timeRemaining");
// <span> that will be given text content to display the current combo
var currentCombo = document.querySelector("#currentCombo");
// <span> that will be given text content to display the points multiplier
var currentPointsMultiplier = document.querySelector("#currentPointsMultiplier");
// END QUERY SELECTORS



// BEGIN GLOBAL VARIABLES - variables with null values are all defined within the functions that use them
// combo is referenced by the beginQuiz(), comboAdjust(), and comboReset() functions
var combo = 0;
// pointsMultiplier is referenced by the beginQuiz(), scoreAdjust(), pointsMultiplierAdjust(), and pointsMultiplierReset() functions
var pointsMultiplier = 1;
// timeRemaining is referenced by the beginQuiz(), incorrectAnswer(), runTimer(), and endQuiz() functions
var timeRemaining = null;
// currentScore is referenced by the beginQuiz(), scoreAdjust(), results(), and compareHighScores() functions
var currentScore = 0;
// quizQuestions is referenced by the randomizeQuestions() and addQuestions() functions
var quizQuestions = [];
// quizAnswers is referenced by the randomizeAnswers() and addAnswers() functions
var quizAnswers = [];
// currentQuestion is referenced by the addQuestion() function. It is a global variable because each separate call of the addQuestion() function should increment the variable by 1
var currentQuestion = 0;
// quizAnswersValues is referenced by the addQuestion(), addAnswers(), and correctAnswer() functions. It is also referenced by the event listeners that handles answer button clicks
var quizAnswersValues = [];
// currentQuestionObj is refernced by the addQuestion() and addAnswers() functions
var currentQuestionObj = null;
// These questionAnswer variable are given value by querySelector every time the addAnswers() function is called. They are also referenced as click targets in the eventListener
var questionAnswer1 = null;
var questionAnswer2 = null;
var questionAnswer3 = null;
var questionAnswer4 = null;
// timeoutID is referenced by the timerBarShrink() and timerBarReset() functions
var timeoutID = null;
// intervalID is referenced by the timerBarShrink(), timerBarReset(), and runTimer() functions
var intervalID = null;
// timerBarWidthDefault is referenced by the timerBarShrink() and timerBarReset() functions
var timerBarWidthDefault = parseInt(getComputedStyle(timerBar).getPropertyValue("width"));
// timerBarWidth is referenced by the timerBarShrink() and timerBarReset() functions
var timerBarWidth = null;
// timerIntervalID is referenced by the runTimer() and endQuiz() functions
var timerIntervalID = null;
// highScores is referenced by the retrieveHighScores(), compareHighScores(), saveHighScore(), and displayHighScores() functions
var highScores = [];
// highScoreRecord is referenced by the compareHighScores() and saveHighScore() functions. It is also referenced by the event listener that handles initials entry
var highScoreRecord = {
    initials: "",
    highScore: ""
};
// blink is referenced by the waitForInput() and clearBlink() functions. It is also referenced by the event listener that handles initials entry
var blink = null;
// blinkIntervalID is referenced by the waitForInput() and clearBlink() functions
var blinkIntervalID = null;
// blinkAltIntervalID is referenced by the waitForInput() and clearBlink() functions
var blinkAltIntervalID = null;
// blinkTimeoutID is referenced by the waitForInput() and clearBlink() functions
var blinkTimeoutID = null;
// blinkAltTimeoutID is referenced by the waitForInput() and clearBlink() functions
var blinkAltTimeoutID = null;
// initialsContainer is referenced by the addInitials() function. It is also referenced by the event listener that handles initials entry
var initialsContainer = null;
// initials is referenced by the event listener that handles initials entry. It is a global variable because each time a button is clicked, it should add to the already existing string of initials
var initials = "";
// newHighScorePosition is referenced by the compareHighScores(), and saveHighScores functions
var newHighScorePosition = null;
// END GLOBAL VARIABLES



// Changes display for the game elements, sets values within the display, and adds the first question
var beginQuiz = function () {
    // Sets the timer
    timeRemaining = 0;
    // Reveals the game elements
    score.style.opacity = "1";
    timerBar.style.opacity = "1";
    gameContent.style.opacity = "1";
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

// Removes the content of the quiz <div>
var removeQuizContent = function () {
    // Sets variable to identify the last child within the quiz <div>
    var child = quiz.lastElementChild;
    // Systematically removes the last child element from the quiz <div> until none remain
    while (child) {
        quiz.removeChild(child);
        child = quiz.lastElementChild;
    }
};



// BEGIN FUNCTIONS TO ADD QUIZ QUESTIONS AND ANSWERS
// This function randomizes the order of the questions from the questions array. It creates the quizQuestions array that will contain the 15 questions for the current quiz
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

// Adds a question to the quiz div from the quizQuestions array
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

// Adds answers to the <quiz> div
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
// END FUNCTIONS TO ADD QUIZ QUESTIONS AND ANSWERS



// BEGIN ANSWER HANDLERS
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
    // Resets the combo
    comboReset();
    // Resets the points multiplier
    pointsMultiplierReset();
    // Resets the timer bar
    timerBarReset();
    timeRemaining = Math.max(timeRemaining - 3, 0);
    timeRemainingDisplay.textContent = timeRemaining;
};
// END ANSWER HANDLERS



// BEGIN GAME CONTENT HANDLERS
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
    // Sets the amount the timer bar will shrink for the first 14 seconds
    var timerBarIncrement = Math.ceil(timerBarWidthDefault / 15);
    // Sets the amount the timer bar will shrink for the last second
    var timerBarRemainder = timerBarWidthDefault - (14 * timerBarIncrement);
    // Starts the timer bar shrinking during the first second
    timerBarWidth = timerBarWidthDefault - timerBarIncrement;
    timerBar.style.width = timerBarWidth + "px";
    // setTimeout function will reset the combo and point multiplier if a correct answer isn't given in time
    timeoutID = setTimeout(() => {
        comboReset();
        pointsMultiplierReset();
    }, 15000);
    // Shrinks the timer bar once every second
    intervalID = setInterval(function () {
        // Shrinks the bar by 37 pixels until the last second
        if (timerBarWidth > timerBarRemainder) {
            timerBarWidth -= timerBarIncrement;
        }

        // Sets the bar width to zero for the last second
        else if (timerBarWidth === timerBarRemainder) {
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
    timerBarWidth = timerBarWidthDefault;
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
// END GAME CONTENT HANDLERS



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
    gameContent.style.opacity = "0";
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



// BEGIN HIGH SCORE HANDLING
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
// END HIGH SCORE HANDLING



// BEGIN HIGH SCORE DISPLAY HANDLING
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
    // Runs the waitForInput() function which adds a flashing border-bottom to any <div> element with the "blink" class
    waitForInput();
};

// Function for displaying the high scores
var displayHighScores = function () {
    // Clears out any HTML within the quiz <div>
    removeQuizContent();
    // Creates a new <h2> element
    var displayHighScoresEl = document.createElement("h2");
    // Adds the text
    displayHighScoresEl.textContent = "High Scores";
    // Adds classes for styling
    displayHighScoresEl.className = "highScoreListTitle centered";
    // Appends the new element to the quiz <div>
    quiz.appendChild(displayHighScoresEl);
    // Checks that there are saved high scores
    if (highScores !== null) {
        // Creates a new <ol> element
        var highScoreListEl = document.createElement("ol");
        // Loops through the saved highScores array and creates list elements for each entry
        for (let i = 0; i < highScores.length; i++) {
            // Creates a new list element
            var highScoreListItemEl = document.createElement("li");
            // Gives it a class for styling
            highScoreListItemEl.className = "highScoreListItem";
            // Creates a new <p> element that will hold the numbered place and initials of the current score being added to the scoreboard
            var highScoreInitialsEl = document.createElement("p");
            // Creates a string with the number corresponding to the numbered place of the the current saved score and adds the initials saved for that score. For visual appeal, a zero needed to be added before numbers 1-9 to maintain equal spacing
            if (i === 9) {
                highScoreInitialsEl.textContent = (i + 1) + ". " + highScores[i].initials;
            }

            else {
                highScoreInitialsEl.textContent = "0" + (i + 1) + ". " + highScores[i].initials;
            }
            // The <p> element is placed in the <li> element
            highScoreListItemEl.appendChild(highScoreInitialsEl);
            // Creates a new <p> element that will hold the actual score of the current score being added to the scoreboard
            var highScoreEl = document.createElement("p");
            // Adds the text
            highScoreEl.textContent = highScores[i].highScore;
            // Appends the new <p> element to the <li> element
            highScoreListItemEl.appendChild(highScoreEl);
            // Adds the <li> element to the <ol> element
            highScoreListEl.appendChild(highScoreListItemEl);
            // Adds the <ol> element to the quiz <div>
            quiz.appendChild(highScoreListEl);
        }
    }

    // If there are no high scores saved, this function will display that, rather than an empty list
    else {
        // Creates a new <p> element
        var noHighScoresEl = document.createElement("p");
        // Adds the text
        noHighScoresEl.textContent = "There are no saved high scores yet.";
        // Gives it a special ID for styling
        noHighScoresEl.id = "noHighScoreList";
        // Gives it a class for styling
        noHighScoresEl.className = "centered";
        // Appends the new <p> element to the quiz <div>
        quiz.appendChild(noHighScoresEl);
    }

    // Creates a new <button> element that will begin a new game
    var playAgainEl = document.createElement("button");
    // Adds a class for styling
    playAgainEl.className = "centered";
    // Adds an id for an event listener identification
    playAgainEl.id = "playAgain";
    // Adds the text
    playAgainEl.textContent = "Play Again";
    // Appends it to the <quiz> div
    quiz.appendChild(playAgainEl);
};
// END HIGH SCORE DISPLAY HANDLING



// BEGIN INITIALS INPUT HANDLING
// Adds 3 <div> elements that will be used for initials input. Each <div> will receive its own initial upon entry
var addInitials = function () {
    // Creates a new <div> element to hold the remaining 3
    initialsContainer = document.createElement("div");
    // Gives it the class name "initials"
    initialsContainer.className = "initials centered";
    // Loops until 3 <div> elements are created and added within the previous <div>
    for (let i = 0; i < 3; i++) {
        var initialsEl = document.createElement("div");
        // The first nested <div> is given the class name "blink"
        if (i === 0) {
            initialsEl.className = "blink";
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
    // The current <div> with the "blink" class is identified and assigned to the blink global variable
    blink = document.querySelector(".blink");
    // The timeout ID for this setTimeout function is captured
    blinkTimeoutID = setTimeout(() => {
        // The "blink" class will be removed in 400ms. The <div> with the "blink" class will begin with the border bottom established by the CSS for those first 400 ms
        blink.classList.remove("blink");
    }, 400)
    // The timeout ID for this setTimeout function is captured. After 400ms, an interval will begin
    blinkAltTimeoutID = setTimeout(() => {
        // The interval ID for this setInterval function is captured
        blinkIntervalID = setInterval(() => {
            // Every 800 ms the "blink" class will be removed. So far the "blink" class will be removed 400ms in, then 1200ms, 2000ms, 2800ms, etc.
            blink.classList.remove("blink");
        }, 800);
    }, 400);
    // The interval ID for this setInterval function is captured
    blinkAltIntervalID = setInterval(() => {
        // Every 800 ms the "blink" class will be added again. So it will be added back 800ms in, then 1600ms, 2400ms, etc. This will return it evenly spaced out with the class being removed, causing the flashing effect.
        blink.classList.add("blink");
    }, 800);
};
// END INITIALS INPUT HANDLING



// Halts the flashing border-bottom
var clearBlink = function () {
    // Removes the "blink" class which adds the border bottom
    blink.classList.remove("blink");
    // Clears intervals and timeouts for a smooth transition when necessary
    clearInterval(blinkIntervalID);
    clearInterval(blinkAltIntervalID);
    clearTimeout(blinkTimeoutID);
    clearTimeout(blinkAltTimeoutID);
};

// Prompts the player to choose whether or not to play again
var playAgainPrompt = function () {
    // Creates a new <div> element that will hold the prompt question and <div> holding the answer buttons
    var promptEl = document.createElement("div");
    // Gives it the class names "prompt" and "centered"
    promptEl.className = "prompt centered";
    // Creates a new <h2> element
    var promptQuestionEl = document.createElement("h2");
    // Adds the text
    promptQuestionEl.textContent = "Would you like to play again?";
    // Appends it to the previously created prompt <div>
    promptEl.appendChild(promptQuestionEl);
    // Creates a new <div> element that will hold the answer buttons
    var promptBtnDivEl = document.createElement("div");
    // Gives it the class name "promptButtons"
    promptBtnDivEl.className = "promptButtons";
    // Creates a new <button> element
    var promptBtnYEl = document.createElement("button");
    // Gives it the class name "charBtn"
    promptBtnYEl.className = "charBtn";
    // Adds the text
    promptBtnYEl.textContent = "Y";
    // Gives it the id "Y" for event listener identification
    promptBtnYEl.id = "Y";
    // Appends the new button to the promptButtons <div>
    promptBtnDivEl.appendChild(promptBtnYEl);
    // Creates a new <div> element (this element is purely cosmetic)
    var promptBtnBetween = document.createElement("div");
    // Gives it the class name "btnBetween"
    promptBtnBetween.className = "btnBetween";
    // Adds the text
    promptBtnBetween.textContent = "/";
    // Appends the new element to the promptButtons <div>
    promptBtnDivEl.appendChild(promptBtnBetween);
    // Creates a new <button> element
    var promptBtnNEl = document.createElement("button");
    // Gives it the class name "charBtn"
    promptBtnNEl.className = "charBtn";
    // Adds the text
    promptBtnNEl.textContent = "N";
    // Gives it the id "N" for event listener identification
    promptBtnNEl.id = "N";
    // Appends the new button to the promptButtons <div>
    promptBtnDivEl.appendChild(promptBtnNEl);
    // Appends the promptBtn <div> to the prompt <div>
    promptEl.appendChild(promptBtnDivEl);
    // Appends the prompt <div> to the quiz <div>
    quiz.appendChild(promptEl);
};

// Resets the global variables for subsequent quizzes. This function should only be called after everything else has been handled
var totalReset = function () {
    combo = 0;
    pointsMultiplier = 1;
    timeRemaining = null;
    currentScore = 0;
    quizQuestions = [];
    quizAnswers = [];
    currentQuestion = 0;
    quizAnswersValues = [];
    currentQuestionObj = null;
    questionAnswer1 = null;
    questionAnswer2 = null;
    questionAnswer3 = null;
    questionAnswer4 = null;
    timeoutID = null;
    intervalID = null;
    timerBarWidth = null;
    timerIntervalID = null;
    highScoreRecord = {
        initials: "",
        highScore: ""
    };
    blink = null;
    blinkIntervalID = null;
    blinkAltIntervalID = null;
    blinkTimeoutID = null;
    blinkAltTimeoutID = null;
    initialsContainer = null;
    initials = "";
    newHighScorePosition = null;
};

// Resets the quiz global variables and starts a new game
var playAgain = function () {
    totalReset();
    beginQuiz();
};

// Calls the retrieveHighScores() function to display the current high score
retrieveHighScores();

// Evenet listener for the beginQuiz button
beginBtn.addEventListener("click", beginQuiz);

// Adds an event listener to the entire <quiz> div
quiz.addEventListener("click", function (clicked) {
    // Checks if the clicked target was an answer to a question and which answer was clicked
    if (clicked.target.className == "questionAnswer" && clicked.target === questionAnswer1) {
        // Checks if the answer is correct against the quizAnswersValues array that was established by the addAnswers() function
        if (quizAnswersValues[0]) {
            correctAnswer();
        } else {
            incorrectAnswer();
        }
    }
    // Checks if the clicked target was an answer to a question and which answer was clicked
    if (clicked.target.className == "questionAnswer" && clicked.target === questionAnswer2) {
        // Checks if the answer is correct against the quizAnswersValues array that was established by the addAnswers() function
        if (quizAnswersValues[1]) {
            correctAnswer();
        } else {
            incorrectAnswer();
        }
    }
    // Checks if the clicked target was an answer to a question and which answer was clicked
    if (clicked.target.className == "questionAnswer" && clicked.target === questionAnswer3) {
        // Checks if the answer is correct against the quizAnswersValues array that was established by the addAnswers() function
        if (quizAnswersValues[2]) {
            correctAnswer();
        } else {
            incorrectAnswer();
        }
    }
    // Checks if the clicked target was an answer to a question and which answer was clicked
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
        blink.textContent = clicked.target.textContent;
        // Adds the input intials to the initials string so that it can be added to the highScoreRecord object for storage
        initials += clicked.target.textContent;
        // This if statement handles entry for the first initial after an initial has been selected
        if (blink == initialsContainer.querySelector("div:nth-child(1)")) {
            // The blinking is halted
            clearBlink();
            // The blink variable is assigned the second initial
            blink = initialsContainer.querySelector("div:nth-child(2)");
            // The "blink" class is added to the second initial so that its border-bottom can appear and begin to blink
            blink.classList.add("blink");
            // waitForInput() is called to start the border blinking
            waitForInput();
        }
        // This if statement handles entry for the second initial after an initial has been selected
        else if (blink == initialsContainer.querySelector("div:nth-child(2)")) {
            // The blink is halted
            clearBlink();
            // The blink variable is assigned the third initial
            blink = initialsContainer.querySelector("div:nth-child(3)");
            // The blink class is added to the third initial so that its border can appear and begin to blink
            blink.classList.add("blink");
            // waitForInput() is called to start the border blinking
            waitForInput();
        }
        // This if statement handles entry for the third initial after an initial has been selected
        else if (blink == initialsContainer.querySelector("div:nth-child(3)")) {
            // The blink is halted
            clearBlink();
            // Initials input has been received, and the string is added to the highScoreRecord object for storage
            highScoreRecord.initials = initials;
            saveHighScore();
            console.log(JSON.stringify(highScoreRecord));
            retrieveHighScores();
            displayHighScores();
        }
    }

    // Checks if the Y button from the playAgainPrompt() function was clicked. Resets and starts a new quiz
    if (clicked.target.id == "Y") {
        playAgain();
    }

    // Checks if the N button from the playAgainPrompt() function was clicked. Displays the high score board
    if (clicked.target.id == "N") {
        displayHighScores();
    }

    if (clicked.target.id == "playAgain") {
        playAgain();
    }
});