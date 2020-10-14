<template>
    <div class="return-product-card" :class="className">
        <router-link class="return-product-card__img" :to="href">
            <v-picture v-if="image" :image="image" alt>
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
            <v-svg v-else id="return-product-card-empty" name="logo" width="48" height="48" />
        </router-link>
        <div class="return-product-card__body">
            <div class="return-product-card__title">
                <v-link class="return-product-card__body-name" :to="href">{{ name }}</v-link>
                <template v-if="!reason">
                    <a class="return-product-card__link-btn" @click="onSelectReason">Укажите причину возврата</a>
                </template>
                <template v-else>
                    <p class="return-product-card__reason">
                        <a class="return-product-card__link-btn" @click="onSelectReason">Причина возврата:</a>
                        {{ reason }}
                    </p>
                </template>
            </div>
            <div class="return-product-card__body-count">{{ quantity }} шт</div>
            <div class="return-product-card__body-prices">
                <price class="text-bold return-product-card__body-price" v-bind="price" />
                <price
                    class="text-grey text-strike return-product-card__body-price--old"
                    v-if="oldPrice && oldPrice.value !== price.value"
                    v-bind="oldPrice"
                />
            </div>
        </div>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VPicture from '@controls/VPicture/VPicture.vue';
import VButton from '@controls/VButton/VButton.vue';

import Price from '@components/Price/Price.vue';

import { generatePictureSourcePath } from '@util/file';
import './ReturnProductCard.css';

export default {
    name: 'return-product-card',

    components: {
        VSvg,
        VLink,
        VPicture,
        VButton,

        Price,
    },

    props: {
        className: {
            type: String,
            default: '',
        },

        href: {
            type: String,
            default: '/',
        },

        type: {
            type: String,
        },

        id: {
            type: Number,
            required: true,
        },

        quantity: {
            type: Number,
        },

        image: {
            type: Object,
        },

        name: {
            type: String,
        },

        price: {
            type: Object,
        },

        oldPrice: {
            type: Object,
        },

        reason: {
            type: String,
            default: '',
        },
    },

    methods: {
        generateSourcePath(x, y, id, ext) {
            return generatePictureSourcePath(x, y, id, ext);
        },

        onSelectReason() {
            this.$emit('select-reason', this.id);
        },
    },
};
</script>
