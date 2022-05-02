const quiz = [
    {
      q: "Which layer of the ocean has the most visible light?",
      options: ['Epipelagic', 'Mesopelagic', 'Bathypelagic', 'Abyssopelagic'],
      answer: 0
    },
    {
      q: "This zone is also known as the twilight zone.",
      options: ['Bathypelagic','Epipelagic','Abyssopelagic','Mesopelagic'],
      answer: 3
    },
    {
        q: "Which of the following does not live in the Mesopelagic zone?",
        options: ['Octopus','Wolf Eels','Amphipods','Swordfish'],
        answer: 2
      },
      {
        q: "In this zone, the only light present is produced by sea creatures themselves.",
        options: ['Epipelagic','Bathypelagic','Abyssopelagic','Mesopelagic'],
        answer: 1
      },
      {
        q: "This is the deepest zone of the ocean.",
        options: ['Bathypelagic','Hadalpelagic','Abyssopelagic','Mesopelagic'],
        answer: 1
      },
      {
        q: "Sea Spiders are known for what?",
        options: ['Their short legs that they use for swimming. ','Their webs.','Their soft bodies.','Their long legs and adaptation for efficiently using oxygen.'],
        answer: 3
      },
      {
        q: "Dolphins are known for their communication skills. How do dolphins communicate?",
        options: ['Echolocation','Blinking','Talking','Splashing'],
        answer: 0
      },
      {
        q: "Anglerfish can be found in what zone?",
        options: ['Epipelagic','Bathypelagic','Abyssopelagic','Mesopelagic'],
        answer: 1
      },
      {
        q: "Sea Turtles are important because…",
        options: ['They control shark populations.','They protect king crabs.','They maintain seagrass beds and coral reefs.','They are mammals.'],
        answer: 2
      },
      {
        q: "These Abyssopelagic zone creatures protect baby king crabs.",
        options: ['Sea Spiders','Sea Pigs','Anglerfish','Basket Stars'],
        answer: 1
      }
  ];

const questionNumber = document.querySelector(".question-number")
const questionText = document.querySelector(".question-text")
const optionContainer = document.querySelector(".option-container")
const answersIndicatorContainer = document.querySelector(".answers-indicator")
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box")
const questionLimit = 5;

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let avaiableOptions = [];
let correctAnswers = 0;
let attempt = 0;

//push the questions into availableQuestions
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
}

//set question number and question and option
function getNewQuestion(){

    //set question number
    questionNumber.innerHTML = "Question" + " " + (questionCounter + 1) + " " + "of" + " " + questionLimit;
    //set question text
    // get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    //get the position of 'questionIndex' from the availableQuestion array
    const index1 = availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1,1);

    //set options
    //get the length of options
    const optionLen = currentQuestion.options.length
    for(let i=0; i<optionLen; i++){
        avaiableOptions.push(i)
    }

    optionContainer.innerHTML = '';
    let animationDelay = 0.15;

    //create options in html
    for(let i=0; i<optionLen; i++){
        //random option
        const optionIndex = avaiableOptions[Math.floor(Math.random() * avaiableOptions.length)];
        //get the position of optionIndex from the availableOptions
        const index2 = avaiableOptions.indexOf(optionIndex);
        //remove the optionindex from the availableOptions so that option does not repeat
        avaiableOptions.splice(index2,1);

        const option = document.createElement('div');
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDealy = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick", "getResult(this)");
    }
    questionCounter++
}

//get the result of current attempt question
function getResult(element){
    const id = parseInt(element.id);
    //get the answer by comparing the id of clicked option
    if(id === currentQuestion.answer){
        //set the green color to the correct option
        element.classList.add("correct");
        //add the indicator to correct mark
        updateAnswerIndicator("correct");
        correctAnswers++;
    }
    else {
        //set the red color to the incorrect option
        element.classList.add("wrong");
        updateAnswerIndicator("wrong");

        //if the answer is incorrect the show the correct option
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id)=== currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++
    unclickableOptions();
}

//make all the options unclickable once the user selects a option 
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = questionLimit;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);

    }
}

function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType)
    
}

function next(){
    if(questionCounter === questionLimit){
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

function quizOver(){
    //hide quiz box
    quizBox.classList.add('hide');
    //show result Box
    resultBox.classList.remove("hide");
    quizResult();
}

function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = questionLimit;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt-correctAnswers;
    const percentage = (correctAnswers/questionLimit)*100;
    resultBox.querySelector(".total-percentage").innerHTML = percentage.toFixed() + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + questionLimit;
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
    availableQuestions = [];
}

function tryAgainQuiz(){
 //hide the resultBox
 resultBox.classList.add("hide");
 //show the quizbox
 quizBox.classList.remove("hide");
 resetQuiz();
 startQuiz();
}

function goToHome(){
    resultBox.classList.add("hide");
    homeBox.classList.remove("hide");
    resetQuiz();
}
// #### Starting Point ####

function startQuiz(){

    //hide home box
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    //first we will set all questionsin availableQuestions array
    setAvailableQuestions();
    //second we will call getNewQuestion(); function
    getNewQuestion()
    //to create indicators of answers
    answersIndicator()
}

window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML = questionLimit;
}

  