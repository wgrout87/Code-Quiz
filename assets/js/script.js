var questions = [
    {
        question: "What is the correct syntax to close the <title> element?",
        answer1: {
            answerString: "</title>",
            answerValue: true
        },
        answer2: {
            answerString: "<!title>",
            answerValue: false
        },
        answer3: {
            answerString: "<?title>",
            answerValue: false
        },
        answer4: {
            answerString: "<endtitle>",
            answerValue: false
        }
    },

    {
        question: "What is the purpose of the <body> element?",
        answer1: {
            answerString: "The body element connects to the head element",
            answerValue: false
        },
        answer2: {
            answerString: "This is where all of the webpage's content will go",
            answerValue: true
        },
        answer3: {
            answerString: "The body element will remain an empty placeholder",
            answerValue: false
        },
        answer4: {
            answerString: "The body element is a container for metadata",
            answerValue: false
        }
    },

    {
        question: "What is the difference between <h1> and <h2>?",
        answer1: {
            answerString: "An <h2> is visually larger",
            answerValue: false
        },
        answer2: {
            answerString: "There is no difference",
            answerValue: false
        },
        answer3: {
            answerString: "An <h1> is the more important heading and is visually larger",
            answerValue: true
        },
        answer4: {
            answerString: "Only an <h1> has default values",
            answerValue: false
        }
    },

    {
        question: "Which command creates a new Git repository?",
        answer1: {
            answerString: "git init",
            answerValue: true
        },
        answer2: {
            answerString: "git status",
            answerValue: false
        },
        answer3: {
            answerString: "git add",
            answerValue: false
        },
        answer4: {
            answerString: "git branch",
            answerValue: false
        }
    },

    {
        question: "Which command tells you what has changed since the last commit?",
        answer1: {
            answerString: "git init",
            answerValue: false
        },
        answer2: {
            answerString: "git status",
            answerValue: true
        },
        answer3: {
            answerString: "git add",
            answerValue: false
        },
        answer4: {
            answerString: "git pull",
            answerValue: false
        }
    },

    {
        question: "Which command needs to be run before git commit?",
        answer1: {
            answerString: "git init",
            answerValue: false
        },
        answer2: {
            answerString: "git status",
            answerValue: false
        },
        answer3: {
            answerString: "git add",
            answerValue: true
        },
        answer4: {
            answerString: "git pull",
            answerValue: false
        }
    },

    {
        question: "How do you add a message to a git commit?",
        answer1: {
            answerString: "Upload and attach a file to git commit",
            answerValue: false
        },
        answer2: {
            answerString: "Add -m \"message\" at the end of git commit",
            answerValue: true
        },
        answer3: {
            answerString: "git add message",
            answerValue: false
        },
        answer4: {
            answerString: "Add -M \"message\" at the end of git commit",
            answerValue: false
        }
    },

    {
        question: "What's the first thing you should do before writing a single line of HTML code?",
        answer1: {
            answerString: "Sketch out what the webpage should look like",
            answerValue: true
        },
        answer2: {
            answerString: "Write all of your CSS code",
            answerValue: false
        },
        answer3: {
            answerString: "Download the latest version of VS Code",
            answerValue: false
        },
        answer4: {
            answerString: "Publish your webpage on GitHub",
            answerValue: false
        }
    },

    {
        question: "On a technical level, what's the difference between a <section> element and a <div>?",
        answer1: {
            answerString: "A <div> element takes up more width on the page",
            answerValue: false
        },
        answer2: {
            answerString: "There is no difference",
            answerValue: true
        },
        answer3: {
            answerString: "A <section> element has bold text by default",
            answerValue: false
        },
        answer4: {
            answerString: "A <section> element takes up more height on the page",
            answerValue: false
        }
    },

    {
        question: "How do you leave hidden comments in HTML?",
        answer1: {
            answerString: "/* */",
            answerValue: false
        },
        answer2: {
            answerString: "<!-- -->",
            answerValue: true
        },
        answer3: {
            answerString: "{{ }}",
            answerValue: false
        },
        answer4: {
            answerString: "//",
            answerValue: false
        }
    },

    {
        question: "What is the command to \"push\" code to GitHub?",
        answer1: {
            answerString: "git pull origin main",
            answerValue: false
        },
        answer2: {
            answerString: "git init",
            answerValue: false
        },
        answer3: {
            answerString: "git config",
            answerValue: false
        },
        answer4: {
            answerString: "git push origin main",
            answerValue: true
        }
    },

    {
        question: "Given the following CSS selector, which HTML element would be the outermost/parent element: header nav ul li {}",
        answer1: {
            answerString: "<li>",
            answerValue: false
        },
        answer2: {
            answerString: "<header>",
            answerValue: true
        },
        answer3: {
            answerString: "<nav>",
            answerValue: false
        },
        answer4: {
            answerString: "<ul>",
            answerValue: false
        }
    },

    {
        question: "What is the correct HTML for making a radio button?",
        answer1: {
            answerString: "<radio>",
            answerValue: false
        },
        answer2: {
            answerString: "<radiobutton>",
            answerValue: false
        },
        answer3: {
            answerString: "<input type=\"radiobutton\">",
            answerValue: false
        },
        answer4: {
            answerString: "<input type=\"radio\">",
            answerValue: true
        }
    },

    {
        question: "What is the purpose of the alt attribute for images",
        answer1: {
            answerString: "To make the image load faster",
            answerValue: false
        },
        answer2: {
            answerString: "To make it easier to style the image with CSS",
            answerValue: false
        },
        answer3: {
            answerString: "To prevent search engines from indexing the image",
            answerValue: false
        },
        answer4: {
            answerString: "To provide context for the image",
            answerValue: true
        }
    },

    {
        question: "How can you add more than one class to an HTML element?",
        answer1: {
            answerString: "Add a second class attribute",
            answerValue: false
        },
        answer2: {
            answerString: "Add a comma between the class names",
            answerValue: false
        },
        answer3: {
            answerString: "Add a space between the class names",
            answerValue: true
        },
        answer4: {
            answerString: "Add a class-2 attribute",
            answerValue: false
        }
    },

    {
        question: "What CSS declaration could you add to a 50%-width <div> to center it?",
        answer1: {
            answerString: "text-align: center;",
            answerValue: false
        },
        answer2: {
            answerString: "margin: 0 auto;",
            answerValue: true
        },
        answer3: {
            answerString: "float: center;",
            answerValue: false
        },
        answer4: {
            answerString: "align: center;",
            answerValue: false
        }
    },

    {
        question: "Which CSS property allows the parent element to display its CSS properties by stretching its dimensions to physically contain its child elements?",
        answer1: {
            answerString: "text-align: center;",
            answerValue: false
        },
        answer2: {
            answerString: "overflow: auto;",
            answerValue: true
        },
        answer3: {
            answerString: "margin: auto;",
            answerValue: false
        },
        answer4: {
            answerString: "display: inline-block;",
            answerValue: false
        }
    },

    {
        question: "If I wish to align an element to the top of its container, which CSS property should I use?",
        answer1: {
            answerString: "text-align: top;",
            answerValue: false
        },
        answer2: {
            answerString: "margin-align: top;",
            answerValue: false
        },
        answer3: {
            answerString: "overflow: top;",
            answerValue: false
        },
        answer4: {
            answerString: "vertical-align: top;",
            answerValue: true
        }
    },

    {
        question: "Which of the following is NOT a good reason for version control?",
        answer1: {
            answerString: "Version control allows the codebase to be modified and tested without interrupting the user experience",
            answerValue: false
        },
        answer2: {
            answerString: "Version control allows changes to the codebase to be tested individually",
            answerValue: false
        },
        answer3: {
            answerString: "Version control allows teams to work on individual features synchronously",
            answerValue: false
        },
        answer4: {
            answerString: "Version control allows features to ship directly to the main branch",
            answerValue: true
        }
    },

    {
        question: "We are currently on the develop branch. Which of the following commands does NOT switch to a new branch?",
        answer1: {
            answerString: "git checkout main",
            answerValue: false
        },
        answer2: {
            answerString: "git checkout -b feature/header",
            answerValue: false
        },
        answer3: {
            answerString: "git checkout feature/header",
            answerValue: false
        },
        answer4: {
            answerString: "git branch feature/header",
            answerValue: true
        }
    },

    {
        question: "After you're done creating and testing a new feature in a feature branch, what is the next step?",
        answer1: {
            answerString: "Merge the feature branch into the main branch",
            answerValue: false
        },
        answer2: {
            answerString: "Merge the feature branch into the develop branch",
            answerValue: true
        },
        answer3: {
            answerString: "Create a new feature branch",
            answerValue: false
        },
        answer4: {
            answerString: "Create a new develop branch",
            answerValue: false
        }
    }
];

console.log(questions.length);
console.log(questions[Math.floor(Math.random() * questions.length)].question);