Vue.component('products', {
    props: ['products', 'img'],
    template: `<div class="good-list">
                <product v-for="item of products"
                :key="item.id_product"
                :img="img"
                :product="item"></product>
                </div>`

});
Vue.component('product', {
    props: ['product', 'img'],
    template: `<div class="product-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3 class="goods-item-title" >{{product.product_name}}</h3>
                    <p class="goods-item-price">{{"$"+ product.price }}</p>
                    <button class="buy-btn" @click="$root.addProduct(product)">Купить</button>
                </div>
            </div>`


});