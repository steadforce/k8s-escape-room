const catImage = document.getElementById("cat");
const orbImage = document.getElementById("orb");
const orbHint = document.getElementById("orbHint");
const tomeImage = document.getElementById("tome");
const tomeHint = document.getElementById("tomeHint");
const photoHint = document.getElementById("photoHint");

let currentNumberAdditionalCats = 0;

setInterval(function () {
    const catResponse = httpGet("/cat");
    if (catResponse.status != 200) {
        catImage.src = "/game/redcircle.png";
        catImage.title = "The cat is missing!";
    } else {
        catImage.src = "/cat/cat.png";
        catImage.title = "";
    }

    const textCatReplicas = httpGet("/cat-counter").responseText.replaceAll(
        '"',
        "",
    );
    const numberCatReplicas = parseInt(textCatReplicas, 10);
    const numberAdditionalCats = Math.max(numberCatReplicas - 1, 0);
    while (numberAdditionalCats > currentNumberAdditionalCats) {
        const id = "cat-" + (currentNumberAdditionalCats + 1);
        const cat = document.createElement("img");
        cat.id = id;
        cat.classList.add("cat");
        cat.src = "/cat/cat.png";
        document.getElementById("catContainer").appendChild(cat);
        currentNumberAdditionalCats += 1;
    }
    while (numberAdditionalCats < currentNumberAdditionalCats) {
        const id = "cat-" + currentNumberAdditionalCats;
        const cat = document.getElementById(id);
        cat.remove();
        currentNumberAdditionalCats -= 1;
    }

    const orbResponse = httpGet("/orb");
    if (orbResponse.status != 200) {
        orbWisdom.src = "/game/noanswers.png";
        orbHint.hidden = false;
    } else {
        orbWisdom.src = "/orb";
        orbHint.hidden = true;
    }

    var photoNumber = Math.floor(Math.random() * 10);
    var photoUrl = "/photoframe/photo" + photoNumber + ".png";
    const photoframeResponse = httpGet(photoUrl);
    if (photoframeResponse.status != 200) {
        photoFrame.src = "/game/white_noise.png";
        photoHint.hidden = false;
    } else {
        photoFrame.src = photoUrl;
        photoHint.hidden = true;
    }

    const tomeResponse = httpGet("/tome");
    if (tomeResponse.status != 200) {
        tomeImage.src = "/game/closedtome.png";
        tomeHint.hidden = false;
    } else {
        tomeHint.hidden = true;
        tomeImage.src = "/tome/opentome.png";
    }
}, 3000);

const addOnsResponse = httpGet("/addons/list");
if (addOnsResponse.status == 200) {
    const addOnContainer = document.getElementById("addons");
    const addOns = JSON.parse(addOnsResponse.responseText);
    addOns.forEach(function (addOn) {
        var a = document.createElement("a");
        var linkText = document.createTextNode(addOn.name);
        a.appendChild(linkText);
        a.title = addOn.name;
        a.href = addOn.url;
        addOnContainer.appendChild(a);
    });
}

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

var timerVar;
var totalSeconds = 0;
function startTimer() {
    timerVar = setInterval(incrementTimer, 1000);
}

function startGame() {
    hideEndscreen();
    hideStartscreen();
    startTimer();
}

function stopGame() {
    clearInterval(timerVar);
    showEndscreen();
}

function incrementTimer() {
    var date = new Date(0);
    date.setSeconds(++totalSeconds);
    var time = date.toISOString().substring(11, 19);
    document.getElementById("timer").innerHTML = time;
    document.getElementById("timeTaken").innerHTML = time;
}

function currentStatus() {
    var status = "";
    var progressChecks = [
        catImage.src.endsWith("cat.png"),
        orbWisdom.src.endsWith("/orb"),
        !photoFrame.src.endsWith("white_noise.png"),
        tomeImage.src.endsWith("opentome.png"),
    ];
    if (progressChecks.every((c) => c)) {
        stopGame();
    }
    var progress = progressChecks
    .map((check) => (check ? "&#x2705;" : "&#x2B55"))
    .join(" ");
    document.getElementById("progress").innerHTML = progress;
}
setInterval(currentStatus, 3000);

