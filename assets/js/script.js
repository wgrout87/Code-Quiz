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
                answerString: "Add -M \"message\" at the end of git commit",
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
var quiz = document.querySelector("#quizSpace");
var quiz = document.querySelector("#quiz");
var beginBtn = document.querySelector("#beginBtn");
var timerBar = document.querySelector("#timerBar");
var challengeContent = document.querySelector("#challengeContent");
var timeRemainingDisplay = document.querySelector("#timeRemaining");
var currentCombo = document.querySelector("#currentCombo");
var currentPointsMultiplier = document.querySelector("#currentPointsMultiplier");
var questionAnswers = document.querySelectorAll(".questionAnswer");
// END QUERY SELECTORS

// BEGIN GLOBAL VARIABLES
var combo = 0;
var pointsMultiplier = "1.0";
var timeRemaining = 180;
var currentScore = 0;
var quizQuestionsRemaining = 15;
var quizQuestions = [];
var quizAnswers = [];
var currentQuestion = 0;
var quizAnswersValues = [];
var currentQuestionObj = null;
// END GLOBAL VARIABLES

var beginQuiz = function () {
    score.style.opacity = "1";
    timerBar.style.opacity = "1";
    challengeContent.style.opacity = "1";
    currentScoreDisplay.textContent = currentScore;
    timeRemainingDisplay.textContent = timeRemaining;
    currentCombo.textContent = combo;
    currentPointsMultiplier.textContent = pointsMultiplier;
    removeQuizContent();
    beginBtn.remove();
    randomizeQuestions();
    if (currentQuestion < 16) {
        addQuestion();
    }
}

var removeQuizContent = function () {
    var child = quiz.lastElementChild;
    while (child) {
        quiz.removeChild(child);
        child = quiz.lastElementChild;
    }
}

var addQuestion = function () {
    currentQuestionObj = questions[quizQuestions[currentQuestion]];
    var questionEl = document.createElement("p");
    questionEl.textContent = currentQuestionObj.question;
    quiz.appendChild(questionEl);
    randomizeAnswers();
    quizAnswersValues = [];
    addAnswers();
    currentQuestion++;
}

var addAnswers = function () {
    var fourAnswersEl = document.createElement("div");
    fourAnswersEl.className = "quizAnswers";
    for (i = 0; i < 4; i++) {
        var answerEl = document.createElement("button");
        answerEl.className = "questionAnswer";
        answerEl.textContent = currentQuestionObj.answers[quizAnswers[i]].answerString;
        fourAnswersEl.appendChild(answerEl);
        quizAnswersValues[i] = currentQuestionObj.answers[quizAnswers[i]].answerValue;
    }
    quiz.appendChild(fourAnswersEl);
}

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

beginBtn.addEventListener("click", beginQuiz);
quiz.addEventListener("click", function (clickedAnswer) {
    if (clickedAnswer.target.className == "questionAnswer") {
        console.log("clicked");
    }
});