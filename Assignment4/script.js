'use strict';

/**
 * XMLHttpRequest функция
 * @param {*} url 
 * @param {*} callback 
 */
function makeGETRequest(url, callback) {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callback(xhr.responseText);
        }
    }
    xhr.open('GET', url, true);
    xhr.send();
}

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


/*
* Класс карточки товара
*/
class GoodsItem {
    constructor(product) {
        this.product = product;

    }
    render() {
        return `<div class="goods-item"><img src="https://via.placeholder.com/200" alt=""><h3 class="goods-item-title">${this.product.product_name}</h3><p class="goods-item-price">$${this.product.price}</p><button class="add-to-cart" type="button">Добавить в корзину</button></div>`;
    }
}

/*
* Класс списка товаров
*/

class GoodsList {
    constructor(container = '.goods-list') {
        this.container = container;
        this.goods = [];
        this.filteredGoods = [];
        this._getProducts()
            .then(data => {
                this.goods = data;
                this.filteredGoods = [...data];
                this.render();
                console.log(this.filteredGoods);

            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }
    filterGoods(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good => {
            regexp.test(good.product_name);
        });
        console.log(this.filteredGoods);//не сохраняются отфильтрованные товары :(
        this.render();



    }

    render() {
        let divContainer = document.querySelector(this.container);
        for (let product of this.filteredGoods) {
            let productObj = new GoodsItem(product);
            divContainer.insertAdjacentHTML('beforeend', productObj.render());


        }

    }
    getSum() {
        let totalSum = 0;
        this.goods.forEach(good => {
            totalSum += good.price;
        });
        console.log(`Всего товаров на сумму $${totalSum}`);

    }

}

/** contents
 * Класс элемент товара в корзине
 */

class ElemCart {
    constructor(elem) {
        this.elem = elem;
    }
    add() {

    }

    remove() {

    }
    change() {


    }
    render() {
        return `<div class="cart-item" id='${this.elem.id_product}'><div class='cart-item-head'><h3 class="cart-item-title">${this.elem.product_name}</h3><p class='quantity'>Quantity: ${this.elem.quantity}</p></div><div class='cart-item-bottom'><p class="cart-item-price">$${this.elem.price}</p><button class="delete" data-id='${this.elem.id_product}' type="button">×</button><div class='totalSum'>Итого $${this.elem.price * this.elem.quantity}</div></div></div>`;
    }
}

/**
* Класс корзина -список товаров в ней
*/

class Cart {
    constructor(cart = '.cart') {
        this.cart = cart;
        this.cartGoods = [];
        this._getCart()
            .then(data => {
                this.cartGoods = data.contents;
                this.render();

            });
    }
    _getCart() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }


    render() {
        let divCart = document.querySelector(this.cart);
        for (let elem of this.cartGoods) {
            let elemObj = new ElemCart(elem);
            divCart.insertAdjacentHTML('beforeend', elemObj.render());

        }
    }
}

let searchButton = document.querySelector('.search-button');
let searchInput = document.querySelector('.goods-search');
let value = searchInput.value;
const list = new GoodsList();

list._getProducts();


setTimeout(() => {
    list.getSum();


}, 200);

const cartList = new Cart();
cartList._getCart(() => {

    cartList.render();

});

/*
* Обработчик кнопки корзины
*/
let cartButton = document.querySelector('.cart-button');
let cart = document.querySelector('.cart')

cartButton.addEventListener('click', clickHandler);
function clickHandler() {
    cart.classList.toggle('hidden');
};




setTimeout(() => {
    /*
    * Удаление товара  из корзины
    */
    let deleteBtn = document.getElementsByClassName('delete');
    console.log(deleteBtn);
    Array.prototype.forEach.call(deleteBtn, (button) => {
        button.addEventListener('click', (e) => {
            let productId = e.currentTarget.getAttribute('data-id');
            deleteGoodFromCart(productId);
        });


    });
    /*
    * Обработчик кнопки удалить из корзины
    */
    function deleteGoodFromCart(productId) {
        let goodItem = document.getElementById(`${productId}`);
        console.log(goodItem);
        goodItem.style.display = 'none';
    }

    /*
    * Поиск товаров
    */

    searchButton.addEventListener('click', (e) => {
        list.filterGoods(value);
    });



}, 2000);
