<template>
    <component class="price" :is="tag">
        <template v-if="isObject">
            <template v-if="valueLabel.from"
                ><template v-if="hasArticles">от&nbsp;</template
                ><span v-bind="itemPropSettings.value.from">{{ valueLabel.from }}</span></template
            ><span v-if="!hasArticles && valueLabel.to && valueLabel.from"> - </span
            ><template v-if="valueLabel.to"
                ><template v-if="hasArticles">до&nbsp;</template
                ><span v-bind="itemPropSettings.value.to">{{ valueLabel.to }}</span>
            </template>
        </template>
        <v-svg v-else-if="showHiddenPriceLabel" name="no-price" class="price__no-price" />
        <span v-else v-bind="itemPropSettings.value">{{ valueLabel }}</span
        ><template v-if="currencySymbol"
            >&nbsp;<span v-html="currencySymbol" v-bind="itemPropSettings.currency"
        /></template>
    </component>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';

import { preparePrice } from '@util';
import { currencySymbol } from '@enums';
import './Price.css';

import '@images/sprites/no-price.svg';

export default {
    components: {
        VSvg,
    },
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

        itemProp: {
            type: Boolean,
            default: false,
        },

        isPriceHidden: {
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
            if (!isObject) return (value === 0 || value === null) && !alwaysNumber ? null : currencySymbol[currency];
            else return currencySymbol[currency];
        },

        valueLabel() {
            const { isObject, alwaysNumber, value } = this;
            if (!isObject) return value === 0 && !alwaysNumber ? 'Бесплатно' : preparePrice(value);

            return {
                to: value.to && preparePrice(value.to),
                from: value.from && preparePrice(value.from),
            };
        },

        showHiddenPriceLabel() {
            return this.isPriceHidden && (this.value === 0 || this.value === null);
        },

        itemPropSettings() {
            const { itemProp, isObject, value, currency } = this;

            return itemProp
                ? {
                      value: isObject
                          ? {
                                from: {
                                    itemprop: 'lowPrice',
                                    content: value.from,
                                },

                                to: {
                                    itemprop: 'highPrice',
                                    content: value.to,
                                },
                            }
                          : {
                                itemprop: 'price',
                                content: value,
                            },

                      currency: {
                          itemprop: 'priceCurrency',
                          content: currency,
                      },
                  }
                : {
                      value: isObject
                          ? {
                                from: {},

                                to: {},
                            }
                          : {},
                      currency: {},
                  };
        },
    },
};
</script>
