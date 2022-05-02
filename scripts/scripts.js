const quiz = [
    {
      q: "Which layer of the ocean has the most visible light?",
      options: ['Epipelagic', 'Mesopelagic', 'Bathypelagic', 'Abyssopelagic'],
      answer: 0
    },
    {
      q: "This zone is also known as the twilight zone.",
      options: ['Bathypelagic','Epipelagic','Abyssopelagic','Mesopelagic'],
      answer: 0
    },
    {
        q: "Which of the following does not live in the Mesopelagic zone?",
        options: ['Octopus','Wolf Eels','Amphipods','Swordfish'],
        answer: 0
      },
      {
        q: "In this zone, the only light present is produced by sea creatures themselves.",
        options: ['Epipelagic','Mesopelagic','Bathypelagic','Abyssopelagic'],
        answer: 0
      },
      {
        q: "This is the deepest zone of the ocean.",
        options: ['Bathypelagic','Epipelagic','Abyssopelagic','Mesopelagic'],
        answer: 0
      }
  ];

const questionNumber = document.querySelector(".question-number")
const questionText = document.querySelector(".question-text")
const optionContainer = document.querySelector(".option-container")
const answersIndicatorContainer = document.querySelector(".answers-indicator")
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box")

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let avaiableOptions = [];
let correctAnswers = 0;
let attempts = 0;

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
    questionNumber.innerHTML = "Question" + " " + (questionCounter + 1) + " " + "of" + " " + quiz.length;
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
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);

    }
}

function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType)
    
}

function next(){
    if(questionCounter === quiz.length){
        console.log('quiz over')
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

function quizOver(){

}

window.onload = function(){
    //first we will set all questionsin availableQuestions array
    setAvailableQuestions();
    //second we will call getNewQuestion(); function
    getNewQuestion()
    //to create indicators of answers
    answersIndicator()
}


  /*function quiz(){
    // stores HTML output
    let output = [];

    // build HTML for each q
    qs.forEach((currentq, qNumber) => {
        // store list of answer options
        let options = [];

        // for each answer
        for(letter in currentq.options) {

            // add HTML radio button
            options.push(
                // template literals
                `<label><input type="radio" name="q${qNumber}" value="${letter}">
                    <span class="customRadio"></span>
                        ${letter} :
                        ${currentq.options[letter]}
                </label>`
            );
        }
        output.push(
            `<div class="slide">
                <div class="q">${currentq.q}</div>
                <div class="options">${options.join("")}</div>
            </div>`
             // 'join' expression takes list of options and puts them together in one string
        );
    });
    // combine output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
} 

function results(){

    //gather answer containers from quiz
    let answerContainers = quizContainer.querySelectorAll(".options");

    // keep track of user's options
    let numCorrect = 0;

    // for each q 
    qs.forEach((currentq, qNumber) => {
        // find selected answer 
        let answerContainer = answerContainers[qNumber];
        // selects which radio button has been checked
        let selector = `input[name=q${qNumber}]:checked`;
        // userAnswer is which button has been checked
        // {} empty object for if user didn't select answer
        let userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct
        if(userAnswer === currentq.answer) {
            // add to number of correct options
            numCorrect++;

            // green when correct
            answerContainers[qNumber].style.color = "rgb(0, 88, 4)";
        } else {   
            // red when incorrect
            answerContainers[qNumber].style.color = "rgb(141, 0, 0)";
        }
    });

    // show number of correct options out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${qs.length}`;
}

function showSlide(n) {
    // Hide all slides by removing "active-slide" class from all qs
    slides[currentSlide].classList.remove("active-slide");
    // Show new slide by adding "active-slide" class to current q
    slides[n].classList.add("active-slide");
    // Update the current slide number
    currentSlide = n;

    // First slide - hide previous button - Else show previous button
    if(currentSlide === 0) {
        previousButton.style.display = "none";
    } else {
        previousButton.style.display = "inline-block";
    }

    // Last slide - hide next button and show submit button - Else show next button and hide submit button
    if(currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
    } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
    }
}

function nextSlide() {
    showSlide(currentSlide + 1);
    progressPercent += 25;
    progressBar.style.width = progressPercent +  "%";
}

function previousSlide() {
    showSlide(currentSlide - 1);
    progressPercent -= 25;
    progressBar.style.width = progressPercent + "%";
}

let progressBar = document.getElementById("progress-bar");
let progressPercent = 0;

let quizContainer = document.getElementById("quiz");
let resultsContainer = document.getElementById("results");
let submitButton = document.getElementById("submit");

//display quiz 
quiz();

let previousButton = document.getElementById("previous");
let nextButton = document.getElementById("next");
let slides = document.querySelectorAll(".slide");
let currentSlide = 0;

// Display Slides
showSlide(0);

// click submit, show results
submitButton.addEventListener("click", results);

// Click to show next or previous slides
previousButton.addEventListener("click", previousSlide);
nextButton.addEventListener("click", nextSlide); */