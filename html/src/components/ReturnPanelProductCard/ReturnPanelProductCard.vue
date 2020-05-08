<template>
    <li class="return-panel-product-card">
        <v-check
            :id="`return-panel-product-card-${productId}`"
            v-model="isSelected"
            name="return-panel-product-card-item"
            value="1"
        />
        <router-link v-if="href" class="return-panel-product-card__img" :to="href">
            <v-picture :key="image.id" v-if="image && image.id">
                <source :data-srcset="desktopImage" type="image/webp" />
                <img class="blur-up lazyload v-picture__img" :data-src="defaultImage" alt="" />
            </v-picture>
            <v-svg v-else id="return-panel-product-card-empty" name="logo" width="48" height="48" />
        </router-link>
        <div class="return-panel-product-card__img" v-else>
            <v-picture :key="image.id" v-if="image && image.id">
                <source :data-srcset="desktopImage" type="image/webp" />
                <img class="blur-up lazyload v-picture__img" :data-src="defaultImage" alt="" />
            </v-picture>
            <v-svg v-else id="return-panel-product-card-empty" name="logo" width="48" height="48" />
        </div>

        <div class="return-panel-product-card__body">
            <div class="return-panel-product-card__title">
                <v-link class="return-panel-product-card__info-name" :to="href">{{ name }}</v-link>
                <div class="return-panel-product-card__description">
                    {{ description }}
                </div>
            </div>

            <div class="return-panel-product-card__counter">
                <v-counter :value="count" min="1" @input="debounce_countChange" v-if="count > 1" />
                <span class="return-panel-product-card__counter-text" v-else>1 шт</span>
            </div>

            <div class="return-panel-product-card__info">
                <div class="return-panel-product-card__info-prices">
                    <price class="text-bold return-panel-product-card__info-price" v-bind="price" />
                    <price
                        class="text-grey text-strike return-panel-product-card__info-price return-panel-product-card__info-price--old"
                        v-if="oldPrice"
                        v-bind="oldPrice"
                    />
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VPicture from '@controls/VPicture/VPicture.vue';
import VCheck from '@controls/VCheck/VCheck.vue';
import VCounter from '@controls/VCounter/VCounter.vue';

import Price from '@components/Price/Price.vue';

import { fileExtension } from '@enums';
import { generatePictureSourcePath } from '@util/file';
import _debounce from 'lodash/debounce';

import '@images/sprites/cross-small.svg';
import '@images/sprites/logo.svg';

import './ReturnPanelProductCard.css';

export default {
    name: 'return-panel-product-card',

    components: {
        VSvg,
        VLink,
        VPicture,
        VCheck,
        VCounter,

        Price,
    },

    data() {
        return {
            isSelected: false,
        };
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

        description: {
            type: String,
            default: '',
        },
    },

    computed: {
        desktopImage() {
            if (this.image && this.image.id)
                return generatePictureSourcePath(300, 300, this.image.id, fileExtension.image.WEBP);
        },

        defaultImage() {
            if (this.image && this.image.id) return generatePictureSourcePath(300, 300, this.image.id);
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        onCountChange(value) {},
    },

    created() {
        this.debounce_countChange = _debounce(this.onCountChange, 200);
    },
};
</script>
