<template>
    <general-modal
        type="sm"
        class="promopage-add-modal"
        header="Добавить продукт"
        @close="onClose"
        :is-mobile="isTablet"
    >
        <template v-slot:content>
            <h3 class="promopage-add-modal__hl">Добавить продукт</h3>
            <v-input class="promopage-add-modal__input" @input="debounce_onFilterChange" placeholder="Поиск продукта">
                <template v-slot:after>
                    <v-svg name="search-middle" width="24" height="24" />
                </template>
            </v-input>

            <h6 class="promopage-add-modal__title">В вашем избранном</h6>
            <ul class="promopage-add-modal__list">
                <cart-panel-product-card
                    class="cart-header-panel__list-item"
                    v-for="product in products"
                    :key="product.id"
                    :product-id="product.id"
                    :type="product.type"
                    :name="product.name"
                    :image="product.image"
                    :price="product.price"
                    :old-price="product.oldPrice"
                    href="/catalog"
                />
            </ul>

            <div class="promopage-add-modal__submit">
                <v-button class="promopage-add-modal__submit-btn" @click="onSubmit">
                    Добавить
                </v-button>
            </div>
        </template>
    </general-modal>
</template>

<script>
import VSvg from '../../controls/VSvg/VSvg.vue';
import VButton from '../../controls/VButton/VButton.vue';
import VInput from '../../controls/VInput/VInput.vue';
import GeneralModal from '../../GeneralModal/GeneralModal.vue';

import CartPanelProductCard from '../../CartPanelProductCard/CartPanelProductCard.vue';

import { mapActions, mapState } from 'vuex';
import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import { NAME as PROFILE_MODULE, PROMO_DATA } from '../../../store/modules/Profile';
import { FETCH_PROMO_DATA } from '../../../store/modules/Profile/actions';

import _debounce from 'lodash/debounce';
import './PromopageAddModal.css';

export const NAME = 'promopage-add-modal';

export default {
    name: NAME,

    components: {
        VSvg,
        VButton,
        VInput,
        GeneralModal,

        CartPanelProductCard,
    },

    data() {
        return {
            filterString: '',
        };
    },

    computed: {
        ...mapState(PROFILE_MODULE, {
            products: state => (state[PROMO_DATA] ? state[PROMO_DATA].products : []),
        }),

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(PROFILE_MODULE, []),

        onFilterChange(filterString) {
            this.filterString = filterString;
        },

        onSubmit() {
            this.onClose();
        },

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },

    beforeMount() {
        this.debounce_onFilterChange = _debounce(this.onFilterChange, 300);
    },
};
</script>
