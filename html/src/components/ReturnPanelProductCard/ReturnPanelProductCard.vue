<template>
    <div class="return-panel-product-card" :class="className">
        <router-link class="return-panel-product-card__img" :to="href">
            <v-picture v-if="product.image" :image="product.image" alt="">
                <template v-slot:source="{ image }">
                    <source :data-srcset="generateSourcePath(64, 64, image.id, 'webp')" type="image/webp" />
                </template>
                <template v-slot:fallback="{ image, alt }">
                    <img
                        class="blur-up lazyload v-picture__img"
                        :data-src="generateSourcePath(64, 64, image.id)"
                        :alt="alt"
                    />
                </template>
            </v-picture>
            <v-svg v-else id="return-panel-product-card-empty" name="logo" width="48" height="48" />
        </router-link>
        <div class="return-panel-product-card__body">
            <v-link class="return-panel-product-card__body-name" :to="href">{{ product.name }}</v-link>
            <div class="return-panel-product-card__body-count" v-if="product.stock.qty === 1">{{ quantity }} шт</div>
            <v-counter
                v-else
                class="return-panel-product-card__counter"
                v-model="quantity"
                min="1"
                :max="product.stock.qty"
            />
            <div class="return-panel-product-card__body-prices">
                <price class="text-bold return-panel-product-card__body-price" v-bind="product.price" />
                <price
                    class="text-grey text-strike return-panel-product-card__body-price--old"
                    v-if="product.oldPrice && product.oldPrice.value !== product.price.value"
                    v-bind="product.oldPrice"
                />
            </div>
        </div>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VPicture from '@controls/VPicture/VPicture.vue';
import VCounter from '@controls/VCounter/VCounter.vue';

import Price from '@components/Price/Price.vue';

import { generatePictureSourcePath } from '@util/file';
import './ReturnPanelProductCard.css';

export default {
    name: 'return-panel-product-card',

    components: {
        VSvg,
        VLink,
        VPicture,
        VCounter,

        Price,
    },

    props: {
        product: {
            type: Object,
            default: () => {},
        },

        href: {
            type: String,
            default: '/',
        },

        className: {
            type: String,
            default: '',
        },

        type: {
            type: String,
        },

        id: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            quantity: null,
        };
    },

    methods: {
        generateSourcePath(x, y, id, ext) {
            return generatePictureSourcePath(x, y, id, ext);
        },
    },

    beforeMount() {
        this.quantity = this.product.stock.qty;
    },
};
</script>
