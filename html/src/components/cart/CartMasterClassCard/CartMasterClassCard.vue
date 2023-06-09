<template>
    <li class="cart-master-class-card" :class="{ 'cart-master-class-card--small': isSmall }">
        <router-link class="cart-master-class-card__img" :to="href">
            <v-picture v-if="image">
                <slot />
            </v-picture>
            <v-svg v-else id="cart-master-class-card-empty" name="logo" width="48" height="48" />
        </router-link>

        <div class="cart-master-class-card__body">
            <v-link class="cart-master-class-card__body-name" :to="href">
                <div>{{ name }}</div>
                <div v-if="note">({{ note }})</div>
            </v-link>

            <div class="cart-master-class-card__body-count" v-if="showCount">
                <v-counter :value="count" min="1" @input="debounce_countChange" />
            </div>

            <div class="cart-master-class-card__body-prices">
                <price class="text-bold cart-master-class-card__body-price" v-bind="price" />
                <price
                    class="text-grey text-strike cart-master-class-card__body-price cart-master-class-card__body-price--old"
                    v-show="oldPrice"
                    v-bind="oldPrice"
                />
            </div>

            <div class="text-grey text-sm cart-master-class-card__body-info">
                <div>{{ date }}</div>
                <div>{{ author }}</div>
            </div>

            <div class="cart-master-class-card__body-controls" v-if="showControls">
                <!-- #58539 -->
                <!-- <v-link class="cart-master-class-card__body-controls-link" tag="button">
                    <v-svg name="wishlist-middle" width="15" height="13" />
                    {{ isTablet ? '' : '&nbsp;Перенести в избранное' }}
                </v-link> -->
                <v-link class="cart-master-class-card__body-controls-link" tag="button" @click="onDeleteClick">
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
import '@images/sprites/cross-small.svg';
import '@images/sprites/wishlist-middle.svg';
import '@images/sprites/logo.svg';
import './CartMasterClassCard.css';

export default {
    name: 'cart-master-class-card',

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

        type: {
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        note: {
            type: String,
        },

        href: {
            type: String,
        },

        image: {
            type: [String, Object],
        },

        date: {
            type: [String, Date],
        },

        author: {
            type: String,
        },

        price: {
            type: Object,
        },

        oldPrice: {
            type: Object,
        },

        count: {
            type: Number,
            default: 1,
        },

        showCount: {
            type: Boolean,
            default: false,
        },

        showControls: {
            type: Boolean,
            default: false,
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
            this.$emit('countChange', { id: this.productId, type: this.type, count: value });
        },

        onDeleteClick() {
            this.$emit('deleteItem', { id: this.productId, type: this.type });
        },
    },

    created() {
        this.debounce_countChange = _debounce(this.onCountChange, 200);
    },
};
</script>
