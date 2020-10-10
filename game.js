const prompt = require('readline-sync');

// const userName = prompt.question("What is your name? ");

// console.log(userName);

let currentTurn = 1;

// log "welcom to..." + goal (attain five victory stasrs?) + instructions . Your rivals will either fight or fortify each turn, so they will accumulate victories. Fighting and fortifying go to next turn. Shopping does not. Shop prices fluctuate so lookout for good deals!\n "Each turn you will get a temporary battle effect that applies for the battle"

// add choose your nation options

// ask for user name

// display vs screens before every battle with user name and nation. 

//      if fortify, display dice roll, add +diceroll to strength 

//      if shop, display items and their costs. allow user to choose. 

// let selection;

// rivals need to be accumulating victories



let userStrength = 1000;
let currentGold = 85;
let currentVictories = 0;

let immuneFromPlunder = false;


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
        priceC = 20;
    }
    function showShopItems() {
    let itemChoice = prompt.question(`You have ${currentGold} gold. Make a selection or return to Action Select.\n\n
 [a] base strength +300 - ${priceA} gold  \n\n [b] double battle effects - ${priceB} gold \n\n [c] don't lose gold on defeat - ${priceC} gold\n\n [x] Back to Action Select\n`);
    
        if (itemChoice === 'a') {
            if (priceA <= currentGold) {
                currentGold = currentGold - priceA;
                console.log(`\n\n\n\n\n\n\n\nPurchased Item1. \n\nRemaining gold: ${currentGold}\n`);
                userStrength += 300;
                console.log(`\nBase Strength +300. Your Base Strength is now ${userStrength}.`);
                prompt.question(`Press 'Enter to return to Action Select.\n`);
                askForAction();
            } else {
                console.log("\nNot enough gold! Make another selection or return to Action Select screen.\n ");
                showShopItems();
            }
        } else if (itemChoice === 'b') {
            if (priceB <= currentGold) {
                currentGold = currentGold - priceB;
                console.log(`\n\n\n\n\n\n\nPurchased Item2. \n\nRemaining gold: ${currentGold}\n`);
                prompt.question(`Press 'Enter to return to Action Select.\n`);
                askForAction();
            } else {
                console.log("\nNot enough gold! Make another selection or return to Action Select screen.\n ");
                showShopItems();
            }
        } else if (itemChoice === 'c') {
            if (priceC <= currentGold) {
                currentGold = currentGold - priceC;
                console.log(`\n\n\n\n\n\n\n\nPurchased Item3. \n\nRemaining gold: ${currentGold}\n`);
                immuneFromPlunder = true;
                prompt.question(`Press 'Enter to return to Action Select.\n`);
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

let rivalA = {
    name: "red",
    strength: 1850,
    gold: 100, 
    victories: 0
}

let rivalB = {
    name: "blue",
    strength: 1100,
    gold: 237,
    victories: 0
}

let rivalC = {
    name: "green",
    strength: 900,
    gold: 160,
    victories: 0
}

let battleEffectsOnTurn;
let battleEffectsIndex;

function shuffleBattleEffects() {
    battleEffectsOnTurn = [];
    let allBattleEffects = ["Plunder on Victory x2", "Plunder on Victory x2", "Plunder on Victory x2", "Plunder on Victory x2", "Gold +75", "Strength -250"] //, "Strength -100", "Strength +250", "Plunder on Victory x2", "Gold -25", "Strength +200"];
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
let userDiceRoll;

function fight() {
    let doublePlunder = false;
    battleStrength = userStrength;
    console.log("\n\n\n\n\nYour Rivals:\n")
    console.log(`${rivalA.name}\nStrength: ${rivalA.strength}\nGold: ${rivalA.gold}\nVictories: ${rivalA.victories}\n`);
    console.log(`${rivalB.name}\nStrength: ${rivalB.strength}\nGold: ${rivalB.gold}\nVictories: ${rivalB.victories}\n`);
    console.log(`${rivalC.name}\nStrength: ${rivalC.strength}\nGold: ${rivalC.gold}\nVictories: ${rivalC.victories}\n`);
    shuffleBattleEffects();    
    let rivalChoice = prompt.question(`Type in a rival's name to attack.\n`);
    if (rivalChoice === 'red') {
        currentOpponent = rivalA;
        console.log("\n\n\n\n\n\n\nPrepare for battle! Roll the dice for a random battle effect.\n");
        battleEffectsOnTurn.forEach(effect => console.log("[" + (battleEffectsOnTurn.indexOf(effect) + 1) + "] " + effect));
        prompt.question("\nType 'roll' to roll the dice.\n");
        userDiceRoll = Math.floor((Math.random() * 6) + 1);
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

        if (userBattleEffect === "Plunder on Victory x2") {
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

        prompt.question(`\nTime for battle! Type 'fight' to fight ${rivalA.name}.\n`);
        console.log(`\n\n\n\n\n\n\nYour strength: ${battleStrength}\n${rivalA.name}'s strength: ${rivalA.strength}`)
        if (battleStrength > rivalA.strength) {
           
            currentVictories++;
            let plunderAmount = parseInt(rivalA.gold * (Math.floor(Math.random() * 34) / 100));
            if (doublePlunder === false) {
                currentGold += plunderAmount;
                rivalA.gold -= plunderAmount;
                console.log(`\nYou overpower ${rivalA.name} and achieve victory!\nTotal victories: ${currentVictories}
            \nYou manage to plunder ${plunderAmount} of ${rivalA.name}'s gold.\nTotal Gold: ${currentGold}`);
            } else if (doublePlunder === true) {
                currentGold += plunderAmount * 2;
                rivalA.gold -= plunderAmount * 2;
                console.log(`\nYou overpower ${rivalA.name} and achieve victory!\nTotal victories: ${currentVictories}
            \nYou manage to plunder ${plunderAmount * 2} of ${rivalA.name}'s gold.\nTotal Gold: ${currentGold}`);
            }  
            newTurn();
        } else if (battleStrength < rivalA.strength) {
            console.log(`\nDefeat! ${rivalA.name} gains a victory.`);
            rivalA.victories++;
            let plunderAmount = parseInt(rivalA.gold * (Math.floor(Math.random() * 34) / 100));
            if (immuneFromPlunder === false) {
                console.log(`${rivalA.name} plundered ${plunderAmount} of your gold!`);
                currentGold -= plunderAmount;
                rivalA.gold += plunderAmount;
            } else if (immuneFromPlunder == true) {
                console.log(`Your sentry protected you from losing any gold.`)
                immuneFromPlunder = false;
            }
            newTurn();
        } else {
            console.log("\nIt's a draw! Neither combatant gains a victory.");
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
    } else if (actionSelection ==="c") {
        fortify();
    } else {
        console.log('\nInvalid. Please input "a" "b" or "c"');
        askForAction();
    }
}

askForAction();

function newTurn() {
    if (currentOpponent === rivalA) {
        simulateNPCBattle(rivalB, rivalC);
    }
    
    
    prompt.question("\nPress 'Enter' to go on to the next turn.\n"); 
    currentOpponent = "";    
    currentTurn++;
    // randomly add victory to one of rivals that are not currentopponent. 
    // or if fortified, give victory to one other 
    // randomly decide to add strength to rivals; randomly add strength number (multiple of 50)
    // check current victories of all combatants
        // return '1 more victory to win' if any have four victories
        // display "[rival] won" or "You won" if victories === 5
    askForAction();
}

function fortify() {
    let fortificationAmount = 0;
    console.log(`\n\n\n\n\n\n\nPossible fortifications:\n`);
    let possibleFortificationStrings = ["+100 Base Strength", "+150 Base Strength", "+200 Base Strength", "+250 Base Strength", "+300 Base Strength", "+400 Base Strength", ];
    possibleFortificationStrings.forEach(effect => console.log("[" + (possibleFortificationStrings.indexOf(effect) + 1) + "] " + effect));
    let possibleFortificationNums = [100, 150, 200, 250, 300, 400];
    prompt.question(`\n\nType 'roll' to roll the die for a random fortifaction amount.\n`)
    userDiceRoll = Math.floor((Math.random() * 6) + 1);
    fortificationAmount = possibleFortificationNums[userDiceRoll - 1];
    userStrength += fortificationAmount;
    console.log(`\nYou die roll...${userDiceRoll}! You gained ${fortificationAmount} Base Strength.\nTotal strength: ${userStrength}`);
    newTurn();
}

function simulateNPCBattle(NPC1, NPC2) {
    let NPCBattleDecider = Math.floor(Math.random() * 11);
    if (NPCBattleDecider > 2) {
        console.log(`\n\nAnother battle took place this turn: ${NPC1.name} vs. ${NPC2.name}.\n`);
        let NPC1BattleStrength = NPC1.strength + ((Math.floor(Math.random() * 3) + 1) * 100);
        let NPC2BattleStrength = NPC2.strength + ((Math.floor(Math.random() * 3) + 1) * 100);
        console.log(`${NPC1.name} battlestrength: ${NPC1BattleStrength}. ${NPC2.name} battlestrneght: ${NPC2BattleStrength}`)
        if (NPC1BattleStrength > NPC2BattleStrength) {
            NPC1.victories++;
            console.log(NPC1.name + `Wins. They now have ${NPC1.victories} victories.`);
        } else if (NPC2BattleStrength > NPC1BattleStrength) {
            NPC2.victories++;
            console.log(NPC2.name + `Wins. They now have ${NPC2.victories} victories.`);
        } else {
        console.log("The battle ended in a draw!");
        }
    } else {
        console.log(`\n\nNo other battle took place this turn. ${NPC1.name} and ${NPC2.name} both fortified.\n`);
        NPC1.strength += ((Math.floor(Math.random() * 4) + 1) * 100);
        NPC2.strength += ((Math.floor(Math.random() * 4) + 1) * 100);
    }
}