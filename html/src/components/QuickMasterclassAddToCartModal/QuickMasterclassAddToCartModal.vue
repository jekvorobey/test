<template>
    <pin-modal
            class="quick-variant-add-to-card-modal"
            :class="{'quick-variant-add-to-card-modal__center': !isTablet}"
            :loading="isLoading"
            @close="onClose">
        <div v-if="modalState.masterclass" class="quick-variant-add-to-card-modal__inner">
            <product-option-panel class="quick-variant-add-to-card-modal__characteristic" header="Тип билета">
                <div class="quick-variant-add-to-card-modal__options">
                    <product-option-tag
                        class="quick-variant-add-to-card-modal__option"
                        v-for="ticket in modalState.masterclass.ticketTypes"
                        :key="ticket.id"
                        :selected="selectedTicket && selectedTicket.id === ticket.id"
                        :disabled="false"
                        @click.stop="selectedTicket = ticket"
                        v-if="ticket.price && ticket.price.value !== null"
                    >
                        {{ ticket.name }} -
                            <strong v-if="+ticket.price.value === 0">Бесплатно</strong>
                            <span v-else>{{ ticket.price.value.toLocaleString() + ' руб.' }}</span>
                    </product-option-tag>
                </div>
            </product-option-panel>

            <div
                :class="{
                    'quick-variant-add-to-card-modal__buy-section': true,
                    'quick-variant-add-to-card-modal__buy-section--hidden': !selectedTicket,
                }"
            >
                <v-counter v-model="count" :min="1" :max="selectedTicket ? selectedTicket.qty : 100" />
                <buy-button @click="buy">
                    {{ !inCart ? 'Купить' : 'В корзине' }}
                </buy-button>
            </div>
        </div>
    </pin-modal>
</template>

<script>
import PinModal from '@components/PinModal/PinModal.vue';
import { cartItemTypes } from '@enums/product';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';
import { mapActions, mapGetters, mapState } from 'vuex';
import { MODALS, NAME as MODAL_MODULE } from '@store/modules/Modal';
import { modalName } from '@enums';
import { NAME as CART_MODULE } from '@store/modules/Cart';
import { IS_IN_CART } from '@store/modules/Cart/getters';
import { ADD_MASTERCLASS_ITEM } from '@store/modules/Cart/actions';
import ProductOptionPanel from '@components/product/ProductOptionPanel/ProductOptionPanel.vue';
import ProductOptionTag from '@components/product/ProductOptionTag/ProductOptionTag.vue';
import BuyButton from '@components/BuyButton/BuyButton.vue';
import VCounter from '@controls/VCounter/VCounter.vue';

import './QuickMasterclassAddToCardModal.css';

const NAME = modalName.general.QUICK_MASTERCLASS_ADD_TO_CART;

export default {
    name: 'quick-masterclass-add-to-card-modal',

    components: {
        VCounter,
        BuyButton,
        PinModal,
        ProductOptionPanel,
        ProductOptionTag,
    },

    data() {
        return {
            count: 1,
            masterclass: null,
            selectedTicket: null,

            isLoading: false,
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: (state) => state[MODALS][NAME] && state[MODALS][NAME].open,
            modalState: (state) => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
            isTablet() {
                return this.$mq.tablet;
            },
        }),

        ...mapGetters(CART_MODULE, {
            isInCart: IS_IN_CART,
        }),

        inCart() {
            if (!this.selectedTicket) {
                return false;
            }

            const { offerId } = this.selectedTicket;
            return this.isInCart(cartItemTypes.MASTERCLASS, offerId);
        },
    },

    beforeMount() {},

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(CART_MODULE, {
            addToCart: ADD_MASTERCLASS_ITEM,
        }),

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false, state: null });
        },

        async buy() {
            if (!this.inCart) {
                this.isLoading = true;

                try {
                    await this.addToCart({
                        offerId: this.selectedTicket.offerId,
                        count: this.count,
                    });

                    this.isLoading = false;

                    this.onClose();

                    this[CHANGE_MODAL_STATE]({
                        name: modalName.general.SNACK_NOTIFICATION,
                        open: true,
                        state: {
                            closeTimeout: 1500,
                            message: 'Билет добавлен в корзину',
                        },
                    });
                } catch (error) {
                    console.error(error);
                }

                this.isLoading = false;
            } else {
                this.onClose();
                this.$router.push({ name: 'Cart' });
            }
        },
    },
};
</script>
