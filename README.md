## Tic Tac Toe
___________________________________________________________________________________

#### Overview

Tic tac toe (also known as noughts and crosses) is a game for two players, X and O, who take turns marking the spaces in a 3 × 3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.

#### Objective

Build a web application that allows two players to play tic tac toe.

#### Technologies

1. JavaScript
2. HTML
3. CSS
4. jQuery
5. Underscore.js
6. Font Awesome

#### Approach

In developing this web application, the biggest problem that I needed to solve was verifying whether a winning combination existed after each player input. The reason for this is that a player can win by having three marks in either a horizontal, vertical or diagonal row (as displayed below). As such, there are 8 possible configurations that would allow a player to win and, therefore, 8 configurations that need to be checked.
___________________________________________________________________________________
##### Board markup

    diagL          diagR
      \             /
       [1]  [2]  [3] - rowA

       [4]  [5]  [6] - rowB

       [7]  [8]  [9] - rowC
        |    |    |
       colA colB colC
___________________________________________________________________________________

###### The way that I approached and solved this problem is as follows:

1. Define 3 arrays for each row (i.e. `rowA`, `rowB` and `rowC`) that each contained 3 empty strings `row = ["", "", ""];` ("row-arrays")

2. Replace an empty string in the relevant row-array with the input from a players' click, using the `.splice` array method, in based on the index of the button pressed

3. Define and call a function called `column()` to create 3 arrays for each column (i.e. `colA`, `colB` and `colC`) based on the relevant elements and their respective positions in the row-arrays

4. Define and call another function called `diagonal()` to create 2 arrays for each diagonal (i.e. `diagL` and `diagR`), also based on the relevant elements and their respective positions in the row-arrays

5. Using the `_.each` function from the *Underscore.js* JavaScript library to loop through each of the 8 arrays, I was able to then use the `_.difference` function (also from the *Underscore.js* JavaScript library) to compare the arrays to a pre-defined winning array, `var boardXWin = ["X", "X", "X"];` and `var boardOWin = ["O", "O", "O"];`, and determine whether a win had occurred in any of the 8 configurations.

  ```javascript
    _.each(boardKeys, function(key, index) { // loops through all 8 arrays
      if (_.difference(eval('board.' + key), boardXWin).length === 0) { // blank array indicates winner is 'X'
        winnerX();
        return;
      } else if (_.difference(eval('board.' + key), boardOWin).length === 0) { // blank array indicates winner is 'O'
        winnerO();
        return;
      }
    });
  ```

  As the `_.difference` function returns an array with any elements that are different between two arrays compared, if the length of returned array is equal to 0, this indicated there was no difference and, therefore, a winning combination of three marks existed.

6. For completeness, a tie was determined by using the `.concat` array method to concatenate and create a single array from the three row-arrays, and checking whether an empty element exists in the single, 9 element array. As this was performed after the checks for a winning configuration, no empty elements in the concatenated array indicated a draw.

#### Links

Play the game - [http://avielgoh.github.io/WDI-Project-1-Tic-Tac-Toe](http://avielgoh.github.io/WDI-Project-1-Tic-Tac-Toe/)

#### Acknowledgements

Thanks to [Matt](https://github.com/mattswann), [DT](https://github.com/epoch) and the WDI4 appleandriods class for all your assistance and guidance!

*This project was undertaken as part of the General Assembly WDI course I undertook in 2015.*
