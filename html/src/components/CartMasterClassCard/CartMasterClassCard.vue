<template>
    <li class="cart-master-class-card" :class="{ 'cart-master-class-card--small': isSmall }">
        <router-link class="cart-master-class-card__img" :to="href">
            <v-picture v-if="image" :image="image" />
            <v-svg v-else id="cart-master-class-card-empty" name="logo" width="48" height="48" />
        </router-link>
        <div class="cart-master-class-card__body">
            <v-link class="cart-master-class-card__body-name" :to="href">{{ name }}</v-link>
            <div class="cart-master-class-card__body-count">
                <v-counter :value="count" min="0" @input="debounce_countChange" />
            </div>
            <div class="cart-master-class-card__body-prices">
                <div class="text-bold cart-master-class-card__body-price">{{ price }}</div>
                <div
                    v-show="oldPrice"
                    class="text-grey text-strike cart-master-class-card__body-price cart-master-class-card__body-price--old"
                >
                    {{ oldPrice }}
                </div>
            </div>
            <div class="text-grey text-sm cart-master-class-card__body-info">
                <div>{{ date }}</div>
                <div>{{ author }}</div>
            </div>
            <div class="cart-master-class-card__body-controls">
                <v-link class="cart-master-class-card__body-controls-link" tag="button">
                    <v-svg name="wishlist-middle" width="15" height="13" />
                    {{ isTablet ? '' : '&nbsp;Перенести в избранное' }}
                </v-link>
                <v-link class="cart-master-class-card__body-controls-link" tag="button" @click="onDeleteClick">
                    <v-svg name="cross-small" width="10" height="10" />
                    {{ isTablet ? '' : '&nbsp;Удалить' }}
                </v-link>
            </div>
        </div>
    </li>
</template>

<script>
import VSvg from '../controls/VSvg/VSvg.vue';
import VLink from '../controls/VLink/VLink.vue';
import VPicture from '../controls/VPicture/VPicture.vue';
import VCounter from '../controls/VCounter/VCounter.vue';

import _debounce from 'lodash/debounce';
import '../../assets/images/sprites/cross-small.svg';
import '../../assets/images/sprites/wishlist-middle.svg';
import '../../assets/images/sprites/logo.svg';
import './CartMasterClassCard.css';

export default {
    name: 'cart-master-class-card',

    components: {
        VSvg,
        VLink,
        VPicture,
        VCounter,
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

        href: {
            type: String,
        },

        type: {
            type: String,
            required: true,
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
            type: [String, Number],
            default: null,
        },

        oldPrice: {
            type: [String, Number],
            default: null,
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
    },

    created() {
        this.debounce_countChange = _debounce(this.onCountChange, 200);
    },
};
</script>

