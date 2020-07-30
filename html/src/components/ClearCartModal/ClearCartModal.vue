<template>
    <general-modal type="sm" class="clear-cart-modal" :header="header" @close="onClose" :is-mobile="isTablet">
        <template v-slot:content>
            <div class="clear-cart-modal__body">
                <h3 class="clear-cart-modal__hl">{{ header }}</h3>
                <p>
                    Все <span class="text-lowercase">{{ formatType }}</span> из корзины будут удалены
                </p>
            </div>
            <div class="clear-cart-modal__submit">
                <v-button class="clear-cart-modal__submit-btn-cancel" @click="onClose" :disabled="isLoading">
                    Отменить
                </v-button>

                <v-link
                    class="clear-cart-modal__submit-btn-clear"
                    tag="button"
                    @click="onClearCart"
                    :disabled="isLoading"
                >
                    Удалить
                </v-link>

                <v-spinner :show="isLoading" width="30" height="30" />
            </div>
        </template>
    </general-modal>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VLink from '@controls/VLink/VLink.vue';
import VSpinner from '@controls/VSpinner/VSpinner.vue';

import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import { mapState, mapActions, mapGetters } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';
import { DELETE_ALL_ITEMS } from '@store/modules/Cart/actions';
import { NAME as CART_MODULE, CART_DATA, RELATIVE_PRODUCTS } from '@store/modules/Cart';

import { modalName } from '@enums';
import './ClearCartModal.css';

const NAME = modalName.cart.CLEAR_CART;

export default {
    name: NAME,

    components: {
        VButton,
        VLink,
        VSpinner,

        GeneralModal,
    },

    data() {
        return {
            isLoading: false,
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: state => state[MODALS][modalName.cart.CLEAR_CART] && state[MODALS][modalName.cart.CLEAR_CART].open,
            modalState: state => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),

        header() {
            return 'Очистить корзину';
        },

        cartType() {
            const { modalState } = this;
            return modalState && modalState.type;
        },

        formatType() {
            const { cartType } = this;
            return this.$t(`cart.title.${cartType}`);
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(CART_MODULE, [DELETE_ALL_ITEMS]),

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },

        async onClearCart() {
            const { cartType } = this;

            this.isLoading = true;

            await this[DELETE_ALL_ITEMS](cartType);
            this.isLoading = false;
            this.onClose();
        },
    },
};
</script>
