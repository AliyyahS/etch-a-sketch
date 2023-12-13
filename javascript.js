const gridContainer = document.querySelector('.grid');
const slider = document.querySelector('#sizeSlider');
const displaySize = document.querySelector('#displaySize');
const clearBtn = document.querySelector('#clearBtn');
const eraserBtn = document.querySelector('#eraserBtn');
const colourPicker = document.querySelector('#colourPicker')
const singleModeBtn = document.querySelector('#singleMode')
const rainbowModeBtn = document.querySelector('#rainbowMode')

// Initial states

let isErasing = false;
let singleMode = true;
let rainbowMode = false;

singleModeBtn.classList.add('active');

// Functions

function createGrid(size) {
    const totalHeight = gridContainer.offsetHeight;
    const height = totalHeight/size + 'px';

    for (let i = 0; i < size; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        gridContainer.appendChild(row);
        row.style.height = height;

        for (let j = 0; j < size; j++) {
            const column = document.createElement('div');
            column.classList.add('column');
            row.appendChild(column);    
        }
    }
}

function draw(colour) {
    const grid = document.querySelectorAll('.column');
    let isDrawing = false;
    let startDrawing = false;
    let startErasing = false;

    function clickHandler() {
        if(!isErasing) {
            isDrawing = true;
            if(singleMode) {
                this.style.backgroundColor = colour;
            } else if(rainbowMode) {
                this.style.backgroundColor = updateColour();
            }
        } else {
            isDrawing = false;
            this.style.backgroundColor = '';
        }
    }

    function mouseDownHandler() {
        if(!isErasing) {
            startDrawing = true
        } else startErasing = true
    }

    function mouseEnterHandler() {
        if(startDrawing) {
            if(singleMode) {
                this.style.backgroundColor = colour;
            } else if(rainbowMode) {
                this.style.backgroundColor = updateColour();
            }
        }

        if(startErasing) {
            this.style.backgroundColor = '';
        }
    }

    grid.forEach(function(div) {
        div.addEventListener('click', clickHandler);
        div.addEventListener('mousedown', mouseDownHandler);
        div.addEventListener('mouseenter', mouseEnterHandler);
        div.addEventListener('mouseup', function() {
            isDrawing = false;
            startDrawing = false;
            startErasing = false;
        });
    });
}

function updateGrid(size) {
    const grid = gridContainer.querySelectorAll('div');
    grid.forEach(div => div.remove());
    createGrid(size);
    draw(updateColour());
}

function onErase(status) {
    if(status === "deactivate") {
        isErasing = false;
        eraserBtn.classList.remove('active');
    } else {
        if(isErasing) {
            eraserBtn.classList.add('active');
        } else eraserBtn.classList.remove('active');
    }
}

function onSingleMode() {
    onErase("deactivate");
    if(!singleMode) {
        rainbowMode = false;
        singleMode = true;
        singleModeBtn.classList.add('active');
        rainbowModeBtn.classList.remove('active');
    }
    updateColour();
}

function onRainbowMode() {
    onErase("deactivate");
    if(!rainbowMode) {
        singleMode = false;
        rainbowMode = true;
        rainbowModeBtn.classList.add('active');
        singleModeBtn.classList.remove('active');
    } else return;
}

function updateColour() {
    let colour = colourPicker.value;

    if(singleMode) {
        draw(colour);
    } else if(rainbowMode){
        const R = Math.floor(Math.random() * 256);
        const G = Math.floor(Math.random() * 256);
        const B = Math.floor(Math.random() * 256);
        colour = `rgb(${R}, ${G}, ${B})`;
        return colour;
    }
}

function clearGrid() {
    updateGrid(slider.value);
    onErase("deactivate");
}

// Event listeners

slider.addEventListener('input', function() {
    displaySize.textContent = `${slider.value} x ${slider.value}`;
    updateGrid(slider.value);
});

eraserBtn.addEventListener('click', function() {
    isErasing = !isErasing;
    onErase();
});

clearBtn.addEventListener('click', clearGrid);
colourPicker.addEventListener('change', onSingleMode);
singleModeBtn.addEventListener('click', onSingleMode);
rainbowModeBtn.addEventListener('click', onRainbowMode);

// On load

document.addEventListener('DOMContentLoaded', () => {
    createGrid(16);
    draw('black');
});