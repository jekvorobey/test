<template>
    <general-modal type="wide" class="clear-cart-modal" :header="header" @close="onClose">
        <template v-slot:content>
            <div class="clear-cart-modal__body">
                <h3 class="clear-cart-modal__hl">{{ header }}</h3>
                <p>Все товары из корзины будут удалены</p>
                <div class="clear-cart-modal__btns">
                    <v-button @click="onClose" class="clear-cart-modal__btn-cancel">
                        Отменить
                    </v-button>
                    <v-link tag="button" class="clear-cart-modal__btn-clear" @click="onClearCart">
                        Удалить
                    </v-link>
                    <img v-if="isLoading" :src="preloaderIcon" class="preloader" width="30" height="30" />
                </div>
            </div>
        </template>
    </general-modal>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VLink from '@controls/VLink/VLink.vue';

import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import { mapState, mapActions, mapGetters } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';
import { DELETE_ALL_ITEMS } from '@store/modules/Cart/actions';
import { NAME as CART_MODULE, CART_DATA, RELATIVE_PRODUCTS } from '@store/modules/Cart';

import { modalName } from '@enums';
import './ClearCartModal.css';
import preloader from '@images/icons/preloader.svg';

const NAME = modalName.cart.CLEAR_CART;

export default {
    name: NAME,

    components: {
        VButton,
        VLink,

        GeneralModal,
    },

    data() {
        return {
            isLoading: false,
        };
    },

    computed: {
        isOpen: state => state[MODALS][modalName.cart.CLEAR_CART] && state[MODALS][modalName.cart.CLEAR_CART].open,
        modalState: state => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},

        header() {
            return 'Очистить корзину';
        },

        preloaderIcon() {
            return preloader;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(CART_MODULE, [DELETE_ALL_ITEMS]),
        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false, state: null });
        },

        async onClearCart() {
            this.isLoading = true;
            await this[DELETE_ALL_ITEMS]();
            this.isLoading = false;
            this.onClose();
        },
    },
};
</script>
