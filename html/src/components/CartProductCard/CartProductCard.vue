<template>
    <li class="cart-product-card" :class="{ 'cart-product-card--small': isSmall }">
        <router-link class="cart-product-card__img" :to="href">
            <v-picture v-if="image && image.id" :image="image" alt="">
                <template v-slot:source="{ image }">
                    <source
                        :data-srcset="generateSourcePath(300, 300, image.id, 'webp')"
                        type="image/webp"
                        media="(min-width: 480px)"
                    />
                    <source
                        :data-srcset="generateSourcePath(72, 72, image.id, 'webp')"
                        type="image/webp"
                        media="(max-width: 479px)"
                    />
                </template>
                <template v-slot:fallback="{ image, lazy, alt }">
                    <img
                        class="blur-up lazyload v-picture__img"
                        :data-src="generateSourcePath(300, 300, image.id)"
                        :alt="alt"
                    />
                </template>
            </v-picture>
            <v-svg v-else id="cart-product-card-empty" name="logo" width="48" height="48" />
        </router-link>
        <div class="cart-product-card__body">
            <v-link class="cart-product-card__body-name" :to="href">{{ name }}</v-link>
            <div class="cart-product-card__body-count">
                <v-counter :value="count" min="1" @input="debounce_countChange" />
            </div>

            <div class="cart-product-card__body-prices">
                <price tag="div" class="text-bold cart-product-card__body-price" v-bind="price" />
                <price
                    tag="div"
                    class="text-grey text-strike cart-product-card__body-price cart-product-card__body-price--old"
                    v-if="oldPrice"
                    v-bind="oldPrice"
                />
            </div>
            <div class="text-grey text-sm cart-product-card__body-info">
                <!-- неизвестно, будет ли это -->
                <!-- Ближайшая доставка 24 июня<br />
                Ближайший самовывоз c 26 июня -->
            </div>
            <!-- #58322  -->
            <div class="text-grey cart-product-card__body-bonus" :style="{ visibility: 'hidden' }">+ 80 бонусов</div>
            <div class="cart-product-card__body-controls">
                <!-- #58322  -->
                <!-- <v-link class="cart-product-card__body-controls-link" tag="button">
                    <v-svg name="wishlist-middle" width="16" height="16" />
                    {{ isTablet ? '' : '&nbsp;Перенести в избранное' }}
                </v-link> -->
                <v-link class="cart-product-card__body-controls-link" tag="button" @click="onDeleteClick">
                    <v-svg name="cross-small" width="10" height="10" />
                    {{ isTablet ? '' : '&nbsp;Удалить' }}
                </v-link>
            </div>
        </div>
    </li>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VPicture from '@controls/VPicture/VPicture.vue';
import VCounter from '@controls/VCounter/VCounter.vue';

import Price from '@components/Price/Price.vue';

import _debounce from 'lodash/debounce';
import { generatePictureSourcePath } from '@util/file';

import '@images/sprites/cross-small.svg';
import '@images/sprites/wishlist-middle.svg';
import '@images/sprites/logo.svg';
import './CartProductCard.css';

export default {
    name: 'cart-product-card',

    components: {
        VSvg,
        VLink,
        VPicture,
        VCounter,

        Price,
    },

    props: {
        productId: {
            type: [String, Number],
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            required: true,
        },

        href: {
            type: String,
            default: '/',
        },

        image: {
            type: [String, Object],
        },

        price: {
            type: [Object, String],
        },

        oldPrice: {
            type: [Object, String],
        },

        count: {
            type: Number,
            default: 1,
        },

        isSmall: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        onCountChange(value) {
            if (value > 0) this.$emit('countChange', { id: this.productId, type: this.type, count: value });
            else this.$emit('deleteItem', { id: this.productId, type: this.type });
        },

        onDeleteClick() {
            this.$emit('deleteItem', { id: this.productId, type: this.type });
        },

        generateSourcePath(x, y, id, ext) {
            return generatePictureSourcePath(x, y, id, ext);
        },
    },

    created() {
        this.debounce_countChange = _debounce(this.onCountChange, 200);
    },
};
</script>
