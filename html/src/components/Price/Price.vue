<template>
    <component class="price" :is="tag" v-on="$listeners">
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
        <div v-else-if="showHiddenPriceLabel" class="price__no-price-container" @click="onPriceLabelClick">
            <v-svg name="no-price" class="price__no-price" />
        </div>
        <span v-else v-bind="itemPropSettings.value">{{ valueLabel }}</span
        ><template v-if="currencySymbol"
            >&nbsp;<span class="price__currency" v-html="currencySymbol" v-bind="itemPropSettings.currency"
        /></template>
    </component>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';

import { preparePrice } from '@util';
import { currencySymbol, modalName } from '@enums';
import './Price.css';

import '@images/sprites/no-price.svg';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';
import { mapActions } from 'vuex';
import { NAME as MODAL_MODULE } from '@store/modules/Modal';

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

        emptyLabel: {
            type: String,
            default: null,
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
            if (!isObject) return value === 0 && !alwaysNumber ? this.emptyLabel || 'Бесплатно' : preparePrice(value);

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

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onPriceLabelClick(event) {
            event.stopPropagation();
            event.preventDefault();

            this[CHANGE_MODAL_STATE]({
                name: modalName.general.PROFESSIONAL_DISCLAIMER,
                open: true,
                state: {},
            });
        },
    },
};
</script>
