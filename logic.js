const choices = document.querySelectorAll(".btn");
const user = document.getElementById("user__score");
const computer = document.getElementById("computer__score");
const ruleBtn = document.querySelector(".rule__btn");
const gameRule = document.querySelector("#game__rule");
const hideGameRule = document.querySelector(".game__rule--hide-btn");
const nextButton = document.querySelector(".next__btn");


ruleBtn.addEventListener("click", () => {
  gameRule.style.display = "block";
});
hideGameRule.addEventListener("click", () => {
  gameRule.style.display = "none";
});

// storing initial value in local Storage
// localStorage.setItem('userValue', 0)

if (!sessionStorage.getItem("userValue")) {
  sessionStorage.setItem("userValue", 0);
}

if (!sessionStorage.getItem("computerValue")) {
  sessionStorage.setItem("computerValue", 0);
}

user.innerHTML = parseInt(sessionStorage.getItem("userValue"));
computer.innerHTML = parseInt(sessionStorage.getItem("computerValue"));

let userScore = parseInt(sessionStorage.getItem("userValue"));
let computerScore = parseInt(sessionStorage.getItem("computerValue"));

//setting and updating userScore
function updateUserScore() {
  userScore++;
  console.log(userScore);
  sessionStorage.setItem("userValue", userScore);
  user.innerHTML = parseInt(sessionStorage.getItem("userValue"));
}

//setting and updating computerScore
function updateComputerScore() {
  computerScore++;
  sessionStorage.setItem("computerValue", computerScore);
  computer.innerHTML = parseInt(sessionStorage.getItem("computerValue"));
}

const gameStatus = document.querySelector(".title__result");
const animation = document.querySelector(".animation");
const computerAnimation = document.querySelector(".computer__animation");

const showWinner = (userChoice, computerChoice, userWin) => {
  if (userWin) {
    gameStatus.innerHTML = "YOU WIN";
    animation.style.display = "block";
    console.log(`User won ${userChoice} beats ${computerChoice}`);
    updateUserScore();
  } else {
    gameStatus.innerHTML = "YOU LOSE";
    computerAnimation.style.display = "block";
    console.log(`Computer won ${computerChoice} beats ${userChoice}`);
    updateComputerScore();
  }
};

// for draw game
const drawGame = () => {
  console.log("Game was draw:");
  gameStatus.innerHTML = "TIE UP";
};

//gererating computer choice
const GenerateComputerChoice = () => {
  const option = ["rock", "paper", "scissor"];
  const randomIndex = Math.floor(Math.random() * 3);
  return option[randomIndex];
};

const computerChoice = GenerateComputerChoice();
const playGame = (userChoice) => {
  if (userChoice === computerChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = computerChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = computerChoice === "scissor" ? false : true;
    } else {
      userWin = computerChoice === "rock" ? false : true;
    }
    showWinner(userChoice, computerChoice, userWin);
  }
};
// CHANGE COMPUTER CHOICE LOGO AND BORDER BASED ON COMPUTER CHOICE
console.log("Computer Choice = " + computerChoice);
const changeCompImg = document.querySelector("#computer__choice");
const changePCBorderColor = document.querySelector(".pc__choice-figure");

if (computerChoice === "scissor") {
  changeCompImg.src = "assets/scissor.png";
  changePCBorderColor.style.borderColor = "#BD00FF";
} else if (computerChoice == "rock") {
  changeCompImg.src = "assets/rock.png";
  changePCBorderColor.style.borderColor = "#0074B6";
} else {
  changeCompImg.src = "assets/paper.png";
  changePCBorderColor.style.borderColor = "#FFA943";
}

//SHOWING USER CHOICE IN RESULT
const changeUserImg = document.querySelector("#user__choice");
const changeBorderColor = document.querySelector(".user__choice-figure");
function updateUserChoiceImage(userChoice) {
  if (userChoice === "scissor") {
    changeUserImg.src = "assets/scissor.png";
    changeBorderColor.style.borderColor = "#BD00FF";
  } else if (userChoice === "rock") {
    changeBorderColor.style.borderColor = "#0074B6";
  } else {
    changeUserImg.src = "assets/paper.png";
    changeBorderColor.style.borderColor = "#FFA943";
  }
}

const hideSymbol = document.querySelector(".symbols");
const result = document.querySelector(".new__container");

if (!sessionStorage.getItem("counter")) {
  sessionStorage.setItem("counter", 0);
}

let count = parseInt(sessionStorage.getItem("counter"));
function updateCounter() {
  count++;
  console.log("clicked", +count);
  sessionStorage.setItem("counter", count);
}
const showNextButton = () => {
  if (count => 3) {
    if (userScore === computerScore) {
      nextButton.style.visibility = "hidden";
    } else if (userScore > computerScore) {
      nextButton.style.visibility = "visible";
    } 
    else {
        nextButton.style.visibility = "hidden"
    }
  }
};

const triangle = document.querySelector(".triangular__img");
//LOGIC TO SELECT USER INPUT
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    updateCounter();
    showNextButton();
    const userChoice = choice.getAttribute("id");
    hideSymbol.style.display = "none";
    triangle.style.display = "none";
    result.style.display = "flex";
    playGame(userChoice);
    updateUserChoiceImage(userChoice);
  });
});