class TicTacToe{
  constructor(currentPlayerElement, buttons){
    this.currentPlayerElement = currentPlayerElement
    this.buttons = buttons
    this.currentPlayer = 'X'
    console.log();

    this.buttons.forEach(button =>{
      button.addEventListener('click',() => this.handleButtonClick(event))
    })
  }

  /**
 * @param {MouseEvent} event 
 */
  handleButtonClick(event){
    event.currentTarget.textContent = this.currentPlayer;
    event.currentTarget.disabled = true;
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
    this.currentPlayerElement.textContent = this.currentPlayer
  
    for(const indexes of WINNING_INDEXES){
      const first = this.buttons[indexes[0]].textContent
      if(first && indexes.every(index => this.buttons[index].textContent === first)){
        this.buttons.forEach(button => button.disabled = true)
      return alert(first + ' Won!')
      }
    }
  
    if(this.buttons.every(button => button.textContent != '')){
      return alert('Draw!')
    }
  }
}
const WINNING_INDEXES = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  
  [0,3,6],
  [1,4,7],
  [2,5,8],
  

  [0,4,8],
  [6,4,2]
]

new TicTacToe(document.querySelector('#current-player'),[...document.querySelectorAll('button')] )

