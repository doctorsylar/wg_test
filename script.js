'use strict';
let ships = [];


document.addEventListener("DOMContentLoaded", function(event) {
    getShips();
});




function getShips () {
    fetch('./ships.json')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            drawShips(data);
        });
}
function drawShips (ships) {
    let container = document.querySelector('.app-main__list');
    let i = 0;
    for (let index in ships) {
        let node =
            `<div class="app-main__item ship-item" 
                data-id="${ i }" 
                data-type="${ ships[index]['type'] }"
                data-title="${ ships[index]['title'] }"
                data-nation="${ ships[index]['nation'] }"
                data-level="${ ships[index]['level'] }">
                <div class="app-main__item-info">
                    <span>${ ships[index]['nation'] }</span>
                    <span>/</span>
                    <span>${ ships[index]['type'] }</span>
                </div>
                <div class="app-main__item-title">
                    <span>${ ships[index]['level'] }</span>
                    <span>${ ships[index]['title'] }</span>
                </div>
                <div class="app-main__ok"></div>
            </div>`;
        container.insertAdjacentHTML('beforeend', node);
        i++;
    }
    document.querySelectorAll('.app-main__item').forEach(item => {
        item.addEventListener('click', event => {
           console.log(event.target.closest('.app-main__item'));
        })
    })
}