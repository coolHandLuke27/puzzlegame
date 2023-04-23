//Variables set for rows, columns, moves for counter, the frame the user selects and the frame where the user 
// wishes to drop it.
var rows = 3;
var col = 3;
var moves = 0;
var chosenFrame;
var targetFrame;

//Array set for correct order as well as order to be shuffled
var puzzOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var newOrder = puzzOrder

//newOrder array is shuffled
for (var i = newOrder.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = newOrder[i];
        newOrder[i] = newOrder[j];
        newOrder[j] = temp;
    }

//Loop through rows and columns creates sections for all 9 squares
//Events are added for different user actions
window.onload = function() {
    for (let i=0; i < rows; i++) {
        for (let j=0; j < col; j++) {

            let frame = document.createElement("img");
            frame.id = i.toString() + "-" + j.toString();
            frame.src = newOrder.shift() + ".png";

            frame.addEventListener("dragstart", dragStart);  
            frame.addEventListener("dragover", dragOver);    
            frame.addEventListener("dragenter", dragEnter);  
            frame.addEventListener("dragleave", dragLeave);  
            frame.addEventListener("drop", dragDrop);        
            frame.addEventListener("dragend", dragEnd);      
            document.getElementById("table").append(frame);
        }
    }
}

function dragStart() {
    chosenFrame = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    targetFrame = this; 
}

//If desired frame swap is adjacent, coordiantes of both frames are swapped, thus swapping the frames themselves.
function dragEnd() {

    let chosenCoord = chosenFrame.id.split("-"); 
    let rw = parseInt(chosenCoord[0]);
    let cl = parseInt(chosenCoord[1]);

    let targetCoord = targetFrame.id.split("-");
    let rw2 = parseInt(targetCoord[0]);
    let cl2 = parseInt(targetCoord[1]);

    let left = rw == rw2 && cl2 == cl-1;
    let right = rw == rw2 && cl2 == cl+1;

    let up = cl == cl2 && rw2 == rw-1;
    let down = cl == cl2 && rw2 == rw+1;

    let adjacent = left || right || up || down;

    if (adjacent) {
        let chosenImg = chosenFrame.src;
        let targetImg = targetFrame.src;

        chosenFrame.src = targetImg;
        targetFrame.src = chosenImg;

        moves += 1;
        document.getElementById("moves").innerText = moves;
    }
}