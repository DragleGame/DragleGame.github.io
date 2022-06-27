//allow only 5 guesses
//if loose show looser prompt

//declare variables
let dayPlayed = new Date().toJSON().slice(0, 10);
let guessCount = 0; //count guesses
let matchVal = {}; //store matched properties
let seasonComparison = "";
let ageComparison = "";
let inputDrag = "";
let guess = "";
let highestStreak = 0;
let dragOfTheDay;
let copyShared;
let franchise = document.getElementById("franchise");
let season = document.getElementById("season");
let alternativeQueen = document.getElementById("alternativeQueen");
let pageantQueen = document.getElementById("pageantQueen");
let fashionQueen = document.getElementById("fashionQueen");
let comedyQueen = document.getElementById("comedyQueen");
let lipsyncAssassin = document.getElementById("lipsyncAssassin");
let wonSnatchGame = document.getElementById("wonSnatchGame");
let wonMissCongeniality = document.getElementById("wonMissCongeniality");
let seasonWinner = document.getElementById("seasonWinner");
let btnStart = document.getElementById("start");
const form = document.querySelector("#dragleForm");
let endModal = document.querySelector("#endModal");
let endPhrase = document.querySelector("#endPhrase");
let closeModal = document.getElementById("closeModal");
let resultContainer = document.querySelector("#resultContainer");
let finalAnswer = document.querySelector("#finalAnswer");
let played = document.querySelector(".played");
let won = document.querySelector(".won");
let currentStreakNum = document.querySelector(".currentStreakNum");
let longestStreakNum = document.querySelector(".longestStreakNum");
let guessBoard = document.querySelector("#pastGuessesContainer");
let saveIndex;
let btnShare = document.getElementById("shareButton");
let btnShareModal = document.getElementById("shareButtonModal");

window.onload = function () {
  loadLocalStorage();
};
//array of objects of queens
import { dragQueens } from "./utils.js";

//datalist
let list = document.getElementById("dragQueens");
dragQueens.forEach(function (dragQueen) {
  let option = document.createElement("option");
  option.value = dragQueen.name;
  list.appendChild(option);
});

function checkSeason(guess, todaysDrag) {
  if (guess.seasonNumber === todaysDrag.seasonNumber) {
    seasonComparison = guess.franchise + " " + guess.season + " =";
  } else if (guess.seasonNumber > todaysDrag.seasonNumber) {
    seasonComparison = guess.franchise + " " + guess.season + " ↓";
  } else {
    seasonComparison = guess.franchise + " " + guess.season + " ↑";
  }
  return seasonComparison;
}

function checkAge(guess, todaysDrag) {
  if (guess.age === todaysDrag.age) {
    ageComparison = guess.age + " years =";
  } else if (guess.age > todaysDrag.age) {
    ageComparison = guess.age + " years ↓";
  } else {
    ageComparison = guess.age + " years ↑";
  }
  return ageComparison;
}

function checkCharacteristics(guess, todaysDrag) {
  //check against obj2
  let i = 0;
  let match = 0;

  Object.keys(todaysDrag).forEach((i) => {
    if (todaysDrag[i] === guess[i] && todaysDrag[i] !== false) {
      match++; //increment the variable
      //append key and value to the variable
      matchVal[i] = todaysDrag[i];
    }
  });
  return matchVal;
}

function checkDrag(guess, todaysDrag) {
  console.log(dragOfTheDay);
  console.log(guess);
  // check if Season number is the same, higher or lower
  //return seasonComparison
  checkSeason(guess, todaysDrag);

  //check if AGE is the same, higher or lower
  // return ageComparison
  checkAge(guess, todaysDrag);
  //loop to check booleans (is she a Comedy queen?....)
  //return only true booleans
  checkCharacteristics(guess, todaysDrag);
  //put on screen: Name of the queen + seasonComparison + seasonComparison
  // and the characteristics of the queen (if any are true)
}

function updateTotalGames() {
  let totalGames = window.localStorage.getItem("totalGames") || 0;
  window.localStorage.setItem("totalGames", Number(totalGames) + 1);

  let restoreIndex = window.localStorage.getItem("indodq");
  console.log(dragQueens[restoreIndex]);

  if (dragQueens[restoreIndex].used === 1) {
    dragQueens[restoreIndex].used = 2;
    console.log(dragQueens[restoreIndex]);
  }
}

function chooseDrag() {
  //daily picking of a drag
  let chooseQueen = dragQueens[Math.floor(Math.random() * dragQueens.length)];
  if (chooseQueen.used === 1) {
    //chooseQueen.used = true;
    dragOfTheDay = chooseQueen;
    window.localStorage.setItem("dqotd", JSON.stringify(dragOfTheDay));
    console.log(dragOfTheDay);
    let dragNameToSearch = dragOfTheDay.name;
    console.log(dragNameToSearch);

    saveIndex = dragQueens
      .map(function (obj) {
        return obj.name;
      })
      .indexOf(dragNameToSearch);

    window.localStorage.setItem("indodq", Number(saveIndex));
  } else {
    chooseDrag();
  }
}

function resetGameState() {
  let dateToday = new Date().toJSON().slice(0, 10);
  console.log(dateToday);
  console.log(dayPlayed);

  //if (dateToday !== dayPlayed) {
  window.localStorage.removeItem("dragTags");
  window.localStorage.removeItem("pastGuesses");
  window.localStorage.removeItem("dqotd");
  window.localStorage.removeItem("gamePlayed");
  window.localStorage.removeItem("contentShare");
  window.localStorage.setItem("guessCount", 0);
  chooseDrag();
  //}
}

function saveTime() {
  window.localStorage.setItem("lastPlayed", dayPlayed);
  window.localStorage.setItem("gamePlayed", "yes");
}

function rightGuess() {
  updateTotalGames();
  //Statistics of wins
  let totalWins = window.localStorage.getItem("totalWins") || 0;
  window.localStorage.setItem("totalWins", Number(totalWins) + 1);

  let currentStreak = window.localStorage.getItem("currentStreak") || 0;
  window.localStorage.setItem("currentStreak", Number(currentStreak) + 1);

  if (currentStreak > highestStreak) {
    highestStreak = currentStreak;
  }

  window.localStorage.setItem("longestStreak", Number(currentStreak) + 1);
  showStats();

  //save time
  saveTime();

  //create copy to clipboard
  let copyWin = "";
  let nuberOfGuesses = window.localStorage.getItem("guessCount");
  console.log(nuberOfGuesses);
  let currentGuessNum = JSON.parse(nuberOfGuesses) + 1;

  if (currentGuessNum == 1) {
    copyWin = "Dragle 1/8\n👑;\nPlay here: dragle.fun";
  } else if (currentGuessNum == 2) {
    copyWin = "Dragle 2/8\n❌👑;\nPlay here: dragle.fun";
  } else if (currentGuessNum == 3) {
    copyWin = "Dragle 3/8\n❌❌👑;\nPlay here: dragle.fun";
  } else if (currentGuessNum == 4) {
    copyWin = "Dragle 4/8\n❌❌❌👑;\nPlay here: dragle.fun";
  } else if (currentGuessNum == 5) {
    copyWin = "Dragle 5/8\n❌❌❌❌👑;\nPlay here: dragle.fun";
  } else if (currentGuessNum == 6) {
    copyWin = "Dragle 6/8\n❌❌❌❌❌👑;\nPlay here: dragle.fun";
  } else if (currentGuessNum == 7) {
    copyWin = "Dragle 7/8\n❌❌❌❌❌❌👑;\nPlay here: dragle.fun";
  } else if (currentGuessNum == 8) {
    copyWin = "Dragle 8/8\n❌❌❌❌❌❌❌👑;\nPlay here: dragle.fun";
  }

  copyShared = copyWin;
  window.localStorage.setItem("contentShare", copyShared);

  //PUT DRAG NAME ON MODAL
  let answerText = document.querySelector("#answer");
  answerText.innerText = dragOfTheDay.name;

  endPhrase.innerText = "You're a winner baby!";
  //OPEN MODAL
  endModal.style.display = "block";

  //COLOCAR NOME DA QUEEN NA PAGINA
  let answerSeason = document.querySelector("#answerSeason");

  finalAnswer.innerText = dragOfTheDay.name;
  form.style.display = "none";
  resultContainer.classList.remove("hidden");
  answerSeason.innerText =
    dragOfTheDay.franchise +
    " " +
    dragOfTheDay.season +
    "  |  " +
    dragOfTheDay.age +
    " years";

  //tags da drag na página
  if (dragOfTheDay.alternativeQueen === true) {
    alternativeQueen.classList.remove("hidden");
  }

  if (dragOfTheDay.pageantQueen === true) {
    pageantQueen.classList.remove("hidden");
  }

  if (dragOfTheDay.fashionQueen === true) {
    fashionQueen.classList.remove("hidden");
  }

  if (dragOfTheDay.comedyQueen === true) {
    comedyQueen.classList.remove("hidden");
  }

  if (dragOfTheDay.lipsyncAssassin === true) {
    lipsyncAssassin.classList.remove("hidden");
  }

  if (dragOfTheDay.wonSnatchGame === true) {
    wonSnatchGame.classList.remove("hidden");
  }

  if (dragOfTheDay.wonMissCongeniality === true) {
    wonMissCongeniality.classList.remove("hidden");
  }

  if (dragOfTheDay.seasonWinner === true) {
    seasonWinner.classList.remove("hidden");
  }
}

function wrongGuess() {
  updateTotalGames();
  window.localStorage.setItem("currentStreak", 0);

  showStats();

  //save time
  saveTime();

  let copyLost = "Dragle X/8\n❌❌❌❌❌❌❌❌\nPlay here: dragle.fun";
  copyShared = copyLost;
  window.localStorage.setItem("contentShare", copyShared);

  //PUT DRAG NAME ON MODAL
  let answerText = document.querySelector("#answer");
  answerText.innerText = dragOfTheDay.name;

  endPhrase.innerText = "Sashay away!";
  //OPEN MODAL
  endModal.style.display = "block";

  //show restart button
  btnStart.style.display = "block";

  //COLOCAR NOME DA QUEEN NA PAGINA
  let answerSeason = document.querySelector("#answerSeason");

  finalAnswer.innerText = dragOfTheDay.name;
  form.style.display = "none";
  resultContainer.classList.remove("hidden");
  answerSeason.innerText =
    dragOfTheDay.franchise +
    " " +
    dragOfTheDay.season +
    "  |  " +
    dragOfTheDay.age +
    " years";

  //tags da drag na página
  if (dragOfTheDay.alternativeQueen === true) {
    alternativeQueen.classList.remove("hidden");
  }

  if (dragOfTheDay.pageantQueen === true) {
    pageantQueen.classList.remove("hidden");
  }

  if (dragOfTheDay.fashionQueen === true) {
    fashionQueen.classList.remove("hidden");
  }

  if (dragOfTheDay.comedyQueen === true) {
    comedyQueen.classList.remove("hidden");
  }

  if (dragOfTheDay.lipsyncAssassin === true) {
    lipsyncAssassin.classList.remove("hidden");
  }

  if (dragOfTheDay.wonSnatchGame === true) {
    wonSnatchGame.classList.remove("hidden");
  }

  if (dragOfTheDay.wonMissCongeniality === true) {
    wonMissCongeniality.classList.remove("hidden");
  }

  if (dragOfTheDay.seasonWinner === true) {
    seasonWinner.classList.remove("hidden");
  }
}

function preserveGameState() {
  let dragTags = document.getElementById("dragTags");
  window.localStorage.setItem("dragTags", dragTags.innerHTML);

  let pastGuesses = document.getElementById("pastGuessesContainer");
  window.localStorage.setItem("pastGuesses", pastGuessesContainer.innerHTML);
}

function loadLocalStorage() {
  let storedDragTags = window.localStorage.getItem("dragTags");
  if (storedDragTags) {
    document.getElementById("dragTags").innerHTML = storedDragTags;
  }

  let storedPastGuesses = window.localStorage.getItem("pastGuesses");
  if (storedPastGuesses) {
    guessBoard.innerHTML = storedPastGuesses;
  }

  let storedDragQueen = window.localStorage.getItem("dqotd");
  if (storedDragQueen) {
    dragOfTheDay = JSON.parse(storedDragQueen);
  }

  let gamePlay = window.localStorage.getItem("gamePlayed");
  if (gamePlay === "yes") {
    finalAnswer.innerText = dragOfTheDay.name;
    form.style.display = "none";
    resultContainer.classList.remove("hidden");
  }

  let sharedSaved = window.localStorage.getItem("contentShare");
  if (sharedSaved) {
    copyShared = sharedSaved;
  }
}

function showStats() {
  let totalGames = window.localStorage.getItem("totalGames");
  played.innerText = totalGames;

  let totalWins = window.localStorage.getItem("totalWins");
  won.innerText = totalWins || 0;

  let currentStreak = window.localStorage.getItem("currentStreak");
  currentStreakNum.innerText = currentStreak;

  let longestStreakCoun = window.localStorage.getItem("longestStreak");
  longestStreakNum.innerText = longestStreakCoun || 0;
}

//button submit
form.addEventListener("submit", function (event) {
  event.preventDefault();

  //get name from guess & create element
  const guessContent = document.createElement("p");
  inputDrag = document.querySelector("#dragName");
  guessContent.id = "guessDrag";
  guessContent.innerText = inputDrag.value;
  guess = dragQueens.find((drag) => drag.name === inputDrag.value);

  //check number of plays
  let currentGuessCount = window.localStorage.getItem("guessCount") || 0;
  if (currentGuessCount < 7) {
    if (guess.name === dragOfTheDay.name) {
      rightGuess();
    } else {
      checkDrag(guess, dragOfTheDay);
      // add content to page
      let guessCard = document.createElement("div");
      guessCard.className = "pastGuessBox";

      let seasonContent = document.createElement("p");
      seasonContent.className = "dragStats";
      seasonContent.innerText = seasonComparison;

      let ageContent = document.createElement("p");
      ageContent.className = "dragStats";
      ageContent.innerText = ageComparison;

      guessCard.append(guessContent, seasonContent, ageContent);

      guessBoard.append(guessCard);

      //tags da drag
      if (matchVal.franchise) {
        franchise.innerText = matchVal.franchise;
        franchise.classList.remove("hidden");
      }

      if (matchVal.season) {
        season.innerText = matchVal.season;
        season.classList.remove("hidden");
      }

      //characteritics
      if (matchVal.alternativeQueen === true) {
        alternativeQueen.classList.remove("hidden");
      }

      if (matchVal.pageantQueen === true) {
        pageantQueen.classList.remove("hidden");
      }

      if (matchVal.fashionQueen === true) {
        fashionQueen.classList.remove("hidden");
      }

      if (matchVal.comedyQueen === true) {
        comedyQueen.classList.remove("hidden");
      }

      if (matchVal.lipsyncAssassin === true) {
        lipsyncAssassin.classList.remove("hidden");
      }

      if (matchVal.wonSnatchGame === true) {
        wonSnatchGame.classList.remove("hidden");
      }

      if (matchVal.wonMissCongeniality === true) {
        wonMissCongeniality.classList.remove("hidden");
      }

      if (matchVal.seasonWinner === true) {
        seasonWinner.classList.remove("hidden");
      }
    }
    guessCount++;
    window.localStorage.setItem("guessCount", Number(guessCount));
    preserveGameState();
    //reset form
    form.reset();
  } else {
    if (guess === dragOfTheDay) {
      rightGuess();
    } else {
      checkDrag(guess, dragOfTheDay);
      // add content to page
      let guessCard = document.createElement("div");
      guessCard.className = "pastGuessBox";

      let seasonContent = document.createElement("p");
      seasonContent.className = "dragStats";
      seasonContent.innerText = seasonComparison;

      let ageContent = document.createElement("p");
      ageContent.className = "dragStats";
      ageContent.innerText = ageComparison;

      guessCard.append(guessContent, seasonContent, ageContent);

      let guessBoard = document.querySelector("#pastGuessesContainer");
      guessBoard.append(guessCard);

      //tags da drag
      if (matchVal.franchise) {
        franchise.innerText = matchVal.franchise;
        franchise.classList.remove("hidden");
      }

      if (matchVal.season) {
        season.innerText = matchVal.season;
        season.classList.remove("hidden");
      }

      //characteritics
      if (matchVal.alternativeQueen === true) {
        alternativeQueen.classList.remove("hidden");
      }

      if (matchVal.pageantQueen === true) {
        pageantQueen.classList.remove("hidden");
      }

      if (matchVal.fashionQueen === true) {
        fashionQueen.classList.remove("hidden");
      }

      if (matchVal.comedyQueen === true) {
        comedyQueen.classList.remove("hidden");
      }

      if (matchVal.lipsyncAssassin === true) {
        lipsyncAssassin.classList.remove("hidden");
      }

      if (matchVal.wonSnatchGame === true) {
        wonSnatchGame.classList.remove("hidden");
      }

      if (matchVal.wonMissCongeniality === true) {
        wonMissCongeniality.classList.remove("hidden");
      }

      if (matchVal.seasonWinner === true) {
        seasonWinner.classList.remove("hidden");
      }
      wrongGuess();
    }
    form.reset();
  }
});

//restart game
btnStart.onclick = function () {
  resetGameState();
  location.reload();
};

//close modal window
closeModal.onclick = function () {
  endModal.style.display = "none";
};

//share button
btnShare.addEventListener("click", (event) => {
  console.log(copyShared);
  navigator.clipboard.writeText(copyShared);
});

//share button modal

btnShareModal.addEventListener("click", (event) => {
  console.log(copyShared);
  navigator.clipboard.writeText(copyShared);
});

//open stats modal
let statsModal = document.getElementById("statsModal");
let statsButton = document.getElementById("icon-stats");

statsButton.onclick = function () {
  let totalGames = window.localStorage.getItem("totalGames");
  let statsPlayed = document.querySelector(".statsPlayed");
  statsPlayed.innerText = totalGames || 0;

  let totalWins = window.localStorage.getItem("totalWins");
  let statsWon = document.querySelector(".statsWon");
  statsWon.innerText = totalWins || 0;

  let currentStreak = window.localStorage.getItem("currentStreak");
  let statsCurrentStreakNum = document.querySelector(".statsCurrentStreakNum");
  statsCurrentStreakNum.innerText = currentStreak || 0;

  let longestStreakCoun = window.localStorage.getItem("longestStreak");
  let statsLongestStreakNum = document.querySelector(".statsLongestStreakNum");
  statsLongestStreakNum.innerText = longestStreakCoun || 0;
  statsModal.style.display = "block";
};

//close stats modal window
let closeStatsModal = document.getElementById("closeStatsModal");
closeStatsModal.onclick = function () {
  statsModal.style.display = "none";
};

//open info modal
let infoModal = document.getElementById("infoModal");
let infoButton = document.getElementById("icon-information");

infoButton.onclick = function () {
  infoModal.style.display = "block";
};

//close info modal window
let closeInfoModal = document.getElementById("closeInfoModal");
closeInfoModal.onclick = function () {
  infoModal.style.display = "none";
};

//countdown timer
const Countdown = (() => {
  let nextMidnight = new Date();
  nextMidnight.setHours(24, 0, 0, 0);

  const getRemainingTime = () => {
    let now = new Date();

    let time = (nextMidnight.getTime() - now.getTime()) / 1000;

    if (time < 0) {
      nextMidnight = new Date();
      nextMidnight.setHours(24, 0, 0, 0);

      return getRemainingTime();
    }

    return time;
  };

  const parseTime = (time) => {
    const hours = Math.floor(time / 3600);
    let rest = time - hours * 3600;
    const minutes = Math.floor(rest / 60);
    rest = rest - minutes * 60;
    const seconds = Math.floor(rest);
    const milliseconds = (rest - seconds) * 1000;

    return [hours, minutes, seconds, milliseconds];
  };

  const formatTime = (parsedTime) => {
    return (
      '<span class="hours">' +
      parsedTime[0] +
      '</span><span class="hSep">:</span><span class="minutes">' +
      ("0" + parsedTime[1]).slice(-2) +
      '</span><span class="mSep">:</span><span class="seconds">' +
      ("0" + parsedTime[2]).slice(-2) +
      "</span>"
    );
  };

  const els = [];
  let timeout;

  return (el) => {
    els.push(el);

    if (!timeout) {
      const refresh = () => {
        const parsedTime = parseTime(getRemainingTime());
        const formattedTimes = formatTime(parsedTime);

        for (let i = 0, iend = els.length; i < iend; i++) {
          els[i].innerHTML = formattedTimes;
        }

        setTimeout(() => {
          refresh();
        }, parsedTime[3]);
      };
      refresh();
    } else el.innerHTML = formatTime(parseTime(getRemainingTime()));
  };
})();

Countdown(document.getElementById("countdown-two"));
