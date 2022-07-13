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
let firstOut = document.getElementById("firstOut");
let impersonator = document.getElementById("impersonator");
let singer = document.getElementById("singer");
let dancer = document.getElementById("dancer");
let comebackQueen = document.getElementById("comebackQueen");
let vsTheWorld = document.getElementById("vsTheWorld");
let ballWinner = document.getElementById("ballWinner");
let doubleShantay = document.getElementById("doubleShantay");
let doubleSashay = document.getElementById("doubleSashay");
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
  if (window.localStorage.getItem("totalGames") < 1) {
    infoModal.style.display = "block";
  }

  //if (window.localStorage.getItem("lastPlayed") == undefined) {
  //resetGameState();
  //window.localStorage.setItem("lastPlayed", dayPlayed);
  //}

  const testDayToday = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay) - 1;
  };

  let testDaaaayTodaaay = testDayToday();
  let dateToday = new Date().toJSON().slice(0, 10);
  let savedDatePlayed = window.localStorage.getItem("testday");
  console.log(testDaaaayTodaaay);
  console.log(savedDatePlayed);

  if (testDaaaayTodaaay != savedDatePlayed) {
    resetGameState();
    //location.reload();
  }
  loadLocalStorage();
};
//array of objects of queens
import { dragQueens } from "./utils.js";

//datalist
//let list = document.getElementById("dragQueens");
//dragQueens.forEach(function (dragQueen) {
//  let option = document.createElement("option");
//  option.innerHTML = dragQueen.name;
//  list.appendChild(option);
//});

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
}

function chooseDrag() {
  //escolha correta das drags 1 vez ao dia
  const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay) - 1;
  };
  dragOfTheDay = dragQueens[getDayOfYear()];
  let testDay = getDayOfYear();
  window.localStorage.setItem("dqotd", JSON.stringify(dragOfTheDay));
  window.localStorage.setItem("testday", testDay);
  console.log(dragOfTheDay);
}

function resetGameState() {
  window.localStorage.removeItem("dragTags");
  window.localStorage.removeItem("pastGuesses");
  window.localStorage.removeItem("dqotd");
  window.localStorage.removeItem("gamePlayed");
  window.localStorage.removeItem("contentShare");
  window.localStorage.setItem("guessCount", 0);
  chooseDrag();
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
    copyWin = "Dragle 1/8\n👑;\nPlay here: https://dragle.fun/";
  } else if (currentGuessNum == 2) {
    copyWin = "Dragle 2/8\n❌👑;\nPlay here: https://dragle.fun/";
  } else if (currentGuessNum == 3) {
    copyWin = "Dragle 3/8\n❌❌👑;\nPlay here: https://dragle.fun/";
  } else if (currentGuessNum == 4) {
    copyWin = "Dragle 4/8\n❌❌❌👑;\nPlay here: https://dragle.fun/";
  } else if (currentGuessNum == 5) {
    copyWin = "Dragle 5/8\n❌❌❌❌👑;\nPlay here: https://dragle.fun/";
  } else if (currentGuessNum == 6) {
    copyWin = "Dragle 6/8\n❌❌❌❌❌👑;\nPlay here: https://dragle.fun/";
  } else if (currentGuessNum == 7) {
    copyWin = "Dragle 7/8\n❌❌❌❌❌❌👑;\nPlay here: https://dragle.fun/";
  } else if (currentGuessNum == 8) {
    copyWin = "Dragle 8/8\n❌❌❌❌❌❌❌👑;\nPlay here: https://dragle.fun/";
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

  if (dragOfTheDay.firstOut === true) {
    firstOut.classList.remove("hidden");
  }

  if (dragOfTheDay.impersonator === true) {
    impersonator.classList.remove("hidden");
  }

  if (dragOfTheDay.singer === true) {
    singer.classList.remove("hidden");
  }

  if (dragOfTheDay.dancer === true) {
    dancer.classList.remove("hidden");
  }

  if (dragOfTheDay.comebackQueen === true) {
    comebackQueen.classList.remove("hidden");
  }

  if (dragOfTheDay.vsTheWorld === true) {
    vsTheWorld.classList.remove("hidden");
  }

  if (dragOfTheDay.ballWinner === true) {
    ballWinner.classList.remove("hidden");
  }

  if (dragOfTheDay.doubleShantay === true) {
    doubleShantay.classList.remove("hidden");
  }

  if (dragOfTheDay.doubleSashay === true) {
    doubleSashay.classList.remove("hidden");
  }
}

function wrongGuess() {
  updateTotalGames();
  window.localStorage.setItem("currentStreak", 0);

  showStats();

  //save time
  saveTime();

  let copyLost = "Dragle X/8\n❌❌❌❌❌❌❌❌\nPlay here: https://dragle.fun/";
  copyShared = copyLost;
  window.localStorage.setItem("contentShare", copyShared);

  //PUT DRAG NAME ON MODAL
  let answerText = document.querySelector("#answer");
  answerText.innerText = dragOfTheDay.name;

  endPhrase.innerText = "Sashay away!";
  //OPEN MODAL
  endModal.style.display = "block";

  //show restart button
  //btnStart.style.display = "block";

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

  if (dragOfTheDay.firstOut === true) {
    firstOut.classList.remove("hidden");
  }

  if (dragOfTheDay.impersonator === true) {
    impersonator.classList.remove("hidden");
  }

  if (dragOfTheDay.singer === true) {
    singer.classList.remove("hidden");
  }

  if (dragOfTheDay.dancer === true) {
    dancer.classList.remove("hidden");
  }

  if (dragOfTheDay.comebackQueen === true) {
    comebackQueen.classList.remove("hidden");
  }

  if (dragOfTheDay.vsTheWorld === true) {
    vsTheWorld.classList.remove("hidden");
  }

  if (dragOfTheDay.ballWinner === true) {
    ballWinner.classList.remove("hidden");
  }

  if (dragOfTheDay.doubleShantay === true) {
    doubleShantay.classList.remove("hidden");
  }

  if (dragOfTheDay.doubleSashay === true) {
    doubleSashay.classList.remove("hidden");
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

      guessBoard.prepend(guessCard);

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
      if (matchVal.firstOut === true) {
        firstOut.classList.remove("hidden");
      }

      if (matchVal.impersonator === true) {
        impersonator.classList.remove("hidden");
      }

      if (matchVal.singer === true) {
        singer.classList.remove("hidden");
      }

      if (matchVal.dancer === true) {
        dancer.classList.remove("hidden");
      }

      if (matchVal.comebackQueen === true) {
        comebackQueen.classList.remove("hidden");
      }

      if (matchVal.vsTheWorld === true) {
        vsTheWorld.classList.remove("hidden");
      }

      if (matchVal.ballWinner === true) {
        ballWinner.classList.remove("hidden");
      }

      if (matchVal.doubleShantay === true) {
        doubleShantay.classList.remove("hidden");
      }

      if (matchVal.doubleSashay === true) {
        doubleSashay.classList.remove("hidden");
      }
    }
    //guessCount++;
    currentGuessCount++;
    //window.localStorage.setItem("guessCount", Number(guessCount));
    window.localStorage.setItem("guessCount", Number(currentGuessCount));
    preserveGameState();
    //reset form
    form.reset();
  } else {
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

      let guessBoard = document.querySelector("#pastGuessesContainer");
      guessBoard.prepend(guessCard);

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

      if (matchVal.firstOut === true) {
        firstOut.classList.remove("hidden");
      }

      if (matchVal.impersonator === true) {
        impersonator.classList.remove("hidden");
      }

      if (matchVal.singer === true) {
        singer.classList.remove("hidden");
      }

      if (matchVal.dancer === true) {
        dancer.classList.remove("hidden");
      }

      if (matchVal.comebackQueen === true) {
        comebackQueen.classList.remove("hidden");
      }

      if (matchVal.vsTheWorld === true) {
        vsTheWorld.classList.remove("hidden");
      }

      if (matchVal.ballWinner === true) {
        ballWinner.classList.remove("hidden");
      }

      if (matchVal.doubleShantay === true) {
        doubleShantay.classList.remove("hidden");
      }

      if (matchVal.doubleSashay === true) {
        doubleSashay.classList.remove("hidden");
      }
      wrongGuess();
    }
    form.reset();
  }
});

//restart game
//btnStart.onclick = function () {
//resetGameState();
//location.reload();
//};

//close modal window
closeModal.onclick = function () {
  endModal.style.display = "none";
};

//share button
btnShare.addEventListener("click", (event) => {
  console.log(copyShared);
  if (navigator.share) {
    navigator
      .share({
        text: copyShared,
      })
      .then(() => {
        console.log("Thanks for sharing!");
      })
      .catch(console.error);
  } else {
    console.log(copyShared);
    navigator.clipboard.writeText(copyShared);
    btnShare.innerText = "Copied";
    setTimeout(() => {
      btnShare.innerText = "Share results";
    }, 2000); // 👈️ delay in milliseconds
  }
});

//share button modal
btnShareModal.addEventListener("click", (event) => {
  if (navigator.share) {
    navigator
      .share({
        title: "Dragle",
        url: "https://dragle.fun",
        text: copyShared,
      })
      .then(() => {
        console.log("Thanks for sharing!");
      })
      .catch(console.error);
  } else {
    console.log(copyShared);
    navigator.clipboard.writeText(copyShared);
    btnShare.innerText = "Copied";
    setTimeout(() => {
      btnShare.innerText = "Share results";
    }, 2000); // 👈️ delay in milliseconds
  }
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

//BETTER LIST OF NAMES
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  let currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    let a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = arr[i].substr(0, val.length);
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML +=
          "<input type='hidden' value='" + arr[i].replace(/'/g, "&#39;") + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

/*An array containing all the drag names*/
let dragNamesList = [
  "Victoria Porkchop Parker",
  "Tammie Brown",
  "Akashia",
  "Jade",
  "Ongina",
  "Shannel",
  "Rebeca Glasscock",
  "Nina Flowers",
  "BeBe Zahara Benet",
  "Shangela",
  "Nicole Paige Brooks",
  "Mystique Summers Madison",
  "Kylie Sonique Love",
  "Morgan McMichaels",
  "Sahara Davenport",
  "Jessica Wild",
  "Pandora Boxx",
  "Tatianna",
  "Jujubee",
  "Raven",
  "Tyra Sanchez",
  "Venus D-Lite",
  "Phoenix",
  "Mimi Imfurst",
  "India Ferrah",
  "Mariah Paris Balenciaga",
  "Stacy Layne Matthews",
  "Delta Work",
  "Carmen Carrera",
  "Yara Sofia",
  "Alexis Mateo",
  "Manila Luzon",
  "Raja",
  "Alisa Summers",
  "Lashauwn Beyond",
  "The Princess",
  "Madame LaQueer",
  "Milan",
  "Jiggly Caliente",
  "Willam",
  "DiDa Ritz",
  "Kenya Michaels",
  "Latrice Royale",
  "Phi Phi OHara",
  "Chad Michaels",
  "Sharon Needles",
  "Jinkx Monsoon",
  "Alaska",
  "Roxxxy Andrews",
  "Detox",
  "Coco Montrese",
  "Alyssa Edwards",
  "Ivy Winters",
  "Jade Jolie",
  "Lineysha Sparx",
  "Honey Mahogany",
  "Vivienne Pinay",
  "Monica Beverly Hillz",
  "Serena ChaCha",
  "Penny Tration",
  "Bianca Del Rio",
  "Adore Delano",
  "Courtney Act",
  "Darienne Lake",
  "BenDeLaCreme",
  "Joslyn Fox",
  "Trinity K. Bonet",
  "Laganja Estranja",
  "Milk",
  "Gia Gunn",
  "April Carrión",
  "Vivacious",
  "Kelly Mantle",
  "Magnolia Crawford",
  "Violet Chachki",
  "Ginger Minj",
  "Pearl",
  "Kennedy Davenport",
  "Katya",
  "Trixie Mattel",
  "Miss Fame",
  "Jaidynn Diore Fierce",
  "Max",
  "Kandy Ho",
  "Mrs. Kasha Davis",
  "Jasmine Masters",
  "Sasha Belle",
  "Tempest DuJour",
  "Bob the Drag Queen",
  "Kim Chi",
  "Naomi Smalls",
  "Chi Chi DeVayne",
  "Derrick Barry",
  "Thorgy Thor",
  "Robbie Turner",
  "Acid Betty",
  "Naysha Lopez",
  "Cynthia Lee Fontaine",
  "Dax ExclamationPoint",
  "Laila McQueen",
  "Sasha Velour",
  "Peppermint",
  "Shea Couleé",
  "Trinity The Tuck",
  "Alexis Michelle",
  "Nina Bonina Brown",
  "Valentina",
  "Farrah Moan",
  "Aja",
  "Eureka",
  "Charlie Hides",
  "Kimora Blac",
  "Jaymes Mansfield",
  "Natalia Pliacam",
  "Année Maywong",
  "Dearis Doll",
  "B Ella",
  "Amadiva",
  "JAJA",
  "Petchra",
  "Morrigan",
  "Bunny Be Fly",
  "Meannie Minaj",
  "Aquaria",
  "Kameron Michaels",
  "Asia OHara",
  "Miz Cracker",
  "Monét X Change",
  "The Vixen",
  "Mo Heart",
  "Blair St. Clair",
  "Mayhem Miller",
  "Dusty Ray Bottoms",
  "Yuhua Hamasaki",
  "Kalorie Karbdashian Williams",
  "Vanessa Vanjie Mateo",
  "Angele Anang",
  "Kandy Zyanide",
  "Kana Warrior",
  "Bandit",
  "Vanda Miss Joaquim",
  "Srimala",
  "Tormai",
  "Genie",
  "Miss Gimhuay",
  "Mocha Diva",
  "Maya BHaro",
  "Katy Killer",
  "Silver Sonic",
  "M Stranger Fox",
  "Yvie Oddly",
  "Brooke Lynn Hytes",
  "Akeria C. Davenport",
  "Silky Nutmeg Ganache",
  "Nina West",
  "Shuga Cain",
  "Plastique Tiara",
  "RaJah OHara",
  "Scarlet Envy",
  "Ariel Versace",
  "Mercedes Iman Diamond",
  "Honey Davenport",
  "Kahanna Montrese",
  "Soju",
  "The Vivienne",
  "Divina de Campo",
  "Baga Chipz",
  "Cheryl Hole",
  "Blu Hydrangea",
  "Crystal",
  "Sum Ting Wong",
  "Vinegar Strokes",
  "Scaredy Kat",
  "Gothy Kendoll",
  "Jaida Essence Hall",
  "Crystal Methyd",
  "Gigi Goode",
  "Jackie Cox",
  "Heidi N Closet",
  "Widow VonDu",
  "Jan",
  "Brita",
  "Aiden Zhane",
  "Nicky Doll",
  "Rock M. Sakura",
  "Dahlia Sin",
  "Priyanka",
  "Rita Baga",
  "Scarlett BoBo",
  "Jimbo",
  "Lemon",
  "Ilona Verley",
  "BOA",
  "Kiara",
  "Tynomi Banks",
  "Anastarzia Anaquway",
  "Kyne",
  "Juice Boxx",
  "Envy Peru",
  "Janey Jacké",
  "MaMaQueen",
  "Miss Abby OMG",
  "ChelseaBoy",
  "Sederginne",
  "Madame Madness",
  "Megan Schoonbrood",
  "Patty Pam-Pam",
  "Roem",
  "Symone",
  "Kandy Muse",
  "Gottmik",
  "Rosé",
  "Olivia Lux",
  "Utica Queen",
  "Tina Burner",
  "Denali",
  "Elliott with 2 Ts",
  "LaLa Ri",
  "Tamisha Iman",
  "Joey Jay",
  "Kahmora Hall",
  "Lawrence Chaney",
  "Bimini Bon-Boulash",
  "Tayce",
  "Ellie Diamond",
  "AWhora",
  "Sister Sister",
  "Tia Kofi",
  "Joe Black",
  "Veronica Green",
  "Ginny Lemon",
  "Asttina Mandella",
  "Cherry Valentine",
  "Kita Mean",
  "Art Simone",
  "Karen from Finance",
  "Scarlet Adams",
  "Elektra Shock",
  "Maxi Shield",
  "Etcetera Etcetera",
  "Anita Wiglit",
  "Coco Jumbo",
  "Jojo Zaho",
  "Carmen Farala",
  "Killer Queen",
  "Sagittaria",
  "Pupi Poisson",
  "Dovima Nurmi",
  "Hugáceo Crujiente",
  "Arantxa Castilla La Mancha",
  "Inti",
  "Drag Vulcano",
  "The Macarena",
  "Vanessa Van Cartier",
  "My Little Puny",
  "Vivaldi",
  "Keta Minaj",
  "Tabitha",
  "The Countess",
  "Ivy-Elyse",
  "Love Masisi",
  "Reggy B",
  "Juicy Kutoure",
  "Krystal Versace",
  "Ella Vaday",
  "Kitty Scott-Claus",
  "Vanity Milan",
  "Scarlett Harlett",
  "Choriza May",
  "River Medway",
  "Charity Kase",
  "Victoria Scone",
  "Elektra Fence",
  "Anubis",
  "Icesis Couture",
  "Kendall Gender",
  "Pythia",
  "Gia Metric",
  "Adriana",
  "Kimora Amour",
  "Synthia Kiss",
  "Eve 6000",
  "Suki Doll",
  "Stephanie Prince",
  "Océane Aqua-Black",
  "Beth",
  "Elecktra Bionic",
  "Farida Kant",
  "Le Riche",
  "Luquisha Lubamba",
  "Ava Hangar",
  "Divinity",
  "Enorma Jean",
  "Ivana Vamp",
  "Willow Pill",
  "Lady Camden",
  "Angeria Paris VanMicheals",
  "Bosco",
  "Daya Betty",
  "DeJa Skye",
  "Jorgeous",
  "Jasmine Kennedie",
  "Kerri Colby",
  "Maddy Morphosis",
  "Orion Story",
  "Kornbread The Snack Jeté",
  "Alyssa Hunter",
  "June Jambalaya",
  "Pangina Heals",
  "Sharonne",
  "Estrella Xtravaganza",
  "Venedita Von Däsh",
  "Marina",
  "Juriji Der Klee",
  "Drag Sethlas",
  "Diamante Merybrown",
  "Onyx",
  "Jota Carajota",
  "Samantha Ballentines",
  "Ariel Rec",
  "Marisa Prisa",
];

/*initiate the autocomplete function on the input element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("dragName"), dragNamesList);
