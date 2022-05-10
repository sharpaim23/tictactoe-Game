class TicTacToe {
  // null means empty, true means x, false means o

  constructor() {
    this.board = [[null, null, null],[null, null, null],[null,null,null]];
    this.playerXTurn = true; 
    this.registerListeners();
    this.gameFinished = false;
  }
  
  registerListeners() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        document.querySelector(`#cell-${row}-${col}`).addEventListener('click', (event) => {
          let row = event.target.id.split("-")[1];
          let col = event.target.id.split("-")[2];
          this.makePlay(row, col);
        });
      }
    }
    document.querySelector(`#reset-button`).addEventListener('click', (event) => {
      this.reset();
    })
  }
  
  makePlay(row, col) {
    if (this.board[row][col] === null && !this.gameFinished) {
      // Only update the board if an empty cell is clicked on
      // And the game is not finished
      this.board[row][col] = this.playerXTurn;
      if(this.playerXTurn == true){
        document.querySelector(`#cell-${row}-${col}`).innerText = "X";
      } else {
        document.querySelector(`#cell-${row}-${col}`).innerText = "O";
      }
      if (this.checkForWin()) {
        this.gameFinished = true;
        this.announceWin();
      }
      else if (this.checkForTie()) {
        this.announceTie();
      }
      else {
        this.playerXTurn = !this.playerXTurn;
        this.updateStatus();
      }
    }
  }

  checkForWin() {
    // Check for a win in a row
    for (let row = 0; row <= 2; row++) {
      if (this.board[row][0] !== null
       && this.board[row][0] === this.board[row][1]
       && this.board[row][1] === this.board[row][2]) {
        return true;
      }
    }
    // Check for a win in a column
    for (let col = 0; col <= 2; col++) {
      if (this.board[0][col] !== null
       && this.board[0][col] === this.board[1][col]
       && this.board[1][col] === this.board[2][col]) {
      return true;
      }
    }
    // check for wins in each diagonal
    if (this.board[0][0] !== null
      && this.board[0][0] === this.board[1][1]
      && this.board[1][1] === this.board[2][2]) {
      return true; 
    }
    if (this.board[0][2] !== null
      && this.board[0][2] === this.board[1][1]
      && this.board[1][1] === this.board[2][0]) {
      return true; 
    }
  }

  checkForTie() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
       if (this.board[row][col] === null) return false; 
      }
    }
    return true;
  }
  
  updateStatus() {
    let player = (this.playerXTurn) ? 'X' : 'O';
    document.querySelector(`.status`).innerText = `${player}'s turn to play!`;
  }
  
  announceWin() {
    let winner = (this.playerXTurn) ? 'X' : 'O';
    document.querySelector(`.status`).innerText = `${winner} wins!`;
    document.querySelector(`#reset-button`).classList.remove('hidden');
  } 

  announceTie() {
    document.querySelector(`.status`).innerText = `It was a tie!`;
    document.querySelector(`#reset-button`).classList.remove('hidden');
  } 
  
  reset() {
    document.querySelector(`#reset-button`).classList.add('hidden');
    document.querySelector(`.status`).innerText = `X's turn to play!`;
    this.board = [[null, null, null],[null, null, null],[null,null,null]];
    this.playerXTurn = true; 
    this.gameFinished = false;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        document.querySelector(`#cell-${row}-${col}`).innerText = '';
      }
    } 
  }
}

let game = new TicTacToe();

