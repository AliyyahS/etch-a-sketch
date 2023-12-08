const gridContainer = document.querySelector('.grid');
const totalHeight = gridContainer.offsetHeight;

function createGrid(size) {
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

createGrid(16);

const grid = document.querySelectorAll('.column');

grid.forEach(function(div) {
    div.addEventListener('mouseenter', function () {
      this.style.backgroundColor = 'pink';
    });

    div.addEventListener('mouseleave', function () {
      this.style.backgroundColor = '';
    });
});