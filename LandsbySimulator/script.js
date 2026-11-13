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
var maxHealth = 300;
var heroHealth = maxHealth;
var strenght = 10;
var monsterHealth = 0;
var monsterDmg = 10; // skade per levende ulv, per handling
var monsterShow = false;
var wave = 0; // hvilken bølge vi er på
var wolfHealth = 40; // liv per ulv i nåværende bølge
var wavePause = 20; // sekunder mellom bølgene
var countdown = 0; // sekunder igjen til neste bølge
var baseRegen = 5; // hp per sekund i pausen
var buildingRegen = 3; // ekstra hp per sekund per bygning
var maxWolves = 5;
var monsterImg = `<img src="images/cute-wolfman.png">`;
var itemArray = ["building-1.png", "building-3.png"];
var clickArray = [0, 0, 0];
var outputArray = ["", "", "", ""];
// Variabler slutt

// Funksjoner
function messageOut() {
  outputArray.length = 4; // behold bare de 4 siste meldingene
  healthBar.innerHTML = `${heroHealth}hp`;
  healthBar.style.width = `${Math.max(heroHealth, 0)}px`; // 1px per hp (maks 300)
  outputDiv.innerHTML = `${outputArray[0]} <br> ${outputArray[1]} <br> ${outputArray[2]} <br> ${outputArray[3]}`;
  materialInfo.innerHTML = `Treverk: ${tree} enheter. Metall: ${metal} enheter. Antall Bygninger: ${numberOfBuildings} . Styrke: ${strenght}. ${waveInfo()}`;
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

function waveInfo() {
  if (monsterShow) {
    return `Bølge ${wave}: ${aliveWolves()} ulv(er) igjen!`;
  }
  return `Neste bølge (${wave + 1}) om ${countdown} sek. Du får tilbake ${regenPerSecond()}hp i sekundet.`;
}

function aliveWolves() {
  return Math.max(Math.ceil(monsterHealth / wolfHealth), 0);
}

function regenPerSecond() {
  return baseRegen + buildingRegen * numberOfBuildings;
}

function drawWolves() {
  monsterDiv.innerHTML = "";
  for (var i = 0; i < aliveWolves(); i++) {
    monsterDiv.innerHTML += monsterImg;
  }
}

function monsterSpawn() {
  wave++;
  // Flere og sterkere ulver for hver bølge
  var numberOfWolves = Math.min(
    Math.floor(Math.random() * 3) + 1 + Math.floor((wave - 1) / 2),
    maxWolves
  );
  wolfHealth = 40 + 10 * (wave - 1);
  monsterHealth = wolfHealth * numberOfWolves;
  monsterShow = true;
  drawWolves();
  outputArray.unshift(
    `Bølge ${wave}! ${numberOfWolves} ulv(er) med ${wolfHealth}hp hver angriper landsbyen!`
  );
  messageOut();
}

function startPause() {
  countdown = wavePause;
  messageOut();
  var timer = setInterval(function () {
    countdown--;
    heroHealth = Math.min(heroHealth + regenPerSecond(), maxHealth);
    if (countdown <= 0) {
      clearInterval(timer);
      monsterSpawn();
    } else {
      messageOut();
    }
  }, 1000);
}

function fight() {
  if (this.id === "monster-div" && monsterShow) {
    monsterHealth += -strenght;
    if (monsterHealth <= 0) {
      monsterHealth = 0;
      monsterShow = false;
      monsterDiv.innerHTML = "";
      outputArray.unshift(
        `Du drepte bølge ${wave}, din råtass! Hvil deg og bygg før neste bølge.`
      );
      startPause();
      return;
    }
    drawWolves();
    outputArray.unshift(
      `Du tok ${strenght}hp av monstrene, de har ${monsterHealth}hp igjen!`
    );
    messageOut();
    damage();
  }
}

function damage() {
  if (monsterShow === true) {
    heroHealth += -monsterDmg * aliveWolves();
    messageOut();
  }
  if (heroHealth <= 0) {
    alert(`GAMER OVER SCRUB! Du overlevde ${wave - 1} bølge(r).`);
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
