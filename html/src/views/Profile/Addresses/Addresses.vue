<template>
    <section class="section addresses-view">
        <h2 class="addresses-view__hl">
            {{ pageTitle }}
        </h2>

        <info-panel class="addresses-view__panel" header="Сохраненные адреса">
            <template v-slot:controls>
                <v-link class="addresses-view__panel-link" tag="button" @click="onAddAddress">
                    <v-svg name="plus-small" :width="iconSize" :height="iconSize" />
                    <span>&nbsp;&nbsp;Добавить новый адрес</span>
                </v-link>
            </template>

            <div class="container container--tablet-lg" v-if="addresses && addresses.length > 0">
                <ul class="addresses-view__panel-list">
                    <checkout-option-card
                        class="addresses-view__panel-item"
                        v-for="address in addresses"
                        :key="`${address.region_guid}-${address.city_guid || address.settlment_guid}-${address.house}`"
                        :selected="address.default"
                        @cardClick="onSetDefaultAddress(address)"
                    >
                        {{
                            `${address.city || address.settlement}, ${address.area ? `${address.area}, ` : ''}${
                                address.street ? `${address.street}, ` : ''
                            }${address.house} ${address.block || ''}, ${address.post_index}`
                        }}
                        <template v-slot:controls>
                            <div class="checkout-option-card__controls">
                                <v-link
                                    class="checkout-option-card__right-link"
                                    tag="button"
                                    @click.stop="onChangeAddress(address)"
                                >
                                    <v-svg name="edit" width="16" height="16" />
                                </v-link>
                                <v-link
                                    class="checkout-option-card__right-link"
                                    tag="button"
                                    @click.stop="onConfirmationModalOpen(address)"
                                >
                                    <v-svg name="cross" width="16" height="16" />
                                </v-link>
                            </div>
                        </template>
                    </checkout-option-card>
                </ul>
            </div>
            <div class="container container--tablet-lg" v-else>
                <div class="addresses-view__no-addresses">
                    <v-svg class="addresses-view__no-addresses-icon" name="info-middle" width="24" height="24" />
                    Вы ещё не добавили адресов
                </div>
                <v-button class="btn--outline addresses-view__no-addresses-btn" @click="onAddAddress">
                    Добавить адрес
                </v-button>
            </div>
        </info-panel>

        <transition name="fade">
            <address-edit-modal
                v-show="isAddressEditOpen"
                v-if="$isServer || isAddressEditOpen"
                @save="onSaveAddress"
            />
        </transition>

        <transition name="fade">
            <confirmation-modal
                v-show="isConfirmationModalOpen"
                v-if="$isServer || isConfirmationModalOpen"
                @submit="onDeleteAddress"
            />
        </transition>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';

import InfoPanel from '@components/profile/InfoPanel/InfoPanel.vue';

import CheckoutOptionCard from '@components/checkout/CheckoutOptionCard/CheckoutOptionCard.vue';
import AddressEditModal from '@components/profile/AddressEditModal/AddressEditModal.vue';
import ConfirmationModal from '@components/ConfirmationModal/ConfirmationModal.vue';

import { mapActions, mapState } from 'vuex';
import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';
import { NAME as PROFILE_MODULE } from '@store/modules/Profile';

import { NAME as ADDRESSES_MODULE, ADDRESSES } from '@store/modules/Profile/modules/Addresses';
import {
    FETCH_ADDRESSES_DATA,
    SET_LOAD,
    UPDATE_ADDRESS,
    DELETE_ADDRESS,
    SET_DEFAULT_ADDRESS,
} from '@store/modules/Profile/modules/Addresses/actions';

import _isEqual from 'lodash/isEqual';
import { modalName } from '@enums';
import { $store, $progress, $logger } from '@services';
import metaMixin from '@plugins/meta';
import '@images/sprites/plus-small.svg';
import '@images/sprites/info-middle.svg';
import '@images/sprites/edit.svg';
import './Addresses.css';

const ADDRESSES_MODULE_PATH = `${PROFILE_MODULE}/${ADDRESSES_MODULE}`;

export default {
    name: 'addresses',
    mixins: [metaMixin],

    components: {
        VSvg,
        VLink,
        VButton,

        InfoPanel,
        CheckoutOptionCard,

        AddressEditModal,
        ConfirmationModal,
    },

    metaInfo() {
        const { pageTitle } = this;
        return {
            title: pageTitle,
        };
    },

    computed: {
        ...mapState(ADDRESSES_MODULE_PATH, [ADDRESSES]),
        ...mapState(MODAL_MODULE, {
            isAddressEditOpen: (state) =>
                state[MODALS][modalName.profile.ADDRESS_EDIT] && state[MODALS][modalName.profile.ADDRESS_EDIT].open,
            isConfirmationModalOpen: (state) =>
                state[MODALS][modalName.profile.CONFIRMATION] && state[MODALS][modalName.profile.CONFIRMATION].open,
        }),

        pageTitle() {
            return this.$t(`profile.routes.${this.$route.name}`);
        },

        isTablet() {
            return this.$mq.tablet;
        },

        iconSize() {
            return this.$mq.tablet ? 24 : 16;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(ADDRESSES_MODULE_PATH, [
            FETCH_ADDRESSES_DATA,
            SET_LOAD,
            UPDATE_ADDRESS,
            SET_DEFAULT_ADDRESS,
            DELETE_ADDRESS,
        ]),

        isEqualAddress(address1, address2) {
            return _isEqual(address1, address2);
        },

        onSetDefaultAddress(address) {
            if (!address.default) this[SET_DEFAULT_ADDRESS](address.id);
        },

        onAddAddress() {
            this[CHANGE_MODAL_STATE]({
                name: modalName.profile.ADDRESS_EDIT,
                open: true,
                state: { address: {}, btnText: 'Добавить' },
            });
        },

        onChangeAddress(address) {
            this[CHANGE_MODAL_STATE]({
                name: modalName.profile.ADDRESS_EDIT,
                open: true,
                state: { address: { ...address }, btnText: 'Изменить' },
            });
        },

        onSaveAddress(address) {
            this[UPDATE_ADDRESS](address);
        },

        onDeleteAddress(address) {
            this[DELETE_ADDRESS](address);
        },

        onConfirmationModalOpen(address) {
            this[CHANGE_MODAL_STATE]({
                name: modalName.profile.CONFIRMATION,
                open: true,
                state: {
                    title: 'Удалить адрес',
                    message: 'Адрес доставки будет удалён',
                    btnSubmitText: 'Удалить',
                    additionalArgs: address,
                },
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
        function proceed() {
            if ($store.state[PROFILE_MODULE] && $store.state[PROFILE_MODULE][ADDRESSES_MODULE]) {
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
                        next(() => {
                            $progress.finish();
                        });
                    })
                    .catch((thrown) => {
                        $progress.fail();
                        $logger.error('beforeRouteEnter', thrown.error);
                        $progress.finish();
                        next();
                    });
            }
        }

        if ($store.state[PROFILE_MODULE] && $store.state[PROFILE_MODULE][ADDRESSES_MODULE]) proceed();
        else {
            $store.watch(
                (state) => state[PROFILE_MODULE][ADDRESSES_MODULE],
                (value) => {
                    if (value) proceed();
                }
            );
        }
    },
};
</script>
