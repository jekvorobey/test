<template>
    <div class="product-delivery-panel">
        <p>
            Получить в
            <button class="product-delivery-panel__btn" title="Выбрать город" @click="onOpenCitySelection">
                <span class="product-delivery-panel__btn-type" v-if="cityType">{{ cityType }}.</span>
                <v-clamp class="product-delivery-panel__btn-text" :max-lines="1" autoresize>
                    {{ city }}
                </v-clamp>
                <v-svg name="arrow-down" width="16" height="16" />
            </button>
        </p>

        <p class="status-color-error" v-if="!deliveryMethods || !deliveryMethods.length">
            Доставка в данный регион не осуществляется.<br />
            Выберите другой населенный пункт.
        </p>

        <p v-for="method in deliveryMethods" :key="method.deliveryMethod">
            <template v-if="method.deliveryMethod === receiveMethods.PICKUP">
                {{ $t(`product.deliveryMethod.${method.deliveryMethod}[0]`) }}
                <button class="product-delivery-panel__btn" title="Выбрать город" @click="onOpenPickupPoints">
                    {{ $t(`product.deliveryMethod.${method.deliveryMethod}[1]`) }}
                </button>
            </template>
            <template v-else>
                {{ $t(`product.deliveryMethod.${method.deliveryMethod}`) }}
            </template>

            —
            <price
                class="product-delivery-panel__price"
                v-if="method.cost && method.cost.value > 0"
                v-bind="method.cost"
            />
            <span v-else> {{ $t('product.freeDelivery') }} </span>,
            <span class="text-grey">{{ formatDate(method.date) }}</span>
        </p>
    </div>
</template>

<script>
import VClamp from 'vue-clamp';
import VSvg from '@controls/VSvg/VSvg.vue';

import Price from '@components/Price/Price.vue';

import { mapState, mapActions } from 'vuex';
import { LOCALE } from '@store';
import { NAME as GEO_MODULE, SELECTED_CITY } from '@store/modules/Geolocation';
import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { getDate } from '@util';
import { dayMonthLongDateSettings } from '@settings';
import { modalName } from '@enums';
import { receiveMethods } from '@enums/checkout';
import '@images/sprites/arrow-down.svg';
import './ProductDeliveryPanel.css';

export default {
    name: 'product-delivery-panel',

    components: {
        VSvg,
        VClamp,

        Price,
    },

    props: {
        deliveryMethods: {
            type: Array,
            default() {
                return [];
            },
        },

        pickupPoints: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState(GEO_MODULE, {
            city: (state) => (state[SELECTED_CITY] && state[SELECTED_CITY].name) || 'Выберите город',
            cityType: (state) => (state[SELECTED_CITY] && state[SELECTED_CITY].type) || null,
        }),
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        formatDate(date) {
            const dateObj = date && getDate(date);
            const today = new Date().getDate();
            let additionalText = ``;

            if (today === dateObj.getDate()) additionalText = `сегодня`;
            else if (today + 1 === dateObj.getDate()) additionalText = `завтра`;
            else additionalText = dateObj && this.$t(`weekdays.short.${dateObj.getDay()}`);

            return `c ${
                dateObj && dateObj.toLocaleDateString(this[LOCALE], dayMonthLongDateSettings)
            } (${additionalText})`;
        },

        onOpenCitySelection() {
            this[CHANGE_MODAL_STATE]({ name: modalName.general.CITY_SELECTION, open: true });
        },

        onOpenPickupPoints() {
            this.$emit('pickup-points');
        },
    },

    beforeCreate() {
        this.receiveMethods = receiveMethods;
    },
};
</script>
