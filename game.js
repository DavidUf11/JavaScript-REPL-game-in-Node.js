const prompt = require('readline-sync');

// const userName = prompt.question("What is your name? ");

// console.log(userName);

let currentTurn = 1;

// add choose your nation options

// log "welcom to..." + goal (attain five victory stasrs?) + instructions .  Keep in mind, shop prices fluctuate so lookout for good deals!\n "Each turn you will get a temporary battle effect that applies for the battle"

// ask user for namne

// ask user to choose nation? use symbols from HTML entities chart. then precede every action declaration with chosen symbol, and rivals' actions with other symbols. save nation as variable 

// display current stats (strength, $$) prompt user to attack, fortify, check inventory, shop with explanation for each

//      if attack, prompt user to select which nation, display "map" with all rivals and their stats

//            after they select, check if double-dice item is active. Then display dice roll * your strenght, alongside dice roll * their strength; winner plunders 20% of loser's gold 

//      if fortify, display dice roll, add +diceroll to strength 

//      if shop, display items and their costs. allow user to choose. 

// let selection;

// rivals need to be accumulating victories

let userStrength = 1000;
let currentGold = 85;
let currentVictories = 0;


function displayStats() {
    console.log(`\nYour Base Strength: ${userStrength}\nYour Gold: ${currentGold}\nYour Victories: ${currentVictories}\n`)
}

// let double-dice = false; (REMEMBER TO SET THIS BACK TO FALSE AFTER DICE ROLL)
// let double-plunder = false; (REMEMBER TO SET THIS BACK TO FALSE AFTER A VICTORY)

function shufflePrices() {    
    let priceA = 45 + Math.floor(Math.random() * 11);
    let priceB = 80 + Math.floor(Math.random() * 41);
    let priceC = 175 + Math.floor(Math.random() * 51);
    if (currentTurn === 1) {
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
    strength: 850,
    gold: 93, 
    victories: 0
}

let rival2 = {
    name: "blue",
    strength: 1100,
    gold: 237,
    victories: 0
}

let rival3 = {
    name: "green",
    strength: 900,
    gold: 160,
    victories: 0
}

let battleEffectsOnTurn;
let battleEffectsIndex;

function shuffleBattleEffects() {
    battleEffectsOnTurn = [];
    let allBattleEffects = ["Strength +300", "Gold +40", "Strength x 125%", "Plunder on Victory x 200%", "Gold +75", "Strength -250"] //, "Strength -100", "Strength +250", "Plunder on Victory x 200%", "Gold -25", "Strength +200"];
    let i = 1;
    while (i <= 6) {
        battleEffectsIndex = Math.floor(Math.random() * allBattleEffects.length);
        battleEffectsOnTurn.push(allBattleEffects[battleEffectsIndex]);
        allBattleEffects.splice(battleEffectsIndex, 1);
        i++
    }
}

// if userBattleEffect = double plunder, do something 

let currentOpponent;
let battleStrength;


function fight() {
    let doublePlunder = false;
    battleStrength = userStrength;
    console.log("\n\n\n\n\nYour Rivals:\n")
    console.log(`${rival1.name}\nStrength: ${rival1.strength}\nGold: ${rival1.gold}\nVictories: ${rival1.victories}\n`);
    console.log(`${rival2.name}\nStrength: ${rival2.strength}\nGold: ${rival2.gold}\nVictories: ${rival2.victories}\n`);
    console.log(`${rival3.name}\nStrength: ${rival3.strength}\nGold: ${rival3.gold}\nVictories: ${rival3.victories}\n`);
    shuffleBattleEffects();    
    let rivalChoice = prompt.question(`Type in a rival's name to attack.\n`);
    if (rivalChoice === 'red') {
        currentOpponent = rival1;
        console.log("\n\n\n\n\n\n\nPrepare for battle! Roll the dice for a random battle effect.\n");
        battleEffectsOnTurn.forEach(effect => console.log("[" + (battleEffectsOnTurn.indexOf(effect) + 1) + "] " + effect));
        prompt.question("\nType 'roll' to roll the dice.\n");
        let userDiceRoll = Math.floor((Math.random() * 6) + 1);
        let userBattleEffect = battleEffectsOnTurn[userDiceRoll - 1];
        console.log(`\n\n\n\n\n\n\nYour dice roll... ${userDiceRoll}! ${userBattleEffect}`);
 
        // if userBattleEffect = double plunder, do something 
        // if userBattleEffect = STrength+1, userStrength = Strength+ 1
        // etc etc 

        if (userBattleEffect === "Strength +300") {
            battleStrength += 300;
            console.log(`Your strength for this battle is ${battleStrength}`);
        }

        if (userBattleEffect === "Gold +40") {
            currentGold += 40;
            console.log(`You now have ${currentGold} gold.`);
        }

        if (userBattleEffect === "Strength x 125%") {
            battleStrength = userStrength * 1.25;
            console.log(`Your strength for this battle is ${battleStrength}`);
        }

        if (userBattleEffect === "Plunder on Victory x 200%") {
            doublePlunder = true;
        }

        if (userBattleEffect === "Gold +75") {
            currentGold += 75;
            console.log(`You now have ${currentGold} gold.`);
        }

        if (userBattleEffect === "Strength -250") {
            battleStrength = userStrength -250;
            console.log(`Your strength for this battle is ${battleStrength}`);
        }

        // add the other 6 battle effects

        // add options for fighting rivals 2 and 3

        prompt.question(`\nTime for battle! Type 'fight' to fight ${rival1.name}.\n`);
        console.log(`\n\n\n\n\n\n\nYour strength: ${battleStrength}\n${rival1.name}'s strength: ${rival1.strength}`)
        if (battleStrength > rival1.strength) {
           
            currentVictories++;
            let plunderAmount = parseInt(rival1.gold * (Math.floor(Math.random() * 34) / 100));
            currentGold += plunderAmount;
            rival1.gold -= plunderAmount;
            console.log(`\nYou overpower ${rival1.name} and achieve victory!\nTotal victories: ${currentVictories}
            \nYou manage to plunder ${plunderAmount} of ${rival1.name}'s gold.\nTotal Gold: ${currentGold}`);
            
            prompt.question("\nPress 'Enter' to go on to the next turn.\n"); 
            newTurn();
        } else if (battleStrength < rival1.strength) {
            console.log(`\nDefeat. ${rival1.name} gains a victory.`);
            rival1.victories++;
            prompt.question("\nPress 'Enter' to go on to the next turn.\n"); 
            newTurn();
        } else {
            console.log("\nIt's a draw! Neither combatant gains a victory.");
            prompt.question("\nPress 'Enter' to go on to the next turn.\n"); 
            newTurn();
        }


    } /// add other rivals, plus "else" for invalid input
}

function askForAction() {
    console.log(`\n\n\n\n\n\n\nTurn ${currentTurn}`)
    displayStats();
    let actionSelection = prompt.question(`Select an action.\n[a] Shop   [b] Fight   [c] Fortify\n`);
    if (actionSelection === "a") {
        console.log("\nWelcome to the shop.\n")
        shufflePrices();
    } else if (actionSelection ==="b") {
        fight();
    } else {
        console.log('\nInvalid. Please input "a" "b" or "c"');
        askForAction();
    }
}

askForAction();

function newTurn() {
    currentTurn++;
    // randomly add victory to one of rivals that are not currentopponent. 
    // or if fortified, give victory to one other 
    // randomly decide to add strength to rivals; randomly add strength number (multiple of 50)
    askForAction();
}

