<template>
    <general-modal
        v-if="isOpen"
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

            <!-- <h6 class="promopage-add-modal__title">В вашем избранном</h6> -->
            <v-scroll class="promopage-add-modal__scroll">
                <ul class="promopage-add-modal__list">
                    <cart-panel-product-card
                        class="promopage-add-modal__list-item"
                        :class="{
                            'promopage-add-modal__list-item--selected': isSelected(item.productId),
                        }"
                        v-for="item in filteredSearchItems"
                        :key="item.id"
                        :product-id="item.id"
                        :type="item.type"
                        :name="item.name"
                        :image="item.image"
                        :price="item.price"
                        :old-price="item.oldPrice"
                        @click.native="onSelectItem(item.productId)"
                    />
                </ul>
            </v-scroll>

            <div class="promopage-add-modal__submit">
                <v-button class="promopage-add-modal__submit-btn" @click="onSubmit" :disabled="!selectedItemId">
                    Добавить
                </v-button>
            </div>
        </template>
    </general-modal>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import VScroll from '@controls/VScroll/VScroll.vue';

import GeneralModal from '@components/GeneralModal/GeneralModal.vue';
import CartPanelProductCard from '@components/CartPanelProductCard/CartPanelProductCard.vue';

import _debounce from 'lodash/debounce';
import { mapActions, mapState, mapGetters } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';

import { NAME as PROMOPAGE_MODULE, TITLE, SEARCH_ITEMS } from '@store/modules/Profile/modules/Promopage';
import { ITEMS_IDS_MAP } from '@store/modules/Profile/modules/Promopage/getters';
import { SEARCH_PRODUCTS, ADD_PRODUCT } from '@store/modules/Profile/modules/Promopage/actions';

import { modalName } from '@enums';
import './PromopageAddModal.css';

const PROMOPAGE_MODULE_PATH = `${PROFILE_MODULE}/${PROMOPAGE_MODULE}`;
const NAME = modalName.profile.PROMO_ADD;

export default {
    name: NAME,

    components: {
        VSvg,
        VButton,
        VInput,
        GeneralModal,
        VScroll,

        CartPanelProductCard,
    },

    data() {
        return {
            selectedItemId: null,
        };
    },

    computed: {
        ...mapState(PROMOPAGE_MODULE_PATH, [SEARCH_ITEMS]),
        ...mapGetters(PROMOPAGE_MODULE_PATH, [ITEMS_IDS_MAP]),
        ...mapState(MODAL_MODULE, {
            isOpen: (state) => (state[MODALS][NAME] && state[MODALS][NAME].open) || false,
        }),

        filteredSearchItems() {
            const searchItems = this[SEARCH_ITEMS] || [];
            const itemsIdsMap = this[ITEMS_IDS_MAP] || {};
            return searchItems.filter((i) => !itemsIdsMap[i.productId]);
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    watch: {
        [SEARCH_ITEMS]() {
            this.selectedItemId = null;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(PROMOPAGE_MODULE_PATH, [SEARCH_PRODUCTS, ADD_PRODUCT]),

        isSelected(id) {
            return this.selectedItemId && this.selectedItemId === id;
        },

        onSelectItem(id) {
            this.selectedItemId = id;
        },

        onFilterChange(query) {
            this[SEARCH_PRODUCTS]({ query });
        },

        async onSubmit() {
            if (this.selectedItemId) this[ADD_PRODUCT]({ id: this.selectedItemId, refresh: true });
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
