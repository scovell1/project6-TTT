var board;
var squares;
var squaresFilled;

class Board {
    constructor() {
        this.squareArray = []
        this.winners = {0:[[0,1,2],[0,3,6],[0,4,8]],1:[[0,1,2],[1,4,7]],2:[[0,1,2],[2,4,6],[2,5,8]],3:[[0,3,6],[3,4,5]],4:[[3,4,5],[0,4,8],[1,4,7],[2,4,6]],5:[[2,5,8],[3,4,5]],
            6:[[0,3,6],[2,4,6],[6,7,8]],7:[[1,4,7],[6,7,8]],8:[[0,4,8],[2,5,8],[6,7,8]]
        };
        this.whoseTurn = 0;
        this.squaresFilled = 0;
        this.players=["O","X"];
        for (var i=0; i<9;i++){
            this.squareArray[i]= new Square(i)
        }
    } 
    isEmptysquare() {
         board.squareArray.forEach(x=> this.empty)
    }
    getWhoseTurn(){
        return this.whoseTurn;
    }
    drawBoard(){
        for (var i=0; i<9;i++){
            squares[i].innerHTML = this.squareArray[i].getXorO()
        }
    }
    changeTurns(){
        this.whoseTurn = !this.whoseTurn
        this.squaresFilled++;
        if (this.whoseTurn){
            document.querySelector("#infoLine").innerHTML = "Player " + this.players[1] + " please choose a square"
        }else{ document.querySelector("#infoLine").innerHTML = "Player " + this.players[0] + " please choose a square"}
        
    }
    isWinner(squarePosition){
        for (var winningRow of this.winners[squarePosition]){
            if (this.squareArray[winningRow[0]].XorO == this.squareArray[winningRow[1]].XorO && this.squareArray[winningRow[0]].XorO == this.squareArray[winningRow[2]].XorO){return true
            }
        }return false
    }
    reset1(){
        this.squareArray = [];
        var myButtons = document.querySelectorAll(".square");
        for (button of myButtons){
            button.disabled = false;
            button.style.backgroundColor ="#11bbcc"
        }for (var i=0; i<9;i++){
            this.squareArray[i]= new Square(i);
        }
        this.squaresFilled = 0;
         board.drawBoard();
    }
    highlight3InaRow(squarePosition){
        for (var winningRow of this.winners[squarePosition]){
            if (this.squareArray[winningRow[0]].XorO == this.squareArray[winningRow[1]].XorO && this.squareArray[winningRow[0]].XorO == this.squareArray[winningRow[2]].XorO){
                squares[winningRow[0]].style.backgroundColor = "#CC9922";
                squares[winningRow[1]].style.backgroundColor = "#CC9922";
                squares[winningRow[2]].style.backgroundColor = "#CC9922";
            }
        }
    }
}

class Square {
    constructor(position){
        this.position = position;
        this.XorO = "";
        this.empty = true;
        this.image = ""
    }
    updateSquare(){
        if (this.empty){
        if (board.getWhoseTurn()){
            this.XorO = "X";
        }
        else{this.XorO = "O"
        }
        this.empty = false;
        board.changeTurns();
        board.drawBoard();
        }else{
            document.querySelector("#infoLine").innerHTML = "This space is occupied. Please pick again."
        }
    }
    getXorO(){
        return this.XorO;
    }
}
function reset1(){
    board.reset1();
    
}
function endGame(){
    myButtons = document.querySelectorAll(".square");
    for (button of myButtons){
        button.disabled = true;
    }
}
function selectSquare(){
    board.squareArray[this.value].updateSquare();
    if (board.isWinner(this.value)){
        board.highlight3InaRow(this.value);
        if (board.getWhoseTurn()){
            document.querySelector("#infoLine").innerHTML = "Congratulations! O wins!"
        }else{
            document.querySelector("#infoLine").innerHTML = "Congratulations! X wins!"
    }endGame()
    }else if (board.squaresFilled >= 9){
        document.querySelector("#infoLine").innerHTML = "It's a tie.";
        endGame();
    }
}
async function sendApiRequest() {
    var name = "professor+X"
    let getJSON = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=TR7JvKaI2dAZqkqXZXdjrfQBWDC244uE&q=${name}&limit=25&offset=0&rating=G&lang=en`);
    let gifs = await getJSON.json();
    let myURL = getURLs(gifs,Math.floor(Math.random()*10));
    //addImageToScreen(myURL);
}

function addImageToScreen(myURL){
    //console.log(myURL)
    //document.querySelector("#imageHere").innerHTML = ;
    //document.querySelector("#imageHere").innerHTML = `<img src="${myURL}" alt ="fred">`;
    
}
function getURLs(JSONgifs,posNum){
    console.log(JSONgifs.data[posNum].images.original_still.url);
    //return JSONgifs.data[posNum].images.original.url;
}

function main(){
    board = new Board();
    myReset = document.getElementById("reset1");
    myReset.addEventListener("click",reset1,false);
    squares = document.querySelectorAll(".square");
    for (var i = 0;i<9;i++){
        //squares[i].innerHTML = '<img src="puppy.jpg" width = 90% />'
        squares[i].addEventListener('click', selectSquare, false);
        squares[i].addEventListener('mouseover', function(){this.style.backgroundColor = "#AA0000";}, false);
        squares[i].addEventListener('mouseout', function(){this.style.backgroundColor = " #11bbcc";}, false);
    }
    sendApiRequest()
}
main();
    
    