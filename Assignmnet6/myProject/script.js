
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [],
        filtered: [],
        cartItems: [],
        imgProduct: 'https://via.placeholder.com/200x150',
        imgCart: 'https://via.placeholder.com/50x50',
        userSearch: '',
        showCart: false,
        error: false
    },
    methods: {
        filter() {
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
            console.log(filtered);
        },
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(item) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.id_product === item.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            const prod = Object.assign({ quantity: 1 }, item);
                            this.cartItems.push(prod);
                        }
                    }
                })
        }

    },
    remove(item) {
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    if (item.quantity > 1) {
                        item.quantity--;
                    } else {
                        this.cartItems.splice(this.cartItems.indexOf(item), 1);
                    }
                }

            })
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);

                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            })
    }
})
/*let searchButton = document.querySelector('.search-button');
let searchInput = document.querySelector('.goods-search');
let value = searchInput.value;

/*
* Класс карточки товара
*/
/*class GoodsItem {
    constructor(el, img = 'http://via.placeholder.com/200') {
        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3 class="goods-item-title">${this.product_name}</h3>
                    <p class="goods-item-price">$${this.price}</p>
                    <button class="buy-btn"
                    data-id="${this.id_product}"
                    data-name="${this.product_name}"
                    data-price="${this.price}">Купить</button>
                </div>
            </div>`
    }
}

/*
* Класс списка товаров
*/

/*class GoodsList {

    constructor(container = '.goods-list') {
        this.container = container;
        this.value = value;
        this.goods = [];
        this.allProducts = [];
        this.filteredGoods = [];
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this.render();

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

        let regexp = new RegExp(value, 'i');
        console.log(regexp);
        this.filteredGoods = this.allProducts.filter(good => regexp.test(good.product_name));
        this.allProducts.forEach(el => {
            let goodCard = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
            if (!this.filteredGoods.includes(el)) {
                goodCard.classList.add('hidden');
                console.log(goodCard);
                console.log(goodCard.classList);
            } else {
                goodCard.classList.remove('hidden');
            }
        })

        console.log(this.filteredGoods);
        console.log(this.allProducts);

    }

    render() {
        let divContainer = document.querySelector(this.container);
        for (let product of this.goods) {
            let productObj = new GoodsItem(product);
            this.allProducts.push(productObj);
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

/*class ElemCart {
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

/*class Cart {
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
/*let cartButton = document.querySelector('.cart-button');
let cart = document.querySelector('.cart')

cartButton.addEventListener('click', clickHandler);
function clickHandler() {
    cart.classList.toggle('hidden');
};

setTimeout(() => {
    /*
    * Удаление товара  из корзины
    */
/*let deleteBtn = document.getElementsByClassName('delete');
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
/*function deleteGoodFromCart(productId) {
    let goodItem = document.getElementById(`${productId}`);
    console.log(goodItem);
    goodItem.style.display = 'none';
}
/*
* Поиск товаров
*/
/*document.querySelector('.search-form').addEventListener('submit', e => {
    e.preventDefault();
    list.filterGoods(document.querySelector('.goods-search').value)
});

}, 300);
*/