//Object for gameboard array - use module
const gameBoard = (() => {
    //create an array for the gameboard that has cells attached to the last digit of the DOM id
    const boardCells = [];
    for (let i = 0; i < 9; i++) {
        const cell = document.getElementById(`cell${i}`);
        boardCells.push({
            id: `cell${i}`,
            status: cell.dataset.status,
        });
        // disable click when status is filled
        if (cell.dataset.status === 'blank') {
            //cell.addEventListener('click', handleCellClick);
        } else {
            //cell.removeEventListener('click', handleCellClick);
        };
    };
})();

//Object for players - use factory
const player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    return {getName, getMarker};
};

//Object to control the flow of the game - use module
const gameController = (() => {
    const startButton = document.querySelector('.submit-btn');
    startButton.addEventListener('click', startGame);

    const startGame = (e) => {
        e.preventDefault();
        document.getElementById('form-container').style.display = 'none';
        //Two inputs for player name, one already assigned to X and one to O
        const playerX = player(document.getElementById('x-name').value, 'x');
        const playerO = player(document.getElementById('o-name').value, 'o');

        //Pick a random number to choose which player goes first
        let randomStart = Math.floor(Math.random() * 2);
        let playerOne;
        let playerTwo;
        if (randomStart == 0) {
            playerOne = playerX;
            playerTwo = playerO;
        } else {
            playerOne = playerO;
            playerTwo = playerX;
        }
    };
})