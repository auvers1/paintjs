const canvas = document.getElementById("jsCanvas");
const cxt = canvas.getContext("2d"); //To get the canvas 2D rendering context, call getContext() on the <canvas> element
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const INITIAL_COLOR = "#2c2c2c"; //setting the initial default color
const CANVAS_SIZE = 700; //setting canvas size
const saveBtn = document.getElementById("jsSave"); 

//Define canvas width and height to manipulate the pixels
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

cxt.fillStyle = "white";
cxt.fillRect(0,0,CANVAS_SIZE, CANVAS_SIZE);
cxt.strokeStyle = INITIAL_COLOR; 
cxt.lineWidth = 2.5; 
cxt.fillStyle = INITIAL_COLOR;
//cxt.fillRect(50,20,100,49);

let painting = false;
let filling = false;

//Instead of creating functions for onMouseMove, onMouseDown, OnMouseUp, OnMouseLeave
//just call the stopPainting function.
function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    //console.log(event);
    const x = event.offsetX;  //getting the console painboard offsetX value
    const y = event.offsetY;

    //checking console log for x and y value to make sure
    //console.log(x, y);

    if(!painting){
        cxt.beginPath();  //create a path(line), when you move mouse many path are created but not being used until mousedown
        cxt.moveTo(x, y); //moving the mouse through the path
    } 
    else {
        cxt.lineTo(x, y); //creates a path from the last position of the mouse
        cxt.stroke();
        //ctx.closePath(); - this will create a straight path
    }
}

function onMouseDown(event) {
    //console.log(event);
    //when mouse is down, change painting=true
    painting = true;
}

function handleColorClick(event){
    //console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    //console.log(color);
    cxt.strokeStyle = color; //changing the strokeStyle color see line 11
    cxt.fillStyle = color; //changing the fillStyle when color is clicked
}

function handleRangeChange(event){
    //console.log(event.target.value);
    const size = event.target.value;
    cxt.lineWidth = size;
}

function handleModeClick(event){
    if(filling === true){
        filling = false; //if filling is true, then set the filling to false
        mode.innerText = "Fill"; //and Mode button's text should be changed to Fill
    }
    else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if(filling){ //if filling is true, then activate fillReact to fill the whole canvas
        cxt.fillRect(0,0,CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    //console.log(event);
    event.preventDefault(); // setting defaultPrevented: false to true; disabling right mouse click
}

function handleSaveClick(){
   //getting data from the canvas as an image
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;  //link href has to be URL image
    link.download = "PaintJS Export.png"  //download is an attribute of anker; download = name 
    //console.log(link);
    link.click();
}

if (canvas) {
    //If canvas exists, detect the mousemove with an EventListener.
    canvas.addEventListener("mousemove", onMouseMove);

    //Create an EventListener when mouse is clicked onto canvas to draw.
    canvas.addEventListener("mousedown", startPainting);

    //Create an EventListener when mouse if up, to change painting = false.
    canvas.addEventListener("mouseup", stopPainting);

    //When mouse leaves the canvas, change the painting = false.
    canvas.addEventListener("mouseleave", stopPainting);

    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM); //right mouse click of context menu option

}

//console.log(Array.from(colors));
//brushColor represents each item inside the array
Array.from(colors).forEach(brushColor => brushColor.addEventListener("click", handleColorClick));


if(range){ //check if the range exists & defined first
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}