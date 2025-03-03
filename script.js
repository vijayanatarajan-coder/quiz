let questions = null;
const quizContainer = document.querySelector("#quiz-container");
let questionNumber = 0;
let correct_answer = "";
let score = 0;

async function fetchQuestions() {
  const apiUrl =
    "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    questions = data.results;
    console.log(questions);
    displayQuestion();
  } catch (error) {
    return console.error("Error fetching data:", error);
  }
}

function displayQuestion() {
  if (questions && questionNumber < questions.length) {
    let element = questions[questionNumber];
    console.log(element);
    quizContainer.innerHTML = "";

    const questionText = document.createElement("div");
    questionText.classList.add("question");
    questionText.innerHTML = `<strong>${element.question}</strong>`;
    quizContainer.appendChild(questionText);

    let allAnswers = [...element.incorrect_answers];
    allAnswers.push(element.correct_answer);
    correct_answer = element.correct_answer;

    allAnswers = allAnswers.sort(() => Math.random() - 0.5);

    allAnswers.forEach((answer) => {
      const optionsContainer = document.createElement("div");
      optionsContainer.classList.add("options");
      const radioButton = document.createElement("input");
      radioButton.type = "radio";
      radioButton.id = answer;
      radioButton.name = "answer";
      radioButton.value = answer;

      const label = document.createElement("label");
      label.setAttribute("for", answer);
      label.textContent = answer;
      
      optionsContainer.appendChild(radioButton);
      optionsContainer.appendChild(label);
      quizContainer.appendChild(optionsContainer);
      quizContainer.appendChild(document.createElement("br"));
    });
  } else {
    quizContainer.innerHTML = `<h2>Quiz Finished! Your score is: ${score} out of ${questions.length}</h2>`;
  }
}

function submitSelection() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');

  if (selectedOption) {
    document.getElementById("selectedAnswer").textContent =
      "You selected: " + selectedOption.value;

    if (selectedOption.value === correct_answer) {
      score++;
    }

    document.getElementById("score").textContent = `Score: ${score}`;

    questionNumber++;

    setTimeout(() => {
      displayQuestion();
    }, 1000);
  } else {
    document.getElementById("selectedAnswer").textContent =
      "Please select an answer!";
  }
}

function restartQuiz() {
  questionNumber = 0;
  score = 0;
  correct_answer = "";
  document.getElementById("selectedAnswer").textContent = "";
  document.getElementById("score").textContent = "";

  fetchQuestions();
}

fetchQuestions();
