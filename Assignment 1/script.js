'use strict';
const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];
const renderGoodsItem = (obj) => {
    return `<div class="goods-item"><img class="goods-item-img" src="img/${obj.title}.png" alt="${obj.title}"><h3 class="goods-item-title">${obj.title}</h3><p class="goods-item-price">$${obj.price}</p><button class="add-to-cart" type="button">Добавить в корзину</button></div>`;
};

const renderGoodsList = list => {
    let goodsList = list.map(item => renderGoodsItem(item));
    goodsList.forEach(element => {
        document.querySelector('.goods-list').innerHTML += element;
    });;
}

renderGoodsList(goods);
let cartButton = document.querySelector('.cart-button');
let divGoods = document.querySelector('.goods-list')

cartButton.addEventListener('click', clickHandler);
function clickHandler() {
    if (divGoods.style.display = 'none') {
        divGoods.style.display = 'flex';

    }
    else {
        divGoods.style.display = 'none';//не закрывается div с товарами
    }

};
