const prompt = require('readline-sync');

const userName = prompt.question("What is your name? ");

console.log(userName);

let turn = 0;

// add choose your nation options

// log "welcom to..." + goal + instructions .  Keep in mind, shop prices fluctuate so lookout for good deals!\n

// ask user for namne

// ask user to choose nation? use symbols from HTML entities chart. then precede every action declaration with chosen symbol, and rivals' actions with other symbols. save nation as variable 

// display current stats (strength, $$) prompt user to attack, fortify, check inventory, shop with explanation for each

//      if attack, prompt user to select which nation, display "map" with all rivals and their stats

//            after they select, check if double-dice item is active. Then display dice roll * your strenght, alongside dice roll * their strength; winner plunders 20% of loser's gold 

//      if fortify, display dice roll, add +diceroll to strength 

//      if shop, display items and their costs. allow user to choose. 

// let selection;

let currentGold = 85;
let userStrength = 1000;

// let double-dice = false; 

function shufflePrices() {    
    let priceA = 45 + Math.floor(Math.random() * 11);
    let priceB = 80 + Math.floor(Math.random() * 41);
    let priceC = 175 + Math.floor(Math.random() * 51);
    if (turn === 0 || turn === 1) {
        priceA = 50;
        priceB = 100;
        priceC = 200;
    }
    function showShopItems() {
    let itemChoice = prompt.question(`You have ${currentGold} gold. Make a selection or return to Action Select.\n\n
 [a] Item1 - ${priceA} gold  \n\n [b] Item2 - ${priceB} gold \n\n [c] Item3 - ${priceC} gold\n\n [x] Back to Action Select\n`);
    
        if (itemChoice === 'a') {
            if (priceA <= currentGold) {
                currentGold = currentGold - priceA;
                console.log(`\nPurchased Item1. Your next dice roll will be doubled. \n\nRemaining gold: ${currentGold}\n`);
                // set double-dice to true;
                askForAction();
            } else {
                console.log("\nNot enough gold! Make another selection or return to Action Select screen.\n ");
                showShopItems();
            }
        } else if (itemChoice === 'b') {
            if (priceB <= currentGold) {
                currentGold = currentGold - priceB;
                console.log(`\nPurchased Item2. \n\nRemaining gold: ${currentGold}\n`);
                askForAction();
            } else {
                console.log("\nNot enough gold! Make another selection or return to Action Select screen.\n ");
                showShopItems();
            }
        } else if (itemChoice === 'c') {
            if (priceC <= currentGold) {
                currentGold = currentGold - priceC;
                console.log(`\nPurchased Item3. \n\nRemaining gold: ${currentGold}\n`);
                askForAction();
            } else {
                console.log("\nNot enough gold! Make another selection or return to Action Select screen.\n");
                showShopItems();
            }
        } else if (itemChoice === 'x') {
            askForAction();
        } else {
            console.log('\nInvalid. Please input "a" "b" "c" or "x"\n');
            showShopItems();
        }
    }
    showShopItems();
}

let rival1 = {
    name: "red",
    strength: 650,
    gold: 80
}

let rival2 = {
    name: "blue",
    strength: 1100,
    gold: 135
}

let rival3 = {
    name: "green",
    strength: 725,
    gold: 135
}


function fight() {
    console.log(`${rival1.name}\nstrength: ${rival1.strength}\ngold: ${rival1.gold}\n\n`);
    console.log(`${rival2.name}\nstrength: ${rival2.strength}\ngold: ${rival2.gold}\n\n`);
    console.log(`${rival3.name}\nstrength: ${rival3.strength}\ngold: ${rival3.gold}\n`);
    let rivalChoice = prompt.question(`Your strength: ${userStrength}. Type in a rival's name to attack.\n`);
    if (rivalChoice === 'red') {
        if (rival1.strength <= userStrength) {
            // currentGold = currentGold - priceA;
            console.log(`\nVictory\n`);
            // set double-dice to true;
            
        } else {
            console.log("\nDefeat\n ");
            
        }
    } else if (rivalChoice === 'blue') {
        if (rival2.strength <= userStrength) {
            // currentGold = currentGold - priceB;
            console.log(`\nVictory\n`);
            
        } else {
            console.log("\nDefeat\n ");
            
        }
    } else if (rivalChoice === 'green') {
        if (rival3.strength <= userStrength) {
            // currentGold = currentGold - priceC;
            console.log(`\nVictory\n`);
            
        } else {
            console.log("\nDefeat\n");
           
        }
    } else {
        console.log('\nInvalid. Please input "red" "blue" or "green".\n');
        fight();
    }
}




function askForAction() {
    let selection = prompt.question(`\nTurn ${turn}. What would you like to do?\n[a] Shop   [b] Fight   [c] Fortify\n`);
    if (selection === "a") {
        console.log("\nWelcome to the shop.\n")
        shufflePrices();
    } else if (selection ==="b") {
        console.log("\nHere are your rivals:\n")
        fight();
    } else {
        console.log('\nInvalid. Please input "a" "b" or "c"');
        askForAction();
    }
}

askForAction();


