Vue.component('cart', {
    props: ['cartItems', 'img', 'visibility'],
    template: `
        <div class="cart" v-show="visibility">
            <cart-item v-for="item of cartItems" :key="item.id_product" :img="img" :cart-item="item">
            </cart-item>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
    <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some img">
                        <div class="product-desc">
                            <div class="goods-item-title">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">$ {{ cartItem.price }} each</div>
                        </div>
                    </div>
                    <div class="right-block">
                        <div class="goods-item-price">{{"$"+cartItem.quantity*cartItem.price}}</div>
                        <button class="delete" @click="$root.remove(cartItem)">&times;</button>
                    </div>
                </div>
    `
})