const STORE = [
    { 
      question: 'How many teams are in the NBA league?',
      answers: [
        '16',
        '29',
        '30',
        '18'
      ],
      correctAnswer: '30',
    },
    {
      question: 'What is the Finals records of Michael Jordan during his career?',
      answers: [
      '8 wins 1 lose',
      '5 wins 2 lose',
      '3 wins 6 lose',
      '6 wins 0 lose'
      ],
      correctAnswer: '6 wins 0 lose'
    },
    {
      question: 'What is the highest score did Michael Jordan get in a single game?', 
      answers: [
        '56',
        '81',
        '69',
        '63'
      ],
      correctAnswer: '69'
    },
    {
      question:'Who got the highest score in a single game during NBA History?',
      answers: [
       'Michael Jordan',
       'Kareem Abdul-Jabbar',
       'Kobe Bryant',
       'Wilt Chamberlain' 
      ],
      correctAnswer: 'Wilt Chamberlain'
    },
    {
      question:'Which NBA teams won an NBA Championship from 1999-2002 & 2008-2010?',
      answers: [
       'Chicago Bulls',
       'LA Lakers',
       'Detroit Pistons',
       'New York Knicks'
      ],
      correctAnswer: 'LA Lakers'
    },
    {
      question:'How many points did Kobe Bryant score on the Toronto Raptors on January 22, 2006?',
      answers: [
       '10 Points',
       '65 Points',
       '81 Points',
       '100 Points'
      ],
      correctAnswer: '81 Points'
    },
    {
      question:'In 1996 NBA Draft, which overall pick was Kobe Bryant selected at?',
      answers: [
       '1st',
       '3rd',
       '8th',
       '13th'
      ],
      correctAnswer: '13th'
    },
    {
      question:'Which player won the 2007-2008 Finals MVP?',
      answers: [
       'Paul Pierce',
       'Kevin Garnett',
       'Pau Gasol',
       'Kobe Bryant'
      ],
      correctAnswer: 'Paul Pierce'
    },
    {
     question:'How many minutes are in each quarter of an NBA basketball game?',
      answers: [
       '10 minutes',
       '12 minutes',
       '8 minutes',
       '15 minutes'
      ],
      correctAnswer: '12 minutes'
    },
    {
     question:'Which NBA team won most Championships in NBA history?',
      answers: [
       'LA Lakers',
       'Chicago Bulls',
       'Boston Celtics',
       'Golden State Warriors'
      ],
      correctAnswer: 'Boston Celtics'
    },
]

let questionNumber= 0;
let score= 0;

function startQuiz () {
  $('.quizStartPage').on('click','.startButton', function(event) {
      $('.quizStartPage').remove();
      $('.questionAnswerForm').css('display','block');
      $('.questionNumber').text(1);
    });
}

function generateQuestion () {
  if (questionNumber < STORE.length) {
      return `<div class="question-${questionNumber}">
      <h2>${STORE[questionNumber].question}
      </h2>
      <form>
      <fieldset>
      <label class="answerChoice">
      <input type="radio" name="answer" value= "${STORE[questionNumber].answers[0]}" required>
      <span>${STORE[questionNumber].answers[0]}</span>
      </label>
      <label class="answerChoice">
      <input type="radio" name="answer" value= "${STORE[questionNumber].answers[1]}" required>
      <span>${STORE[questionNumber].answers[1]}</span>
      </label>
      <label class="answerChoice">
      <input type="radio" name="answer" value= "${STORE[questionNumber].answers[2]}" required>
      <span>${STORE[questionNumber].answers[2]}</span>
      </label>
      <label class="answerChoice">
      <input type="radio" name="answer" value= "${STORE[questionNumber].answers[3]}" required>
      <span>${STORE[questionNumber].answers[3]}</span>
      </label>
      <button type="submit" class="submitButton">Submit</button>
      </fieldset>
      </form>
      </div>`;
      } else {
       renderResults();
       restartQuiz();
       $('.questionNumber').text(10)
      }
}

function changeQuestion() {
    questionNumber ++;
    $('.questionNumber').text(questionNumber+1);
  }

function changeScore () {
  score ++;
}

function renderQuestion () {
   $('.questionAnswerForm').html(generateQuestion());
}

function chooseAnswer() {
    $('form').on('submit', function(event) {
      event.preventDefault();
      let chosen= $('input:checked');
      let answer= chosen.val();
      let correctAnswer= `${STORE[questionNumber].correctAnswer}`;
      if (answer === correctAnswer) {
      chosen.parent().addClass('correct');
      ifAnswerIsRight();
      } 
      else {
      chosen.parent().addClass('wrong');
      ifAnswerIsWrong();
      }
      }); 
}

function ifAnswerIsRight(){
    giveRightAnswerFeedback();
    updateScore();
}

function ifAnswerIsWrong() {
   giveWrongAnswerFeedback();
}

function giveRightAnswerFeedback() {
   let correctAnswer= `${STORE[questionNumber].correctAnswer}`;
   $('.questionAnswerForm').html(`<div class="correctFeedback">
   <p>You answer is right!</p>
   <button type=button class="nextButton">Next</button></div>`);
}

function giveWrongAnswerFeedback () {
    let correctAnswer= `${STORE[questionNumber].correctAnswer}`;
    $('.questionAnswerForm').html(`<div class="wrongFeedback">
    <p>You answer is wrong<br>The correct answer is <span>"${correctAnswer}"</span></p>
    <button type=button class="nextButton">Next</button></div>`);
}

function updateScore () {
   changeScore();
   $('.score').text(score);
}

function renderNextQuestion() {
   $('main').on('click', '.nextButton', function(event) {
     changeQuestion();
     renderQuestion();
     chooseAnswer();
   });
}

function renderResults() {
    if(score>=9) {
      $('.questionAnswerForm').html(`<div class="finalResults"><h3>You Are On Fire!</h3><p>Score: ${score} / 10</p><p>You are a diehard fan of NBA!</p><button type="button" class="restartButton">Retake Quiz</button></div>`);
    } else if(score<9 && score>=5) {
      $('.questionAnswerForm').html(`<div class="finalResults"><h3>Well done！</h3><p>Score: ${score} / 10</p><p>You seems like this game.</p><button type="button" class="restartButton">Retake Quiz</button></div>`);
    } else {
      $('.questionAnswerForm').html(`<div class="finalResults"><h3>Well......</h3><p>Score: ${score} / 10</p><p>Is that you, John Snow?</p><button type="button" class="restartButton">Retake Quiz</button></div>`);
      }
}

function restartQuiz() {
   $('main').on('click', '.restartButton', function(event) {
    location.reload();
   });
}

function runQuiz() {
   startQuiz();
   renderQuestion();
   chooseAnswer();
   renderNextQuestion();
}
  
$(runQuiz);

