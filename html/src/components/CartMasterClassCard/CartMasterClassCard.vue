<template>
    <li class="cart-master-class-card" :class="{ 'cart-master-class-card--small': isSmall }">
        <router-link class="cart-master-class-card__img" :to="href">
            <v-picture v-if="image" :image="image" />
            <v-svg v-else id="cart-master-class-card-empty" name="logo" width="48" height="48" />
        </router-link>
        <div class="cart-master-class-card__body">
            <v-link class="cart-master-class-card__body-name" :to="href">{{ name }}</v-link>
            <div class="cart-master-class-card__body-panel">
                <v-counter :value="3" min="1" />
                <div class="cart-master-class-card__body-panel-prices">
                    <div class="text-bold cart-master-class-card__body-panel-price">{{ price }}</div>
                    <div
                        v-show="oldPrice"
                        class="text-grey text-strike cart-master-class-card__body-panel-price cart-master-class-card__body-panel-price--old"
                    >
                        {{ oldPrice }}
                    </div>
                </div>
            </div>
            <div class="text-grey text-sm cart-master-class-card__body-info">
                <div>{{ date }}</div>
                <div>{{ author }}</div>
            </div>
            <div class="text-grey cart-product-card__body-bonus" />
            <div class="cart-master-class-card__body-controls">
                <v-link class="cart-master-class-card__body-controls-link" tag="button">
                    <v-svg name="wishlist-middle" width="15" height="13" />
                    &nbsp;Перенести в избранное
                </v-link>
                <v-link class="cart-master-class-card__body-controls-link" tag="button" @click="deleteItem">
                    <v-svg name="cross-small" width="10" height="10" />
                    &nbsp;Удалить
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

import { mapActions } from 'vuex';
import { NAME as CART_MODULE } from '../../store/modules/Cart';
import { DELETE_CART_ITEM } from '../../store/modules/Cart/actions';

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

        isSmall: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        ...mapActions(CART_MODULE, [DELETE_CART_ITEM]),

        deleteItem() {
            this.DELETE_CART_ITEM({ item: { id: this.productId, type: this.type } });
        },
    },
};
</script>

