//Object for gameboard array - use module
const gameBoard = (() => {
    let boardCells = [];
    //create an array for the gameboard that has cells attached to the last digit of the DOM id
    const setup = () => {
        for (let i = 0; i < 9; i++) {
            const cell = document.getElementById(`cell${i}`);
            boardCells.push({
                id: `cell${i}`,
                status: cell.dataset.status,
            });
        };
    };

    // disable click when status is filled
    const render = () => {
        for (cell of boardCells) {
            let cellDiv = document.getElementById(`${cell.id}`);
            if (cell.status === 'blank') {
                cellDiv.addEventListener('click', gameController.handleCellClick);
            } else {
                cellDiv.removeEventListener('click', gameController.handleCellClick);
                cellDiv.textContent = cell.status;
            };
        };
    };

    return {setup, render, boardCells}
})();

//Object to control the flow of the game - use module
const gameController = (() => {
    //pull these out to make game controller standard module language?
    let activePlayer;
    let playerX;
    let playerO;
    const startButton = document.querySelector('.submit-btn');
    startButton.addEventListener('click', startGame);

    function startGame(e) {
        e.preventDefault();
        document.getElementById('form-container').style.display = 'none';
        playerSet();
        updateInstructions();
    };

    //Object for players - use factory
    const player = (name, marker) => {
        const getName = () => name;
        const getMarker = () => marker;
        return {getName, getMarker};
    };

    const playerSet = () => {
        //Two inputs for player name, one already assigned to X and one to O
        playerX = player(document.getElementById('x-name').value, 'X');
        playerO = player(document.getElementById('o-name').value, 'O');

        //Pick a random number to choose which player goes first
        let randomStart = Math.floor(Math.random() * 2);
        if (randomStart == 0) {
            activePlayer = playerX;
        } else {
            activePlayer = playerO;
        }
        return playerX, playerO;
    };

    const togglePlayer = () => {
        if (activePlayer.getMarker() === 'X') {
            activePlayer = player(playerO.getName(), playerO.getMarker());
        } else if (activePlayer.getMarker() === 'O') {
            activePlayer = player(playerX.getName(), playerX.getMarker());
        } else {
            console.log('uh oh');
        }
        return activePlayer;
    };

    //define handleCellClick function, use exported version in gameboard listeners
    const handleCellClick = (e) => {
        //use activePlayer to determine which marker goes on the DOM, and update the cell status to that marker, update gameBoard
        let cellIndex = e.target.getAttribute('id')
        cellIndex = cellIndex.charAt(cellIndex.length - 1);
        gameBoard.boardCells[cellIndex].status = activePlayer.getMarker();
        gameBoard.render();
        checkEnd();
        togglePlayer();
        updateInstructions();
    };

    const updateInstructions = () => {
        let instructions = document.getElementById('instructions');
        instructions.textContent = `It's ` + activePlayer.getName() + `'s turn (` + activePlayer.getMarker() + `)`;
    };

    function checkEnd() {
        const topRowX = ((gameBoard.boardCells[0].status === gameBoard.boardCells[1].status) && (gameBoard.boardCells[0].status === gameBoard.boardCells[2].status) && (gameBoard.boardCells[0].status === 'X'));
        const midRowX = ((gameBoard.boardCells[3].status === gameBoard.boardCells[4].status) && (gameBoard.boardCells[3].status === gameBoard.boardCells[5].status) && (gameBoard.boardCells[3].status === 'X'));
        const botRowX = ((gameBoard.boardCells[6].status === gameBoard.boardCells[7].status) && (gameBoard.boardCells[6].status === gameBoard.boardCells[8].status) && (gameBoard.boardCells[6].status === 'X'));
        const leftColX = ((gameBoard.boardCells[0].status === gameBoard.boardCells[3].status) && (gameBoard.boardCells[0].status === gameBoard.boardCells[6].status) && (gameBoard.boardCells[0].status === 'X'));
        const midColX = ((gameBoard.boardCells[1].status === gameBoard.boardCells[4].status) && (gameBoard.boardCells[1].status === gameBoard.boardCells[7].status) && (gameBoard.boardCells[1].status === 'X'));
        const rightColX = ((gameBoard.boardCells[2].status === gameBoard.boardCells[5].status) && (gameBoard.boardCells[2].status === gameBoard.boardCells[8].status) && (gameBoard.boardCells[2].status === 'X'));
        const leftDiagX = ((gameBoard.boardCells[0].status === gameBoard.boardCells[4].status) && (gameBoard.boardCells[0].status === gameBoard.boardCells[8].status) && (gameBoard.boardCells[0].status === 'X'));
        const rightDiagX = ((gameBoard.boardCells[2].status === gameBoard.boardCells[4].status) && (gameBoard.boardCells[2].status === gameBoard.boardCells[6].status) && (gameBoard.boardCells[2].status === 'X'));

        const topRowO = ((gameBoard.boardCells[0].status === gameBoard.boardCells[1].status) && (gameBoard.boardCells[0].status === gameBoard.boardCells[2].status) && (gameBoard.boardCells[0].status === 'O'));
        const midRowO = ((gameBoard.boardCells[3].status === gameBoard.boardCells[4].status) && (gameBoard.boardCells[3].status === gameBoard.boardCells[5].status) && (gameBoard.boardCells[3].status === 'O'));
        const botRowO = ((gameBoard.boardCells[6].status === gameBoard.boardCells[7].status) && (gameBoard.boardCells[6].status === gameBoard.boardCells[8].status) && (gameBoard.boardCells[6].status === 'O'));
        const leftColO = ((gameBoard.boardCells[0].status === gameBoard.boardCells[3].status) && (gameBoard.boardCells[0].status === gameBoard.boardCells[6].status) && (gameBoard.boardCells[0].status === 'O'));
        const midColO = ((gameBoard.boardCells[1].status === gameBoard.boardCells[4].status) && (gameBoard.boardCells[1].status === gameBoard.boardCells[7].status) && (gameBoard.boardCells[1].status === 'O'));
        const rightColO = ((gameBoard.boardCells[2].status === gameBoard.boardCells[5].status) && (gameBoard.boardCells[2].status === gameBoard.boardCells[8].status) && (gameBoard.boardCells[2].status === 'O'));
        const leftDiagO = ((gameBoard.boardCells[0].status === gameBoard.boardCells[4].status) && (gameBoard.boardCells[0].status === gameBoard.boardCells[8].status) && (gameBoard.boardCells[0].status === 'O'));
        const rightDiagO = ((gameBoard.boardCells[2].status === gameBoard.boardCells[4].status) && (gameBoard.boardCells[2].status === gameBoard.boardCells[6].status) && (gameBoard.boardCells[2].status === 'O'));
        
        const resultInfo = document.querySelector('.result-info');

        if (topRowX || midRowX || botRowX || leftColX || midColX || rightColX || leftDiagX || rightDiagX) {
            console.log('player X won');
            document.getElementById('result-container').style.display = 'flex';
            resultInfo.textContent = 'Player X has won';
        } else if (topRowO || midRowO || botRowO || leftColO || midColO || rightColO || leftDiagO || rightDiagO) {
            document.getElementById('result-container').style.display = 'flex';
            resultInfo.textContent = 'Player O has won';
        } else if (!gameBoard.boardCells.find(cell => cell.status === 'blank')) {
            document.getElementById('result-container').style.display = 'flex';
            resultInfo.textContent = 'It\'s a tie!';
        }
    };

    return {handleCellClick};
})();

gameBoard.setup();
gameBoard.render();