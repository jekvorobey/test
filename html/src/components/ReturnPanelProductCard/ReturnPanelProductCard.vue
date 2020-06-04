<template>
    <div class="return-panel-product-card" :class="className">
        <router-link class="return-panel-product-card__img" :to="href">
            <v-picture v-if="image" :image="image" alt="">
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
            <v-link class="return-panel-product-card__body-name" :to="href">{{ name }}</v-link>
            <div class="return-panel-product-card__body-count" v-if="count === 1">{{ quantity }} шт</div>
            <v-counter v-else class="return-panel-product-card__counter" v-model="quantity" min="1" :max="count" />
            <div class="return-panel-product-card__body-prices">
                <price class="text-bold return-panel-product-card__body-price" v-bind="price" />
                <price
                    class="text-grey text-strike return-panel-product-card__body-price--old"
                    v-if="oldPrice && oldPrice.value !== price.value"
                    v-bind="oldPrice"
                />
            </div>
        </div>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue'
import VLink from '@controls/VLink/VLink.vue'
import VPicture from '@controls/VPicture/VPicture.vue'
import VCounter from '@controls/VCounter/VCounter.vue'

import Price from '@components/Price/Price.vue'

import { generatePictureSourcePath } from '@util/file'
import './ReturnPanelProductCard.css'

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
        name: {
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
            type: Object,
        },

        oldPrice: {
            type: Object,
        },

        count: {
            type: [String, Number],
            default: 1,
        },

        className: {
            type: String,
            default: '',
        },

        id: {
            type: Number,
            default: null,
        }
    },

    data() {
        return {
            quantity: null,
        };
    },

    methods: {
        generateSourcePath (x, y, id, ext) {
            return generatePictureSourcePath(x, y, id, ext);
        },
    },

    beforeMount() {
        this.quantity = this.count;
    }
}
</script>
