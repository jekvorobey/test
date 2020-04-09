<template>
    <div class="checkout-address-panel">
        <h3 class="checkout-address-panel__title" v-if="!addresses || !addresses.length">Добавьте адрес</h3>
        <ul class="checkout-address-panel__list" v-else>
            <checkout-option-card
                class="checkout-address-panel__list-item"
                v-for="(address, index) in addresses"
                :key="`${address.region_guid}-${address.city_guid || address.settlment_guid}-${address.house}`"
                :selected="selectedAddress && isEqualObject(selectedAddress, address)"
                @cardClick="onSetAddress(address)"
                @btnClick="onChangeAddress(address, index)"
            >
                {{
                    `${address.city || address.settlement}, ${address.area ? `${address.area}, ` : ''}${
                        address.street ? `${address.street}, ` : ''
                    }${address.house} ${address.block || ''}, ${address.post_index}`
                }}
            </checkout-option-card>
        </ul>
    </div>
</template>

<script>
import CheckoutOptionCard from '@components/checkout/CheckoutOptionCard/CheckoutOptionCard.vue';

import { mapGetters, mapActions } from 'vuex';
import { NAME as CHECKOUT_MODULE } from '@store/modules/Checkout';
import { SET_ADDRESS } from '@store/modules/Checkout/actions';
import { SELECTED_PICKUP_POINT, ADDRESSES, SELECTED_ADDRESS } from '@store/modules/Checkout/getters';

import _isEqual from 'lodash/isEqual';
import './CheckoutAddressPanel.css';

export default {
    name: 'checkout-pickup-point-panel',

    components: {
        CheckoutOptionCard,
    },

    computed: {
        ...mapGetters(CHECKOUT_MODULE, [ADDRESSES, SELECTED_ADDRESS]),
    },

    methods: {
        ...mapActions(CHECKOUT_MODULE, [SET_ADDRESS]),

        isEqualObject(obj1, obj2) {
            return _isEqual(obj1, obj2);
        },

        onSetAddress(address) {
            this[SET_ADDRESS](address);
        },

        onChangeAddress(address, index) {
            this.$emit('change-address', { address, index });
        },
    },
};
</script>
