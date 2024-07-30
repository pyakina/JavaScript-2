'use strict';
/*
* Класс карточки товара
*/
class GoodsItem {
    constructor(title, price, img) {
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render() {
        return `<div class="goods-item"><img class="goods-item-img" src=${this.img} alt=${this.title}><h3 class="goods-item-title">${this.title}</h3><p class="goods-item-price">$${this.price}</p><button class="add-to-cart" type="button">Добавить в корзину</button></div>`;
    }
}

/*
* Класс списка товаров
*/

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150, img: "img/Shirt.png" },
            { title: 'Socks', price: 50, img: "img/Socks.png" },
            { title: 'Jacket', price: 350, img: "img/Jacket.png" },
            { title: 'Shoes', price: 250, img: "img/Shoes.png" },
        ];
    }
    render() {
        let listHtml = '';

        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.img);
            listHtml += goodItem.render();

        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    getSum() {
        let totalSum = 0;
        this.goods.forEach(good => {
            totalSum += good.price;
        });
        alert(`Всего товаров на сумму $${totalSum}`);

    }
}
/**
 * Класс элемент товара в корзине
 */

class ElemCart {
 constructor {

}
add(){

}

remove(){

}
change(){


}
render(){

}
 }

/**
* Класс корзина -список товаров в ней
*/

class Cart {
    constructor {

}
render(){

}
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.getSum();


/*
* Обработчик кнопки корзины
*/
let cartButton = document.querySelector('.cart-button');
let divGoods = document.querySelector('.goods-list')

cartButton.addEventListener('click', clickHandler);
function clickHandler() {
    divGoods.classList.toggle('hidden');
};
