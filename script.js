let result1 = [];
let result2 = [];
const operators = ['-', '+', '*', '/'];
let questionCounter1 = 0;
let questionCounter2 = 0;
let score1 = 0;
let score2 = 0;
let numberOfQuestion = 0;

const quizArena = () => {
    document.getElementById("input-section").classList.add('hide');
    document.getElementById("quiz-container").classList.remove('hide');
}

const questionCount = (event) => {
    if (event.target.value) {
        numberOfQuestion = event.target.value;
        document.querySelector('#input-section button').removeAttribute('disabled');
    }
    else {
        numberOfQuestion = 0;
        document.querySelector('#input-section button').setAttribute('disabled', 'true');
    }
}

const upperLimit = (event) => {
    if (event.target.value < 10) {
        event.target.value = 10;
    }
    else if (event.target.value > 15) {
        event.target.value = 15;
    }
}

const createQuestion = (id) => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const operatorNum = Math.floor(Math.random() * 4);
    const questionCounter = (id === 'container-one') ? questionCounter1 : questionCounter2;
    const question = `<h2 class="questionHeading">Question ${questionCounter + 1}</h2>
        <p class="questionProblem">${num1} ${operators[operatorNum]} ${num2} ?</p>
    `;
    const answer = calculateResult(num1, num2, operators[operatorNum]);
    const resultObject = {
        question: `${num1} ${operators[operatorNum]} ${num2} ?`,
        answer,
        corrected: false
    }
    if (id === 'container-one')
        result1.push(resultObject);
    else if (id === 'container-second')
        result2.push(resultObject)
    return question;
}

const calculateResult = (num1, num2, operator) => {
    switch (operator) {
        case '-':
            return num1 - num2;
        case '+':
            return num1 + num2;
        case '*':
            return num1 * num2;
        case '/':
            return (num1 / num2).toFixed(2);
    }
}

const showQuestion = (id, question) => {
    const questionElement = document.querySelector(`#${id}-question-container .question`);
    questionElement.innerHTML = question;
}

const generateQuestion = (id) => {
    let question = createQuestion(id);
    const questionContainerElement = document.getElementById(`${id}-question-container`);
    const nextButton = document.getElementById(`${id}-next-btn`);
    questionContainerElement.classList.remove('hide');
    nextButton.classList.remove('hide');
    showQuestion(id, question);
}

const checkAnswer = (ans, index, id) => {
    if (id === 'container-one') {
        const { answer } = result1[index];
        if (answer === ans) {
            result1[index].corrected = true;
            score1++;
        }
        questionCounter1++;
        showScore(id);
    }
    else {
        const { answer } = result2[index];
        if (answer == ans) {
            result2[index].corrected = true;
            score2++;
        }
        questionCounter2++;
        showScore(id);
    }
}


const showScore = (id) => {
    const score = id == 'container-one' ? score1 : score2;
    document.getElementById(`${id}-result`).textContent = `Score: ${score} of ${numberOfQuestion}`;
}

const nextClicked = (id) => {

    const answerElement = document.querySelector(`#${id}-question-container .answer`);
    let value = answerElement.value;
    const questionCounter = (id === 'container-one') ? questionCounter1 : questionCounter2
    checkAnswer(value, questionCounter, id);
    answerElement.value = '';
    if (id === 'container-one' && questionCounter1 < numberOfQuestion) {
        generateQuestion(id);
    }
    else if (id === 'container-second' && questionCounter2 < numberOfQuestion) {
        generateQuestion(id);
    }
    else if (questionCounter1 == numberOfQuestion || questionCounter2 == numberOfQuestion) {
        document.getElementById(`${id}-question-container`).classList.add('hide');
        document.getElementById(`${id}-next-btn`).classList.add('hide');
        document.getElementById(`${id}-show-result-btn`).classList.remove('hide');
    }
    showScore(id);
}

const showResult = (id) => {
    let resultHtml = '<h2>Quiz Result</h2>'
    const result = (id === 'container-one') ? result1 : result2;
    result.forEach((element, index) => {
        const { question, answer, corrected } = element;
        const className = corrected ? 'black' : 'red'
        resultHtml += `
        <div>
            <p class="${className}">Question ${index + 1}: ${question}</p>
            <p class="green">Correct Answer: ${answer}</p>
        </div>
    `;
    })
    document.getElementById(`${id}-answer-container`).innerHTML = resultHtml;
    document.getElementById(`${id}-answer-container`).classList.remove('hide');
    document.getElementById(`${id}-show-result-btn`).classList.add('hide');
}


const startClicked = (id) => {
    const startButton = document.getElementById(`${id}-start-btn`);
    startButton.classList.add('hide');
    document.getElementById(`${id}-result`).textContent = `Score: 0 of ${numberOfQuestion}`
    generateQuestion(id);
}

