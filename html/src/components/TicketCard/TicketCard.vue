<template>
    <li class="ticket-card">
        <div class="ticket-card__info">
            <div class="text-medium ticket-card__name">{{ name }}</div>
            <div class="text-grey text-sm ticket-card__desc">{{ description }}</div>
        </div>
        <div class="ticket-card__body">
            <div class="ticket-card__remain">Осталось {{ max }} мест</div>
            <div class="ticket-card__count">
                <v-counter v-model="count" min="1" :max="max" :disabled="disabled" />
            </div>
            <price class="text-bold ticket-card__price" :value="computedPriceValue" :currency="price.currency" />
            <v-button class="ticket-card__btn" @click="onBtnClick">
                <slot>Добавить</slot>
            </v-button>
        </div>
    </li>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VCounter from '@controls/VCounter/VCounter.vue';

import Price from '@components/Price/Price.vue';

import './TicketCard.css';

export default {
    name: 'ticket-card',

    components: {
        VButton,
        VCounter,

        Price,
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

        disabled: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        computedPriceValue() {
            return this.count * this.price.value;
        },
    },

    methods: {
        onBtnClick() {
            this.$emit('btnClick', this.count);
        },
    },
};
</script>
