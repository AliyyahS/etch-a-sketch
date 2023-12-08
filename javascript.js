const gridContainer = document.querySelector('.grid');
const slider = document.querySelector('#sizeSlider');
const displaySize = document.querySelector('#displaySize');

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

function hoverEffect(colour) {
    const grid = document.querySelectorAll('.column');

    grid.forEach(function(div) {
        div.addEventListener('mouseenter', function () {
        this.style.backgroundColor = colour;
        });

        div.addEventListener('mouseleave', function () {
        this.style.backgroundColor = '';
        });
    });
}

function updateGrid(newSize) {
    const grid = gridContainer.querySelectorAll('div');
    grid.forEach(div => div.remove());
    createGrid(newSize);
    hoverEffect('pink');
}

// Event listeners

slider.addEventListener('input', function() {
    displaySize.textContent = `${slider.value} x ${slider.value}`;
    updateGrid(slider.value);
});

// On load

document.addEventListener('DOMContentLoaded', () => {
    createGrid(16);
    hoverEffect('pink');
});
