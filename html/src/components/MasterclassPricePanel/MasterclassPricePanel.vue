<template>
    <div class="masterclass-price-panel">
        <div class="container masterclass-price-panel__container">
            <template v-if="!isTablet">
                <div class="text-bold masterclass-price-panel__title">Мастер-класс</div>

                <div class="text-medium masterclass-price-panel__name">
                    <v-clamp :max-lines="2" autoresize>
                        {{ name }}
                    </v-clamp>
                </div>

                <price class="text-bold masterclass-price-panel__price" v-bind="price" />
            </template>

            <buy-button
                class="masterclass-price-panel__btn"
                :class="{ 'btn--outline': !isTablet }"
                @click.prevent="onBuyBtnClick"
                :disabled="disabled"
            >
                <slot />
            </buy-button>
        </div>
    </div>
</template>

<script>
import VClamp from 'vue-clamp';
import VSvg from '@controls/VSvg/VSvg.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import Price from '@components/Price/Price.vue';
import BuyButton from '@components/BuyButton/BuyButton.vue';

import { fileExtension } from '@enums';
import { generatePictureSourcePath } from '@util/file';
import { preparePrice } from '@util';
import './MasterclassPricePanel.css';

export default {
    name: 'masterclass-price-panel',

    components: {
        VSvg,
        VPicture,
        VClamp,

        Price,
        BuyButton,
    },

    props: {
        name: {
            type: String,
        },

        priceTo: {
            type: Object,
        },

        priceFrom: {
            type: Object,
        },

        disabled: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        isTablet() {
            return this.$mq.tablet;
        },

        price() {
            const { priceTo, priceFrom } = this;
            return {
                value: { to: priceTo.value, from: priceFrom.value, currency: priceTo.currency },
            };
        },
    },

    methods: {
        onBuyBtnClick() {
            this.$emit('add-item');
        },
    },
};
</script>
