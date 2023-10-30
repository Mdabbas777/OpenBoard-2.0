const canvas = document.querySelector("canvas");
const red = document.querySelector(".red");
const black = document.querySelector(".black");
const blue = document.querySelector(".blue");
const input = document.querySelector("input");
const eraserWidth = document.querySelector(".eraser-width");
const pencilWidth = document.querySelector(".pencil-width");
const download = document.querySelector(".download");
const undo = document.querySelector(".undo");
const redo = document.querySelector(".redo");

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 30;

let undoRedoTracker = [];
let tracker = 0;

// API
let tool = canvas.getContext("2d");
let prevColor = "black";

// default settings
let mouseDown = false;
let eraserWidthColor = false;
tool.lineWidth = "2";
tool.strokeStyle = 'black';

red.addEventListener("click", (e) => {
    prevColor = "red";
    tool.strokeStyle = "red";
});

black.addEventListener("click", (e) => {
    tool.strokeStyle = "black";
    prevColor = "black";
});

blue.addEventListener("click", (e) => {
    tool.strokeStyle = "blue";
    prevColor = "blue";
});

canvas.addEventListener("mousedown",(e) => {
    mouseDown = true;

    let data = {
        x : e.clientX,
        y : e.clientY
    }

    socket.emit("beginPath",data);

    tool.beginPath();
    tool.moveTo(e.clientX,e.clientY);
});

canvas.addEventListener("mouseup", (e) => {
    mouseDown = false;
    
    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    tracker = undoRedoTracker.length - 1;
});

canvas.addEventListener("mousemove", (e) => {
    if(mouseDown == true){
        tool.lineTo(e.clientX,e.clientY);
        tool.stroke();
        let data = {
            x : e.clientX,
            y : e.clientY
        }
        socket.emit("drawStroke", data);
    }
});

eraserWidth.addEventListener("change", (e) => {
    tool.lineWidth = eraserWidth.value;
});

pencilWidth.addEventListener("change", (e) => {
    tool.lineWidth = pencilWidth.value;
});

eraserTool.addEventListener("click",(e) => {
    eraserWidthColor = !eraserWidthColor;
    if(eraserWidthColor == true){
        tool.strokeStyle = "white";
        tool.lineWidth = eraserWidth.value;
    }else{
        tool.lineWidth = pencilWidth.value;
        tool.strokeStyle = prevColor;
    }
});

download.addEventListener("click", (event) => {
    let url = canvas.toDataURL();

    let a = document.createElement("a");
    a.href = url;
    a.download = "board.png";
    a.click();
});

undo.addEventListener("click", (e) => {
    console.log(undoRedoTracker,tracker);
    if(tracker - 1 >= 0) 
        tracker--;
    let url = undoRedoTracker[tracker];

    let img = new Image();
    img.src = url;
    img.onload = (e) => {
        tool.drawImage(img,0,0,canvas.width,canvas.height);
    };
});

redo.addEventListener("click", (e) => {
    console.log(undoRedoTracker, tracker);
    if(tracker + 1 < undoRedoTracker.length)
        tracker++;
    let url = undoRedoTracker[tracker];

    let img = new Image();
    img.src = url;
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
});

socket.on("beginPath", (data) => {
    mouseDown = true;
    tool.beginPath();
    tool.moveTo(data.x,data.y);
});

socket.on("drawStroke", (data) => {
    if (mouseDown == true) {
        tool.lineTo(data.x, data.y);
        tool.stroke();
    }
});

function KeyPress(e) {
    var evtobj = window.event ? event : e;
    if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
        tool.fillStyle = "white";
        tool.fillRect(0,0,window.innerWidth,window.innerHeight);
    }
}

document.onkeydown = KeyPress;