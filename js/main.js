// var board=[];

// for (let i = 0; i < 8; i++) {
//     var arr[i]=[];
//     for (let j = 0; j < 8; j++) {
//         let x=i+1;
//         let y=j+1;
//         board[i][j]=x+","+y;
//     }
// }

var clickonce;

$("td").click(function(){
    console.log($(this).attr('id'));
    clickonce=$(this);

});

var clickedtwice=$("td").contextmenu(function(){
    if(clickonce != null){
        console.log(clickonce.text());
        let temp=clickonce.text();
        clickonce.text($(this).text());
        $(this).text(temp);
        clickonce=null;
    }
    
    return false;
});

// let td=$("td");

// for (let i = 0; i < td.length; i++) {
//     td[i].textContent=td[i].id;
//     //td[i].textContent=td[i].id;
    
// }


