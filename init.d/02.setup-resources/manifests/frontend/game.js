const checkStateInterval = 3000.0;

let checkStateDelta = 0.0;
let prevTime = 0.0;

function makeTimer() {
    let seconds = 0;
    let ref;

    function increment() {
        ++seconds;
    }

    return {
        start() {
            ref = setInterval(increment, 1000);
        },
        stop() {
            clearInterval(ref);
        },
        getTime() {
            let date = new Date(0);
            date.setSeconds(seconds);
            return date.toISOString().substring(11, 19);
        },
    };
}

const gameState = {
    running: false,
    timer: makeTimer(),
    solved: false,
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

function hideStartscreen() {
    document.getElementById("startscreen").style.display = "none";
}

function hideEndscreen() {
    document.getElementById("endscreen").style.display = "none";
}

function showEndscreen() {
    document.getElementById("endscreen").style.display = "inline";
}

async function loadAddons() {
    const addOnContainer = document.getElementById("addons");
    function loadAddon(addOn) {
        const a = document.createElement("a");
        const linkText = document.createTextNode(addOn.name);
        a.appendChild(linkText);
        a.title = addOn.name;
        a.href = addOn.url;
        addOnContainer.appendChild(a);
    }

    await fetch("/addons/list")
    .then((response) => {
        return response.ok ? response.json() : Promise.resolve([]);
    })
    .then((response) => response.forEach(loadAddon));
}

async function checkCatState() {
    const cat = fetch("/cat").then((response) => {
        gameState.puzzles.cat.solved = response.ok
    });

    const catCounter = fetch("/cat-counter")
    .then((response) => response.text())
    .then((response) => {
        const textCatCounter = response.replaceAll('"', "");
        const numberCatCounter = parseInt(textCatCounter) || 0;
        gameState.puzzles.cat.replicas = Math.max(numberCatCounter - 1, 0);
    });

    await Promise.all([cat, catCounter]);
}

async function checkOrbState() {
    await fetch("/orb").then((response) => {
        gameState.puzzles.orb.solved = response.ok
    });
}

async function checkPhotoState() {
    const photoNumber = Math.floor(Math.random() * 10);
    await fetch(`/photoframe/photo${photoNumber}.png`).then((response) => {
        if (response.ok) {
            gameState.puzzles.photo.solved = true;
            gameState.puzzles.photo.url = photoUrl;
        } else {
            gameState.puzzles.photo.solved = false;
        }
    });
}

async function checkTomeState() {
    await fetch("/tome").then((response) => {
        gameState.puzzles.tome.solved = response.ok
    });
}

async function checkGameState() {
    await Promise.all([
        checkCatState(),
        checkOrbState(),
        checkPhotoState(),
        checkTomeState(),
    ]).then(() => {
        gameState.solved = Object.values(gameState.puzzles)
            .map((puzzle) => puzzle.solved)
            .reduce((l, r) => l && r, true);
    });
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
    gameState.running = true;
    gameState.timer.start();
}

function stopGame() {
    gameState.running = false;
    gameState.timer.stop();
    showEndscreen();
}

const loop = async function (time) {
    const delta = time - prevTime;
    prevTime = time;

    checkStateDelta += delta;
    if (gameState.running && checkStateDelta > checkStateInterval) {
        checkStateDelta = 0.0;

        await checkGameState();
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
