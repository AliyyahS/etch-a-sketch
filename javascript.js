const gridContainer = document.querySelector('.grid');
const slider = document.querySelector('#sizeSlider');
const displaySize = document.querySelector('#displaySize');
const clearBtn = document.querySelector('#clearBtn');
const eraserBtn = document.querySelector('#eraserBtn');

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
    draw("black");
}

function draw(colour) {
    const grid = document.querySelectorAll('.column');
    let isDrawing = false;

    function addColour() {
        if(isDrawing) {
            this.classList.add('drawn');
        }
        this.style.backgroundColor = colour;
    }

    function removeColour() {
        if(!isDrawing && !this.classList.contains('drawn')) {
            this.style.backgroundColor = '';
        }
    }

    grid.forEach(function(div) {
        div.addEventListener('mouseenter', addColour);
        div.addEventListener('mouseleave', removeColour);
        div.addEventListener('click', function() {
            if(!isErasing) {
                this.classList.add('drawn');
                isDrawing = !isDrawing;
            } else {
                isDrawing = false;
                this.classList.remove('drawn');
                this.style.backgroundColor = '';   
            }
        })
    });
}

function updateGrid(size) {
    const grid = gridContainer.querySelectorAll('div');
    grid.forEach(div => div.remove());
    createGrid(size);
}

// Event listeners

slider.addEventListener('input', function() {
    displaySize.textContent = `${slider.value} x ${slider.value}`;
    updateGrid(slider.value);
});

let isErasing = false;
eraserBtn.addEventListener('click', () => isErasing = !isErasing);

clearBtn.addEventListener('click', () => updateGrid(slider.value));

// On load

document.addEventListener('DOMContentLoaded', () => {
    createGrid(16);
});
