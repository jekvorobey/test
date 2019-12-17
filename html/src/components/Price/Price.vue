<template>
    <span class="price">
        {{ computedValue }}
        &nbsp;<span v-html="currencySymbol" />
    </span>
</template>

<script>
import { preparePrice } from '../../util/helpers';
import { currencySymbol } from '../../assets/scripts/constants';
import './Price.css';

export default {
    name: 'price',
    props: {
        value: {
            type: Number,
            required: true,
        },

        currency: {
            type: String,
            required: true,
        },

        type: {
            type: String,
        },
    },

    computed: {
        currencySymbol() {
            return currencySymbol[this.currency];
        },

        computedValue() {
            return preparePrice(this.value);
        },
    },
};
</script>
