const optionsCont = document.querySelector(".options-cont");
const toolsCont = document.querySelector(".tools-cont");
const pencilCont = document.querySelector(".pencil-tool-cont");
const eraserCont = document.querySelector(".eraser-tool-cont");
const pencilTool = document.querySelector(".pencil");
const eraserTool = document.querySelector(".eraser");
const pencilToolCont = document.querySelector(".pencil-tool-cont");
const eraserToolCont = document.querySelector(".eraser-tool-cont");
const sticky = document.querySelector(".stickynote");
const upload = document.querySelector(".upload");

let clicked = true;
let pencilClick = false;
let eraserClick = false;

optionsCont.addEventListener("click",(event) => {
    clicked = !clicked;
    if(clicked) openToolBar();
    else closeToolBar();
});

pencilTool.addEventListener("click", (event) => {
    pencilClick = !pencilClick;
    if(pencilClick == true) {
        pencilToolCont.style.display = "block";
        if(eraserClick == true) eraserToolCont.style.display = "none";
    }
    else pencilToolCont.style.display = "none";
}); 

eraserTool.addEventListener("click", (event) => {
    eraserClick = !eraserClick;
    if (eraserClick == true) {
        eraserToolCont.style.display = "flex";
        if (pencilClick == true) pencilToolCont.style.display = "none";
    }
    else eraserToolCont.style.display = "none";
});

function openToolBar() {
    let iconEle = optionsCont.children[0];
    iconEle.classList.remove("fa-times");
    iconEle.classList.add("fa-bars");
    toolsCont.style.display = "flex";
}

function closeToolBar() {
    let iconEle = optionsCont.children[0];
    iconEle.classList.remove("fa-bars");
    iconEle.classList.add("fa-times");
    toolsCont.style.display = "none";
    pencilCont.style.display = "none";
    eraserCont.style.display = "none";
}

sticky.addEventListener("click", (event) => {
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class","sticky-cont");
    let markUp = `
        <div class="header-cont">
            <div class="minimize"> - </div>
            <div class="remove"> x </div>
        </div>
        <div class="note-cont">
            <textarea spellcheck="false"></textarea>
        </div>
    `;

    stickyCont.innerHTML = markUp;
    document.body.appendChild(stickyCont);

    let minimize = document.querySelector(".minimize");
    let remove = document.querySelector(".remove");

    stickyProperties(stickyCont,remove,minimize);

    stickyCont.onmousedown = function (event) {
        dragAndDrop(stickyCont,event);
    };

    stickyCont.ondragstart = function () {
        return false;
    };
});

function stickyProperties(stickyCont,remove,minimize){
    remove.addEventListener("click",(e) => {
        stickyCont.remove();
    }); 

    minimize.addEventListener("click",(e) => {
        let noteCont = stickyCont.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).display;
        if(display === "none") noteCont.style.display = "block";
        else noteCont.style.display = "none";
    });
}

function dragAndDrop(stickyCont, event) {
    let shiftX = event.clientX - stickyCont.getBoundingClientRect().left;
    let shiftY = event.clientY - stickyCont.getBoundingClientRect().top;

    stickyCont.style.position = 'absolute';
    stickyCont.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        stickyCont.style.left = pageX - shiftX + 'px';
        stickyCont.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    stickyCont.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        stickyCont.onmouseup = null;
    };
}

upload.addEventListener("click", (event) =>{
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let stickyCont = document.createElement("div");
        stickyCont.setAttribute("class", "sticky-cont");
        let markUp = `
            <div class="header-cont">
                <div class="minimize"> - </div>
                <div class="remove"> x </div>
            </div>
            <div class="note-cont">
                <img src="${url}" />
            </div>
        `;

        stickyCont.innerHTML = markUp;
        document.body.appendChild(stickyCont);

        let minimize = document.querySelector(".minimize");
        let remove = document.querySelector(".remove");

        stickyProperties(stickyCont, remove, minimize);

        stickyCont.onmousedown = function (event) {
            dragAndDrop(stickyCont, event);
        };

        stickyCont.ondragstart = function () {
            return false;
        };
    }); 
});