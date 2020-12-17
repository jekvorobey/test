<template>
    <section class="section product-view__section product-view__like">
        <div class="container product-view__like-container">
            <h2 class="product-view__section-hl product-view__like-hl">{{ $t('product.title.like') }}</h2>
            <v-slider class="product-view__like-slider" name="also-like" :options="sliderOptions">
                <catalog-product-card
                    class="swiper-slide product-view__like-card"
                    v-for="item in featuredProducts.items"
                    :key="item.id"
                    :offer-id="item.id"
                    :product-id="item.productId"
                    :name="item.name"
                    :type="item.type"
                    :href="`/catalog/${item.categoryCodes[item.categoryCodes.length - 1]}/${item.code}`"
                    :image="item.image"
                    :price="item.price"
                    :old-price="item.oldPrice"
                    :badges="item.badges"
                    :rating="item.rating"
                    :show-buy-btn="item.stock.qty > 0"
                    @add-item="onAddToCart(item)"
                    @preview="onPreview(item.code)"
                    @toggle-favorite-item="onToggleFavorite(item.productId)"
                />
            </v-slider>
        </div>
    </section>
</template>

<script>
import VSlider from '@controls/VSlider/VSlider.vue';
import CatalogProductCard from '@components/CatalogProductCard/CatalogProductCard.vue';
import { breakpoints } from '@enums';

const sliderOptions = {
    spaceBetween: 24,
    slidesPerView: 4,
    grabCursor: true,
    autoHeight: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },

    breakpoints: {
        [breakpoints.tabletLg - 1]: {
            slidesPerView: 3.5,
            slidesOffsetBefore: 24,
            slidesOffsetAfter: 24,
        },

        [breakpoints.tablet - 1]: {
            slidesPerView: 2,
            spaceBetween: 12,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
        },
    },
};

export default {
    name: 'featured-products',
    components: { VSlider, CatalogProductCard },
    data: () => ({
        /* Test data */
        featuredProducts: {
            items: [
                {
                    id: 54,
                    name: 'Фен для волос IKOO, жёлтый',
                    code: 'fen-dlya-volos-ikoo-zheltyy',
                    categoryCodes: ['dlya_makiyazha', 'lico_1', 'tonalnye_sredstva'],
                    type: 'product',
                    rating: 0,
                    bonus: 0,
                    bundleId: 0,
                    variantGroups: null,
                    active: true,
                    stock: { qty: 8, storeId: 3 },
                    price: { value: 2835, currency: 'RUB' },
                    image: { id: 5162, sourceExt: 'jpg' },
                    productId: 402,
                    badges: ['Новинки', 'Хит продаж'],
                },
                {
                    id: 2318,
                    name: 'Брелок ILMH',
                    code: 'brelok-ilmh',
                    categoryCodes: ['promo_aksessuary'],
                    type: 'product',
                    rating: 0,
                    bonus: 0,
                    bundleId: 0,
                    variantGroups: null,
                    active: true,
                    stock: { qty: 358, storeId: 51 },
                    price: { value: 250, currency: 'RUB' },
                    image: { id: 18214, sourceExt: 'jpg' },
                    productId: 2115,
                },
                {
                    id: 44,
                    name: 'Фен для волос La Ric, тон 11',
                    code: 'fen-dlya-volos-la-ric-ton-11',
                    categoryCodes: ['dlya_volos', 'okrashivanie', 'okisliteli'],
                    type: 'product',
                    rating: 0,
                    bonus: 0,
                    bundleId: 0,
                    variantGroups: null,
                    active: true,
                    stock: { qty: 3, storeId: 3 },
                    price: { value: 3208, currency: 'RUB' },
                    image: { id: 60, sourceExt: 'jpg' },
                    productId: 470,
                },
                {
                    id: 102,
                    name: 'Щетка круглая зелёный 76 мм',
                    code: 'shchetka-kruglaya-zelenyy-76-mm',
                    categoryCodes: ['dlya_volos', 'instrumenty', 'nozhnicy'],
                    type: 'product',
                    rating: 0,
                    bonus: 0,
                    bundleId: 0,
                    variantGroups: null,
                    active: true,
                    stock: { qty: 3, storeId: 5 },
                    price: { value: 6776, currency: 'RUB' },
                    image: { id: 5747, sourceExt: 'jpg' },
                    productId: 51,
                    badges: ['Новинки'],
                },
                {
                    id: 2096,
                    name: 'Лак для ногтей',
                    code: 'lak-dlya-nogtey-10-ml-chernyy',
                    categoryCodes: ['dlya_ruk_i_nog', 'dizayn_i_okrashivanie_nogtey'],
                    type: 'product',
                    rating: 0,
                    bonus: 0,
                    bundleId: 0,
                    variantGroups: {
                        id: 12,
                        characteristics: [
                            { code: 'obem', name: 'Объем', isColor: false, values: [10, 20] },
                            {
                                code: 'cvet_sredstva_dlya_nogtey',
                                name: 'Цвет',
                                isColor: true,
                                values: ['Зеленый', 'Красный', 'Черный'],
                            },
                        ],
                    },
                    active: true,
                    stock: { qty: 100, storeId: 1 },
                    price: { value: { from: 100, to: null }, currency: 'RUB' },
                    image: { id: 15706, sourceExt: 'jpg' },
                    productId: 1891,
                },
                {
                    id: 140,
                    name: 'Щетка круглая Dajuja #5 жёлтый 53 мм',
                    code: 'shchetka-kruglaya-dajuja-5-zheltyy-53-mm',
                    categoryCodes: ['dlya_volos', 'okrashivanie', 'ottenochnye_i'],
                    type: 'product',
                    rating: 0,
                    bonus: 0,
                    bundleId: 0,
                    variantGroups: null,
                    active: true,
                    stock: { qty: 8, storeId: 8 },
                    price: { value: 3572, currency: 'RUB' },
                    image: { id: 3, sourceExt: 'jpg' },
                    productId: 416,
                },
            ],
            range: 68,
        },
    }),
    computed: {
        sliderOptions() {
            return sliderOptions;
        },
    },
    methods: {
        onAddToCart(item) {
            console.log('onAddToCart', item);
        },
        onPreview(code) {
            console.log('onPreview', code);
        },
        onToggleFavorite(productId) {
            console.log('onToggleFavorite', productId);
        },
    },
};
</script>
