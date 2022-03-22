<template>
    <li class="ticket-card">
        <div class="ticket-card__info">
            <div class="text-medium ticket-card__name">{{ name }}</div>
            <p class="text-grey text-sm ticket-card__desc">{{ description }}</p>
        </div>
        <div class="ticket-card__body">
            <div class="ticket-card__remain">
                <template v-if="showCount">
                    <template v-if="isAvaliable"> Осталось {{ max }} мест </template>
                    <template v-else>Нет в наличии</template>
                </template>
            </div>
            <div class="ticket-card__count">
                <v-counter v-if="isAvaliable" v-model="count" min="1" :max="max" :disabled="disabled" />
            </div>
            <div class="ticket-card__prices">
                <price class="text-bold ticket-card__price" :value="computedPriceValue" :currency="price.currency" />
                <price
                    v-if="oldPrice"
                    class="text-grey text-strike ticket-card__price ticket-card__price--old"
                    :value="computedOldPriceValue"
                    :currency="price.currency"
                />
            </div>

            <buy-button
                class="ticket-card__btn"
                :class="{ 'btn--transparent': inProcess }"
                :disabled="!isAvaliable"
                @click="onBtnClick"
            >
                <v-spinner v-if="inProcess" width="24" height="24" show />
                <slot v-else>Добавить</slot>
            </buy-button>
        </div>
    </li>
</template>

<script>
import VSpinner from '@controls/VSpinner/VSpinner.vue';
import VCounter from '@controls/VCounter/VCounter.vue';

import BuyButton from '../BuyButton/BuyButton.vue';
import Price from '@components/Price/Price.vue';

import './TicketCard.css';

export default {
    name: 'ticket-card',

    components: {
        VCounter,
        VSpinner,

        Price,
        BuyButton,
    },

    data() {
        return {
            count: 1,
        };
    },

    props: {
        name: {
            type: String,
            required: true,
        },

        description: {
            type: String,
        },

        min: {
            type: Number,
            default: 1,
        },

        max: {
            type: Number,
            default: 1,
        },

        price: {
            type: Object,
        },

        oldPrice: {
            type: Object,
        },

        showCount: {
            type: Boolean,
            default: true,
        },

        inProcess: {
            type: Boolean,
            default: false,
        },

        disabled: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        isAvaliable() {
            const { max } = this;
            return max > 0;
        },

        computedPriceValue() {
            return this.count * this.price.value;
        },

        computedOldPriceValue() {
            return this.count * this.oldPrice.value;
        },
    },

    methods: {
        onBtnClick() {
            if (!this.inProcess) this.$emit('btnClick', this.count);
        },
    },
};
</script>
