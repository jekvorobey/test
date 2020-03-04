<template>
    <component :is="tag" class="price">
        {{ computedValue }}
        &nbsp;<span v-html="currencySymbol" />
    </component>
</template>

<script>
import { preparePrice } from '../../util/helpers';
import { currencySymbol } from '../../assets/scripts/enums/general';
import './Price.css';

export default {
    name: 'price',
    props: {
        tag: {
            type: String,
            default: 'span',
        },

        value: {
            type: [Number, Object],
            default: 0,
        },

        currency: {
            type: String,
            default: 'RUB',
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
