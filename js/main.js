// TODO: create board object
var td = $("tr");
var board=[];

var deadBlackList=$(".deadblack ul");
var deadWhiteList=$(".deadwhite ul");

var dark="#779455";
var light="#ebebd0";
// this for loop will create a two dimensional array
// where first [] represent column and second [] represent row
// so we cna access the the borard with our ids representation a1,h4,g8
for (let i = 0; i < 8; i++) {
    board.push(td[i].cells);
    console.log(board[i]);
}

for (let i = 0; i < board.length; i++) {
    const column = board[i];
    for (let j = 0; j < column.length; j++) {
        column[j].id=(i+","+j);
        //column[j].innerHTML=i+","+j;   
    }
}

// for (let i = 0; i < td.length; i++) {
//     console.log("elemet "+i+" index = "+td[i].getAttribute("index"));
//     td[i].innerHTML=i+1;
// }

// TODO: create player object constrcator
function Player(name, family) {
        this.name = name,
        this.family = family,
        this.turn=false,
        this.kingAlive = true,
        this.pices = {
            king : {
                name: "king",
                value: "",
                index: ""
            },
            queen : {
                name: "queen",
                value: "",
                index: ""
            },
            rook : {
                name: "rook",
                lValue: '',
                rValue: "",
                index: ["", ""]
            },
            bishop : {
                name: "bishop",
                lValue: '',
                rValue: "",
                index: ["", ""]
            },
            knight : {
                name: "knight",
                lValue: '',
                rValue: "",
                index: ["", ""]
            },
            pawn : {
                name: "pawn",
                value: "",
                index: ["", "", "", "", "", "", "", ""]
            }
        }



}

let p1Name = "P1";
let p2Name = "P2";

// TODO: create player 1 object
var player1 = new Player(p1Name, "white");

player1.pices.king.value = "<div>&#9812;</div>";
player1.pices.king.place = "7,4";
//
player1.pices.queen.value = "<div>&#9813;</div>";
player1.pices.queen.place = "7,3";
//
player1.pices.rook.lValue = "<div>&#9814;</div>";
player1.pices.rook.rValue = "<div>&#9814;</div>";
player1.pices.rook.place = ["7,0", "7,7"];
//
player1.pices.bishop.lValue = "<div>&#9815;</div>";
player1.pices.bishop.rValue = "<div>&#9815;</div>";
player1.pices.bishop.place = ["7,2", "7,5"];
//
player1.pices.knight.lValue = '<div class="whiteScaleToRight">&#9816;</div>';
player1.pices.knight.rValue = "<div>&#9816;</div>";
player1.pices.knight.place = ["7,1", "7,6"];
//
player1.pices.pawn.value = "<div>&#9817;</div>";
player1.pices.pawn.place = ["6,0","6,1","6,2","6,3","6,4","6,5","6,6","6,7"];



// TODO: create player 2 object
var player2 = new Player(p2Name, "black");

player2.pices.king.value = "<div class='scaleToDown' id='black'>&#9818;</div>";
player2.pices.king.place = "0,4";
//
player2.pices.queen.value = "<div class='scaleToDown' id='black'>&#9819;</div>";
player2.pices.queen.place = "0,3";
//
player2.pices.rook.lValue = "<div class='scaleToDown' id='black'>&#9820;</div>";
player2.pices.rook.rValue = "<div class='scaleToDown' id='black'>&#9820;</div>";
player2.pices.rook.place = ["0,0", "0,7"];
//
player2.pices.bishop.lValue = "<div class='scaleToDown' id='black'>&#9821;</div>";
player2.pices.bishop.rValue = "<div class='scaleToDown' id='black'>&#9821;</div>";
player2.pices.bishop.place = ["0,2", "0,5"];
//
player2.pices.knight.lValue = "<div class='blackScaleToleft' id='black'>&#9822;</div>";
player2.pices.knight.rValue = "<div class='scaleToDown' id='black'>&#9822;</div>";
player2.pices.knight.place = ["0,1", "0,6"];
//
player2.pices.pawn.value = "<div class='scaleToDown' id='black'>&#9823;</div>";
player2.pices.pawn.place = ["1,0","1,1","1,2","1,3","1,4","1,5","1,6","1,7"];


function updateboard(board, player,family) {
    
    for (let pacse in player.pices) {
        let type = player.pices[pacse];
        if (pacse == "king" || pacse == "queen") {
            let v = type.value;
            let p = type.place;
            let i = parseInt(p.charAt(0));
            let j = parseInt(p.charAt(2));
            board[i][j].innerHTML=v;
            board[i][j].setAttribute("family",family);
            board[i][j].setAttribute("type",pacse);

        } else if (pacse == "rook" || pacse == "bishop" || pacse == "knight") {
            let v = [type.lValue,type.rValue];
            let p  = type.place;
            for (let i = 0; i < p.length; i++) {
                let iInd = parseInt(p[i].charAt(0));
                let jInd = parseInt(p[i].charAt(2));
                board[iInd][jInd].innerHTML=v[i];
                board[iInd][jInd].setAttribute("family",family);
                board[iInd][jInd].setAttribute("type",pacse);
            }
        } else if (pacse == "pawn") {
            let v = type.value;
            let p  = type.place;
            for (let i = 0; i < p.length; i++) {
                let iInd = parseInt(p[i].charAt(0));
                let jInd = parseInt(p[i].charAt(2));
                board[iInd][jInd].innerHTML=v;
                board[iInd][jInd].setAttribute("family",family);
                board[iInd][jInd].setAttribute("type",pacse);
            }
        }
    }
}

updateboard(board,player1,player1.family);
updateboard(board,player2,player2.family);



function possibleMovesForPawn(loction) {
    let pawnMoves = [];
    let i = parseInt(loction.charAt(0));
    let j = parseInt(loction.charAt(2));
    let myFamily = board[i][j].getAttribute("family");
    //console.log("MY FAMILY IS : "+myFamily)
    console.log("i= " + i + ", j= " + j);

    if (myFamily == "white") {

        // up for white
        if (i != 0) {

            let x = i - 1;
            let y = j;
            let upfamily = board[x][y].getAttribute("family");
            if (upfamily == null){
                pawnMoves.push((x + "," + y));
            }
        }
        // up up for white
        if (i != 0) {

            if ( i == 6 ) {
                let x = i - 2;
                let y = j;
                let upfamily = board[x][y].getAttribute("family");
                if (upfamily == null){
                    console.log(board[x-1][y].getAttribute("family") == myFamily +" *********")
                    if (board[i-1][y].getAttribute("family") != myFamily) {
                        pawnMoves.push((x + "," + y));
                    }
                }
            }
            
        }

  
        // up to right for white
        if (i != 0 && j < 7) {
            let x = i - 1;
            let y = j + 1;
            let upfamily = board[x][y].getAttribute("family");
            if (upfamily == "black") {
                console.log("up to right x= " + x + ", y= " + y);
                pawnMoves.push((x + "," + y + "k"));
            }
        }

        // up to left for white
        if (i != 0 && j > 0) {
            let x = i - 1;
            let y = j - 1;
            let upfamily = board[x][y].getAttribute("family");
            if (upfamily == "black") {
                console.log("up to left x= " + x + ", y= " + y);
                pawnMoves.push((x + "," + y + "k"));
            }
        }
    } else {
        console.log(myFamily+" %%%%%%");

        // up for black
        if (i != 0) {

            let x = i + 1;
            let y = j;
            let upfamily = board[x][y].getAttribute("family");
            if (upfamily == null){
                pawnMoves.push((x + "," + y));
            }
        }
        // up up for black
        if (i != 0) {

            if ( i == 1 ) {
                let x = i + 2;
                let y = j;
                let upfamily = board[x][y].getAttribute("family");
                if (upfamily == null){
                    console.log(board[x-1][y].getAttribute("family") == myFamily +" *********")
                    if (board[i+1][y].getAttribute("family") != myFamily) {
                        pawnMoves.push((x + "," + y));
                    }
                }
            }
            
        }

        // up and up up for black
        // if (i != 7) {
            
        //     let x = i;
        //     for (let t = 0; t < 2; t++) { 
        //         x +=1;
        //         let y = j;
        //         let upfamily = board[x][y].getAttribute("family");
        //         if (upfamily == null){
        //             if (t == 0)
        //                 pawnMoves.push((x + "," + y));
        //             else if( t == 1){
        //                 console.log("i == 6 "+i);

        //                 if ( i == 1 ) {
        //                     console.log(myFamily+","+upfamily)
        //                     if ( upfamily != myFamily ) {
        //                         pawnMoves.push((x + "," + y));
        //                         break;
        //                     }
        //                 }else
        //                     break;
        //             }
        //         }else
        //             break;
        //     }
        
        // }

        // up to right for black
        if (i != 7 && j < 7) {
            let x = i + 1;
            let y = j + 1;
            let upfamily = board[x][y].getAttribute("family");
            if (upfamily == "white") {
                pawnMoves.push((x + "," + y + "k"));
            }
        }

        // up to left for black
        if (i != 7 && j > 0) {
            let x = i + 1;
            let y = j - 1;
            let upfamily = board[x][y].getAttribute("family");
            if (upfamily == "white") {
                pawnMoves.push((x + "," + y + "k"));
            }
        }
    }
    return pawnMoves;
}

function possibleMovesForKnight(loction){
    let knightMoves=[];
    let i=parseInt(loction.charAt(0));
    let j=parseInt(loction.charAt(2));
    let myFamily=board[i][j].getAttribute("family");
    console.log("i= "+i+", j= "+j);

    // up to right
    if(i > 1 && j < 7){
        let x = i - 2;
        let y = j + 1;
        let otherfamily = board[x][y].getAttribute("family");
        if(otherfamily == null){
            knightMoves.push((x + "," + y));
        }else if(otherfamily != myFamily){
            knightMoves.push((x + "," + y + "k"));
        }
    }

    // up to left
    if(i > 1 && j > 0){
        let x = i - 2;
        let y = j - 1;
        let otherfamily = board[x][y].getAttribute("family");
        if(otherfamily == null){
            knightMoves.push((x + "," + y));
        }else if(otherfamily != myFamily){
            knightMoves.push((x + "," + y + "k"));
        }
    }

    // down to right
    if(i < 6 && j < 7){
        let x = i + 2;
        let y = j + 1;
        let otherfamily = board[x][y].getAttribute("family");
        if(otherfamily == null){
            knightMoves.push((x + "," + y));
        }else if(otherfamily != myFamily){
            knightMoves.push((x + "," + y + "k"));
        }
    }

    // down to left
    if(i < 6 && j > 0){
        let x = i + 2;
        let y = j - 1;
        let otherfamily = board[x][y].getAttribute("family");
        if(otherfamily == null){
            knightMoves.push((x + "," + y));
        }else if(otherfamily != myFamily){
            knightMoves.push((x + "," + y + "k"));
        }
    }

    // left up
    if(i != 0 && j > 1){
        let x = i - 1;
        let y = j - 2;
        let otherfamily = board[x][y].getAttribute("family");
        if(otherfamily == null){
            knightMoves.push((x + "," + y));
        }else if(otherfamily != myFamily){
            knightMoves.push((x + "," + y + "k"));
        }
    }

    // left down
    if(i != 7 && j > 1){
        let x = i + 1;
        let y = j - 2;
        let otherfamily = board[x][y].getAttribute("family");
        if(otherfamily == null){
            knightMoves.push((x + "," + y));
        }else if(otherfamily != myFamily){
            knightMoves.push((x + "," + y + "k"));
        }
    }

    // right up
    if(i != 0 && j < 6){
        let x = i - 1;
        let y = j + 2;
        let otherfamily = board[x][y].getAttribute("family");
        if(otherfamily == null){
            knightMoves.push((x + "," + y));
        }else if(otherfamily != myFamily){
            knightMoves.push((x + "," + y + "k"));
        }
    }

    // right down
    if(i != 7 && j < 6){
        let x = i + 1;
        let y = j + 2;
        let otherfamily = board[x][y].getAttribute("family");
        if(otherfamily == null){
            knightMoves.push((x + "," + y));
        }else if(otherfamily != myFamily){
            knightMoves.push((x + "," + y + "k"));
        }
    }

    return knightMoves;
}


function possibleMovesForBishop(loction){
    let bishopMoves=[];
    let i=parseInt(loction.charAt(0));
    let j=parseInt(loction.charAt(2));
    let myFamily=board[i][j].getAttribute("family");
    console.log("i= "+i+", j= "+j);

    let tempX = i; 
    let tempY = j; 


    // up to left
    while( tempX !=0 && tempY != 0){
        tempX -= 1;
        tempY -= 1;
        console.log(tempX+","+tempY);
        let otherfamily=board[tempX][tempY].getAttribute("family");
        if(otherfamily == null){
            bishopMoves.push((tempX + "," + tempY));
        }else if(otherfamily != myFamily){
            bishopMoves.push((tempX + "," + tempY + "k"));
            break;
        }else if(otherfamily == myFamily){
            break;
        }
    }

    tempX = i;
    tempY = j;

    // up to right
    while( tempX !=0 && tempY != 7){
        tempX -= 1;
        tempY += 1;
        console.log(tempX+","+tempY);
        let otherfamily=board[tempX][tempY].getAttribute("family");
        if(otherfamily == null){
            bishopMoves.push((tempX + "," + tempY));
        }else if(otherfamily != myFamily){
            bishopMoves.push((tempX + "," + tempY + "k"));
            break;
        }else if(otherfamily == myFamily){
            break;
        }
    }

    
    tempX = i;
    tempY = j;

    // down to left
    while( tempX !=7 && tempY != 0){
        tempX += 1;
        tempY -= 1;
        console.log(tempX+","+tempY);
        let otherfamily=board[tempX][tempY].getAttribute("family");
        if(otherfamily == null){
            bishopMoves.push((tempX + "," + tempY));
        }else if(otherfamily != myFamily){
            bishopMoves.push((tempX + "," + tempY + "k"));
            break;
        }else if(otherfamily == myFamily){
            break;
        }
    }

    
    tempX = i;
    tempY = j;

    // down to right
    while( tempX !=7 && tempY != 7){
        tempX += 1;
        tempY += 1;
        console.log(tempX+","+tempY);
        let otherfamily=board[tempX][tempY].getAttribute("family");
        if(otherfamily == null){
            bishopMoves.push((tempX + "," + tempY));
        }else if(otherfamily != myFamily){
            bishopMoves.push((tempX + "," + tempY + "k"));
            break;
        }else if(otherfamily == myFamily){
            break;
        }
    }

    return bishopMoves;
}


function possibleMovesForRook(loction){
    let rookMoves=[];
    let i=parseInt(loction.charAt(0));
    let j=parseInt(loction.charAt(2));
    let myFamily=board[i][j].getAttribute("family");
    console.log("i= "+i+", j= "+j);

    let tempX = i; 
    let tempY = j; 
    
    // up
    while( tempX !=0 ){
        tempX -= 1;
        console.log(tempX+","+tempY);
        let otherfamily=board[tempX][tempY].getAttribute("family");
        if(otherfamily == null){
            rookMoves.push((tempX + "," + tempY));
        }else if(otherfamily != myFamily){
            rookMoves.push((tempX + "," + tempY + "k"));
            break;
        }else if(otherfamily == myFamily){
            break;
        }
    }

    
    tempX = i; 
    
    // down
    while( tempX !=7 ){
        tempX += 1;
        console.log(tempX+","+tempY);
        let otherfamily=board[tempX][tempY].getAttribute("family");
        if(otherfamily == null){
            rookMoves.push((tempX + "," + tempY));
        }else if(otherfamily != myFamily){
            rookMoves.push((tempX + "," + tempY + "k"));
            break;
        }else if(otherfamily == myFamily){
            break;
        }
    }
    
    tempX = i; 
    tempY = j; 
    
    // right
    while( tempY < 7 ){
        tempY += 1;
        console.log(tempX+","+tempY);
        let otherfamily=board[tempX][tempY].getAttribute("family");
        if(otherfamily == null){
            rookMoves.push((tempX + "," + tempY));
        }else if(otherfamily != myFamily){
            rookMoves.push((tempX + "," + tempY + "k"));
            break;
        }else if(otherfamily == myFamily){
            break;
        }
    }

    tempY = j; 
    
    // left
    while( tempY > 0 ){
        tempY -= 1;
        console.log(tempX+","+tempY);
        let otherfamily=board[tempX][tempY].getAttribute("family");
        if(otherfamily == null){
            rookMoves.push((tempX + "," + tempY));
        }else if(otherfamily != myFamily){
            rookMoves.push((tempX + "," + tempY + "k"));
            break;
        }else if(otherfamily == myFamily){
            break;
        }
    }

    return rookMoves;
}

function possibleMovesForKing(loction) {
    let kingMoves = [];
    let i = parseInt(loction.charAt(0));
    let j = parseInt(loction.charAt(2));
    let myFamily = board[i][j].getAttribute("family");
    console.log("i= " + i + ", j= " + j);


    // up
    if (i != 0) {
        let x = i - 1;
        let y = j;
        let otherfamily = board[x][y].getAttribute("family");
        if (otherfamily == null) {
            console.log("up x= " + x + ", y= " + y);
            kingMoves.push((x + "," + y));
        } else if (otherfamily != myFamily) {
            //console.log("up to right x= " + x + ", y= " + y);
            pawnMoves.push((x + "," + y + "k"));
        }
    }

    // up to right
    if (i != 0 && j < 7) {
        let x = i - 1;
        let y = j + 1;
        let otherfamily = board[x][y].getAttribute("family");
        if (otherfamily == null) {
            //console.log("up to right x= " + x + ", y= " + y);
            kingMoves.push((x + "," + y));
        } else if (otherfamily != myFamily) {
            //console.log("up to right x= " + x + ", y= " + y);
            kingMoves.push((x + "," + y + "k"));
        }
    }

    // up to left
    if (i != 0 && j > 0) {
        let x = i - 1;
        let y = j - 1;
        let otherfamily = board[x][y].getAttribute("family");
        if (otherfamily == null) {
            //console.log("up to left x= " + x + ", y= " + y);
            kingMoves.push((x + "," + y));
        } else if (otherfamily != myFamily) {
            //console.log("up to right x= " + x + ", y= " + y);
            kingMoves.push((x + "," + y + "k"));
        }
    }


    // down
    if (i != 7) {
        let x = i + 1;
        let y = j;
        let otherfamily = board[x][y].getAttribute("family");
        if (otherfamily == null) {
            kingMoves.push((x + "," + y));
        } else if (otherfamily != myFamily) {
            //console.log("up to right x= " + x + ", y= " + y);
            kingMoves.push((x + "," + y + "k"));
        }
    }

    // right
    if (j != 7) {
        let x = i;
        let y = j + 1;
        let otherfamily = board[x][y].getAttribute("family");
        if (otherfamily == null) {
            kingMoves.push((x + "," + y));
        } else if (otherfamily != myFamily) {
            //console.log("up to right x= " + x + ", y= " + y);
            kingMoves.push((x + "," + y + "k"));
        }
    }

    // left
    if (j != 7) {
        let x = i;
        let y = j - 1;
        let otherfamily = board[x][y].getAttribute("family");
        if (otherfamily == null) {
            kingMoves.push((x + "," + y));
        } else if (otherfamily != myFamily) {
            //console.log("up to right x= " + x + ", y= " + y);
            kingMoves.push((x + "," + y + "k"));
        }
    }


    // down to right 
    if (i != 7 && j < 7) {
        let x = i + 1;
        let y = j + 1;
        let otherfamily = board[x][y].getAttribute("family");
        if (otherfamily == null) {
            kingMoves.push((x + "," + y));
        } else if (otherfamily != myFamily) {
            //console.log("up to right x= " + x + ", y= " + y);
            kingMoves.push((x + "," + y + "k"));
        }
    }

    // down to left
    if (i != 7 && j > 0) {
        let x = i + 1;
        let y = j - 1;
        let otherfamily = board[x][y].getAttribute("family");
        if (otherfamily == null) {
            kingMoves.push((x + "," + y));
        } else if (otherfamily != myFamily) {
            //console.log("up to right x= " + x + ", y= " + y);
            kingMoves.push((x + "," + y + "k"));
        }
    }



    return kingMoves;
}

function possibleMovesForQueen(loction) {
    let queenMoves = [];
    
    // rook movement
    let rookMovement=possibleMovesForRook(loction);
    // bishop movement
    let bishopMovement=possibleMovesForBishop(loction);

    for (let i = 0; i < rookMovement.length; i++)
        queenMoves.push(rookMovement[i]);

    

    for (let i = 0; i < bishopMovement.length; i++)
        queenMoves.push(bishopMovement[i]);

    return queenMoves;
}

function possibleMoves(type,location){
    
    if (type == "pawn") {
        // still missing up up movment
        return possibleMovesForPawn(location);    
    }

    if (type == "knight") {
        return possibleMovesForKnight(location);
    }

    if (type == "bishop") {
        return possibleMovesForBishop(location);
    }

    if (type == "rook") {
        return possibleMovesForRook(location);
    }

    if (type == "king") {
        return possibleMovesForKing(location);
    }

    if (type == "queen") {
        return possibleMovesForQueen(location);
    }

    return -1;
}


var clickonce = null;
var moves = null;
var bcounter = 1;
var wcounter = 1;

$( document ).ready(function() {

$("td").click(function(){
    EventLClick($(this));
});

function EventLClick(tthis) {
        
        console.log("inside black family click event")
        if (clickonce == null) {
            // then it's white turn
            if(bcounter == wcounter){
                if (tthis.attr("family") == "white") {
                    let id = tthis.attr("id");
                    onClickColor(id);
                    console.log(tthis.html());
                    console.log(tthis.attr('id'));
                    console.log(tthis.attr('class'));
                    clickonce = tthis;
                    
                }else{
                    alert("Select one of your pices\nit is "+p1Name+" turn now");
                   
                }
            }else{
                if (tthis.attr("family") == "black") {
                    let id = tthis.attr("id");
                    onClickColor(id);
                    console.log(tthis.html());
                    console.log(tthis.attr('id'));
                    console.log(tthis.attr('class'));
                    clickonce = tthis;
                    
                }else{
                    alert("Select one of your pices\nit is "+p2Name+" turn now");
                }
            }
            
            //tthis.removeEventListener("click",blackEventLClick);
            // var element =document.querySelectorAll("td");
            // element.addEventListener("click", function(){blackEventLDBLClick($(this))});
        } else {
            let secondClick = tthis;
            
            if (moves.includes(secondClick.attr("id"))) {

                console.log("ID = " + clickonce.attr("id"));
                onSecondClickColor(clickonce.attr("id"));



                let id = tthis.attr("id");
                let i = parseInt(id.charAt(0));
                let j = parseInt(id.charAt(2));


                let family = clickonce.attr("family");
                let type = clickonce.attr("type");

                console.log("family = " + family + "   , type = " + type);
                let innerhtmll = clickonce.html();

                board[i][j].innerHTML = innerhtmll;
                board[i][j].setAttribute("family", family);
                board[i][j].setAttribute("type", type);

                //
                clickonce.html("");
                clickonce.attr("family", null);
                clickonce.attr("type", null);
                clickonce = null;

                if(family == "white")
                    wcounter++;
                else
                    bcounter++;

                $(".chess-board").toggleClass('rotateTable');
            } else if (moves.includes(secondClick.attr("id") + "k")) {
                let secondFamily = secondClick.attr("family");
                let secondType = secondClick.attr("type");



                console.log("ID = " + clickonce.attr("id"));
                onSecondClickColor(clickonce.attr("id"));



                let id = tthis.attr("id");
                let i = parseInt(id.charAt(0));
                let j = parseInt(id.charAt(2));


                let family = clickonce.attr("family");
                let type = clickonce.attr("type");

                console.log("the " + type + " from " + family + " family Killed the " + secondType + " of the " + secondFamily + " family");
                //console.log(");
                let innerhtmll = clickonce.html();

                board[i][j].innerHTML = innerhtmll;
                board[i][j].setAttribute("family", family);
                board[i][j].setAttribute("type", type);

                //$(".chess-board").toggleClass('rotateTable');
                clickonce.html("");
                clickonce.attr("family", null);
                clickonce.attr("type", null);
                clickonce = null;

                if(family == "white")
                    wcounter++;
                else
                    bcounter++;

                $(".chess-board").toggleClass('rotateTable');
            } else {
                alert("Wrong selection");
                onSecondClickColor(clickonce.attr("id"));
                clickonce = null;
                //removeAllBEvents();
            }
        }
}

});


function onClickColor(id) {
    let i = id.charAt(0);
    let j = id.charAt(2);
    let type = board[i][j].getAttribute("type");
    let arr = possibleMoves(type, (i + "," + j));
    moves = arr;
    if (arr.length > 0 && arr != -1) {
        for (let i = 0; i < arr.length; i++) {
            console.log("arr[i]" + arr[i])
            let iInd = arr[i].charAt(0);
            let jInd = arr[i].charAt(2);
            if (arr[i].length > 3) {
                // console.log("backgroundColor before change is = "+board[iInd][jInd].style.backgroundColor);
                board[iInd][jInd].style.backgroundColor = "#ff8a8adf";
            } else {
                board[iInd][jInd].style.backgroundColor = "#cfa977";
            }
        }
    }
}

function onSecondClickColor(id) {
    if (moves != null) {
        let arr = moves;
        if (arr.length > 0 && arr != -1) {
            for (let i = 0; i < arr.length; i++) {
                console.log("arr[i]" + arr[i])
                let iInd = arr[i].charAt(0);
                let jInd = arr[i].charAt(2);
                (arr[i].length > 3) ?

                    (board[iInd][jInd].className == "dark") ?
                        board[iInd][jInd].style.backgroundColor = dark
                        :
                        board[iInd][jInd].style.backgroundColor = light
                    :
                    (board[iInd][jInd].className == "dark") ? board[iInd][jInd].style.backgroundColor = dark : board[iInd][jInd].style.backgroundColor = light;

            }
        }
        moves = null;
    }

}


    
function EventLClickkk(tthis) {

    if(bcounter == wcounter){
        
    }
        console.log("inside black family click event")
        if(clickonce == null ) {
            let id = tthis.attr("id");
            onClickColor(id);
            console.log(tthis.html());
            console.log(tthis.attr('id'));
            console.log(tthis.attr('class'));
            clickonce = tthis;
            //tthis.removeEventListener("click",blackEventLClick);
            // var element =document.querySelectorAll("td");
            // element.addEventListener("click", function(){blackEventLDBLClick($(this))});
        }else{
            let secondClick = tthis;

    if (moves.includes(secondClick.attr("id"))) {

        console.log("ID = "+clickonce.attr("id"));
        onSecondClickColor(clickonce.attr("id"));
        
        

        let id = tthis.attr("id");
        let i = parseInt(id.charAt(0));
        let j = parseInt(id.charAt(2));


        let family = clickonce.attr("family");
        let type = clickonce.attr("type");

        console.log("family = "+family+"   , type = "+type);
        let innerhtmll = clickonce.html();

        board[i][j].innerHTML = innerhtmll;
        board[i][j].setAttribute("family", family);
        board[i][j].setAttribute("type", type);

        $(".chess-board").toggleClass('rotateTable');
        clickonce.html("");
        clickonce.attr("family", null);
        clickonce.attr("type", null);
        clickonce = null;

    }else if( moves.includes(secondClick.attr("id") + "k")){
        let secondFamily = secondClick.attr("family");
        let secondType = secondClick.attr("type");

        

        console.log("ID = "+clickonce.attr("id"));
        onSecondClickColor(clickonce.attr("id"));
        
        

        let id = tthis.attr("id");
        let i = parseInt(id.charAt(0));
        let j = parseInt(id.charAt(2));


        let family = clickonce.attr("family");
        let type = clickonce.attr("type");

        console.log("the "+type+" from "+family+" family Killed the "+secondType+ " of the "+secondFamily+" family");
        //console.log(");
        let innerhtmll = clickonce.html();

        board[i][j].innerHTML = innerhtmll;
        board[i][j].setAttribute("family", family);
        board[i][j].setAttribute("type", type);

        $(".chess-board").toggleClass('rotateTable');
        clickonce.html("");
        clickonce.attr("family", null);
        clickonce.attr("type", null);
        clickonce = null;
        
    } else {
        alert("Wrong selection");
        onSecondClickColor(clickonce.attr("id"));
        clickonce = null;
        //removeAllBEvents();
    }
        }
}
