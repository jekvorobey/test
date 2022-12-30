<template>
    <li v-if="showBtn" class="master-class-banner-card">
        <v-picture class="master-class-banner-card__img" v-if="image">
            <slot />
            <div v-if="discount && discount.maxDiscount"
                    class="master-class-banner-card__img-discount"
            >
                <div>-{{discount.maxDiscount}}</div>
                <br>
                <div>От {{Math.round(discount.minPrice / 12).toLocaleString()}} р.\мес</div>
            </div>
        </v-picture>
        <div class="master-class-banner-card__panel">
            <div class="text-bold master-class-banner-card__info">
                <div class="text-bold master-class-banner-card__name">
                    {{ name }}
                </div>
                <div class="master-class-banner-card__author" v-if="author">
                    {{ author }}
                </div>
                <div class="master-class-banner-card__description" v-if="description">
                    {{ description }}
                </div>
            </div>
            <div class="text-bold master-class-banner-card__right-panel">
                <price v-if="price" class="text-bold master-class-banner-card__price" v-bind="price" />
                <slot name="btn">
                    <v-button class="btn--white master-class-banner-card__btn" :to="to" @click="onBtnClick">
                        {{ btnText }}
                    </v-button>
                </slot>
            </div>
        </div>
    </li>
    <router-link
        tag="li"
        v-else
        class="master-class-banner-card"
        :class="{ 'master-class-banner-card--link': !showBtn }"
        :to="to"
    >
        <v-picture class="master-class-banner-card__img" v-if="image">
            <slot />
        </v-picture>
        <div class="master-class-banner-card__panel">
            <div class="text-bold master-class-banner-card__info">
                <div class="text-bold master-class-banner-card__name">
                    {{ name }}
                </div>
                <div class="master-class-banner-card__author" v-if="author">
                    {{ author }}
                </div>
                <div class="master-class-banner-card__description" v-if="description">
                    {{ description }}
                </div>
            </div>
            <div class="text-bold master-class-banner-card__right-panel">
                <price v-if="price" class="text-bold master-class-banner-card__price" v-bind="price" />
            </div>
        </div>
    </router-link>
</template>
<script>
import VButton from '@controls/VButton/VButton.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import Price from '@components/Price/Price.vue';

import './MasterClassBannerCard.css';

export default {
    name: 'master-class-banner-card',

    components: {
        VPicture,
        VButton,

        Price,
    },

    props: {
        name: {
            type: String,
        },

        author: {
            type: String,
        },

        description: {
            type: String,
        },

        discount: {
            type: Object,
            required: false,
            default: false
        },

        btnText: {
            type: String,
            default: 'Подробнее',
        },

        image: {
            type: [Object, String],
        },

        price: {
            type: Object,
        },

        showBtn: {
            type: Boolean,
            default: false,
        },

        to: {
            type: [Object, String],
        },
    },

    methods: {
        onBtnClick() {
            this.$emit('btnClick');
        },
    },
};
</script>
