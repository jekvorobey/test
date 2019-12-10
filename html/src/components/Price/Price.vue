<template>
    <span class="price">
        {{ value }}
        &nbsp;<span v-html="currencySymbol" />
    </span>
</template>

<script>
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
    },
};
</script>