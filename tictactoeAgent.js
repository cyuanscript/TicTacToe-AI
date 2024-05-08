// Tic Tac Toe
class Agent {
    constructor() {

    }
  
    /*
    * Explore all possible moves for the maximizing player (X) and minimizing
    * player (O) recursively. Uses Alpha-Beta Pruning to eliminate
    * unnecessary branches in the game tree.
    */
    minimax(board, isMaximizing, alpha = -Infinity, beta = Infinity) {
        // Base cases - check if the game is over or a draw
        var gameOver = board.gameOver();
        if (gameOver === 1) {
            return 1; // X wins
        } else if (gameOver === 2) {
            return -1; // O wins
        } else if (gameOver === 3) {
            return 0; // the game is a draw
        }
  
        // Recursive case - evaluate all possible moves and choose the best score
        if (isMaximizing) {
            var bestScore = alpha;
            for (var i = 0; i < board.cells.length; i++) {
                var cell = i + 1;
                if (board.cellFree(cell)) {
                    var newBoard = board.clone();
                    newBoard.move(cell);
                    var score = this.minimax(newBoard, false, alpha, beta);
                    bestScore = Math.max(bestScore, score);
                    // Update alpha with the current best score for maximizing player
                    alpha = Math.max(alpha, bestScore);
                    // Prune if beta is less than or equal to alpha (no need to explore further)
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
            return bestScore;
        } else {
            var bestScore = beta;
            for (var i = 0; i < board.cells.length; i++) {
                var cell = i + 1;
                if (board.cellFree(cell)) {
                    var newBoard = board.clone();
                    newBoard.move(cell);
                    var score = this.minimax(newBoard, true, alpha, beta);
                    bestScore = Math.min(bestScore, score);
                    // Update beta with the current best score for minimizing player
                    beta = Math.min(beta, bestScore);
                    // Prune if beta is less than or equal to alpha (no need to explore further)
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
            return bestScore;
        }
    }
  
    selectMove(board) {
        // Define the initial best score and move
        var maxScore = -Infinity;
        var maxMove = null;
  
        var minScore = Infinity;
        var minMove = null;
  
        // Loop through each cell to evaluate the best move
        for (var i = 0; i < board.cells.length; i++) {
            var cell = i + 1;
            if (board.cellFree(cell)) {
                // Make a move on the current cell
                var newBoard = board.clone();
                newBoard.move(cell);
  
                // Calculate the score for the current move
                var score = this.minimax(newBoard, !board.playerOne, -Infinity, Infinity);
  
                // Update the best move if the current move has a higher score
                if (score > maxScore) {
                    maxScore = score;
                    maxMove = cell;
                }
                if (score < minScore) {
                    minScore = score;
                    minMove = cell;
                }
            }
        }
        return board.playerOne ? maxMove : minMove;
    }
}
  