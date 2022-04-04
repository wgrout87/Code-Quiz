// BEGIN QUESTIONS
// Array of question objects
var questions = [
    {
        question: "What is the correct syntax to close the <title> element?",
        // Each question object contains answer objects
        answers: [
            {
                answerString: "</title>",
                // This property is for identifying the correct answer
                answerValue: true
            },
            {
                answerString: "<!title>",
                answerValue: false
            },
            {
                answerString: "<?title>",
                answerValue: false
            },
            {
                answerString: "<endtitle>",
                answerValue: false
            }
        ]
    },

    {
        question: "What is the purpose of the <body> element?",
        answers: [
            {
                answerString: "The body element connects to the head element",
                answerValue: false
            },
            {
                answerString: "This is where all of the webpage's content will go",
                answerValue: true
            },
            {
                answerString: "The body element will remain an empty placeholder",
                answerValue: false
            },
            {
                answerString: "The body element is a container for metadata",
                answerValue: false
            }
        ]
    },

    {
        question: "What is the difference between <h1> and <h2>?",
        answers: [
            {
                answerString: "An <h2> is visually larger",
                answerValue: false
            },
            {
                answerString: "There is no difference",
                answerValue: false
            },
            {
                answerString: "An <h1> is the more important heading and is visually larger",
                answerValue: true
            },
            {
                answerString: "Only an <h1> has default values",
                answerValue: false
            }
        ]
    },

    {
        question: "Which command creates a new Git repository?",
        answers: [
            {
                answerString: "git init",
                answerValue: true
            },
            {
                answerString: "git status",
                answerValue: false
            },
            {
                answerString: "git add",
                answerValue: false
            },
            {
                answerString: "git branch",
                answerValue: false
            }
        ]
    },

    {
        question: "Which command tells you what has changed since the last commit?",
        answers: [
            {
                answerString: "git init",
                answerValue: false
            },
            {
                answerString: "git status",
                answerValue: true
            },
            {
                answerString: "git add",
                answerValue: false
            },
            {
                answerString: "git pull",
                answerValue: false
            }
        ]
    },

    {
        question: "Which command needs to be run before git commit?",
        answers: [
            {
                answerString: "git init",
                answerValue: false
            },
            {
                answerString: "git status",
                answerValue: false
            },
            {
                answerString: "git add",
                answerValue: true
            },
            {
                answerString: "git pull",
                answerValue: false
            }
        ]
    },

    {
        question: "How do you add a message to a git commit?",
        answers: [
            {
                answerString: "Upload and attach a file to git commit",
                answerValue: false
            },
            {
                answerString: "Add -m \"message\" at the end of git commit",
                answerValue: true
            },
            {
                answerString: "git add message",
                answerValue: false
            },
            {
                answerString: "Add -msg \"message\" at the end of git commit",
                answerValue: false
            }
        ]
    },

    {
        question: "What's the first thing you should do before writing a single line of HTML code?",
        answers: [
            {
                answerString: "Sketch out what the webpage should look like",
                answerValue: true
            },
            {
                answerString: "Write all of your CSS code",
                answerValue: false
            },
            {
                answerString: "Download the latest version of VS Code",
                answerValue: false
            },
            {
                answerString: "Publish your webpage on GitHub",
                answerValue: false
            }
        ]
    },

    {
        question: "On a technical level, what's the difference between a <section> element and a <div>?",
        answers: [
            {
                answerString: "A <div> element takes up more width on the page",
                answerValue: false
            },
            {
                answerString: "There is no difference",
                answerValue: true
            },
            {
                answerString: "A <section> element has bold text by default",
                answerValue: false
            },
            {
                answerString: "A <section> element takes up more height on the page",
                answerValue: false
            }
        ]
    },

    {
        question: "How do you leave hidden comments in HTML?",
        answers: [
            {
                answerString: "/* */",
                answerValue: false
            },
            {
                answerString: "<!-- -->",
                answerValue: true
            },
            {
                answerString: "{{ }}",
                answerValue: false
            },
            {
                answerString: "//",
                answerValue: false
            }
        ]
    },

    {
        question: "What is the command to \"push\" code to GitHub?",
        answers: [
            {
                answerString: "git pull origin main",
                answerValue: false
            },
            {
                answerString: "git init",
                answerValue: false
            },
            {
                answerString: "git config",
                answerValue: false
            },
            {
                answerString: "git push origin main",
                answerValue: true
            }
        ]
    },

    {
        question: "Given the following CSS selector, which HTML element would be the outermost/parent element: header nav ul li {}",
        answers: [
            {
                answerString: "<li>",
                answerValue: false
            },
            {
                answerString: "<header>",
                answerValue: true
            },
            {
                answerString: "<nav>",
                answerValue: false
            },
            {
                answerString: "<ul>",
                answerValue: false
            }
        ]
    },

    {
        question: "What is the correct HTML for making a radio button?",
        answers: [
            {
                answerString: "<radio>",
                answerValue: false
            },
            {
                answerString: "<radiobutton>",
                answerValue: false
            },
            {
                answerString: "<input type=\"radiobutton\">",
                answerValue: false
            },
            {
                answerString: "<input type=\"radio\">",
                answerValue: true
            }
        ]
    },

    {
        question: "What is the purpose of the alt attribute for images",
        answers: [
            {
                answerString: "To make the image load faster",
                answerValue: false
            },
            {
                answerString: "To make it easier to style the image with CSS",
                answerValue: false
            },
            {
                answerString: "To prevent search engines from indexing the image",
                answerValue: false
            },
            {
                answerString: "To provide context for the image",
                answerValue: true
            }
        ]
    },

    {
        question: "How can you add more than one class to an HTML element?",
        answers: [
            {
                answerString: "Add a second class attribute",
                answerValue: false
            },
            {
                answerString: "Add a comma between the class names",
                answerValue: false
            },
            {
                answerString: "Add a space between the class names",
                answerValue: true
            },
            {
                answerString: "Add a class-2 attribute",
                answerValue: false
            }
        ]
    },

    {
        question: "What CSS declaration could you add to a 50%-width <div> to center it?",
        answers: [
            {
                answerString: "text-align: center;",
                answerValue: false
            },
            {
                answerString: "margin: 0 auto;",
                answerValue: true
            },
            {
                answerString: "float: center;",
                answerValue: false
            },
            {
                answerString: "align: center;",
                answerValue: false
            }
        ]
    },

    {
        question: "Which CSS property allows the parent element to display its CSS properties by stretching its dimensions to physically contain its child elements?",
        answers: [
            {
                answerString: "text-align: center;",
                answerValue: false
            },
            {
                answerString: "overflow: auto;",
                answerValue: true
            },
            {
                answerString: "margin: auto;",
                answerValue: false
            },
            {
                answerString: "display: inline-block;",
                answerValue: false
            }
        ]
    },

    {
        question: "If I wish to align an element to the top of its container, which CSS property should I use?",
        answers: [
            {
                answerString: "text-align: top;",
                answerValue: false
            },
            {
                answerString: "margin-align: top;",
                answerValue: false
            },
            {
                answerString: "overflow: top;",
                answerValue: false
            },
            {
                answerString: "vertical-align: top;",
                answerValue: true
            }
        ]
    },

    {
        question: "Which of the following is NOT a good reason for version control?",
        answers: [
            {
                answerString: "Version control allows the codebase to be modified and tested without interrupting the user experience",
                answerValue: false
            },
            {
                answerString: "Version control allows changes to the codebase to be tested individually",
                answerValue: false
            },
            {
                answerString: "Version control allows teams to work on individual features synchronously",
                answerValue: false
            },
            {
                answerString: "Version control allows features to ship directly to the main branch",
                answerValue: true
            }
        ]
    },

    {
        question: "We are currently on the develop branch. Which of the following commands does NOT switch to a new branch?",
        answers: [
            {
                answerString: "git checkout main",
                answerValue: false
            },
            {
                answerString: "git checkout -b feature/header",
                answerValue: false
            },
            {
                answerString: "git checkout feature/header",
                answerValue: false
            },
            {
                answerString: "git branch feature/header",
                answerValue: true
            }
        ]
    },

    {
        question: "After you're done creating and testing a new feature in a feature branch, what is the next step?",
        answers: [
            {
                answerString: "Merge the feature branch into the main branch",
                answerValue: false
            },
            {
                answerString: "Merge the feature branch into the develop branch",
                answerValue: true
            },
            {
                answerString: "Create a new feature branch",
                answerValue: false
            },
            {
                answerString: "Create a new develop branch",
                answerValue: false
            }
        ]
    }
];
// END QUESTIONS


// BEGIN QUERY SELECTORS
var score = document.querySelector("#score");
var currentScoreDisplay = document.querySelector("#currentScore");
var quizContent = document.querySelector("#quizContent");
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
    for (i = 0; i < 4; i++) {
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
    compareHighScores();
};

// Retrieves saved high scores for comparison
var compareHighScores = function () {
    highScores = JSON.parse(localStorage.getItem("highScores"));
    // If highScores is null, the array is empty, and a high score is automatic
    if (highScores === null) {
        console.log("New high score! - The array is empty");
        newHighScore();
    }
    // Compares the current score with scores in the array if the array is full
    else if (highScores.length == 10) {
        for (i = 0; i < highScores.length; i++) {
            if (currentScore > highScores[i].highScore) {
                console.log("New high score!");
                newHighScore();
            }
        }
    }

    // High score is automatic if there is space for it in the top 10
    else {
        console.log("New high score! - There's space in the array");
        newHighScore();
    }
};

var newHighScore = function () {
    highScoreRecord.highScore = currentScore;
    var displayResultsEl = document.createElement("p");
    displayResultsEl.className = "results";
    displayResultsEl.textContent = "New high score!";
    quiz.appendChild(displayResultsEl);
    addInitials();
    displayResultsEl = document.createElement("h2");
    displayResultsEl.className = "results";
    displayResultsEl.textContent = "Please enter your initials:";
    quiz.appendChild(displayResultsEl);
    addInitialsInput();
    waitForInput();
};

var addInitials = function () {
    initialsContainer = document.createElement("div");
    initialsContainer.className = "initials";
    for (i = 0; i < 3; i++) {
        var initialsEl = document.createElement("div");
        if (i === 0) {
            initialsEl.className = "cursor";
        }
        initialsEl.textContent = "";
        initialsContainer.appendChild(initialsEl);
    }
    quiz.appendChild(initialsContainer);
};

var addInitialsInput = function () {
    var btnDivEl = document.createElement("div");
    btnDivEl.className = "btnDiv";
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (i = 0; i < chars.length; i++) {
        var charBtnEl = document.createElement("button");
        charBtnEl.className = "charBtn";
        charBtnEl.textContent = chars.charAt(i);
        btnDivEl.appendChild(charBtnEl);
    }
    quiz.appendChild(btnDivEl);
};

var waitForInput = function () {
    cursor = document.querySelector(".cursor");
    cursorTimeoutID = setTimeout(() => {
        cursor.classList.remove("cursor");
    }, 400)
    cursorAltTimeoutID = setTimeout(() => {
        cursorIntervalID = setInterval(() => {
            cursor.classList.remove("cursor");
        }, 800);
    }, 400);
    cursorAltIntervalID = setInterval(() => {
        cursor.classList.add("cursor");
    }, 800);
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
        cursor.textContent = clicked.target.textContent;
        initials += clicked.target.textContent;
        if (cursor == initialsContainer.querySelector("div:nth-child(1)")) {
            cursor.classList.remove("cursor");
            clearInterval(cursorIntervalID);
            clearInterval(cursorAltIntervalID);
            clearTimeout(cursorTimeoutID);
            clearTimeout(cursorAltTimeoutID);
            cursor = initialsContainer.querySelector("div:nth-child(2)");
            cursor.classList.add("cursor");
            waitForInput();
        }
        else if (cursor == initialsContainer.querySelector("div:nth-child(2)")) {
            cursor.classList.remove("cursor");
            clearInterval(cursorIntervalID);
            clearInterval(cursorAltIntervalID);
            clearTimeout(cursorTimeoutID);
            clearTimeout(cursorAltTimeoutID);
            cursor = initialsContainer.querySelector("div:nth-child(3)");
            cursor.classList.add("cursor");
            waitForInput();
        }
        else if (cursor == initialsContainer.querySelector("div:nth-child(3)")) {
            cursor.classList.remove("cursor");
            clearInterval(cursorIntervalID);
            clearInterval(cursorAltIntervalID);
            clearTimeout(cursorTimeoutID);
            clearTimeout(cursorAltTimeoutID);
            highScoreRecord.initials = initials;
            console.log(JSON.stringify(highScoreRecord));
        }
    }
});