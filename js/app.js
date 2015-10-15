// WDI - Project 1 - Tic Tac Toe

// --- GLOBAL VARIABLES ---
var ties = 0;
var player1Score = 0;
var player2Score = 0;
var player1Name = 'Player 1';
var player2Name = 'Player 2';
var inputType = 'X';
var boardXWin = ["X", "X", "X"];
var boardOWin = ["O", "O", "O"];
var winningSet = [];


// --- START GAME ---
var startGame = function() {

  $('.display-message').html('LET\'S PLAY!');

  if ($('#player1-name').val() !== "" &&  $('#player2-name').val() !== "") {
    player1Name = $('#player1-name').val();
    $('#p1Name').html(player1Name);
    player2Name = $('#player2-name').val();
    $('#p2Name').html(player2Name);
  } else {
    return;
  }

  // display main page, remove landing box
  $('.landing').css('display', 'none');
  $('main').css('display', 'inherit');
};

$('.submit').on('click', startGame); // start game after use inputs custom names

$('.skip').on('click', function() { // user can choose not to use custom name
  $('.landing').css('display', 'none');
  $('main').css('display', 'inherit');
});

// --- GAME BOARD ---
var board = {
  rowA: ["", "", ""],
  rowB: ["", "", ""],
  rowC: ["", "", ""],
  colA: [],
  colB: [],
  colC: [],
  diagL: [],
  diagR: []
};

var column = function() { // column() creates arrays for columns based on rows
  board.colA = [board.rowA[0], board.rowB[0], board.rowC[0]];
  board.colB = [board.rowA[1], board.rowB[1], board.rowC[1]];
  board.colC = [board.rowA[2], board.rowB[2], board.rowC[2]];
};

var diagonal = function() { // diagonal() creates arrays for the left-right and right-left diagonals based on rows
  board.diagL = [board.rowA[0], board.rowB[1], board.rowC[2]];
  board.diagR = [board.rowA[2], board.rowB[1], board.rowC[0]];
};

// --- PLAYER INPUT ---
var playerInput = function() {

  // display text on clicked-button based on inputType ('X' or 'O')
  $(event.target).text(inputType);

  // get index / position of clicked-button and push inputType ('X' or 'O') into board.row array
  if ($(event.target).data('index') <= 2) {
    board.rowA.splice($(event.target).data('index'), 1, inputType);
  } else if ($(event.target).data('index') <= 5) {
    board.rowB.splice($(event.target).data('index') - 3, 1, inputType);
  } else if ($(event.target).data('index') <= 8) {
    board.rowC.splice($(event.target).data('index') - 6, 1, inputType);
  };

  // alternate inputType ('X' or 'O')
  if (inputType === 'X') {
    inputType = 'O';
  } else {
    inputType = 'X';
  };

  // disable clicked-button
  $(event.target).prop('disabled', true);
};


// --- CHECK RESULTS ---
var checkBoard = function() {

  var boardKeys = _.keys(board); // creates an array of 'keys' contained in the board object
  var wholeBoard = board.rowA.concat(board.rowB, board.rowC); // creates an array of all values in all rows

  $('.display-message').html(inputType + ' turn'); // update message based on which player is next

  // checks each array (rows, columns and diagonals) in the board object against the boardWinX and boardWinO arrays to identify if there is a winner
  _.each(boardKeys, function(key, index) {
    if (_.difference(eval('board.' + key), boardXWin).length === 0) { // blank array indicates winner
      winningSet = key;
      winnerX();
      return;
    } else if (_.difference(eval('board.' + key), boardOWin).length === 0) {
      winningSet = key;
      winnerO();
      return;
    }
  });

  // kill checkBoard() if a winner has been identified - ensure no tie if player wins on last box
  if (winningSet.length !== 0) {
    return;
  };

  // if wholeBoard array contains no spaces and no winner identified, indicates a tie
  if (_.contains(wholeBoard, "")) {
    console.log('CONTINUE');
  } else {
    winnerTie();
    return;
  };
};

$('.box').on('click', function() { // call functions below when button on grid is clicked
  playerInput();
  column(); // update column arrays
  diagonal(); // update diagonal arrays
  checkBoard(); // check player input results in a winner or tie
});


// --- RESET GAME ---
var clearBoard = function() { // clears the board for the next round
  board.rowA = ["", "", ""]; // clear values in board arrays
  board.rowB = ["", "", ""];
  board.rowC = ["", "", ""];
  winningSet = [];
  inputType = 'X';
  $('.box').text(""); // clear button values
  $('.box').prop('disabled', false); // re-enable all buttons
  $('.display-message').html('ROUND ' + (ties + player1Score + player2Score + 1) + '!');
};

var resetGame = function() { // clears the game if player presses reset button
  clearBoard();
  player1Name = 'Player 1';
  player2Name = 'Player 2';
  $('#p1Name').html(player1Name);
  $('#p2Name').html(player2Name);
  ties = 0;
  player1Score = 0;
  player2Score = 0;
  $('.scores').html('');
  $('.notifications').css('display', 'inherit');
  $('main').css('display', 'none');
  $('.landing').css('display', 'inherit');

  // reset various CSS that were changed during crazy mode
  $('.game-board').css({
    'animation-name': 'none',
    'animation-duration': 'none',
    'animation-iteration-count': 'none',
    'animation-timing-function': 'none'
  });
  $('.game-board').css('animation', 'zoomBoard 1s linear 0s 1');
  $('body').css({
    'background-image': 'url(http://images2.alphacoders.com/594/594767.jpg)',
    'animation-name': 'none',
    'animation-duration': 'none',
    'animation-iteration-count': 'none',
    'animation-timing-function': 'none'
  });
  $('button.box').css('color', 'rgb(160, 200, 249)');
};

$('#reset').on('click', resetGame); // calls resetGame() when button is clicked


// --- GAME RESULTS ---
var winnerX = function() {
  $('.box').prop('disabled', true);
  $('.display-message').html(player1Name +' wins!');
  player1Score += 1;
  console.log(player1Score);
  $('.player1-score').html(player1Score);
  setTimeout(clearBoard, 2000);
}

var winnerO = function() {
  $('.box').prop('disabled', true);
  $('.display-message').html(player2Name + ' wins!');
  player2Score += 1;
  $('.player2-score').html(player2Score);
  setTimeout(clearBoard, 2000);
}

var winnerTie = function() {
  $('.box').prop('disabled', true);
  $('.display-message').html('It\'s a draw!');
  ties += 1;
  $('.tie-score').html(ties);
  setTimeout(clearBoard, 2000);
}

// --- END & REPLAY GAME  ---
var exitGame = function() {
  if (player1Score === player2Score) {
    $('.winner-message').html('GAME WAS A TIE!');
  } else if (player1Score > player2Score) {
    $('.winner-message').html(player1Name + ' WON!');
  } else {
    $('.winner-message').html(player2Name + ' WON!');
  };

  $('.game-over').css('display', 'inherit');
  $('main').css('display', 'none');
}

$('#exit').on('click', exitGame); // user exits game - display exit box

var crazyGame = function() {
  resetGame();
  $('.game-over').css('display', 'none');
  $('.landing').css('display', 'none');
  $('main').css('display', 'inherit');
  $('.game-board').css({
    'animation-name': 'crazySpin',
    'animation-duration': '1.5s',
    'animation-iteration-count': 'infinite',
    'animation-timing-function': 'linear'
  });
  $('body').css({
    'background-image': 'none',
    'animation-name': 'colorChangeBG',
    'animation-duration': '3s',
    'animation-iteration-count': 'infinite',
    'animation-timing-function': 'linear'
  });
  $('button.box').css('color', 'white');
  $('.notifications').css('display', 'none');
  $('.display-message').html('CRAZY MODE!');
}

$('.crazy-button').on('click', crazyGame); // user can play game in crazy mode
