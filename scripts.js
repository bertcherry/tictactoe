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
        if (cell.dataset.status === 'blank') {
            cell.addEventListener('click', handleCellClick);
        } else {
            cell.removeEventListener('click', handleCellClick);
        };
    };
})();

//Object for players - use factory

//Object to control the flow of the game - use module