'use strict';
let ships = [];


document.addEventListener("DOMContentLoaded", function(event) {
    getShips();

    document.querySelector('.app-main__search-input')
        .addEventListener('input', event => {
            search(event.target.value);
    });
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
                    <span>${ ships[index]['nation'].toUpperCase() }</span>
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
            let target = event.target.closest('.app-main__item');
            clickShip(target);
        });
    })
}
function clickShip (ship) {
    if (!ship.className.includes('active')) {
        if (countResults(ship.dataset.level)) {
            addShip(ship);
        }
    }
    else {
        removeShip(ship);
    }
}
function addShip(ship) {
    let results = document.querySelector('.app-results-list');
    ship.classList.add('active');
    let node =
        `<div class="app-results__item ship-item" 
                data-id="${ ship.dataset.id }" 
                data-type="${ ship.dataset.type }"
                data-title="${ ship.dataset.title }"
                data-nation="${ ship.dataset.nation }"
                data-level="${ ship.dataset.level }">
                <div class="app-results__item-info">
                    <span>${ ship.dataset.nation.toUpperCase() }</span>
                    <span>/</span>
                    <span>${ ship.dataset.type }</span>
                </div>
                <div class="app-results__item-title">
                    <span>${ ship.dataset.level }</span>
                    <span>${ ship.dataset.title }</span>
                </div>
                <div class="app-results__remove"></div>
            </div>`;
    results.insertAdjacentHTML('beforeend', node);
    let sum = document.querySelector('.app-results__sum');
    sum.innerHTML = parseInt(sum.innerHTML) + parseInt(ship.dataset.level);
    document.querySelector('.app-results__item[data-id="' + ship.dataset.id + '"] .app-results__remove')
        .addEventListener('click',event => {
            let target = event.target.closest('.app-results__item');
            removeShip(target);
    });
}
function removeShip(ship) {
    let results = document.querySelector('.app-results-list');
    document.querySelector('.app-main__item[data-id="' + ship.dataset.id + '"]').classList.remove('active');
    results.removeChild(document.querySelector('.app-results__item[data-id="' + ship.dataset.id + '"]'));
    let sum = document.querySelector('.app-results__sum');
    sum.innerHTML = parseInt(sum.innerHTML) - parseInt(ship.dataset.level);
}
function countResults (level) {
    let results = document.querySelector('.app-results-list');
    let resultChildren = results.children;
    let levelSum = parseInt(level);
    if (results.childElementCount >= 7) {
        return false;
    }
    if (resultChildren.length > 0) {
        for (let i = 0; i < resultChildren.length; i++) {
            levelSum += parseInt(resultChildren[i].dataset.level);
        }
    }
    if (levelSum > 42) {
        return false;
    }
    return true;
}
function search(input) {
    input = input.toLowerCase();
    let ships = document.querySelectorAll('.app-main__item');
    if (input.length > 0) {
        for (let i = 0; i < ships.length; i++) {
            if (ships[i].dataset.title.toLowerCase().includes(input)) {
                ships[i].style.display = 'block';
            }
            else {
                ships[i].style.display = 'none';
            }
        }
    }
    else {
        for (let i = 0; i < ships.length; i++) {
            ships[i].style.display = 'block';
        }
    }

}