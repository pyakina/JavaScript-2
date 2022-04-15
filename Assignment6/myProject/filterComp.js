Vue.component('compfilter', {
    template: `<form action="#" class="search-form" @submit.prevent="$parent.filter">
                <input type="text" class="goods-search" v-model="$parent.userSearch">
                <button class="search-button" type="submit">
                <i class="fas fa-search"></i>
                </button>
                </form>
            `
});
