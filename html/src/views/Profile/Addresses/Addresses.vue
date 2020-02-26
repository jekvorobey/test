<template>
    <section class="section addresses-view">
        <h2 class="addresses-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
        <info-panel class="addresses-view__panel" header="Сохраненные адреса">
            <template v-slot:controls>
                <v-link class="addresses-view__panel-link" tag="button" @click="onAddAddress">
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
                        :selected="!!address.default"
                        @cardClick="onSetSelectedAddress(address)"
                        @btnClick="onChangeAddress(address)"
                    >
                        {{
                            `${address.city || address.settlement}, ${address.area ? `${address.area}, ` : ''}${
                                address.street ? `${address.street}, ` : ''
                            }${address.house} ${address.block || ''}, ${address.post_index}`
                        }}
                    </checkout-option-card>
                </ul>
            </div>
        </info-panel>

        <transition name="fade">
            <address-edit-modal v-show="isAddressEditOpen" v-if="$isServer || isAddressEditOpen" @save="onSave" />
        </transition>
    </section>
</template>

<script>
import VSvg from '../../../components/controls/VSvg/VSvg.vue';
import VLink from '../../../components/controls/VLink/VLink.vue';
import InfoPanel from '../../../components/profile/InfoPanel/InfoPanel.vue';

import CheckoutOptionCard from '../../../components/checkout/CheckoutOptionCard/CheckoutOptionCard.vue';
import AddressEditModal, {
    NAME as ADDRESS_EDIT_MODAL_NAME,
} from '../../../components/profile/AddressEditModal/AddressEditModal.vue';

import { mapActions, mapState } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '../../../store/modules/Profile';

import { NAME as ADDRESSES_MODULE, ADDRESSES } from '../../../store/modules/Profile/modules/Addresses';
import {
    FETCH_ADDRESSES_DATA,
    SET_LOAD,
    UPDATE_ADDRESS,
} from '../../../store/modules/Profile/modules/Addresses/actions';

import { $store, $progress, $logger } from '../../../services/ServiceLocator';

import _cloneDeep from 'lodash/cloneDeep';
import _isEqual from 'lodash/isEqual';

import { getRandomIntInclusive } from '../../../util/helpers';
import '../../../assets/images/sprites/plus-small.svg';
import './Addresses.css';

const ADDRESSES_MODULE_PATH = `${PROFILE_MODULE}/${ADDRESSES_MODULE}`;

export default {
    name: 'addresses',

    components: {
        VSvg,
        VLink,

        InfoPanel,
        CheckoutOptionCard,

        AddressEditModal,
    },

    computed: {
        ...mapState(ADDRESSES_MODULE_PATH, [ADDRESSES]),
        ...mapState(MODAL_MODULE, {
            isAddressEditOpen: state =>
                state[MODALS][ADDRESS_EDIT_MODAL_NAME] && state[MODALS][ADDRESS_EDIT_MODAL_NAME].open,
        }),

        isTablet() {
            return this.$mq.tablet;
        },

        iconSize() {
            return this.$mq.tablet ? 24 : 16;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(ADDRESSES_MODULE_PATH, [FETCH_ADDRESSES_DATA, SET_LOAD, UPDATE_ADDRESS]),

        isEqualAddress(address1, address2) {
            return _isEqual(address1, address2);
        },

        onSetSelectedAddress(address) {
            this.selectedAddress = address;
        },

        onSave(address) {
            this[UPDATE_ADDRESS](address);
        },

        onAddAddress() {
            this[CHANGE_MODAL_STATE]({
                name: ADDRESS_EDIT_MODAL_NAME,
                open: true,
                state: { address: {} },
            });
        },

        onChangeAddress(address) {
            this[CHANGE_MODAL_STATE]({
                name: ADDRESS_EDIT_MODAL_NAME,
                open: true,
                state: { address: { ...address } },
            });
        },
    },

    async serverPrefetch() {
        try {
            await this[FETCH_ADDRESSES_DATA](this.$isServer);
        } catch (error) {
            $logger.error(error);
        }
    },

    beforeRouteEnter(to, from, next) {
        const { load } = $store.state[PROFILE_MODULE][ADDRESSES_MODULE];

        if (load) {
            next();
            $store.dispatch(`${ADDRESSES_MODULE_PATH}/${SET_LOAD}`, false);
            return;
        }

        $progress.start();
        $store
            .dispatch(`${ADDRESSES_MODULE_PATH}/${FETCH_ADDRESSES_DATA}`)
            .then(() => {
                next(vm => {
                    $progress.finish();
                });
            })
            .catch(thrown => {
                $progress.fail();
                $logger.error('beforeRouteEnter', thrown.error);
                $progress.finish();
                next();
            });
    },
};
</script>
