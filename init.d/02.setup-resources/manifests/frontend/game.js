const checkStateInterval = 3000.0;

let checkStateDelta = 0.0;
let prevTime = 0.0;

class Timer {
    constructor() {
        this.seconds = 0;
        this.ref;
    }

    start() {
        this.ref = setInterval(() => { this.seconds++ }, 1000);
    }

    stop() {
        clearInterval(this.ref);
    }

    getTime() {
        let date = new Date(0);
        date.setSeconds(this.seconds);
        return date.toISOString().substring(11, 19);
    }
}

const gameState = {
    running: false,
    timer: new Timer(),
    solved: false,
    name: "",
    puzzles: {
        cat: {
            solved: false,
            replicas: 0,
        },
        orb: {
            solved: false,
        },
        photo: {
            solved: false,
            url: "",
        },
        tome: {
            solved: false,
        },
    },
};

function httpGet(url) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp;
}

function hideStartscreen() {
    document.getElementById("startscreen").style.display = "none";
}

function hideEndscreen() {
    document.getElementById("endscreen").style.display = "none";
}

function showEndscreen() {
    document.getElementById("endscreen").style.display = "inline";
}

function loadAddons() {
    const addOnsResponse = httpGet("/addons/list");

    if (addOnsResponse.status === 200) {
        const addOnContainer = document.getElementById("addons");
        const addOns = JSON.parse(addOnsResponse.responseText);
        addOns.forEach(function (addOn) {
            const a = document.createElement("a");
            const linkText = document.createTextNode(addOn.name);
            a.appendChild(linkText);
            a.title = addOn.name;
            a.href = addOn.url;
            addOnContainer.appendChild(a);
        });
    }
}

function checkCatState() {
    const catResponse = httpGet("/cat");

    gameState.puzzles.cat.solved = catResponse.status === 200;

    const catCounterResponse = httpGet("/cat-counter");
    const textCatCounter = catCounterResponse.responseText.replaceAll('"', "");
    const numberCatCounter = parseInt(textCatCounter) || 0;

    gameState.puzzles.cat.replicas = Math.max(numberCatCounter - 1, 0);
}

function checkOrbState() {
    const orbResponse = httpGet("/orb");

    gameState.puzzles.orb.solved = orbResponse.status === 200;
}

function checkPhotoState() {
    const photoNumber = Math.floor(Math.random() * 10);
    const photoUrl = `/photoframe/photo${photoNumber}.png`;
    const photoframeResponse = httpGet(photoUrl);

    if (photoframeResponse.status === 200) {
        gameState.puzzles.photo.solved = true;
        gameState.puzzles.photo.url = photoUrl;
    } else {
        gameState.puzzles.photo.solved = false;
    }
}

function checkTomeState() {
    const tomeResponse = httpGet("/tome");
    gameState.puzzles.tome.solved = tomeResponse.status === 200;
}

function checkGameState() {
    checkCatState();
    checkOrbState();
    checkPhotoState();
    checkTomeState();

    gameState.solved = Object.values(gameState.puzzles)
        .map((puzzle) => puzzle.solved)
        .reduce((l, r) => l && r, true);
}

function saveGameState() {
    const gameStateString = JSON.stringify(gameState);
    localStorage.setItem("activeGame", gameStateString);
}

function renderCat() {
    const catImage = document.getElementById("cat");
    const catContainer = document.getElementById("catContainer");
    const solvedImage = "/cat/cat.png";
    const unsolvedImage = "/game/redcircle.png";

    if (gameState.puzzles.cat.solved) {
        catImage.src = solvedImage;
        catImage.title = "";
    } else {
        catImage.src = unsolvedImage;
        catImage.title = "The cat is missing!";
    }
    const replicas = document.getElementsByClassName("cat replica");
    if (gameState.puzzles.cat.replicas !== replicas.length) {
        [].forEach.call(replicas, function (replica) {
            replica.remove();
        });
        for (let i = 0; i < gameState.puzzles.cat.replicas; ++i) {
            const cat = document.createElement("img");
            cat.id = `cat-${i}`;
            cat.classList.add("cat", "replica");
            cat.src = "/cat/cat.png";
            catContainer.appendChild(cat);
        }
    }
}

function renderOrb() {
    const orbImage = document.getElementById("orbWisdom");
    const orbHint = document.getElementById("orbHint");
    const solvedImage = "/orb";
    const unsolvedImage = "/game/noanswers.png";

    if (gameState.puzzles.orb.solved) {
        orbImage.src = solvedImage;
        orbHint.hidden = true;
    } else {
        orbImage.src = unsolvedImage;
        orbHint.hidden = false;
    }
}

function renderPhoto() {
    const photoHint = document.getElementById("photoHint");
    const unsolvedImage = "/game/white_noise.png";

    if (gameState.puzzles.photo.solved) {
        photoFrame.src = gameState.puzzles.photo.url;
        photoHint.hidden = true;
    } else {
        photoFrame.src = unsolvedImage;
        photoHint.hidden = false;
    }
}

function renderTome() {
    const tomeImage = document.getElementById("tome");
    const tomeHint = document.getElementById("tomeHint");
    const solvedImage = "/tome/opentome.png";
    const unsolvedImage = "/game/closedtome.png";

    if (gameState.puzzles.tome.solved) {
        tomeImage.src = solvedImage;
        tomeHint.hidden = true;
    } else {
        tomeImage.src = unsolvedImage;
        tomeHint.hidden = false;
    }
}

function renderProgressChecks() {
    const solvedMark = "&#x2705;";
    const unsolvedMark = "&#10060;";

    const progress = Object.values(gameState.puzzles)
    .map((check) => (check.solved ? solvedMark : unsolvedMark))
    .join(" ");
    document.getElementById("progress").innerHTML = progress;
}

function renderTimer() {
    const time = gameState.timer.getTime();

    document.getElementById("timer").innerHTML = time;
    document.getElementById("timeTaken").innerHTML = time;
}

function render() {
    renderCat();
    renderOrb();
    renderPhoto();
    renderTome();
    renderProgressChecks();
    renderTimer();
}

function startGame() {
    hideEndscreen();
    hideStartscreen();
    gameState.name = document.getElementById('nameInput').value;
    gameState.running = true;
    gameState.timer.start();
}

function checkAlreadyPlaying() {
    const gameStateString = localStorage.getItem("activeGame");
    if (gameStateString) {
        const oldGameState = JSON.parse(gameStateString);
        Object.assign(gameState, oldGameState);
        Object.setPrototypeOf(oldGameState.timer, Timer.prototype);
        document.getElementById('nameInput').value = gameState.name;
        startGame();
    }
}

function stopGame() {
    gameState.running = false;
    gameState.timer.stop();
    showEndscreen();
}

const loop = function (time) {
    const delta = time - prevTime;
    prevTime = time;

    checkStateDelta += delta;
    if (gameState.running && checkStateDelta > checkStateInterval) {
        checkStateDelta = 0.0;

        checkGameState();
        saveGameState();
    }

    if (gameState.running && gameState.solved) {
        stopGame();
    }

    render();
    window.requestAnimationFrame(loop);
};
window.requestAnimationFrame((time) => {
    prevTime = time;

    loadAddons();
    checkGameState();
    window.requestAnimationFrame(loop);
});

checkAlreadyPlaying();
