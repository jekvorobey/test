<template>
    <li
        class="checkout-option-card"
        :class="{
            'checkout-option-card--selected': selected,
            'checkout-option-card--error': error,
            'checkout-option-card--disabled': disabled,
        }"
        @click.stop="onCardClick"
    >
        <div v-if="loading" class="checkout-option-card__spinner">
            <v-spinner show />
        </div>

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
            <slot name="controls" v-if="canChange">
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
import VSpinner from '@controls/VSpinner/VSpinner.vue';

import '@images/sprites/check-small.svg';
import './CheckoutOptionCard.css';

export default {
    name: 'checkout-option-card',

    components: {
        VSpinner,
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

        canChange: {
            type: Boolean,
            default: true,
            required: false,
        },

        showCheck: {
            type: Boolean,
            default: true,
        },

        error: {
            type: Boolean,
            default: false,
        },

        disabled: {
            type: Boolean,
            default: false,
        },

        loading: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        onCardClick() {
            if (!this.disabled && !this.loading) {
                this.$emit('cardClick');
            }
        },

        onBtnClick() {
            if (!this.disabled && !this.loading) {
                this.$emit('btnClick');
            }
        },
    },
};
</script>
