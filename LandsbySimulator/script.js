// Globale variabler
var metalMine = document.getElementById("metal-mine");
var tree1 = document.getElementById("tree-1");
var tree2 = document.getElementById("tree-2");
var tree3 = document.getElementById("tree-3");
var materialInfo = document.getElementById("material-info");
var outputDiv = document.getElementById("output-div");
var buyBuilding1Btn = document.getElementById("buy-building-1-btn");
var buyBuilding2Btn = document.getElementById("buy-building-2-btn");
var buySwordBtn = document.getElementById("buy-sword-btn");
var buildingDiv = document.getElementById("building-div");
var monsterDiv = document.getElementById("monster-div");
var healthBar = document.getElementById("life-bar");
var buyStickBtn = document.getElementById("buy-stick-btn");

var tree = 0;
var metal = 0;
var numberOfBuildings = 0;
var heroHealth = 300;
var strenght = 10;
var randomNumber = null;
var monsterHealth = 40;
var monsterDmg = 10;
var monsterShow = false;
var monsterImg = `<img src="images/cute-wolfman.png">`;
var itemArray = ["building-1.png", "building-3.png"];
var clickArray = [0, 0, 0];
var outputArray = ["", "", "", ""];
// Variabler slutt

// Funksjoner
function messageOut() {
  healthBar.innerHTML = `${heroHealth}hp`;
  outputDiv.innerHTML = `${outputArray[0]} <br> ${outputArray[1]} <br> ${outputArray[2]} <br> ${outputArray[3]}`;
  materialInfo.innerHTML = `Treverk: ${tree} enheter. Metall: ${metal} enheter. Antall Bygninger: ${numberOfBuildings} . Styrke: ${strenght}.`;
}

function gatherMaterial() {
  if (this.id === "metal-mine") {
    metal += 10;
    outputArray.unshift("Du har samlet 10 metall");
    messageOut();
    damage();
  } else if (this.id === "tree-1") {
    tree += 25;
    clickArray[0] += 1;
    outputArray.unshift("Du har samlet 25 tømmer");
    messageOut();
    damage();
    if (clickArray[0] === 10) {
      tree1.style.display = "none";
    }
  } else if (this.id === "tree-2") {
    tree += 25;
    clickArray[1] += 1;
    outputArray.unshift("Du har samlet 25 tømmer");
    messageOut();
    damage();
    if (clickArray[1] === 10) {
      tree2.style.display = "none";
    }
  } else if (this.id === "tree-3") {
    tree += 25;
    clickArray[2] += 1;
    outputArray.unshift("Du har samlet 25 tømmer");
    messageOut();
    damage();
    if (clickArray[2] === 10) {
      tree3.style.display = "none";
    }
  }
}

function buyStuff() {
  if (tree >= 50 && metal >= 10 && this.id === "buy-building-1-btn") {
    buildingDiv.innerHTML += `<img src="images/${itemArray[0]}">`;
    metal += -10;
    tree += -50;
    numberOfBuildings++;
    outputArray.unshift("Du kjøpte et lite hus!");
    messageOut();
    damage();
  } else if (tree >= 150 && metal >= 30 && this.id === "buy-building-2-btn") {
    buildingDiv.innerHTML += `<img src="images/${itemArray[1]}">`;
    metal += -30;
    tree += -150;
    numberOfBuildings++;
    outputArray.unshift("Du kjøpte et stort hus!");
    messageOut();
    damage();
  } else if (metal >= 200 && this.id === "buy-sword-btn" && strenght < 50) {
    metal += -200;
    strenght += 30;
    outputArray.unshift("Du kjøpte et sverd!");
    messageOut();
    damage();
  } else if (metal >= 10 && this.id === "buy-stick-btn" && strenght < 50) {
    metal += -10;
    strenght += 10;
    outputArray.unshift("Du kjøpte en pinne!");
    messageOut();
    damage();
  }
}

function monsterSpawn() {
  randomNumber = Math.floor(Math.random() * 3) + 1;
  monsterHealth = 40 * randomNumber;
  monsterShow = true;
  for (var i = 0; i < randomNumber; i++) {
    monsterDiv.innerHTML += monsterImg;
  }
}

function fight() {
  if (this.id === "monster-div") {
    monsterHealth += -strenght;
    outputArray.unshift(
      `Du tok ${strenght}hp av monstrene, de har ${monsterHealth}hp igjen!`
    );
    messageOut();
    damage();
    if (monsterHealth <= 0) {
      outputArray.unshift("Du drepte monsteret, din råtass");
      monsterDiv.innerHTML = "";
      monsterShow = false;
    }
  }
}

function damage() {
  if (monsterShow === true) {
    heroHealth += -monsterDmg * randomNumber;
    messageOut();
  }
  if (heroHealth <= 0) {
    alert("GAMER OVER SCRUB!");
    location.reload();
  }
}
// Funksjoner slutt

// Events
monsterSpawn();

metalMine.onclick = gatherMaterial;
tree1.onclick = gatherMaterial;
tree2.onclick = gatherMaterial;
tree3.onclick = gatherMaterial;
buyBuilding1Btn.onclick = buyStuff;
buyBuilding2Btn.onclick = buyStuff;
buySwordBtn.onclick = buyStuff;
monsterDiv.onclick = fight;
buyStickBtn.onclick = buyStuff;
// Events slutt
