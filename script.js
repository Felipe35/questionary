'use strict';
//Data
const questions = [
  {
    numb: 1, //Index,
    question: 'What is the supreme law of the land?',
    options: ['Congress', 'Constitution', 'President'],
    answer: 'Constitution',
  },
  {
    numb: 2, //Index,
    question: 'What does the Constitution do?',
    options: [
      'Sets Congress',
      'Verify laws',
      'Protects basic rights of Americans',
    ],
    answer: 'Protects basic rights of Americans',
  },
  {
    numb: 3, //Index,
    question:
      'Self-government is in the first three words of the Constitution. What are these words?',
    options: ['We are the best', 'We the People', 'We are Americans'],
    answer: 'We the People',
  },
  {
    numb: 4, //Index,
    question: 'What is an amendment?',
    options: [
      'a change to the Constitution',
      'a right to live',
      'a change to the law',
    ],
    answer: 'a change to the Constitution',
  },
  {
    numb: 5,
    question: 'What do we call the first ten amendments to the Constitution?',
    options: ['the Bill of Rights', 'the right of religion', 'the liberty'],
    answer: 'the Bill of Rights',
  },
  {
    numb: 6,
    question: 'What is one right or freedom from the First Amendment?',
    options: ['Speech', 'Food', 'Rent'],
    answer: 'Speech',
  },
  {
    numb: 7,
    question: 'How many amendments does the Constitution have?',
    options: ['2', '27', '10'],
    answer: '27',
  },
  {
    numb: 8,
    question: 'What did the Declaration of Independence do?',
    options: [
      'U.S is free from Great Britain',
      'All people must pay taxes',
      'U.S is free from Europe',
    ],
    answer: 'U.S is free from Great Britain',
  },
  {
    numb: 9,
    question: 'Select one right in the Declaration of Independence',
    options: ['liberty', 'live', 'progress'],
    answer: 'liberty',
  },
];
console.log(typeof questions.answer);
/*===Getting Buttons====*/
const btnStart = document.querySelector('.start_btn');
const btnExit = document.querySelector('.exit_btn');
const btnContinue = document.querySelector('.continue_btn');
const btnNext = document.querySelector('.next_btn');
const btnRestartQuiz = document.querySelector('.restar');
const btnQuitQuiz = document.querySelector('.quit');

const infoDisplay = document.querySelector('.info_container');
const quizDisplay = document.querySelector('.quiz_container');
const quizText = document.querySelector('.que_text');
const quizOptions = document.querySelector('.option_list');

const labelFooterCounter = document.querySelector('.total_que');
const labelScoreResult = document.querySelector('.score');
const labelResultText = document.querySelector('.result_text');
const labelLogoWinner = document.querySelector('.logo');

const iconTickCorrect = document.querySelector('.icon tick');
const iconCrossWrong = document.querySelector('.icon cross');

const timeCounter = document.querySelector('.counter_time_num');
const result = document.querySelector('.result_box');

//variables - counters
let counter = 0;
let counterFooter = 1;
let counterTime;
let timeValue = 10;
let userScore = 0;
//html vars
let correctCheck = '<div class="icon tick">✅</div>';
let incorrectCheck = '<div class="icon cross">❌</div>';
/*==function to display the containers:Opacity===*/
const dipslayLayaout = function (display) {
  return display.classList.add('show');
};

const removeLayaout = function (remov) {
  return remov.classList.remove('show');
};
//===Functions to display backgroud Colors==*/
const correct = colorGreen => colorGreen.classList.add('correct');

const wrong = colorRed => colorRed.classList.add('wrong');
//===Disable Selections
const disableSelect = select => select.classList.add('selectNone');

//==Set attribute==
const atribute = element => element.setAttribute('class', 'correct');
//==Displaying the Scores==
const displayScoreCheck = value =>
  value >= 9 ? `Good you got ${value} of 9` : `Sorry you got ${value} of 9`;
//==Adding the icons==
// const greenCheck = answer => answer.insertAdjacentHTML('beforeend', answer);
/*===Resetting the game===*/
const resetGame = function () {
  dipslayLayaout(quizDisplay);
  removeLayaout(result);

  counter = 0;
  counterFooter = 1;
  counterTime;
  timeValue = 10;
  userScore = 0;

  displayQuiz(counter);
  labelCounter(counterFooter);
  clearInterval(counterTime);
  timer(timeValue);
  btnNext.style.display = 'none';
};
const settingValuesDefault = function (value) {
  const resetting = (value = '');
  return resetting;
};

/*==Displaying the Info interfaz===*/
//START
btnStart.addEventListener('click', function (e) {
  e.preventDefault();

  dipslayLayaout(infoDisplay);
});

/*==Removing the info interfaz===*/
//EXIT
btnExit.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('exit working');

  removeLayaout(infoDisplay);
});

//===Counter time==
const timer = function (time) {
  counterTime = setInterval(timer, 1000);
  function timer() {
    timeCounter.textContent = time;
    time--;
    if (time < 0) time++;
  }
};

/*===Displaying the Quiz interfaz==*/
//CONTINUE
btnContinue.addEventListener('click', function (e) {
  e.preventDefault();

  removeLayaout(infoDisplay);
  dipslayLayaout(quizDisplay);
  displayQuiz(0);
  labelCounter(1);
  timer(10);
});

// console.log(counter);
//Next button when is clicked. Verify
btnNext.addEventListener('click', function (e) {
  e.preventDefault();
  const check =
    counter < questions.length - 1
      ? `${counter++} ${counterFooter++} ${displayQuiz(counter)}${labelCounter(
          counterFooter
        )}${clearInterval(counterTime)} ${timer(
          timeValue
        )} ${(btnNext.style.display = 'none')}`
      : showResultBox();
  return check;
});
//Removing the results box
btnRestartQuiz.addEventListener('click', function (e) {
  e.preventDefault();
  removeLayaout(result);
  dipslayLayaout(infoDisplay);
});

const displayQuiz = function (ind) {
  const quizTittle = `<span>${questions[ind].numb}. ${questions[ind].question}</span>`;
  const quizChoices = ` <div class="option">
  <span>${questions[ind].options[1]}</span></div>
<div class="option">
<span>${questions[ind].options[2]}</span></div>
<div class="option">
<span>${questions[ind].options[0]}</span></div>`;
  console.log(quizChoices);
  //Display the question tittle
  quizText.innerHTML = quizTittle;
  //Display the choices
  quizOptions.innerHTML = quizChoices;
  const labelOption = quizOptions.querySelectorAll('.option');

  labelOption.forEach(function (ele) {
    ele.setAttribute('onclick', 'optionSelected(this)');
  });
};

//==Checking the functionality of the option selections==

const optionSelected = function (answer) {
  clearInterval(counterTime);
  let userAns = answer.textContent.trim(); // 💥Changed to string cuz the answer will be a text
  let correctAns = questions[counter].answer;
  let allOptions = quizOptions.children.length;
  console.log(userAns);
  console.log(correctAns);
  userScore += 1;
  // const checkScore =
  //   userScore >= 4
  //     ? `Good you got ${userScore} of 4`
  //     : `Sorry you got ${userScore} of 4`;
  displayScoreCheck(userScore);
  if (userAns === correctAns) {
    correct(answer);
    answer.insertAdjacentHTML('beforeend', correctCheck);
    labelScoreResult.textContent = userScore;
    labelResultText.textContent = displayScoreCheck(userScore);
    labelLogoWinner.textContent = '👑';
  } else {
    wrong(answer);
    answer.insertAdjacentHTML('beforeend', incorrectCheck);
    labelScoreResult.textContent = userScore -= 1;
    labelResultText.textContent = displayScoreCheck(userScore);
    labelLogoWinner.textContent = '🎃';

    console.log('Wrong Answer');

    for (let i = 0; i < allOptions; i++) {
      if (quizOptions.children[i].textContent === correctAns) {
        correct(quizOptions.children[i]);
        quizOptions.children[i].insertAdjacentHTML('beforeend', correctCheck);
      }
    }
  }

  //Selecting all elements
  for (const element of quizOptions.children) {
    disableSelect(element);
  }
  btnNext.style.display = 'block';
};

const showResultBox = function () {
  removeLayaout(infoDisplay);
  removeLayaout(quizDisplay);
  dipslayLayaout(result);
};

/*==Displaying the question footer counter==*/

const labelCounter = function () {
  const counterLabel = `<span><p>${counterFooter}</p>of<p>${questions.length}</p>Questions</span>`;
  labelFooterCounter.innerHTML = counterLabel;
};

/*===Quit the quiz===*/
btnQuitQuiz.addEventListener('click', function (e) {
  e.preventDefault();
  window.location.reload();
});

btnRestartQuiz.addEventListener('click', function (e) {
  e.preventDefault();

  resetGame();
});
// const checkAns = function (answers) {
//   answers.forEach(function (answer, i) {
//     const show = answer.options;
//     console.log(show);
//   });
//   return answers;
// };
// checkAns(questions);
// // const movementsFunct = function (arr) {
// //   // //   arr.forEach(function (mov, i) {
// //   // //     const checkMove = `Movement ${i + 1}: You ${
// //   // //       mov > 0 ? 'desposited' : 'widthrew'
// //   // //     } ${Math.abs(mov)}`;

// //   // //     console.log(checkMove);
// //   // //   });
// //   // //   return arr;
// //   // // };

// //   // // console.log(movementsFunct(movements));
