## Game Flow

1. Initialize game
   - Set up constants (ROWS, COLUMNS, SYMBOL_COUNT, SYMBOL_VALUES)
   - Initialize player balance

2. Main game loop
   - Deposit money (if needed)
   - Determine number of lines to bet on
   - Collect bet amount per line
   - Spin the slot machine
   - Check if the player won
   - Update player balance
   - Ask to play again or exit

## Core Functions

- `deposit()`: Handle player deposits
- `getNumberOfLines()`: Get the number of lines to bet on
- `getBet(balance, lines)`: Collect bet amount per line
- `spin()`: Generate random slot machine results
- `getWinnings(rows, bet, lines)`: Calculate winnings based on results
- `game()`: Main game loop orchestrating all steps

## Data Structures

- `SYMBOL_COUNT`: Map of symbols to their frequency
- `SYMBOL_VALUES`: Map of symbols to their payout values

## User Interface

- Command-line interface using `prompt-sync` for user input
- Text-based output for game results and player feedback

## Future Enhancements

- Implement persistent player accounts and balances
- Add more complex winning patterns (diagonals, shapes)
- Introduce special symbols (wilds, scatters)
- Implement a graphical user interface