<template>
    <span class="price">
        {{ computedValue }}
        &nbsp;<span v-html="currencySymbol" />
    </span>
</template>

<script>
import { preparePrice } from '../../util/helpers';
import { currencySymbol } from '../../assets/scripts/enums';
import './Price.css';

export default {
    name: 'price',
    props: {
        value: {
            type: [Number, Object],
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
        isObject() {
            return this.value instanceof Object;
        },

        currencySymbol() {
            return currencySymbol[this.currency];
        },

        computedValue() {
            if (this.isObject) return `${preparePrice(this.value.from)} - ${preparePrice(this.value.to)}`;
            return preparePrice(this.value);
        },
    },
};
</script>
