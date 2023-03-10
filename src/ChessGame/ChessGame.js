//Global variables
var currentMoveSet;
var currenttile;
var currentPieceSelected;
var isWhiteTurn = true;
var totalMoveCounter = 0;

//For Castling
var numOfWhiteKingMoves = 0;
var numOfBlackKingMoves = 0;
var numOfWhiteRook1Moves = 0;
var numOfWhiteRook2Moves = 0;
var numOfBlackRook1Moves = 0;
var numOfBlackRook2Moves = 0;

//For En passant
const listOfAllPawns = 
['white-pawn-1', 'white-pawn-2', 'white-pawn-3', 'white-pawn-4', 'white-pawn-5', 'white-pawn-6', 'white-pawn-7', 'white-pawn-8', 
'black-pawn-1', 'black-pawn-2', 'black-pawn-3', 'black-pawn-4', 'black-pawn-5', 'black-pawn-6', 'black-pawn-7', 'black-pawn-8'];

const canBeEnPassented = 
[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

const canEnPassent = 
[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

const numOfPawnMoves = 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const turnEnPassantCanBePlayed = 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//For Promotion
var pawnToBePromoted;
var tilePawnWasOn;
var rookReservePiecePosition;
var horseReservePiecePosition;
var bishopReservePiecePosition;
var queenReservePiecePosition;

//For preventing check
var iPreserver = 0;

//Array of all tiles
const allTiles = 
['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8',
 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8',
 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8',
 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8',
 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8',
 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8',
 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8',
 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8']

 //Array of all pieces
 const allPieces = 
 ['white-pawn-1', 'white-pawn-2', 'white-pawn-3', 'white-pawn-4', 'white-pawn-5', 'white-pawn-6', 'white-pawn-7', 'white-pawn-8', 'white-rook-1', 'white-rook-2', 'white-horse-1', 'white-horse-2', 'white-bishop-1', 'white-bishop-2', 'white-queen', 'white-king', /* Promotion pieces -> */ 'white-rook-3', 'white-rook-4', 'white-rook-5', 'white-rook-6', 'white-rook-7', 'white-rook-8', 'white-rook-9', 'white-rook-10', 'white-horse-3', 'white-horse-4', 'white-horse-5', 'white-horse-6', 'white-horse-7', 'white-horse-8', 'white-horse-9', 'white-horse-10', 'white-bishop-3', 'white-bishop-4', 'white-bishop-5', 'white-bishop-6', 'white-bishop-7', 'white-bishop-8', 'white-bishop-9', 'white-bishop-10', 'white-queen-1', 'white-queen-2', 'white-queen-3', 'white-queen-4', 'white-queen-5', 'white-queen-6', 'white-queen-7', 'white-queen-8', 
 'black-pawn-1', 'black-pawn-2', 'black-pawn-3', 'black-pawn-4', 'black-pawn-5', 'black-pawn-6', 'black-pawn-7', 'black-pawn-8', 'black-rook-1', 'black-rook-2', 'black-horse-1', 'black-horse-2', 'black-bishop-1', 'black-bishop-2', 'black-queen', 'black-king', /* Promotion pieces -> */ 'black-rook-3', 'black-rook-4', 'black-rook-5', 'black-rook-6', 'black-rook-7', 'black-rook-8', 'black-rook-9', 'black-rook-10', 'black-horse-3', 'black-horse-4', 'black-horse-5', 'black-horse-6', 'black-horse-7', 'black-horse-8', 'black-horse-9', 'black-horse-10', 'black-bishop-3', 'black-bishop-4', 'black-bishop-5', 'black-bishop-6', 'black-bishop-7', 'black-bishop-8', 'black-bishop-9', 'black-bishop-10', 'black-queen-1', 'black-queen-2', 'black-queen-3', 'black-queen-4', 'black-queen-5', 'black-queen-6', 'black-queen-7', 'black-queen-8']
 
 //Array of Booleans for pieces [if true then piece is active on the board]
 const isActive =
[true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, /* Promotion pieces -> */ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, 
true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, /* Promotion pieces -> */ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]

const reservePieces =
['white-rook-3', 'white-rook-4', 'white-rook-5', 'white-rook-6', 'white-rook-7', 'white-rook-8', 'white-rook-9', 'white-rook-10', 'white-horse-3', 'white-horse-4', 'white-horse-5', 'white-horse-6', 'white-horse-7', 'white-horse-8', 'white-horse-9', 'white-horse-10', 'white-bishop-3', 'white-bishop-4', 'white-bishop-5', 'white-bishop-6', 'white-bishop-7', 'white-bishop-8', 'white-bishop-9', 'white-bishop-10', 'white-queen-1', 'white-queen-2', 'white-queen-3', 'white-queen-4', 'white-queen-5', 'white-queen-6', 'white-queen-7', 'white-queen-8',
'black-rook-3', 'black-rook-4', 'black-rook-5', 'black-rook-6', 'black-rook-7', 'black-rook-8', 'black-rook-9', 'black-rook-10', 'black-horse-3', 'black-horse-4', 'black-horse-5', 'black-horse-6', 'black-horse-7', 'black-horse-8', 'black-horse-9', 'black-horse-10', 'black-bishop-3', 'black-bishop-4', 'black-bishop-5', 'black-bishop-6', 'black-bishop-7', 'black-bishop-8', 'black-bishop-9', 'black-bishop-10', 'black-queen-1', 'black-queen-2', 'black-queen-3', 'black-queen-4', 'black-queen-5', 'black-queen-6', 'black-queen-7', 'black-queen-8']

//Sets piece isActive[] status
function updateIsActive(pieceId, active){
    for(i = 0; i < allPieces.length; i++){
        if(pieceId == allPieces[i]){
            //if true piece will be set as active, false if otherwise
            if(active){
                isActive[i] = true;
                break;
            }else{
                isActive[i] = false;
                console.log(pieceId + " has been captured!");
                break;
            }
            
        }
    }
}

 //Returns valid tiles orange that can be moved to
function displayValidMoves(moveSet){
    currentMoveSet = moveSet;
    //turns all possible move locations orange
    for(i = 0; i < moveSet.length; i++){
        document.getElementById(moveSet[i]).classList.add('possibleMove');    
    }
    //removes "checkTileAndGetMoveSet(id)" and adds "getPlayerMove(id)" on all tiles
    for(i = 0; i < allTiles.length; i++){
        document.getElementById(allTiles[i]).removeAttribute("onclick");
        document.getElementById(allTiles[i]).setAttribute("onclick", "getPlayerMove(id)");
    }
}

//Returns players move, either sends tile to "makeMove()" or "resetValidMoves()" depending on players next choice
function getPlayerMove(id){
    let playerMove = document.getElementById(id).id;
    let validMove = false;
    for(i = 0; i < currentMoveSet.length; i++){
        if(playerMove == currentMoveSet[i]){
            if(document.getElementById(playerMove).childNodes.length > 0){
                let pieceId = document.getElementById(playerMove).childNodes;
                updateIsActive(pieceId[0].id, false);
            }
            makeMove(playerMove);
            validMove = true;
        }
    }
    if(!validMove){
        resetVaildMoves();
    }
}

//Takes players move from "getPlayerMove()" and moves piece on board, then calls "resetValidMoves()"
function makeMove(playerMove){
    //make piece move to selected location
    piece = document.getElementById(currenttile).innerHTML;
    document.getElementById(playerMove).innerHTML = piece;
    document.getElementById(currenttile).innerHTML = '';
    //if castling
    if(numOfWhiteKingMoves == 0 && numOfWhiteRook1Moves == 0 && currentPieceSelected == 'white-king' && playerMove == 'h3'){
        let whiterook1 = document.getElementById('h1').innerHTML;
        document.getElementById('h4').innerHTML = whiterook1;
        document.getElementById('h1').innerHTML = '';
    }else if(numOfWhiteKingMoves == 0 && numOfWhiteRook2Moves == 0 && currentPieceSelected == 'white-king' && playerMove == 'h7'){
        let whiterook2 = document.getElementById('h8').innerHTML;
        document.getElementById('h6').innerHTML = whiterook2;
        document.getElementById('h8').innerHTML = '';
    }else if(numOfBlackKingMoves == 0 && numOfBlackRook1Moves == 0 && currentPieceSelected == 'black-king' && playerMove == 'a3'){
        let blackrook1 = document.getElementById('a1').innerHTML;
        document.getElementById('a4').innerHTML = blackrook1;
        document.getElementById('a1').innerHTML = '';
    }else if(numOfBlackKingMoves == 0 && numOfBlackRook2Moves == 0 && currentPieceSelected == 'black-king' && playerMove == 'a7'){
        let blackrook2 = document.getElementById('a8').innerHTML;
        document.getElementById('a6').innerHTML = blackrook2;
        document.getElementById('a8').innerHTML = '';
    }
    //increment move count
    piece = document.getElementById(playerMove).children;
    if(piece[0].id == 'white-rook-1'){
        numOfWhiteRook1Moves++;
    }
    if(piece[0].id == 'white-rook-2'){
        numOfWhiteRook2Moves++;
    }
    if(piece[0].id == 'white-king'){
        numOfWhiteKingMoves++;
    }
    if(piece[0].id == 'black-rook-1'){
        numOfBlackRook1Moves++;
    }
    if(piece[0].id == 'black-rook-2'){
        numOfBlackRook2Moves++;
    }
    if(piece[0].id == 'black-king'){
        numOfBlackKingMoves++;
    }
    if(piece[0].id == 'white-pawn-1'){
        numOfPawnMoves[0]++;
    }
    if(piece[0].id == 'white-pawn-2'){
        numOfPawnMoves[1]++;
    }
    if(piece[0].id == 'white-pawn-3'){
        numOfPawnMoves[2]++;
    }
    if(piece[0].id == 'white-pawn-4'){
        numOfPawnMoves[3]++;
    }
    if(piece[0].id == 'white-pawn-5'){
        numOfPawnMoves[4]++;
    }
    if(piece[0].id == 'white-pawn-6'){
        numOfPawnMoves[5]++;
    }
    if(piece[0].id == 'white-pawn-7'){
        numOfPawnMoves[6]++;
    }
    if(piece[0].id == 'white-pawn-8'){
        numOfPawnMoves[7]++;
    }
    if(piece[0].id == 'black-pawn-1'){
        numOfPawnMoves[8]++;
    }
    if(piece[0].id == 'black-pawn-2'){
        numOfPawnMoves[9]++;
    }
    if(piece[0].id == 'black-pawn-3'){
        numOfPawnMoves[10]++;
    }
    if(piece[0].id == 'black-pawn-4'){
        numOfPawnMoves[11]++;
    }
    if(piece[0].id == 'black-pawn-5'){
        numOfPawnMoves[12]++;
    }
    if(piece[0].id == 'black-pawn-6'){
        numOfPawnMoves[13]++;
    }
    if(piece[0].id == 'black-pawn-7'){
        numOfPawnMoves[14]++;
    }
    if(piece[0].id == 'black-pawn-8'){
        numOfPawnMoves[15]++;
    }
    //if En Passent was played
    checkIfEnPassentWasPlayed();
    //checks if any pawns can be En Passented
    checkEnPassent();

    document.getElementById('sub-announcer').innerHTML = '';
    if(isWhiteTurn){
        isWhiteTurn = false;
        document.getElementById('announcer').innerHTML = "Black's turn";
        isCheck('black-king');
        if(!isCheckmate('black-king')){
            isStalemate('black-king');
        }
    }else{
        isWhiteTurn = true;
        document.getElementById('announcer').innerHTML = "White's turn";
        isCheck('white-king');
        if(!isCheckmate('white-king')){
            isStalemate('white-king');
        }
    }
    resetVaildMoves();
    checkPromotion();
    totalMoveCounter++;
}

//Checks if En Passent was played and removes appropriate pawn
function checkIfEnPassentWasPlayed(){
    let preserveI;
    for(i = 0; i < listOfAllPawns.length; i++){
        preserveI = i;
        //checks if pawn is active and can be En Passented
        if(isActive[allPieces.indexOf(listOfAllPawns[i])] && canBeEnPassented[i]){
            //checks if enemy pawn is behind pawn
            if(listOfAllPawns[i].includes('white')){
            let allVerticals = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            let tile = document.getElementById(listOfAllPawns[i]).parentNode.id;
            let tileArray = tile.split('');
            let index = allVerticals.indexOf(tileArray[0]);
            index = index + 1;
            tileArray[0] = allVerticals[index];
            tile = tileArray.join('');
                try{
                    if(document.getElementById(tile).childNodes[0].id.includes('black-pawn')){
                        //checks if enemy pawn has canEnPassent as true
                        let checkPiece = document.getElementById(tile).childNodes[0].id;
                        let checkPieceForEnPassent = canEnPassent[listOfAllPawns.indexOf(checkPiece)];
                        if(checkPieceForEnPassent){
                            //set piece to inactive and remove piece from board
                            updateIsActive(listOfAllPawns[i], false);
                            document.getElementById(listOfAllPawns[i]).parentNode.innerHTML = '';
                        }

                    }
                }catch(err){

                }
            }
        //checks if enemy pawn is behind pawn
        if(listOfAllPawns[i].includes('black')){
            let allVerticals = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            let tile = document.getElementById(listOfAllPawns[i]).parentNode.id;
            let tileArray = tile.split('');
            let index = allVerticals.indexOf(tileArray[0]);
            index = index - 1;
            tileArray[0] = allVerticals[index];
            tile = tileArray.join('');
                try{
                    if(document.getElementById(tile).childNodes[0].id.includes('white-pawn')){
                        //checks if enemy pawn has canEnPassent as true
                        let checkPiece = document.getElementById(tile).childNodes[0].id;
                        let checkPieceForEnPassent = canEnPassent[listOfAllPawns.indexOf(checkPiece)];
                        if(checkPieceForEnPassent){
                            //set piece to inactive and remove piece from board
                            updateIsActive(listOfAllPawns[i], false);
                            i = preserveI;
                            document.getElementById(listOfAllPawns[i]).parentNode.innerHTML = '';
                        }

                    }
                }catch(err){
                    
                }
            }
        }
    }
}

//Checks for checkmate
function isCheckmate(king){
    let checkArray = [];
    let message;
    let tile = document.getElementById(king).parentNode.id;
    if(king.includes('white')){
        message = 'Black Wins!';
    }else{
        message = 'White Wins!';
    }
    //if in check sees if any other friendly tile can prevent checkmate
    if(isUnderAttack(king, tile) && getRuleSet(king, tile, true) == 0){
        for(i = 0; i < allPieces.length; i++){
            if(king.includes('white') && allPieces[i].includes('white') && isActive[i]){
                checkArray.push(allPieces[i]);
            }else if(king.includes('black') && allPieces[i].includes('black') && isActive[i]){
                checkArray.push(allPieces[i]);
            }
        }
        let checkArrayTile;
        for(p = 0; p < checkArray.length; p++){
            checkArrayTile = document.getElementById(checkArray[p]).parentNode.id;
            if(getRuleSet(checkArray[p], checkArrayTile, true).length > 0){
                return false;
            }
        }
        document.getElementById('announcer').innerHTML = 'Checkmate'
        document.getElementById('sub-announcer').innerHTML = message;
        return true;
    }
    
}

//Checks for check
function isCheck(king){
    let message;
    let tile = document.getElementById(king).parentNode.id;
    if(king.includes('white')){
        message = 'White king is currently in check'
    }else{
        message = 'Black king is currently in check'
    }
    if(isUnderAttack(king, tile)){
        document.getElementById('sub-announcer').innerHTML = message;
    }
}

//Checks for stalemate
function isStalemate(king){
    let tile = document.getElementById(king).parentNode.id;
    //Might need to change to false
    if(!isCheck(king) && getRuleSet(king, tile, true) == 0){
        //gets array of all friendly pieces
        let checkArray = [];
        for(i = 0; i < allPieces.length; i++){
            if(king.includes('white')){
                if(allPieces[i].includes('white') && isActive[i]){
                    checkArray.push(allPieces[i]);
                }
            }else{
                if(allPieces[i].includes('black') && isActive[i]){
                    checkArray.push(allPieces[i]);
                }
            }
        }
        //gets movesets for all friendly pieces
        for(i = 0; i < checkArray.length; i++){
            let checkTile = document.getElementById(checkArray[i]).parentNode.id;
            //Might need to change to false
            if(getRuleSet(checkArray[i], checkTile, true).length > 0){
                return false;                
            }
        }
        //Stalemate has occured
        document.getElementById('announcer').innerHTML = 'Stalemate'
        document.getElementById('sub-announcer').innerHTML = 'Game has ended in a draw';
    }
}

//checks if pawn can be promoted
function checkPromotion(){
    promotionArray = [];
    for(i = 0; i < allPieces.length; i++){
            if(allPieces[i].includes('pawn') && isActive[i] == true){
                promotionArray.push(allPieces[i]);                
            }
    }
    for(i = 0; i < promotionArray.length; i++){
        let tile = document.getElementById(promotionArray[i]).parentNode.id;
        tileBreakdown = tile.split('');
        if(tileBreakdown[0] == 'a' || tileBreakdown[0] == 'h'){
            pawnToBePromoted = promotionArray[i];
            tilePawnWasOn = tile;
            //open pop-up window for player to choose a promotion
            if(tileBreakdown[0] == 'a'){
                //for white
                for(i = 16; i < 24; i++){
                    if(!isActive[i]){
                        var pieceHolder = document.getElementById(allPieces[i]).outerHTML;
                        rookReservePiecePosition = reservePieces.indexOf(allPieces[i]) + 1;
                        rookReservePiecePosition = 'storagePiece' + rookReservePiecePosition;
                        document.getElementById('rook').innerHTML = pieceHolder;
                        break;
                    }                    
                }
                for(i = 24; i < 32; i++){
                    if(!isActive[i]){
                        var pieceHolder = document.getElementById(allPieces[i]).outerHTML;
                        horseReservePiecePosition = reservePieces.indexOf(allPieces[i]) + 1;
                        horseReservePiecePosition = 'storagePiece' + horseReservePiecePosition;
                        document.getElementById('horse').innerHTML = pieceHolder;
                        break;
                    }
                }
                for(i = 32; i < 40; i++){
                    if(!isActive[i]){
                        var pieceHolder = document.getElementById(allPieces[i]).outerHTML;
                        bishopReservePiecePosition = reservePieces.indexOf(allPieces[i]) + 1;
                        bishopReservePiecePosition = 'storagePiece' + bishopReservePiecePosition;
                        document.getElementById('bishop').innerHTML = pieceHolder;
                        break;
                    }
                }
                for(i = 40; i < 48; i++){
                    if(!isActive[i]){
                        var pieceHolder = document.getElementById(allPieces[i]).outerHTML;
                        queenReservePiecePosition = reservePieces.indexOf(allPieces[i]) + 1;
                        queenReservePiecePosition = 'storagePiece' + queenReservePiecePosition;
                        document.getElementById('queen').innerHTML = pieceHolder;
                        break;
                    }
                }
            }else{
                //for black
                 for(i = 64; i < 72; i++){
                    if(!isActive[i]){
                        var pieceHolder = document.getElementById(allPieces[i]).outerHTML;
                        rookReservePiecePosition = reservePieces.indexOf(allPieces[i]) + 1;
                        rookReservePiecePosition = 'storagePiece' + rookReservePiecePosition;
                        document.getElementById('rook').innerHTML = pieceHolder;
                        break;
                    }                    
                }
                for(i = 72; i < 80; i++){
                    if(!isActive[i]){
                        var pieceHolder = document.getElementById(allPieces[i]).outerHTML;
                        horseReservePiecePosition = reservePieces.indexOf(allPieces[i]) + 1;
                        horseReservePiecePosition = 'storagePiece' + horseReservePiecePosition;
                        document.getElementById('horse').innerHTML = pieceHolder;
                        break;
                    }
                }
                for(i = 80; i < 88; i++){
                    if(!isActive[i]){
                        var pieceHolder = document.getElementById(allPieces[i]).outerHTML;
                        bishopReservePiecePosition = reservePieces.indexOf(allPieces[i]) + 1;
                        bishopReservePiecePosition = 'storagePiece' + bishopReservePiecePosition;
                        document.getElementById('bishop').innerHTML = pieceHolder;
                        break;
                    }
                }
                for(i = 88; i < 96; i++){
                    if(!isActive[i]){
                        var pieceHolder = document.getElementById(allPieces[i]).outerHTML;
                        queenReservePiecePosition = reservePieces.indexOf(allPieces[i]) + 1;
                        queenReservePiecePosition = 'storagePiece' + queenReservePiecePosition;
                        document.getElementById('queen').innerHTML = pieceHolder;
                        break;
                    }
                }

            }
            document.getElementById('promotionMenu').style.visibility = 'visible';
        }
    }
}

//Checks if pawn can be En Passented
function checkEnPassent(){
    //get array of all pawns
    let checkArray = [];
    let checkArrayWhite = [];
    let checkArrayBlack = [];
    for(i = 0; i < allPieces.length; i++){
        if(allPieces[i].includes('pawn')){
            checkArray.push(allPieces[i]);
        }
    }
    for(i = 0; i < checkArray.length; i++){
        if(checkArray[i].includes('white')){
            checkArrayWhite.push(checkArray[i]);
        }else{
            checkArrayBlack.push(checkArray[i]);
        }
    }
    //Checks if pawn is in En Passent
    for(e = 0; e < checkArrayWhite.length; e++){
        let checkTile = 'e' + (1+e);
        let checkTileRight = 'e' + (2+e);
        let checkTileLeft = 'e' + e;
        //check if pawn is active
        if(isActive[allPieces.indexOf(checkArrayWhite[e])]){
            if(document.getElementById(checkArrayWhite[e]).parentNode.id == checkTile && numOfPawnMoves[e] == 1 && turnEnPassantCanBePlayed[e] == 0){
                try{
                    if(document.getElementById(checkTileLeft).childNodes[0].id.includes('black-pawn')){
                        canBeEnPassented[e] = true;
                        turnEnPassantCanBePlayed[e] = totalMoveCounter++;
                        canEnPassent[listOfAllPawns.indexOf(document.getElementById(checkTileLeft).childNodes[0].id)] = true;
                    }
                }catch(err){

                }
                try{
                    if(document.getElementById(checkTileRight).childNodes[0].id.includes('black-pawn')){
                        canBeEnPassented[e] = true;
                        turnEnPassantCanBePlayed[e] = totalMoveCounter++;
                        canEnPassent[listOfAllPawns.indexOf(document.getElementById(checkTileRight).childNodes[0].id)] = true;
                    }
                }catch(err){

                }            
            }else{
                canBeEnPassented[e] = false;
            }
        }
    }
    //check if pawn is active
    for(i = 0; i < checkArrayBlack.length; i++){
        let checkTile = 'd' + (1+i);
        let checkTileRight = 'd' + (2+i);
        let checkTileLeft = 'd' + (i);
        if(isActive[allPieces.indexOf(checkArrayBlack[i])]){
            if(document.getElementById(checkArrayBlack[i]).parentNode.id == checkTile && numOfPawnMoves[(i + 8)] == 1 && turnEnPassantCanBePlayed[(i + 8)] == 0){
                try{
                    if(document.getElementById(checkTileLeft).childNodes[0].id.includes('white-pawn')){
                        canBeEnPassented[(i + 8)] = true;
                        turnEnPassantCanBePlayed[(i + 8)] = totalMoveCounter++;
                        canEnPassent[listOfAllPawns.indexOf(document.getElementById(checkTileLeft).childNodes[0].id)] = true;
                    }
                }catch(err){

                }
                try{
                    if(document.getElementById(checkTileRight).childNodes[0].id.includes('white-pawn')){
                        canBeEnPassented[(i + 8)] = true;
                        turnEnPassantCanBePlayed[(i + 8)] = totalMoveCounter++;
                        canEnPassent[listOfAllPawns.indexOf(document.getElementById(checkTileRight).childNodes[0].id)] = true;
                    }
                }catch(err){

                }            
            }else{
                canBeEnPassented[(i + 8)] = false;
            }
        }
    }
}
//Promotion a piece
function promote(id){
    //changes pawn out for promoted piece
    if(id == 'rook'){
        document.getElementById(rookReservePiecePosition).innerHTML = '';
        document.getElementById(pawnToBePromoted).parentNode.innerHTML = document.getElementById('rook').innerHTML;
        var newPiece = document.getElementById(tilePawnWasOn).childNodes[0].id;
        //updates isActive array
        updateIsActive(pawnToBePromoted, false);
        updateIsActive(newPiece ,true);
        //deletes piece from storage
    }else if(id == 'horse'){
        document.getElementById(horseReservePiecePosition).innerHTML = '';
        document.getElementById(pawnToBePromoted).parentNode.innerHTML = document.getElementById('horse').innerHTML;
        var newPiece = document.getElementById(tilePawnWasOn).childNodes[0].id;
        //updates isActive array
        updateIsActive(pawnToBePromoted, false);
        updateIsActive(newPiece ,true);
    }else if(id == 'bishop'){
        document.getElementById(bishopReservePiecePosition).innerHTML = '';
        document.getElementById(pawnToBePromoted).parentNode.innerHTML = document.getElementById('bishop').innerHTML;
        var newPiece = document.getElementById(tilePawnWasOn).childNodes[0].id;
        //updates isActive array
        updateIsActive(pawnToBePromoted, false);
        updateIsActive(newPiece ,true);
    }else{
        document.getElementById(queenReservePiecePosition).innerHTML = '';
        document.getElementById(pawnToBePromoted).parentNode.innerHTML = document.getElementById('queen').innerHTML;
        var newPiece = document.getElementById(tilePawnWasOn).childNodes[0].id;
        //updates isActive array
        updateIsActive(pawnToBePromoted, false);
        updateIsActive(newPiece ,true);
    }
    //resets promotion window and closes window
    document.getElementById('promotionMenu').style.visibility = 'hidden';
    document.getElementById('rook').innerHTML = '';
    document.getElementById('horse').innerHTML = '';
    document.getElementById('bishop').innerHTML = '';
    document.getElementById('queen').innerHTML = '';
}

//Checks if a piece moves it puts the king under attack [true if yes]
function indangersKings(pieceId, nextTile){
    let king;
    let tile;
    if(pieceId.includes('white')){
        king = 'white-king';
    }else{
        king = 'black-king';
    }
    attackedPiece = document.getElementById(nextTile).innerHTML;
    originalTile = document.getElementById(pieceId).parentNode.id;
    pieceMover = document.getElementById(pieceId).outerHTML;
    document.getElementById(pieceId).parentNode.innerHTML = "";
    //if move doesn't involve capturing a piece
    if(attackedPiece == undefined || attackedPiece == null || attackedPiece == ''){
        document.getElementById(nextTile).innerHTML = pieceMover;
        tile = document.getElementById(king).parentNode.id;
        if(isUnderAttack(king, tile)){
            document.getElementById(nextTile).innerHTML = "";
            document.getElementById(originalTile).innerHTML = pieceMover;
            return true; 
        }else{
            document.getElementById(nextTile).innerHTML = "";
            document.getElementById(originalTile).innerHTML = pieceMover;
            return false
        }
    }else{
        attackedPieceId = document.getElementById(nextTile).childNodes[0].id;
        document.getElementById(nextTile).innerHTML = "";
        //temporaraly change isActive
        updateIsActive(attackedPieceId, false);
        tile = document.getElementById(king).parentNode.id;
        document.getElementById(nextTile).innerHTML = pieceMover;
        if(isUnderAttack(king, tile)){
            document.getElementById(nextTile).innerHTML = attackedPiece;
            updateIsActive(attackedPieceId, true);
            document.getElementById(originalTile).innerHTML = pieceMover;
            return true;
        }else{
            document.getElementById(nextTile).innerHTML = attackedPiece;
            updateIsActive(attackedPieceId, true);
            document.getElementById(originalTile).innerHTML = pieceMover;
            return false;
        }
    }
}
 //Removes "getPlayerMove(id)" and adds "checkTileAndGetMoveSet(id)" on all tiles
function resetVaildMoves(){
    for(i = 0; i < allTiles.length; i++){
        document.getElementById(allTiles[i]).classList.remove('possibleMove');
    }
    for(i =0; i < allTiles.length; i++){
        document.getElementById(allTiles[i]).removeAttribute("onclick");
        document.getElementById(allTiles[i]).setAttribute("onclick", "checkTileAndGetMoveSet(id)");
    }
    currentMoveSet = '';
    currenttile = '';
}

//Checks if a tile is empty or not [True if empty]
 function isEmpty(tile){
    try{
        var check = document.getElementById(tile).children;
        if(check[0].id == ''){
            return true;
        }else{
            return false;
        }
    }catch(err){
        return true;
    }
}

//Checks if tile is currently under attack [True if tile is under attack]
function isUnderAttack(pieceId, tile){
    //get pieceid color
    let breakdown = pieceId.split('-');
    //get array of all opposing pieces
    let checkArray = [];
    if(breakdown[0] == 'black'){
            for(i = 0; i < 47; i++){
                if(isActive[i] == true){
                    checkArray.push(allPieces[i]);
                }
            }
        }else{
            for(i = 48; i < 95; i++){
                if(isActive[i] == true){
                    checkArray.push(allPieces[i]);
                }
            }
        }
    //check if any opposing pieces can attack the passed tile.
    let iHolder;
    for(i = 0; i < checkArray.length; i++){
        iHolder = i;
        let checkArrayTile = document.getElementById(checkArray[i]).parentNode;
        i = iHolder;
        let moveset = getRuleSet(checkArray[i], checkArrayTile.id, false);
        i = iHolder;
        if(moveset.length == 0 && checkArray[i].includes('pawn') == false){
            i = iHolder;
            continue;
        }
        if(checkArray[i].includes('pawn')){
            //empties moveset
            moveset.length = 0;
            const allVerticals = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            tileHolder = document.getElementById(checkArray[i]).parentNode.id;
            if(checkArray[i].includes('white')){
                tileHolderArray = tileHolder.split('');
                //gets tile infront of pawn
                tileHolderArray[0] = allVerticals.indexOf(tileHolderArray[0])-1;
                tileHolderArray[0] = allVerticals[tileHolderArray[0]];
                //gets diagonal right tile
                tileHolderArray[1] = parseInt(tileHolderArray[1])+1;
                if(0 < tileHolderArray[1] && tileHolderArray[1] < 9){
                    tileHolder = tileHolderArray.join('');
                    moveset.push(tileHolder);
                }
                //gets diagonal left tile
                tileHolderArray[1] = parseInt(tileHolderArray[1])-2;
                if(0 < tileHolderArray[1] && tileHolderArray[1] < 9){
                    tileHolder = tileHolderArray.join('');
                    moveset.push(tileHolder);
                }
            }else{
                tileHolderArray = tileHolder.split('');
                //gets tile infront of pawn
                tileHolderArray[0] = allVerticals.indexOf(tileHolderArray[0])+1;
                tileHolderArray[0] = allVerticals[tileHolderArray[0]];
                //gets diagonal right tile
                tileHolderArray[1] = parseInt(tileHolderArray[1])+1;
                if(0 < tileHolderArray[1] && tileHolderArray[1] < 9){
                    tileHolder = tileHolderArray.join('');
                    moveset.push(tileHolder);
                }
                //gets diagonal left tile
                tileHolderArray[1] = parseInt(tileHolderArray[1])-2;
                if(0 < tileHolderArray[1] && tileHolderArray[1] < 9){
                    tileHolder = tileHolderArray.join('');
                    moveset.push(tileHolder);
                }
            }
        }
        for(k = 0; k < moveset.length; k++){
            if(tile == moveset[k]){
                return true;
            }
        }
        i = iHolder;
    }
    return false;
}

//Checks if king will be under attack if it takes an enemy piece [True if tile is under attack]
function willBeUnderAttack(pieceId, nextTile){
    pieceHolder = document.getElementById(nextTile).innerHTML;
     //temporarily changes isActive[]
     updateIsActive(document.getElementById(nextTile).childNodes[0].id, false);
    document.getElementById(nextTile).innerHTML = '';
    if(isUnderAttack(pieceId, nextTile)){
        document.getElementById(nextTile).innerHTML = pieceHolder;
        updateIsActive(document.getElementById(nextTile).childNodes[0].id, true);
        return true;
    }else{
        document.getElementById(nextTile).innerHTML = pieceHolder;
        updateIsActive(document.getElementById(nextTile).childNodes[0].id, true);
        return false;
    }
}

//Checks if a piece can attack another piece [True if empty]
function canAttack(pieceId, tileId){
    try{
        let attacker = document.getElementById(pieceId).getAttribute("class");
        let opposition = document.getElementById(tileId).children[0].getAttribute('class');
    if(attacker == opposition){
        return false;
    }else{
        return true;
    }
    }catch(err){
        return true;
    }

} 

//Checks what piece is on a tile, then calls "getRuleSet()" and passes the output as a parameter to "displayValidMoves()" 
function checkTileAndGetMoveSet(id){
    try{
    var tile = document.getElementById(id).getAttribute('id');
    var pieceId = document.getElementById(id).children;
    currenttile = tile;
    console.log('clicked tile contains piece ' + pieceId[0].id);
    currentPieceSelected = pieceId[0].id;
    if(isWhiteTurn && pieceId[0].id.includes('white')){
        displayValidMoves(getRuleSet(pieceId[0].id, tile, true));
    }else if(!isWhiteTurn && pieceId[0].id.includes('black')){
        displayValidMoves(getRuleSet(pieceId[0].id, tile, true));
    }
    }catch(err){
        console.log('tile is empty')
    }
}
//Gets moveset of an individual piece
function getRuleSet(pieceId, tile, check){
    //used to navigate and check vertically
    const allVerticals = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const allVerticals1 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    //defines all pieces movesets
    if(pieceId == 'white-king'){
        let moveSet = [];
        let tileArray = tile.split('');
        let wasChecked = false;
        //check tile above
        let mover = allVerticals.indexOf(tileArray[0]);
        mover--;
        tileArray[0] = allVerticals[mover];
        let nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    if(check && !wasChecked){
                        if(!isUnderAttack(pieceId, nextTile) && !indangersKings(pieceId, nextTile)){
                            moveSet.push(nextTile);
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                    wasChecked = true;
                    break;            
                }else if(canAttack(pieceId, nextTile)){
                    wasChecked = false;
                    if(check && !wasChecked){
                        if(!willBeUnderAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            wasChecked = true;
                            break;
                        }else{
                            wasChecked = true;
                            break;
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        wasChecked = false;
        //check tile below
        tileArray = tile.split('');
        mover = allVerticals.indexOf(tileArray[0]);
        mover++;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    if(check && !wasChecked){
                        if(!isUnderAttack(pieceId, nextTile) && !indangersKings(pieceId, nextTile)){
                            moveSet.push(nextTile);
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                    wasChecked = true;  
                    break;          
                }else if(canAttack(pieceId, nextTile)){
                    wasChecked = false;
                    if(check && !wasChecked){
                        //add method to check if king would be underattack if enemyy piece is taken
                        if(!willBeUnderAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            wasChecked = true;
                            break;
                        }else{
                            wasChecked = true;
                            break;
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        wasChecked = false;
        //check tile to left
        tileArray = tile.split('');
        mover = tileArray[1];
        mover--;
        tileArray[1] = mover;        
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    if(check && !wasChecked){
                        if(!isUnderAttack(pieceId, nextTile) && !indangersKings(pieceId, nextTile)){
                            moveSet.push(nextTile);
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                    wasChecked = true;       
                    break;     
                }else if(canAttack(pieceId, nextTile)){
                    wasChecked = false;
                    if(check && !wasChecked){
                        //add method to check if king would be underattack if enemyy piece is taken
                        if(!willBeUnderAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            wasChecked = true;
                            break;
                        }else{
                            wasChecked = true;
                            break;
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        wasChecked = false;
        //check tile to right
        tileArray = tile.split('');
        mover = tileArray[1];
        mover++;
        tileArray[1] = mover;        
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    if(check && !wasChecked){
                        if(!isUnderAttack(pieceId, nextTile) && !indangersKings(pieceId, nextTile)){
                            moveSet.push(nextTile);
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                    wasChecked = true;  
                    break;          
                }else if(canAttack(pieceId, nextTile)){
                    wasChecked = false;
                    if(check && !wasChecked){
                        //add method to check if king would be underattack if enemyy piece is taken
                        if(!willBeUnderAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            wasChecked = true;
                            break;
                        }else{
                            wasChecked = true;
                            break;
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        wasChecked = false;
        //check tile top-left
        tileArray = tile.split('');
        mover = tileArray[1];
        mover--;
        tileArray[1] = mover;
        mover = allVerticals.indexOf(tileArray[0]);
        mover--;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    if(check && !wasChecked){
                        if(!isUnderAttack(pieceId, nextTile) && !indangersKings(pieceId, nextTile)){
                            moveSet.push(nextTile);
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                    wasChecked = true;   
                    break;         
                }else if(canAttack(pieceId, nextTile)){
                    wasChecked = false;
                    if(check && !wasChecked){
                        //add method to check if king would be underattack if enemyy piece is taken
                        if(!willBeUnderAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            wasChecked = true;
                            break;
                        }else{
                            wasChecked = true;
                            break;
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        wasChecked = false;
        //check tile top-right
        tileArray = tile.split('');
        mover = tileArray[1];
        mover++;
        tileArray[1] = mover;
        mover = allVerticals.indexOf(tileArray[0]);
        mover--;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    if(check && !wasChecked){
                        if(!isUnderAttack(pieceId, nextTile) && !indangersKings(pieceId, nextTile)){
                            moveSet.push(nextTile);
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                    wasChecked = true;    
                    break;        
                }else if(canAttack(pieceId, nextTile)){
                    wasChecked = false;
                    if(check && !wasChecked){
                        //add method to check if king would be underattack if enemyy piece is taken
                        if(!willBeUnderAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            wasChecked = true;
                            break;
                        }else{
                            wasChecked = true;
                            break;
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        wasChecked = false;
        //check tile bottom-left
        tileArray = tile.split('');
        mover = tileArray[1];
        mover--;
        tileArray[1] = mover;
        mover = allVerticals.indexOf(tileArray[0]);
        mover++;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    if(check && !wasChecked){
                        if(!isUnderAttack(pieceId, nextTile) && !indangersKings(pieceId, nextTile)){
                            moveSet.push(nextTile);
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                    wasChecked = true;
                    break;            
                }else if(canAttack(pieceId, nextTile)){
                    wasChecked = false;
                    if(check && !wasChecked){
                        //add method to check if king would be underattack if enemyy piece is taken
                        if(!willBeUnderAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            wasChecked = true;
                            break;
                        }else{
                            wasChecked = true;
                            break;
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        wasChecked = false;
        //check tile bottom-right
        tileArray = tile.split('');
        mover = tileArray[1];
        mover++;
        tileArray[1] = mover;
        mover = allVerticals.indexOf(tileArray[0]);
        mover++;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    if(check && !wasChecked){
                        if(!isUnderAttack(pieceId, nextTile) && !indangersKings(pieceId, nextTile)){
                            moveSet.push(nextTile);
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                    wasChecked = true;   
                    break;         
                }else if(canAttack(pieceId, nextTile)){
                    wasChecked = false;
                    if(check && !wasChecked){
                        //add method to check if king would be underattack if enemyy piece is taken
                        if(!willBeUnderAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            wasChecked = true;
                            break;
                        }else{
                            wasChecked = true;
                            break;
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                }
            }
        }

        wasChecked = false;
        //check if castling can be preformed
        if(numOfWhiteKingMoves == 0 && numOfWhiteRook1Moves == 0 && isActive[8] && isEmpty('h2') && isEmpty('h3') && isEmpty('h4') && !isUnderAttack(pieceId, 'h3') && !isUnderAttack(pieceId, 'h5')){
            moveSet.push('h3');
        }
        if(numOfWhiteKingMoves == 0 && numOfWhiteRook2Moves == 0 && isActive[9] && isEmpty('h6') && isEmpty('h7') && !isUnderAttack(pieceId, 'h7') && !isUnderAttack(pieceId, 'h5')){
            moveSet.push('h7');
        }
        return moveSet;
    }else if(pieceId.includes('queen')){
        let moveSet = [];
        let tileArray = tile.split('');
        //less than horizontal check
        for(i = tileArray[1]; i > 0; i--){
            tileArray[1] = i;
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //greater than horizontal check
        tileArray = tile.split('');        
        for(i = tileArray[1]; i <= 8; i++){
            tileArray[1] = i;
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //less than vertical check
        tileArray = tile.split('');
        for(i = allVerticals.indexOf(tileArray[0]); i >= 0; i--){
            tileArray[0] = allVerticals[i];
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //greater than vertical check
        tileArray = tile.split('');
        for(i = allVerticals.indexOf(tileArray[0]); i < 8; i++){
            tileArray[0] = allVerticals[i];
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        tileArray = tile.split('');
        let vertical = allVerticals.indexOf(tileArray[0]);
        let isDone = false;
        //greater than right diagonal check (/) ->
        for(i = tileArray[1]; i <= 8; i++){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical--;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            }
            if(isDone){
                break;
            } 
        }
        //less than right diagonal check (/) <-
        tileArray = tile.split('');
        vertical = allVerticals.indexOf(tileArray[0]);
        tileArray[0] = allVerticals[vertical];
        isDone = false;
        for(i = tileArray[1]; i > 0; i--){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical++;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            }
            if(isDone){
                break;
            }  
        }
        //less than left diagonal check (\) <-
        tileArray = tile.split('');
        vertical = allVerticals.indexOf(tileArray[0]);
        tileArray[0] = allVerticals[vertical];
        isDone = false;
        for(i = tileArray[1]; i > 0; i--){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical--;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            }
            if(isDone){
                break;
            }  
        }
        //greater than left diagonal check (\) ->
        tileArray = tile.split('');
        vertical = allVerticals.indexOf(tileArray[0]);
        tileArray[0] = allVerticals[vertical];
        isDone = false;
        for(i = tileArray[1]; i <= 8; i++){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical++;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            } 
            if(isDone){
                break;
            } 
        }
        //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
        return moveSet;      
    }else if(pieceId.includes('bishop')){
        let moveSet = [];
        let tileArray = tile.split('');
        let vertical = allVerticals.indexOf(tileArray[0]);
        let isDone = false;
        //greater than right diagonal check (/) ->
        for(i = tileArray[1]; i <= 8; i++){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical--;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            }
            if(isDone){
                break;
            } 
        }
        //less than right diagonal check (/) <-
        tileArray = tile.split('');
        vertical = allVerticals.indexOf(tileArray[0]);
        tileArray[0] = allVerticals[vertical];
        isDone = false;
        for(i = tileArray[1]; i > 0; i--){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical++;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            }
            if(isDone){
                break;
            }  
        }
        //less than left diagonal check (\) <-
        tileArray = tile.split('');
        vertical = allVerticals.indexOf(tileArray[0]);
        tileArray[0] = allVerticals[vertical];
        isDone = false;
        for(i = tileArray[1]; i > 0; i--){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical--;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            }
            if(isDone){
                break;
            }  
        }
        //greater than left diagonal check (\) ->
        tileArray = tile.split('');
        vertical = allVerticals.indexOf(tileArray[0]);
        tileArray[0] = allVerticals[vertical];
        isDone = false;
        for(i = tileArray[1]; i <= 8; i++){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical++;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            } 
            if(isDone){
                break;
            } 
        }
        //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
        return moveSet;        
    }else if(pieceId.includes('horse')){
        let moveSet = [];
        let tileArray = tile.split('');
        //check top moves
        let mover = allVerticals.indexOf(tileArray[0]);
        mover = mover - 2;
        tileArray[0] = allVerticals[mover];
        tileArray[1] = parseInt(tileArray[1]) + 1;
        let nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray[1] = parseInt(tileArray[1]) - 2;
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray = tile.split('');
        //check bottom moves
        mover = allVerticals.indexOf(tileArray[0]);
        mover = mover + 2;
        tileArray[0] = allVerticals[mover];
        tileArray[1] = parseInt(tileArray[1]) + 1;
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray[1] = parseInt(tileArray[1]) - 2;
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray = tile.split('');
        //check left moves
        tileArray[1] = tileArray[1] - 2;
        mover = allVerticals.indexOf(tileArray[0]);
        mover = mover - 1;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray[0] = allVerticals[mover + 2];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray = tile.split('');
        //check right moves
        tileArray[1] = parseInt(tileArray[1]) + 2;
        mover = allVerticals.indexOf(tileArray[0]);
        mover = mover - 1;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray[0] = allVerticals[mover + 2];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
        return moveSet;
    }else if(pieceId.includes('rook')){
        let moveSet = [];
        let tileArray = tile.split('');
        //less than horizontal check
        for(i = tileArray[1]; i > 0; i--){
            tileArray[1] = i;
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //greater than horizontal check
        tileArray = tile.split('');        
        for(i = tileArray[1]; i <= 8; i++){
            tileArray[1] = i;
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //less than vertical check
        tileArray = tile.split('');
        for(i = allVerticals.indexOf(tileArray[0]); i >= 0; i--){
            tileArray[0] = allVerticals[i];
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //greater than vertical check
        tileArray = tile.split('');
        for(i = allVerticals.indexOf(tileArray[0]); i < 8; i++){
            tileArray[0] = allVerticals[i];
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
        return moveSet;
    }else if(pieceId == 'white-pawn-1'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'g1'){
            if(isEmpty('f1') && canAttack(pieceId, 'f1')){
                moveSet.push('f1');
                if(isEmpty('e1') && canAttack(pieceId, 'e1')){
                    moveSet.push('e1');                                            
                }
            }
            if(!isEmpty('f2') && canAttack(pieceId, 'f2')){
                moveSet.push('f2');
            }
            //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i-1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i-1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i-1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        //Add additional logic to see if En Peasent should be added to the moveset
        if(canEnPassent[0] == true){
            let allVerticals3 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            //checks tile to the left
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])-1);
            if(tileArray[1] > 0){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('black-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) - 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
            //checks tile to the right
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])+1);
            if(tileArray[1] < 9){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('black-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) - 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
        }
        //restricts moveset to only allow moves that will get the king out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
        return moveSet;
        }
    }else if(pieceId == 'white-pawn-2'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'g2'){
            if(isEmpty('f2') && canAttack(pieceId, 'f2')){
                moveSet.push('f2');
                if(isEmpty('e2') && canAttack(pieceId, 'e2')){
                    moveSet.push('e2');                                             
                }
            }
            if(!isEmpty('f3') && canAttack(pieceId, 'f3')){
                moveSet.push('f3');
            }
            if(!isEmpty('f1') && canAttack(pieceId, 'f1')){
                moveSet.push('f1');
            }
            currentMoveSet = moveSet;
            //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i-1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i-1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i-1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        //Add additional logic to see if En Peasent should be added to the moveset
        if(canEnPassent[1] == true){
            let allVerticals3 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            //checks tile to the left
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])-1);
            if(tileArray[1] > 0){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('black-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) - 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
            //checks tile to the right
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])+1);
            if(tileArray[1] < 9){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('black-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) - 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
        }
        //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
        return moveSet;
        }
    }else if(pieceId == 'white-pawn-3'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'g3'){
            if(isEmpty('f3') && canAttack(pieceId, 'f3')){
                moveSet.push('f3');
                if(isEmpty('e3') && canAttack(pieceId, 'e3')){
                    moveSet.push('e3');                                                
                }
            }
            if(!isEmpty('f4') && canAttack(pieceId, 'f4')){
                moveSet.push('f4');
            }
            if(!isEmpty('f2') && canAttack(pieceId, 'f2')){
                moveSet.push('f2');
            }
            currentMoveSet = moveSet;
            //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i-1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i-1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i-1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        //Add additional logic to see if En Peasent should be added to the moveset
        if(canEnPassent[2] == true){
            let allVerticals3 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            //checks tile to the left
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])-1);
            if(tileArray[1] > 0){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('black-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) - 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
            //checks tile to the right
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])+1);
            if(tileArray[1] < 9){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('black-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) - 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
        }
        //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
        return moveSet;
        }
    }else if(pieceId == 'white-pawn-4'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'g4'){
            if(isEmpty('f4') && canAttack(pieceId, 'f4')){
                moveSet.push('f4');
                if(isEmpty('e4') && canAttack(pieceId, 'e4')){
                    moveSet.push('e4');                                                
                }
            }
            if(!isEmpty('f5') && canAttack(pieceId, 'f5')){
                moveSet.push('f5');
            }
            if(!isEmpty('f3') && canAttack(pieceId, 'f3')){
                moveSet.push('f3');
            }
            currentMoveSet = moveSet;
            //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i-1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i-1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i-1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        //Add additional logic to see if En Peasent should be added to the moveset
        if(canEnPassent[3] == true){
            let allVerticals3 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            //checks tile to the left
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])-1);
            if(tileArray[1] > 0){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('black-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) - 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
            //checks tile to the right
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])+1);
            if(tileArray[1] < 9){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('black-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) - 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
        }
        //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
        return moveSet;        
        }
    }else if(pieceId == 'white-pawn-5'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'g5'){
            if(isEmpty('f5') && canAttack(pieceId, 'f5')){
                moveSet.push('f5');
                if(isEmpty('e5') && canAttack(pieceId, 'e5')){
                    moveSet.push('e5');                                                
                }
            }
            if(!isEmpty('f6') && canAttack(pieceId, 'f6')){
                moveSet.push('f6');
            }
            if(!isEmpty('f4') && canAttack(pieceId, 'f4')){
                moveSet.push('f4');
            }
            currentMoveSet = moveSet;
            //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i-1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i-1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i-1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        //Add additional logic to see if En Peasent should be added to the moveset
        if(canEnPassent[4] == true){
            let allVerticals3 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            //checks tile to the left
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])-1);
            if(tileArray[1] > 0){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('black-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) - 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
            //checks tile to the right
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])+1);
            if(tileArray[1] < 9){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('black-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) - 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
        }
        //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
        return moveSet;        
        }
    }else if(pieceId == 'white-pawn-6'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'g6'){
            if(isEmpty('f6') && canAttack(pieceId, 'f6')){
                moveSet.push('f6');
                if(isEmpty('e6') && canAttack(pieceId, 'e6')){
                    moveSet.push('e6');                                                
                }
            }
            if(!isEmpty('f7') && canAttack(pieceId, 'f7')){
                moveSet.push('f7');
            }
            if(!isEmpty('f5') && canAttack(pieceId, 'f5')){
                moveSet.push('f5');
            }
            currentMoveSet = moveSet;
            //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i-1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i-1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i-1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        //Add additional logic to see if En Peasent should be added to the moveset
        if(canEnPassent[5] == true){
            let allVerticals3 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            //checks tile to the left
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])-1);
            if(tileArray[1] > 0){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('black-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) - 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
            //checks tile to the right
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])+1);
            if(tileArray[1] < 9){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('black-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) - 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
        }
        //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
        return moveSet;
        }
    }else if(pieceId == 'white-pawn-7'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'g7'){
            if(isEmpty('f7') && canAttack(pieceId, 'f7')){
                moveSet.push('f7');
                if(isEmpty('e7') && canAttack(pieceId, 'e7')){
                    moveSet.push('e7');                                                
                }
            }
            if(!isEmpty('f8') && canAttack(pieceId, 'f8')){
                moveSet.push('f8');
            }
            if(!isEmpty('f6') && canAttack(pieceId, 'f6')){
                moveSet.push('f6');
            }
            currentMoveSet = moveSet;
            //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i-1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i-1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i-1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        //Add additional logic to see if En Peasent should be added to the moveset
        if(canEnPassent[6] == true){
            let allVerticals3 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            //checks tile to the left
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])-1);
            if(tileArray[1] > 0){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('black-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) - 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
            //checks tile to the right
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])+1);
            if(tileArray[1] < 9){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('black-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) - 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
        }
        //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
        return moveSet;
        }
    }else if(pieceId == 'white-pawn-8'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'g8'){
            if(isEmpty('f8') && canAttack(pieceId, 'f8')){
                moveSet.push('f8');
                if(isEmpty('e8') && canAttack(pieceId, 'e8')){
                    moveSet.push('e8');                                                
                }
            }
            if(!isEmpty('f7') && canAttack(pieceId, 'f7')){
                moveSet.push('f2');
            }
            currentMoveSet = moveSet;
            //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i-1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i-1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i-1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        //Add additional logic to see if En Peasent should be added to the moveset
        if(canEnPassent[7] == true){
            let allVerticals3 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            //checks tile to the left
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])-1);
            if(tileArray[1] > 0){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('black-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) - 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
            //checks tile to the right
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])+1);
            if(tileArray[1] < 9){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('black-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) - 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
        }
        //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
        return moveSet;        
        }
    }else if(pieceId == 'black-king'){
        let moveSet = [];
        let tileArray = tile.split('');
        let wasChecked = false;
        let shouldRemoveTile = false;
        //check tile above
        let mover = allVerticals.indexOf(tileArray[0]);
        mover--;
        tileArray[0] = allVerticals[mover];
        let nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    if(check && !wasChecked){
                        if(!isUnderAttack(pieceId, nextTile) && !indangersKings(pieceId, nextTile)){
                            moveSet.push(nextTile);
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                    wasChecked = true;        
                    break;    
                }else if(canAttack(pieceId, nextTile)){
                    wasChecked = false;
                    if(check && !wasChecked){
                        //add method to check if king would be underattack if enemyy piece is taken
                        if(!willBeUnderAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            wasChecked = true;
                            break;
                        }else{
                            wasChecked = true;
                            break;
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                }
            }
        }

        wasChecked = false;
        //check tile below
        tileArray = tile.split('');
        mover = allVerticals.indexOf(tileArray[0]);
        mover++;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    if(check && !wasChecked){
                        if(!isUnderAttack(pieceId, nextTile) && !indangersKings(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            break;
                        }
                    }else{
                        moveSet.push(nextTile);
                        break;
                    }
                    break;     
                }else if(canAttack(pieceId, nextTile)){
                    if(check && !wasChecked){
                        //add method to check if king would be underattack if enemyy piece is taken
                        if(!willBeUnderAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            wasChecked = true;
                            break;
                        }else{
                            wasChecked = true;
                            break;
                        }
                    }else{
                        moveSet.push(nextTile);
                        break;
                    }
                }
            }
        }

        wasChecked = false;
        //check tile to left
        tileArray = tile.split('');
        mover = tileArray[1];
        mover--;
        tileArray[1] = mover;        
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    if(check && !wasChecked){
                        if(!isUnderAttack(pieceId, nextTile) && !indangersKings(pieceId, nextTile)){
                            moveSet.push(nextTile);
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                    wasChecked = true;
                    break;            
                }else if(canAttack(pieceId, nextTile)){
                    wasChecked = false;
                    if(check && !wasChecked){
                        //add method to check if king would be underattack if enemyy piece is taken
                        if(!willBeUnderAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            wasChecked = true;
                            break;
                        }else{
                            wasChecked = true;
                            break;
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                }
            }
        }

        wasChecked = false;
        //check tile to right
        tileArray = tile.split('');
        mover = tileArray[1];
        mover++;
        tileArray[1] = mover;        
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    if(check && !wasChecked){
                        if(!isUnderAttack(pieceId, nextTile) && !indangersKings(pieceId, nextTile)){
                            moveSet.push(nextTile);
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                    wasChecked = true; 
                    break;           
                }else if(canAttack(pieceId, nextTile)){
                    wasChecked = false;
                    if(check && !wasChecked){
                        //add method to check if king would be underattack if enemyy piece is taken
                        if(!willBeUnderAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            wasChecked = true;
                            break;
                        }else{
                            wasChecked = true;
                            break;
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                }
            }
        }

        wasChecked = false;
        //check tile top-left
        tileArray = tile.split('');
        mover = tileArray[1];
        mover--;
        tileArray[1] = mover;
        mover = allVerticals.indexOf(tileArray[0]);
        mover--;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    if(check && !wasChecked){
                        if(!isUnderAttack(pieceId, nextTile) && !indangersKings(pieceId, nextTile)){
                            moveSet.push(nextTile);
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                    wasChecked = true; 
                    break;           
                }else if(canAttack(pieceId, nextTile)){
                    wasChecked = false;
                    if(check && !wasChecked){
                        //add method to check if king would be underattack if enemyy piece is taken
                        if(!willBeUnderAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            wasChecked = true;
                            break;
                        }else{
                            wasChecked = true;
                            break;
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                }
            }
        }

        wasChecked = false;
        //check tile top-right
        tileArray = tile.split('');
        mover = tileArray[1];
        mover++;
        tileArray[1] = mover;
        mover = allVerticals.indexOf(tileArray[0]);
        mover--;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    if(check && !wasChecked){
                        if(!isUnderAttack(pieceId, nextTile) && !indangersKings(pieceId, nextTile)){
                            moveSet.push(nextTile);
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                    wasChecked = true; 
                    break;           
                }else if(canAttack(pieceId, nextTile)){
                    wasChecked = false;
                    if(check && !wasChecked){
                        //add method to check if king would be underattack if enemyy piece is taken
                        if(!willBeUnderAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            wasChecked = true;
                            break;
                        }else{
                            wasChecked = true;
                            break;
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                }
            }
        }

        wasChecked = false;
        //check tile bottom-left
        tileArray = tile.split('');
        mover = tileArray[1];
        mover--;
        tileArray[1] = mover;
        mover = allVerticals.indexOf(tileArray[0]);
        mover++;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    if(check && !wasChecked){
                        if(!isUnderAttack(pieceId, nextTile) && !indangersKings(pieceId, nextTile)){
                            moveSet.push(nextTile);
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                    wasChecked = true;
                    break;            
                }else if(canAttack(pieceId, nextTile)){
                    wasChecked = false;
                    if(check && !wasChecked){
                        //add method to check if king would be underattack if enemyy piece is taken
                        if(!willBeUnderAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            wasChecked = true;
                            break;
                        }else{
                            wasChecked = true;
                            break;
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                }
            }
        }

        wasChecked = false;
        //check tile bottom-right
        tileArray = tile.split('');
        mover = tileArray[1];
        mover++;
        tileArray[1] = mover;
        mover = allVerticals.indexOf(tileArray[0]);
        mover++;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    if(check && !wasChecked){
                        if(!isUnderAttack(pieceId, nextTile) && !indangersKings(pieceId, nextTile)){
                            moveSet.push(nextTile);
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                    wasChecked = true;  
                    break;          
                }else if(canAttack(pieceId, nextTile)){
                    wasChecked = false;
                    if(check && !wasChecked){
                        //add method to check if king would be underattack if enemyy piece is taken
                        if(!willBeUnderAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            wasChecked = true;
                            break;
                        }else{
                            wasChecked = true;
                            break;
                        }
                    }else{
                        moveSet.push(nextTile);
                    }
                }
            }
        }

        wasChecked = false;
        //Checks for Castling
        if(numOfBlackKingMoves == 0 && numOfBlackRook1Moves == 0 && isActive[56] && isEmpty('a2') && isEmpty('a3') && isEmpty('a4') && !isUnderAttack(pieceId, 'a3') && !isUnderAttack(pieceId, 'a5')){
            moveSet.push('a3');
        }
        if(numOfBlackKingMoves == 0 && numOfBlackRook2Moves == 0 && isActive[55] && isEmpty('a6') && isEmpty('a7') && !isUnderAttack(pieceId, 'a7') && !isUnderAttack(pieceId, 'a5')){
            moveSet.push('a7');
        }
        return moveSet;                
    
    }else if(pieceId == 'black-pawn-1'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'b1'){
            if(isEmpty('c1') && canAttack(pieceId, 'c1')){
                moveSet.push('c1');
                if(isEmpty('d1') && canAttack(pieceId, 'd1')){
                    moveSet.push('d1');                                                
                }
            }
            if(!isEmpty('c2') && canAttack(pieceId, 'c2')){
                moveSet.push('c2');
            }
            currentMoveSet = moveSet;
            //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i+1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i+1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i+1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        //Add additional logic to see if En Peasent should be added to the moveset
        if(canEnPassent[8] == true){
            let allVerticals3 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            //checks tile to the left
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])-1);
            if(tileArray[1] > 0){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('white-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) + 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
            //checks tile to the right
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])+1);
            if(tileArray[1] < 9){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('white-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) + 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
        }
        //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
        return moveSet;        
        }
    }else if(pieceId == 'black-pawn-2'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'b2'){
            if(isEmpty('c2') && canAttack(pieceId, 'c2')){
                moveSet.push('c2');
                if(isEmpty('d2') && canAttack(pieceId, 'd2')){
                    moveSet.push('d2');                                                
                }
            }
            if(!isEmpty('c3') && canAttack(pieceId, 'c3')){
                moveSet.push('c3');
            }
            if(!isEmpty('c1') && canAttack(pieceId, 'c1')){
                moveSet.push('c1');
            }
            currentMoveSet = moveSet;
            //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i+1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i+1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i+1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        //Add additional logic to see if En Peasent should be added to the moveset
        if(canEnPassent[9] == true){
            let allVerticals3 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            //checks tile to the left
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])-1);
            if(tileArray[1] > 0){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('white-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) + 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
            //checks tile to the right
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])+1);
            if(tileArray[1] < 9){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('white-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) + 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
        }
        //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
        return moveSet;
        }
    }else if(pieceId == 'black-pawn-3'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'b3'){
            if(isEmpty('c3') && canAttack(pieceId, 'c3')){
                moveSet.push('c3');
                if(isEmpty('d3') && canAttack(pieceId, 'd3')){
                    moveSet.push('d3');                                                
                }
            }
            if(!isEmpty('c4') && canAttack(pieceId, 'c4')){
                moveSet.push('c4');
            }
            if(!isEmpty('c2') && canAttack(pieceId, 'c2')){
                moveSet.push('c2');
            }
            currentMoveSet = moveSet;
            //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i+1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i+1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i+1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        //Add additional logic to see if En Peasent should be added to the moveset
        if(canEnPassent[10] == true){
            let allVerticals3 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            //checks tile to the left
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])-1);
            if(tileArray[1] > 0){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('white-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) + 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
            //checks tile to the right
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])+1);
            if(tileArray[1] < 9){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('white-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) + 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
        }
        //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
        return moveSet;        
        }
    }else if(pieceId == 'black-pawn-4'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'b4'){
            if(isEmpty('c4') && canAttack(pieceId, 'c4')){
                moveSet.push('c4');
                if(isEmpty('d4') && canAttack(pieceId, 'd4')){
                    moveSet.push('d4');                                                
                }
            }
            if(!isEmpty('c5') && canAttack(pieceId, 'c5')){
                moveSet.push('c5');
            }
            if(!isEmpty('c3') && canAttack(pieceId, 'c3')){
                moveSet.push('c3');
            }
            currentMoveSet = moveSet;
            //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i+1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i+1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i+1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        //Add additional logic to see if En Peasent should be added to the moveset
        if(canEnPassent[11] == true){
            let allVerticals3 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            //checks tile to the left
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])-1);
            if(tileArray[1] > 0){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('white-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) + 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
            //checks tile to the right
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])+1);
            if(tileArray[1] < 9){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('white-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) + 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
        }
        //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
        return moveSet;
        }
    }else if(pieceId == 'black-pawn-5'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'b5'){
            if(isEmpty('c5') && canAttack(pieceId, 'c5')){
                moveSet.push('c5');
                if(isEmpty('d5') && canAttack(pieceId, 'd5')){
                    moveSet.push('d5');                                                
                }
            }
            if(!isEmpty('c6') && canAttack(pieceId, 'c6')){
                moveSet.push('c6');
            }
            if(!isEmpty('c4') && canAttack(pieceId, 'c4')){
                moveSet.push('c4');
            }
            currentMoveSet = moveSet;
            //restricts moveset to only allow moves that will get the king out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i+1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i+1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i+1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        //Add additional logic to see if En Peasent should be added to the moveset
        if(canEnPassent[12] == true){
            let allVerticals3 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            //checks tile to the left
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])-1);
            if(tileArray[1] > 0){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('white-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) + 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
            //checks tile to the right
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])+1);
            if(tileArray[1] < 9){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('white-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) + 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
        }
        //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
        return moveSet;
        }
    }else if(pieceId == 'black-pawn-6'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'b6'){
            if(isEmpty('c6') && canAttack(pieceId, 'c6')){
                moveSet.push('c6');
                if(isEmpty('d6') && canAttack(pieceId, 'd6')){
                    moveSet.push('d6');                                                
                }
            }
            if(!isEmpty('c7') && canAttack(pieceId, 'c7')){
                moveSet.push('c7');
            }
            if(!isEmpty('c5') && canAttack(pieceId, 'c5')){
                moveSet.push('c5');
            }
            currentMoveSet = moveSet;
            //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i+1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i+1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i+1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        //Add additional logic to see if En Peasent should be added to the moveset
        if(canEnPassent[13] == true){
            let allVerticals3 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            //checks tile to the left
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])-1);
            if(tileArray[1] > 0){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('white-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) + 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
            //checks tile to the right
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])+1);
            if(tileArray[1] < 9){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('white-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) + 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
        }
        //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
        return moveSet;        
        }
    }else if(pieceId == 'black-pawn-7'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'b7'){
            if(isEmpty('c7') && canAttack(pieceId, 'c7')){
                moveSet.push('c7');
                if(isEmpty('d7') && canAttack(pieceId, 'd7')){
                    moveSet.push('d7');                                                
                }
            }
            if(!isEmpty('c8') && canAttack(pieceId, 'c8')){
                moveSet.push('c8');
            }
            if(!isEmpty('c6') && canAttack(pieceId, 'c6')){
                moveSet.push('c6');
            }
            currentMoveSet = moveSet;
            //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i+1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i+1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i+1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        //Add additional logic to see if En Peasent should be added to the moveset
        if(canEnPassent[14] == true){
            let allVerticals3 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            //checks tile to the left
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])-1);
            if(tileArray[1] > 0){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('white-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) + 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
            //checks tile to the right
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])+1);
            if(tileArray[1] < 9){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('white-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) + 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
        }
        //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
        return moveSet;        
        }
    }else if(pieceId == 'black-pawn-8'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'b8'){
            if(isEmpty('c8') && canAttack(pieceId, 'c8')){
                moveSet.push('c8');
                if(isEmpty('d8') && canAttack(pieceId, 'd8')){
                    moveSet.push('d8');                                                
                }
            }
            if(!isEmpty('c7') && canAttack(pieceId, 'c7')){
                moveSet.push('c7');
            }
            currentMoveSet = moveSet;
            //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i+1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i+1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i+1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        //Add additional logic to see if En Peasent should be added to the moveset
        if(canEnPassent[15] == true){
            let allVerticals3 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            //checks tile to the left
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])-1);
            if(tileArray[1] > 0){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('white-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) + 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
            //checks tile to the right
            tileArray = tile.split('');
            tileArray[1] = (parseInt(tileArray[1])+1);
            if(tileArray[1] < 9){
                try{
                    let checkTile = tileArray.join('');
                    let checkPiece = document.getElementById(checkTile).childNodes[0].id;
                    let canPreformSpecialMove = canBeEnPassented[listOfAllPawns.indexOf(checkPiece)];
                    if(checkPiece.includes('white-pawn') && canPreformSpecialMove){
                        //gets move behind pawn that can be En Passented
                        let index = allVerticals.indexOf(tileArray[0]) + 1;
                        tileArray[0] = allVerticals3[index];
                        checkTile = tileArray.join('');
                        moveSet.push(checkTile);
                    }
                }catch(err){

                }
            }
        }
        //restricts moveset to only allow moves that will get the kig out of check
        if(check){
            var correctMoveSet = moveSet.slice(0);
            for(i = 0; i < moveSet.length; i++){
                iPreserver = i;
                if(indangersKings(pieceId, moveSet[i])){
                    i = iPreserver;
                    const index = correctMoveSet.indexOf(moveSet[i]);
                    if(index > -1){
                        correctMoveSet.splice(index, 1);
                    }
                }
                i = iPreserver;
            }
            moveSet = correctMoveSet;
        }
        return moveSet;        
        }
    }
}