<template>
    <li class="checkout-option-card" :class="{ 'checkout-option-card--selected': selected }" @click="onCardClick">
        <div class="checkout-option-card__left">
            <slot />
        </div>
        <div class="checkout-option-card__right">
            <v-svg name="check-small" width="24" height="24" />
            <v-link v-if="!readonly" class="checkout-option-card__right-link" tag="button" @click.stop="onBtnClick">
                {{ btnText }}
            </v-link>
        </div>
    </li>
</template>
<script>
import VSvg from '../../controls/VSvg/VSvg.vue';
import VLink from '../../controls/VLink/VLink.vue';

import '../../../assets/images/sprites/check-small.svg';
import './CheckoutOptionCard.css';

export default {
    name: 'checkout-option-card',

    components: {
        VSvg,
        VLink,
    },

    props: {
        readonly: {
            type: Boolean,
            default: false,
        },

        selected: {
            type: Boolean,
            default: false,
        },

        btnText: {
            type: String,
            default: 'Изменить',
        },
    },

    methods: {
        onCardClick() {
            this.$emit('cardClick');
        },

        onBtnClick() {
            this.$emit('btnClick');
        },
    },
};
</script>