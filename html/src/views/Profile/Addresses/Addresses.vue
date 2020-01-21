<template>
    <section class="section addresses-view">
        <h2 class="addresses-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
        <info-panel class="addresses-view__panel" header="Сохраненные адреса">
            <template v-slot:controls>
                <v-link class="addresses-view__panel-link" tag="button">
                    <v-svg name="plus-small" :width="iconSize" :height="iconSize" />
                    <span>&nbsp;&nbsp;Добавить новый адрес</span>
                </v-link>
            </template>
            <div class="container container--tablet-lg">
                <ul class="addresses-view__panel-list">
                    <checkout-option-card
                        class="addresses-view__panel-item"
                        v-for="address in addresses"
                        :key="`${address.region_guid}-${address.city_guid || address.settlment_guid}-${address.house}`"
                        :selected="isEqualAddress(address, selectedAddress)"
                        @cardClick="onSetSelectedAddress(address)"
                        @btnClick="onChangeAddress(address)"
                    >
                        {{
                            `${address.city || address.settlement}, ${address.street ? `${address.street}, ` : ''}${
                                address.house
                            } ${address.block}, ${address.postal_code}`
                        }}
                    </checkout-option-card>
                </ul>
            </div>
        </info-panel>
    </section>
</template>

<script>
import VSvg from '../../../components/controls/VSvg/VSvg.vue';
import VLink from '../../../components/controls/VLink/VLink.vue';
import InfoPanel from '../../../components/profile/InfoPanel/InfoPanel.vue';

import CheckoutOptionCard from '../../../components/checkout/CheckoutOptionCard/CheckoutOptionCard.vue';

import { mapActions, mapState } from 'vuex';
import { $store } from '../../../services/ServiceLocator';

import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import _cloneDeep from 'lodash/cloneDeep';
import _isEqual from 'lodash/isEqual';

import '../../../assets/images/sprites/plus-small.svg';
import './Addresses.css';

export default {
    name: 'addresses',

    components: {
        VSvg,
        VLink,

        InfoPanel,
        CheckoutOptionCard,
    },

    data() {
        const selectedAddress = {
            postal_code: '123144',
            region_guid: '0c5b2444-70a0-4932-980c-b4dc0d3f02b5',
            city_guid: 'ec44c0ee-bf24-41c8-9e1c-76136ab05cbf',
            city: 'Зеленоград',
            settlement_guid: null,
            settlement: null,
            street: 'ул. Юности',
            house: 'д. 1',
            block: 'стр. 1',
        };

        return {
            selectedAddress,
            addresses: [
                selectedAddress,
                {
                    postal_code: '544444',
                    region_guid: '0c5b2444-70a0-4232-980c-b4dc0d3f02b5',
                    city_guid: null,
                    city: null,
                    settlement_guid: 'ec41ee-bf24-411c8-9e1c-76136ab05cbf',
                    settlement: 'Поселок солнечное',
                    street: 'ул. Солнечная',
                    house: 'д. 112',
                    block: 'стр. 3',
                },
                {
                    postal_code: '134144',
                    region_guid: '445b2444-70a0-4932-980c-b55c0d3f02b5',
                    city_guid: 'ec44c0ee-bf24-41c8-9e1c-761366565cbf',
                    city: 'Видное',
                    settlement_guid: null,
                    settlement: null,
                    street: 'ул. Советская',
                    house: 'д. 231',
                    block: 'стр. 5',
                },
            ],
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {}),

        isTablet() {
            return this.$mq.tablet;
        },

        iconSize() {
            return this.$mq.tablet ? 24 : 16;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        isEqualAddress(address1, address2) {
            return _isEqual(address1, address2);
        },

        onSetSelectedAddress(address) {
            this.selectedAddress = address;
        },

        onChangeAddress(address) {},
    },
};
</script>
