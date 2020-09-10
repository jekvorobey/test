<template>
    <component :is="tag" class="price">
        <span>{{ computedValue }}</span
        ><template v-if="currencySymbol">&nbsp;<span v-html="currencySymbol" /></template>
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

        alwaysNumber: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        isObject() {
            return this.value instanceof Object;
        },

        currencySymbol() {
            const { isObject, alwaysNumber, value, currency } = this;
            if (!isObject) return value === 0 && !alwaysNumber ? null : currencySymbol[currency];
            else return currencySymbol[currency];
        },

        computedValue() {
            const { isObject, hasArticles, alwaysNumber, value } = this;
            if (!isObject) return value === 0 && !alwaysNumber ? 'Бесплатно' : preparePrice(value);

            let stringValue = '';
            if (value.from !== null)
                stringValue += hasArticles ? `от ${preparePrice(value.from)}` : preparePrice(value.from);
            if (value.to !== null)
                stringValue += hasArticles ? ` до ${preparePrice(value.to)}` : ` - ${preparePrice(value.to)}`;
            return stringValue;
        },
    },
};
</script>
