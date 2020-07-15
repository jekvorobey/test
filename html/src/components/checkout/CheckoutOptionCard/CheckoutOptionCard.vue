<template>
    <li class="checkout-option-card" :class="{ 'checkout-option-card--selected': selected }" @click.stop="onCardClick">
        <div class="checkout-option-card__left">
            <slot />
        </div>
        <div class="checkout-option-card__right">
            <v-svg
                class="checkout-option-card__right-selected"
                :class="{ 'visibility-hidden': !showCheck }"
                name="check-small"
                width="24"
                height="24"
            />
            <slot name="controls">
                <v-link class="checkout-option-card__right-link" v-if="!readonly" tag="button" @click.stop="onBtnClick">
                    {{ btnText }}
                </v-link>
            </slot>
        </div>
    </li>
</template>
<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';

import '@images/sprites/check-small.svg';
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

        showCheck: {
            type: Boolean,
            default: true,
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