<template>
    <li class="master-class-card catalog-product-list-card" :class="{ 'master-class-card--small': isSmall }">
        <router-link class="master-class-card__img catalog-product-list-card__img no-padding" :to="to">
            <v-picture v-if="image">
                <slot />
                <div v-if="discount && discount.maxDiscount"
                    class="master-class-card__img-discount"
                > -{{ discount.maxDiscount }} </div>

                <div v-if="!isTabletLg" class="catalog-product-list-card__controls" v-once>
                    <buy-button
                            class="btn--outline catalog-product-list-card__controls-btn"
                            @click.prevent.stop="$emit('buy')"
                    >
                        Купить
                    </buy-button>
                </div>

            </v-picture>
            <v-svg v-else id="master-class-card-empty" name="logo" width="48" height="48" />

            <div v-if="$mq.tablet" class="master-class-card__mobile-cart-btn master-class-card__mobile-cart-btn-white" @click.prevent.stop="$emit('buy')">
                <v-link tag="button">
                    <transition name="fade-absolute">
                        <v-svg v-if="inCart" name="cart-filled" key="cart-filled" width="24" height="24" />
                        <v-svg v-else name="cart" key="cart" width="24" height="24" />
                    </transition>
                </v-link>
            </div>
        </router-link>
        <div class="master-class-card__body">
            <div class="master-class-card__body-top">
                <v-link class="master-class-card__body-link" :to="to">
                    <div class="master-class-card__body-link-name">{{ name }}</div>
                    <div class="master-class-card__body-link-speaker">
                        {{ speaker }}
                    </div>
                </v-link>
                <div class="master-class-card__body-prices"
                     :class="{'master-class-card__body-prices-installment': installment && installment.isInstallmentAvailable}">
                    <price
                        class="master-class-card__body-price"
                        v-bind="price"
                        :class="{ 'text-bold': !isSmall }"
                        :has-articles="hasArticles"
                    />
                    <installment-price
                            v-if="installment && installment.isInstallmentAvailable"
                            :value="price.value"
                            :installment-period="installment.installmentPeriod"
                    />
                </div>
            </div>

            <div class="text-grey text-sm master-class-card__body-bottom">
                <template v-if="isSmall">
                    <span>{{ date }}</span>
                    <span>&nbsp; • &nbsp;</span>
                    <span v-if="address">{{ address }}</span>
                </template>
                <template v-else>
                    <div>{{ date }}</div>
                    <div v-if="address">{{ address }}</div>
                </template>
            </div>
        </div>
    </li>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VPicture from '@controls/VPicture/VPicture.vue';
import BuyButton from "@components/BuyButton/BuyButton.vue";
import Price from '@components/Price/Price.vue';
import InstallmentPrice from "@components/InstallmentPrice/InstallmentPrice.vue";

import '@images/sprites/logo.svg';
import '@images/sprites/cart.svg';
import '@images/sprites/cart-filled.svg';

import './MasterClassCard.css';

export default {
    name: 'master-class-card',

    components: {
        VSvg,
        VLink,
        VPicture,
        BuyButton,
        Price,
        InstallmentPrice
    },

    props: {
        name: {
            type: String,
            required: true,
        },

        speaker: {
            type: String,
        },

        image: {
            type: [String, Object],
        },

        date: {
            type: [String, Date],
        },

        address: {
            type: String,
        },

        price: {
            type: Object,
        },

        installment: {
            type: [Object, Boolean, Array]
        },

        discount: {
            type: [Object, Array],
            required: false,
            default: false
        },

        oldPrice: {
            type: Object,
        },

        to: {
            type: [String, Object],
            default: '/',
        },

        hasArticles: {
            type: Boolean,
            default: false,
        },

        isSmall: {
            type: Boolean,
            default: false,
        },

        inCart: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },
};
</script>
