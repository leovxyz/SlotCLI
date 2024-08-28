const prompt = require("prompt-sync")();

const ROWS = 3;
const COLUMNS = 3;

// Symbol count
const SYMBOL_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

// Symbol values
const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

// Get the deposit amount
const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter the deposit amount: ");
    const numberDepositAmount = parseInt(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid deposit amount. Please enter a valid amount.");
    } else {
      return numberDepositAmount;
    }
  }
};

// Get the number of lines to bet on
const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter the number of lines to bet on (1-3): ");
    const numberOfLines = parseInt(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log(
        "Invalid number of lines. Please enter a valid number between 1 and 3."
      );
    } else {
      return numberOfLines;
    }
  }
};

// Get the bet amount
const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the total bet per line: ");
    const numberBet = parseInt(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Invalid bet. Please enter a valid number.");
    } else {
      return numberBet;
    }
  }
};

// Spin the slot machine
const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let i = 0; i < COLUMNS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }

  return reels;
};

// Transpose the reels
const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLUMNS; j++) {
      rows[i].push(reels[j][i]);
    }
  }

  return rows;
};

// Print the rows
const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i !== row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

// Calculate the winnings
const getWinnings = (rows, lines, bet) => {
  let winnings = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol !== symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }
  return winnings;
};

const game = () => {
  let balance = deposit();

  // Start the game loop
  while (true) {
    console.log(`You have a balance of $${balance}`);
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, numberOfLines, bet);
    balance += winnings;
    if (winnings > 0) {
      console.log(`Congratulations! You won, $${winnings}`);
    }
    else {
      console.log(`Sorry you didn't win anything (${winnings}$)`)
    }

    if (balance <= 0) {
      console.log("You ran out of cash!");
      break;
    }
    // Ask the player if they want to play again
    playAgain = prompt("Do you want to play again? (y/n): ");
    if (playAgain !== "y") {
      break;
    }
  }
}

// Start the game
game();



