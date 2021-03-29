// TODO: create board object
var td = $("tr");
var board=[];
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
        column[j].innerHTML=i+","+j;   
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



function possibleMovesForPawn(loction){
    let pawnMoves=[];
    let i=parseInt(loction.charAt(0));
    let j=parseInt(loction.charAt(2));
    console.log("i= "+i+", j= "+j)
    if(board[i][j].getAttribute("family") == "white"){
        
        // up for white
        if (i != 0) {
            let x = i - 1;
            let y=j;
            console.log("up x= "+x+", y= "+y)
            pawnMoves.push((x+","+y))
        }
        
        // up to right for white
        if (i != 0 && j < 7) {
            let x = i - 1;
            let y = j + 1;
            console.log("up to right x= "+x+", y= "+y)
            pawnMoves.push((x+","+y+"k"))
        }

        // up to left for white
        if (i != 0 && j > 0) {
            let x = i - 1;
            let y = j - 1;
            console.log("up to left x= "+x+", y= "+y)
            pawnMoves.push((x+","+y+"k"))
        }
    }else{

        // up for black
        if (i != 7) {
            let x = i + 1;
            let y = j;
            pawnMoves.push((x+","+y))
        }

        // up to right for black
        if (i != 7 && j < 7) {
            let x = i + 1;
            let y = j + 1;
            pawnMoves.push((x+","+y+"k"))
        }

        // up to left for black
        if (i != 7 && j > 0) {
            let x = i + 1;
            let y = j - 1;
            pawnMoves.push((x+","+y+"k"))
        }
    }
    return pawnMoves;
}

function possibleMoves(type,location){
    
    if (type == "pawn") {
        return possibleMovesForPawn(location);
        
    }else if (condition) {
        
    }else if (condition) {
        
    }else if (condition) {
        
    }else if (condition) {
        
    }else {
        
    }
    return -1;
}


var clickonce = null;

$("td").click(function () {

    if (clickonce != null) {
        console.log(clickonce.html());
        let temp = clickonce.html();
        //clickonce.html($(this).html());
        clickonce.html("");
        $(this).html(temp);
        clickonce = null;
    } else {
        
        console.log($(this).html());
        console.log($(this).attr('id'));
        console.log($(this).attr('id'));
        clickonce = $(this);
    }

});


$("td").mouseover(function () {
    let i=$(this).attr('id').charAt(0);
    let j=$(this).attr('id').charAt(2);
    let type=board[i][j].getAttribute("type");
    let arr=possibleMoves(type,(i+","+j));
    if (arr.length > 0 && arr != -1) {
        for (let i = 0; i < arr.length; i++) {
            console.log("arr[i]"+arr[i])
            let iInd=arr[i].charAt(0);
            let jInd=arr[i].charAt(2);
            if(arr[i].length > 3){
                board[iInd][jInd].style.backgroundColor="#ff8a8adf";
            }else{
                board[iInd][jInd].style.backgroundColor="#ccffe0";
            }
            
        }
    }

});

$("td").mouseover(function () {
    let i=$(this).attr('id').charAt(0);
    let j=$(this).attr('id').charAt(2);
    let type=board[i][j].getAttribute("type");
    let arr=possibleMoves(type,(i+","+j));
    if (arr.length > 0 && arr != -1) {
        for (let i = 0; i < arr.length; i++) {
            console.log("arr[i]"+arr[i])
            let iInd=arr[i].charAt(0);
            let jInd=arr[i].charAt(2);
            if(arr[i].length > 3){
                board[iInd][jInd].style.backgroundColor="#ff8a8adf";
            }else{
                board[iInd][jInd].style.backgroundColor="#ccffe0";
            }
            
        }
    }

});

// var clickedtwice=$("td").contextmenu(function(){
//     if(clickonce != null){
//         console.log(clickonce.text());
//         let temp=clickonce.text();
//         clickonce.text($(this).text());
//         $(this).text(temp);
//         clickonce=null;
//     }

//     return false;
// });

// let td=$("td");

// for (let i = 0; i < td.length; i++) {
//     td[i].textContent=td[i].id;
//     //td[i].textContent=td[i].id;

// }

