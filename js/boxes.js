/*
╔═╦═╗░░░░╔╗░░░░░╔══╗░░░░░░░░░░░░╔══╦══╦══╗
║║║║╠═╦═╦╣╠╦═╦╦╗║╔═╬═╗╔══╦═╗╔══╗╚║║╩╗╔╩║║╝
║║║║║╬║║║║═╣╩╣║║║╚╗║╬╚╣║║║╩╣╚══╝╔║║╗║║╔║║╗
╚╩═╩╩═╩╩═╩╩╩═╬╗║╚══╩══╩╩╩╩═╝░░░░╚══╝╚╝╚══╝
░░░░░░░░░░░░░╚═╝░░░░░░░░░░░░░░░░░░░░░░░░░░

*/
var RowIndex = 0;
var boxesMap = [];
var boxesMapIndex =0;

function box(BoxID) {
    this.BoxID = BoxID;
     //Add to Map
     boxesMap [BoxID]=BoxID;
    /* Regular Box */
    this.DrawRegular = function () {
 
        var box = $("<div class='Box Regular_Box' " + "id=" + BoxID + "" + "></div>");//.text(BoxID);
        $("#RowOfBoxes_"+RowIndex).prepend(box);
        boxesMapIndex++;

    }
    /* Golden Box */
    this.DrawGolden = function () {
        var box = $("<div class='Box Golden_Box' " + "id=" + BoxID + "" + "></div>");//.text(BoxID);
        $("#RowOfBoxes_"+RowIndex).prepend(box);
        boxesMapIndex++;
    }
    /* RedBox */
    this.DrawRed = function () {
        var box = $("<div class='Box Red_Box' " + "id=" + BoxID + "" + "></div>");//.text(BoxID);
        $("#RowOfBoxes_"+RowIndex).prepend(box);
        boxesMapIndex++;
    }
}
//Create Start Array of Numbers 
var numElems = [];
var Randomiz_arr = [];
//Create Rows of Alphabet
var RowsAlpa = ("abcdefghijklmnopqrstuvwxyz").split("");
//initial position of row
var PosOFRowsAlpha = 0;
//Golden Boxes IDs
var GoldenBoxes = [3,10,25,31,1];
//Red Boxes IDs
var RedBoxes = [5,12,33,12,8];
//Creating Array
function CreateBoxes(NumOfBoxes) {
    
    //Create array of numbers to max point
    for (i = 0; i < NumOfBoxes; i++) {
        numElems[i] = i;
    }
    //Call Shuffle 
    numElems=shuffle(numElems);
    //Drawing Row
    var row = $("<div class=RowOfBoxes " + "id=RowOfBoxes_" + RowIndex + "" + "></div>");
    $(".boxOfGame").prepend(row);
    //Drawing Boxes
    for (i=0;i<NumOfBoxes;i++){
        var elem = new box(RowsAlpa[PosOFRowsAlpha]+numElems[i]);
    
                
            //Drwaing types of boxes
                if(GoldenBoxes.includes(numElems[i])){
                    elem.DrawGolden();
              
                }else if(RedBoxes.includes(numElems[i])){
                    elem.DrawRed();
              
                }
                else{
                    elem.DrawRegular();
            
                }
        
    }
    PosOFRowsAlpha++;
    //Row index
    RowIndex++;
}

//Shuffle the Array of numbers
 function shuffle(arr) {
  
     for (var i = arr.length-1; i >=0; i--) {
     
        var randomIndex = Math.floor(Math.random()*(i+1)); 
        var itemAtIndex = arr[randomIndex]; 
         
        arr[randomIndex] = arr[i]; 
        arr[i] = itemAtIndex;
    }
    return arr;
}
CreateBoxes(9);
CreateBoxes(9);


