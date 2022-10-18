"use strict";

const basketEl = document.querySelector('.basket');
const cartIconWrapEl = document.querySelector('.cartIconWrap');
cartIconWrapEl.addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});

const basket = {};

const featuredItemsEl = document.querySelector('.featuredItems');
featuredItemsEl.addEventListener('click', event => {
    if (!event.target.classList.contains('addToCart')) {
        return;
    }
    const featuredItemEl = event.target.closest('.featuredItem');
    const itemId = Number(featuredItemEl.dataset.id);
    const itemName = featuredItemEl.dataset.name;
    const itemPrice = Number(featuredItemEl.dataset.price);
    addToCart(itemId, itemName, itemPrice);
});

function addToCart(itemId, itemName, itemPrice) {
    const basketHeaderEl = basketEl.querySelector('.basketHeader');
    const basketTotalEl = basketEl.querySelector('.basketTotal');
    let basketValues = Object.values(basket);
    if (basketValues.length === 0) {
        basket[0] = {
            id: itemId,
            name: itemName,
            price: itemPrice,
            count: 1
        };
        addNewBasketRow();
    } else {
        findExistedItem: {
            for (let basketItem of basketValues) {
                if (basketItem.id === itemId) {
                    basketItem.count++;
                    EditBasketRow(basketItem);
                    break findExistedItem;
                }
            }
            basket[basketValues.length] = {
                id: itemId,
                name: itemName,
                price: itemPrice,
                count: 1
            };
            addNewBasketRow();
        }
    }
    basketValues = Object.values(basket);

    function showTotalCountAndCost() {
        let totalCount = 0;
        let totalCost = 0;
        for (let basketItem of basketValues) {
            totalCount += basketItem.count;
            totalCost += basketItem.price * basketItem.count;
        }
        cartIconWrapEl
            .querySelector('.totalCount')
            .textContent = totalCount;
        basketEl
            .querySelector('.basketTotalValue')
            .textContent = totalCost;
    }


    function addNewBasketRow() {
        const newRowEl = basketHeaderEl.cloneNode(true);
        newRowEl.dataset.itemId = itemId;
        newRowEl.classList.remove('basketHeader');
        const nameDivEl = newRowEl.firstElementChild;
        nameDivEl.textContent = itemName;
        const countDivEl = nameDivEl.nextElementSibling;
        countDivEl.textContent = 1;
        const priceDivEl = countDivEl.nextElementSibling;
        priceDivEl.textContent = itemPrice;
        const totalDivEl = priceDivEl.nextElementSibling;
        totalDivEl.textContent = itemPrice;
        basketTotalEl.before(newRowEl);
    }

    function EditBasketRow(basketItem) {
        let basketRow = basketHeaderEl.nextElementSibling;
        do {
            if (Number(basketRow.dataset.itemId) === itemId) {
                break
            }
            basketRow = basketRow.nextElementSibling;
        } while (basketRow);
        const totalDivEl = basketRow.lastElementChild;
        totalDivEl.textContent = itemPrice * basketItem.count;
        const countDivEl = totalDivEl
            .previousElementSibling
            .previousElementSibling; // наверное криво
        countDivEl.textContent = basketItem.count;
    }

    showTotalCountAndCost();
}
