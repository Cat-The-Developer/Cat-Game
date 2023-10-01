function GamePageRedirect() {
  window.location.href = "/game.html";
}

function catPosition() {
  document.querySelector(".gameBoard").addEventListener("mousemove", (e) => {
    const x = e.clientX - 80;
    if (x < window.innerWidth && x >= 0) {
      document.querySelector(".cat").style.left = `${x}px`;
    }
  });

  document.querySelector(".gameBoard").addEventListener("touchmove", (e) => {
    const x = e.touches[0].clientX;
    if (x < window.innerWidth && x >= 80) {
      document.querySelector(".cat").style.left = `${x - 80}px`;
    }
  });
}

function chocoPosition() {
  const chocoLeft = Math.floor(Math.random() * window.innerWidth - 80);

  if (chocoLeft > 0) {
    document
      .querySelector(".chocolateDisplay")
      .insertAdjacentHTML(
        "beforeend",
        `<img class='fallingChoco' style="left: ${chocoLeft}px" src='/assets/chocolate.webp' />`
      );
  } else {
    document
      .querySelector(".chocolateDisplay")
      .insertAdjacentHTML(
        "beforeend",
        `<img class='fallingChoco' style="left: 0px" src='/assets/chocolate.webp' />`
      );
  }
}

function chocoRemover() {
  if (document.querySelectorAll(".fallingChoco").length > 7) {
    const choco = document.querySelector(".chocolateDisplay");
    choco.removeChild(choco.firstChild);
  }
}

let score = 0;

function scoreMaker() {
  setInterval(score++, 2000);
  document.querySelector(".displayingScore").innerHTML = `${score}`;
}

function collision() {
  let falledChoco = document.querySelectorAll(".fallingChoco");
  let cat = document.querySelector(".cat");

  for (i = 0; i < falledChoco.length; i++) {
    let chocoPositions = falledChoco[i];

    let catBoxLeft = Math.floor(cat.offsetLeft);
    let catBoxRight = Math.floor(cat.offsetLeft + 90);

    let chocoBoxLeft = Math.floor(chocoPositions.offsetLeft);
    let chocoBoxRight = Math.floor(chocoPositions.offsetLeft + 60);

    let catBoxTop = Math.floor(cat.offsetTop);
    let catBoxBottom = Math.floor(cat.offsetTop + 90);

    let chocoBoxTop = Math.floor(chocoPositions.offsetTop);
    let chocoBoxBottom = Math.floor(chocoPositions.offsetTop + 60);

    if (chocoBoxLeft >= catBoxLeft && chocoBoxRight <= catBoxRight) {
      if (chocoBoxTop >= catBoxTop && chocoBoxBottom <= catBoxBottom) {
        const viewScore = document.querySelector(".displayingScore").innerHTML;
        window.localStorage.setItem("score", viewScore);

        const highScore = window.localStorage.getItem("High Score");

        if (viewScore > highScore) {
          window.localStorage.setItem("High Score", viewScore);
        }
        window.location.href = "/gameOver.html";
      }
    }
  }
}

if (window.location.pathname === "/gameOver.html") {
  const score = window.localStorage.getItem("score");
  const highScore = window.localStorage.getItem("High Score");

  document.querySelector(".totalScore").innerHTML = score;
  document.querySelector(".highScore").innerHTML = highScore;
}

catPosition();
setInterval(chocoPosition, 700);
setInterval(collision);
setInterval(chocoRemover, 700);
setInterval(scoreMaker, 1000);
