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
    let nations = [];
    let types = [];
    let levels = [];
    for (let index in ships) {
        if (!nations.includes(ships[index]['nation'])) {
            nations.push(ships[index]['nation']);
        }
        if (!types.includes(ships[index]['type'])) {
            types.push(ships[index]['type']);
        }
        if (!levels.includes(ships[index]['level'])) {
            levels.push(ships[index]['level']);
        }
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
    drawFilters(nations, types, levels);
    document.querySelectorAll('.app-main__item').forEach(item => {
        item.addEventListener('click', event => {
            let target = event.target.closest('.app-main__item');
            clickShip(target);
        });
    })
}
function drawFilters(nations, types, levels) {
    let natCont = document.querySelector('.filter-nation .app-main__filter-list');
    let typeCont = document.querySelector('.filter-type .app-main__filter-list');
    let levelCont = document.querySelector('.filter-level .app-main__filter-list');
    for (let i = 0; i < nations.length; i++) {
        let node =
            `<li class="app-main__filter-item" data-value="${ nations[i] }">
                ${ nations[i] }
            </li>`;
        natCont.insertAdjacentHTML('beforeend', node);
    }
    for (let i = 0; i < types.length; i++) {
        let node =
            `<li class="app-main__filter-item" data-value="${ types[i] }">
                ${ types[i] }
            </li>`;
        typeCont.insertAdjacentHTML('beforeend', node);
    }
    levels.sort(function (a, b) {
        return a - b;
    });
    for (let i = 0; i < levels.length; i++) {
        let node =
            `<li class="app-main__filter-item" data-value="${ levels[i] }">
                ${ levels[i] }
            </li>`;
        levelCont.insertAdjacentHTML('beforeend', node);
    }
    let filterTriggers = document.querySelectorAll('.app-main__filter-current');

    document.querySelector('body').addEventListener('click', function (event) {
        let filters = document.querySelectorAll('.app-main__filter');
        let targetFilter = event.target.closest('.app-main__filter');
        let targetCurrent = event.target.closest('.app-main__filter-current');
        if (targetCurrent !== null) {
            for (let i = 0; i < filters.length; i++) {
                if (filters[i] !== targetFilter) {
                    filters[i].classList.remove('active');
                }
                else {
                    if (targetFilter.classList.contains('active')) {
                        targetFilter.classList.remove('active');
                    }
                    else {
                        targetFilter.classList.add('active');
                    }
                }
            }
        }
        else {
            for (let i = 0; i < filters.length; i++) {
                filters[i].classList.remove('active');
            }
        }
    });
    let filterItems = document.querySelectorAll('.app-main__filter-item');
    for (let i = 0; i < filterItems.length; i++) {
        filterItems[i].addEventListener('click', function (event) {
            let target = event.target;
            let filterContainer = event.target.closest('.app-main__filter');
            let filterCurrent = filterContainer.children[0];
            filterCurrent.innerText = target.innerText;
            filterCurrent.dataset.value = target.dataset.value;
            applyFilter();
        });
    }
}
function applyFilter () {
    let ships = document.querySelectorAll('.app-main__item');
    let natValue = document.querySelector('.filter-nation .app-main__filter-current').dataset.value;
    let typeValue = document.querySelector('.filter-type .app-main__filter-current').dataset.value;
    let levelValue = document.querySelector('.filter-level .app-main__filter-current').dataset.value;
    for (let i = 0; i < ships.length; i++) {
        if (natValue !== 'null') {
            if (ships[i].dataset.nation !== natValue) {
                ships[i].style.display = 'none';
                ships[i].classList.remove('filtered');
                continue;
            }
        }
        if (typeValue !== 'null') {
            if (ships[i].dataset.type !== typeValue) {
                ships[i].style.display = 'none';
                ships[i].classList.remove('filtered');
                continue;
            }
        }
        if (levelValue !== 'null') {
            if (ships[i].dataset.level !== levelValue) {
                ships[i].style.display = 'none';
                ships[i].classList.remove('filtered');
                continue;
            }
        }
        ships[i].classList.add('filtered');
        ships[i].style.display = 'block';
    }
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
    let ships = document.querySelectorAll('.app-main__item.filtered');
    if (ships.length === 0) {
        ships = document.querySelectorAll('.app-main__item');
    }
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