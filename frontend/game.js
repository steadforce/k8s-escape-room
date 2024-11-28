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
    catImage.src = "/cat/cat.png";
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
