// Stopwatch Variables
let timer;
let seconds = 0;
let isRunning = false;

// Start/Stop Button Functionality
document.getElementById("startBtn").addEventListener("click", function () {
  const nameField = document.getElementById("nameField");
  if (nameField.value.trim() === "") {
    alert("Please enter your name to start the timer.");
    return;
  }

  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    this.textContent = "Start";
  } else {
    timer = setInterval(updateStopwatch, 1000);
    isRunning = true;
    this.textContent = "Stop";
    document.getElementById("welcomeContainer").classList.add("hidden");
    document.getElementById("gameContainer").classList.remove("hidden");
  }
});

// Update Stopwatch Display
function updateStopwatch() {
  seconds++;
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  document.getElementById("stopwatch").textContent = `${mins}:${secs}`;
}

// Reset Button Functionality
document.getElementById("resetBtn").addEventListener("click", function () {
  clearInterval(timer);
  seconds = 0;
  isRunning = false;
  document.getElementById("stopwatch").textContent = "00:00";
  document.getElementById("startBtn").textContent = "Start";
  document.getElementById("nameField").value = "";
  document.getElementById("welcomeContainer").classList.remove("hidden");
  document.getElementById("gameContainer").classList.add("hidden");
});

// Theme Toggle
document.getElementById("themeToggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
});

const catImage = document.getElementById("cat");
const orbImage = document.getElementById("orb");
const orbHint = document.getElementById("orbHint");
const tomeImage = document.getElementById("tome");
const tomeHint = document.getElementById("tomeHint");
const photoHint = document.getElementById("photoHint");

setInterval(function () {
  const catResponse = httpGet("/cat");
  if (catResponse.status != 200) {
    catImage.src = "/game/redcircle.png";
    catImage.title = "The cat is missing!";
  } else {
    catImage.src = "/game/cat.png";
    catImage.title = "";
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
  var photoUrl = "game/photoframe/photo" + photoNumber + ".png";
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
    tomeImage.src = "/game/opentome.png";
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
