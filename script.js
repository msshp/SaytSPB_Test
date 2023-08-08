'use strict';

let additionalServicesTable = document.getElementById('additional-services-table');
let totalValue = document.getElementById('total-value');
let cleaningTypeSelect = document.getElementById('cleaning-type-select');
let roomArea = document.getElementById('room-area');
let roomArea2 = document.getElementById('room-area-2');

roomArea2.form.onsubmit = function () {
    return false;
};

let bid = document.getElementById('bid');
let bidValue = 70;

let addition = [
    {
        name: 'Мытьё духового шкафа (внутри)',
        price: 600,
        count: 0
    },
    {
        name: 'Мытьё микроволновой печи (внутри)',
        price: 350,
        count: 0
    },
    {
        name: 'Мытьё холодильника (внутри)',
        price: 800,
        count: 0
    },
    {
        name: 'Глажка белья (час)',
        price: 600,
        count: 0
    },
    {
        name: 'Мытьё посуды (час)',
        price: 600,
        count: 0
    },
    {
        name: 'Мытьё люстры',
        price: 600,
        count: 0
    },
    {
        name: 'Мытьё кухонного шкафа',
        price: 400,
        count: 0
    },
    {
        name: 'Окно (одна створка)',
        price: 400,
        count: 0
    },
    {
        name: 'Окно (одна створка) с пароочистителем',
        price: 500,
        count: 0
    },
    {
        name: 'Мытьё фрамуги',
        price: 300,
        count: 0
    },
    {
        name: 'Мытьё москитной сетки',
        price: 150,
        count: 0
    }
]

let cart = []; // корзина

function drawTable() {
    additionalServicesTable.textContent = '';

    for (let i = 0; i < addition.length; i++) {
        let line = document.createElement('tr');

        let extreme;
        if (addition[i].count > 0) {
            extreme = 'btn_black';
        } else {
            extreme = 'btn_extreme';
        }

        line.innerHTML = `<td>${addition[i].name}</td>
        <td>${addition[i].price} руб./шт</td>
        <td>
            <button class="${extreme}" onclick="removeService(${i})">-</button>
            <span>${addition[i].count}</span>
            <button onclick="addService(${i})">+</button>
        </td>`;
        additionalServicesTable.appendChild(line);
    }
}

function addService(ind) {
    if (addition[ind].count < 100) {
        addition[ind].count++;
        drawTable();
        totalCount();
    }
}

function removeService(ind) {
    if (addition[ind].count > 0) {
        addition[ind].count--;
        drawTable();
        totalCount();
    }
}

function changeCleaningType() { // тип уборки
    let ind = cleaningTypeSelect.selectedIndex;
    if (ind === 0) {
        bidValue = 70;
    } else if (ind === 1) {
        bidValue = 110;
    } else {
        bidValue = 165;
    }
    bid.textContent = '';
    bid.innerHTML = `${bidValue} руб./м²`;
    totalCount();
}

function changeRoomArea() { // площадь помещения
    roomArea2.value = roomArea.value;
    totalCount();
}

function changeRoomArea2() { // площадь помещения
    if (roomArea2.value > 800 || roomArea2.value < 0) {
        alert('Введите число в диапазоне от 0 до 800');
    } else {
        roomArea.value = roomArea2.value;
        totalCount();
    }
}

function totalCount() { // итого
    let additionalServices = 0;
    addition.forEach((item) => {
        additionalServices += item.price * item.count;
    });

    let total = 0;
    total = bidValue * roomArea.value + additionalServices;
    totalValue.innerHTML = `${total} руб.`;
}

drawTable();
totalCount();