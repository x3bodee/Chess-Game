# Project #1:  Chess Game

---

##### Link to the Game [Live Link](https://x3bodee.github.io/Unit_1_Project/)

######  Special thanks to Sager Alarifi, Saad Iqbal, Sara Bin Kuddah and Yasir Al-Muhtrish :sparkling_heart: :sparkling_heart:





## Technical Requirements

- HTML
- CSS
- JavaScript
- jQuery
- Visual Studio Code

---

## Planning 

#### Board Structure

In this image, the structure of the board as you can see it's a **two dimensional array [x][y]**, I did it like because it's will be easier for me to calculate the potential moves of any chess piece.

![Planning for the project : Board Structure Image](/images/board.PNG)

### Pieces Calculations

#### Piece #1: Pawn Moves

pawn conditions are in **if(Condition)** 
Direction   |   X   |   Y   |   Condition   | 
----------- | ----- | ----- | ------------- |
Up (white) | x - 1 | y | x != 0
Up Up (white) | x - 2 | y | x != 0 && x == 6
Up to Right (white)(kill) | x - 1 | y + 1 | x != 0 && y < 7
Up to Left (white)(kill) | x - 1 | y - 1 | x != 0 && y > 0
Up (black) | x + 1 | y | x != 7 
Up Up (black) | x + 2 | y | x != 7 && y == 1
Up to Right (black)(kill) | x + 1 | y + 1 | x != 7 && y < 7
Up to Left (black)(kill) | x + 1 | y - 1 | x != 7 && y > 0

![Planning for the project : Pawn possible moves Image](/images/pawn.PNG)


#### Piece #2: King Moves

king conditions are in **if(Condition)** 
Direction   |   X   |   Y   |   Condition   | 
----------- | ----- | ----- | ------------- |
Up (kill) | x - 1 | y | x != 0
Up to Right (kill) | x - 1 | y + 1 | x != 0 && y < 7
Up to Left (kill) | x - 1 | y - 1 | x != 0 && y > 0
Down (kill) | x + 1 | y | x != 7
Down to Right (kill) | x + 1 | y + 1 | x != 7 && y < 7
Down to Left (kill) | x + 1 | y - 1 | x != 7 && y > 0
Right (kill) | x | y + 1 | x != 7
Left (kill) | x | y - 1 | x != 7

![Planning for the project : King possible moves Image](/images/king.PNG)


#### Piece #3: Knight Moves

knight conditions are in **if(Condition)** 
Direction   |   X   |   Y   |   Condition   | 
----------- | ----- | ----- | ------------- |
Up to Right (kill) | x - 2 | y + 1 | x > 1 && y < 7
Up to Left (kill) | x - 2 | y - 1 | x > 1 && y > 0
Down to Right (kill) | x + 2 | y + 1 | x < 6 && y < 7
Down to Left (kill) | x + 2 | y - 1 | x < 6 && y > 0
Right Up (kill) | x - 1 | y + 2 | x != 0 && y < 6
Right Down (kill) | x + 1 | y + 2 | x != 7 && y < 6
Left Up (kill) | x - 1 | y - 2 | x != 0 && y > 1
Left Down (kill) | x + 1 | y - 2 | x != 7 && y > 1

![Planning for the project : Knight possible moves Image](/images/Knight.PNG)


#### Piece #4: Rook Moves

rook conditions are in **while(Condition)** 
Direction   |   X   |   Y   |   Condition   | 
----------- | ----- | ----- | ------------- |
Up (kill) | x - 1 | y | x != 0
Down (kill) | x + 1 | y | x != 7
Right (kill) | x | y + 1 | y < 7
Left (kill) | x | y - 1 | y > 0

![Planning for the project : Rook possible moves Image](/images/rook.PNG)


#### Piece #5: Bishop Moves

bishop conditions are in **while(Condition)** 
Direction   |   X   |   Y   |   Condition   | 
----------- | ----- | ----- | ------------- |
Up Left (kill) | x - 1 | y - 1 | x != 0 && y != 0
Up Right (kill) | x - 1 | y + 1 | x != 0 && y != 7
Down Left (kill) | x + 1 | y - 1 | x != 7 && y != 0
Down Right (kill) | x + 1 | y + 1 | x != 7 && y != 7

![Planning for the project : Bisshop possible moves Image](/images/bishop.PNG)


#### Piece #6: Queen Moves

queen conditions are in **while(Condition)** it's basically bishop and rook movement
Direction   |   X   |   Y   |   Condition   | 
----------- | ----- | ----- | ------------- |
Up (kill) | x - 1 | y | x != 0
Down (kill) | x + 1 | y | x != 7
Right (kill) | x | y + 1 | y < 7
Left (kill) | x | y - 1 | y > 0
Up Left (kill) | x - 1 | y - 1 | x != 0 && y != 0
Up Right (kill) | x - 1 | y + 1 | x != 0 && y != 7
Down Left (kill) | x + 1 | y - 1 | x != 7 && y != 0
Down Right (kill) | x + 1 | y + 1 | x != 7 && y != 7

![Planning for the project : Queen possible moves Image](/images/Queen.PNG)

---

## Problem-Solving Strategy 

Now we know how to get possible moves of any piece, also we stored our board in two dimensional array, now we need to create player object to generate players and also create update method that will set the board for the start of the game.

now the board and the players ready, so we need a two on click methods, from the first one we will get the indexes of our potential move and calculate the possible moves and display it.

second click method will store the indexes of our destination if the destination is empty then just reblace it with the piece from first method, and if it's kill move then kill the other piece and replace it with the piece from the first method.

then we will increment the counter of the player moves so it's will be switched, after that we will restore the colors to it's original state and rotate the table 180deg and give the other player turn.

**board --> possible moves --> players -- > click events --> switch between player --> check for game over --> END** 

---

## My Favorite Function 

### EventLClick(this)

#### Why it's may favorite ?

Because all the logic will go from this method so we can say **it's the heart of the game**.

* It's control which player can play and not.
* If first click its will color the possible moves.
* If second click it's will remove all possible moves color.
* Rotate the board.
* Kill and move chess pieces.
* Show dead pieces.
* Check for checkmate.
* Calling GameOver.

---

## Future Iterations 

#### * Add castling move.(Unsolved Problem)
#### * improve the speed.
#### * improve the responsiveness.
#### * improve the style.
#### * add dark mode.
#### * take the colors customizations from the user.
#### * Add AI.
#### * Add other chess modes like 3-Check, Speed Chess.

