<template>
    <component :is="tag" class="price">
        <span>{{ computedValue }}</span
        >&nbsp;<span v-html="currencySymbol" />
    </component>
</template>

<script>
import { preparePrice } from '@util';
import { currencySymbol } from '@enums';
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

        hasArticles: {
            type: Boolean,
            default: false,
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
            const { isObject, hasArticles, value } = this;
            if (!isObject) return preparePrice(value);

            let stringValue = '';
            if (value.from) stringValue += hasArticles ? `от ${preparePrice(value.from)}` : preparePrice(value.from);
            if (value.to) stringValue += hasArticles ? ` до ${preparePrice(value.to)}` : ` - ${preparePrice(value.to)}`;
            return stringValue;
        },
    },
};
</script>
