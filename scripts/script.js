const gameBoard = (() => {    
    const gameBoardArray = Array.from({length: 9});    
    const setCell = (index, value) => {
        
        if(!gameBoardArray[index]){
            gameBoardArray[index] = value;
        }
        // if(!gameBoardArray.includes(undefined)){
        //     alert('DRAW');
        // }
                
    };

    const getCell = (index) => gameBoardArray[index];



    const calculateWinner = () => {
        const winArrangements = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];

        for (let i = 0; i < winArrangements.length; i++) {
            const [a,b,c] = winArrangements[i];
            //First gameBoardArray[a] to check that the value is not falsy;
            if((gameBoardArray[a] && gameBoardArray[a] === gameBoardArray[b]) && (gameBoardArray[a] === gameBoardArray[c])){
                return gameBoardArray[a];
            }          
        }

        return null;
    }

    const clearArray = () => {
        for (let i = 0; i < gameBoardArray.length; i++) {
            gameBoardArray[i] = undefined;            
        }
    }



    const getArrayLength = () => gameBoardArray.length;
    return {
        setCell,
        getArrayLength,
        getCell,
        calculateWinner,
        clearArray,
    }
})();

const Player = (name, mark) => {
    const putMark = (index) => {
        gameBoard.setCell(index, mark);
    }
   
    return { name, mark, putMark};
}

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

const displayController = (() => {
    const boardDiv = document.querySelector('.board');
    const turnHeading = document.querySelector('.turn-heading');
    turnHeading.textContent = `${player1.name} turn`;   
    
    
    const fillBoard = () => {
        for (let i = 0; i < gameBoard.getArrayLength(); i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.index = i;            
            boardDiv.appendChild(square);
        }
        
    };
    
    const addEventListeners = () => {
        let count = 0;
        let boardSquares = document.querySelectorAll('.square');
        boardSquares.forEach((boardChildren) => {
            boardChildren.addEventListener('click', (e) => {      
                count++;
                const currentIndex = parseInt(e.currentTarget.getAttribute('data-index'));
                
                if(count % 2 === 0){
                    
                    player2.putMark(currentIndex);                                     
                    boardChildren.classList.add('circle');
                    turnHeading.textContent = `${player1.name} turn`;

                } else{
                    player1.putMark(currentIndex);                                        
                    boardChildren.classList.add('cross');
                    turnHeading.textContent = `${player2.name} turn`; 

                }
                
                if(gameBoard.calculateWinner()){
                    alert(`${gameBoard.calculateWinner()} won!`);       
                    gameBoard.clearArray();
                    clearBoard();
                    count = 0;
                    
                }
            });
        });
    };

    const clearBoard = () => {
        const boardSquares = document.querySelectorAll('.square');
        boardSquares.forEach((boardChildren) => {
            boardChildren.classList.remove('cross');
            boardChildren.classList.remove('circle');
            turnHeading.textContent = `${player1.name} turn`;
        })

    }

    return {
        fillBoard,
        addEventListeners,
    };
})();

const gameHandler = (() => {
    displayController.fillBoard();
    displayController.addEventListeners();
})();