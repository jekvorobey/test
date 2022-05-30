<template>
    <pin-modal class="quick-variant-add-to-card-modal" :loading="isLoading" @close="onClose">
        <div class="quick-variant-add-to-card-modal__inner">
            <template v-if="productPreview">
                <product-option-panel
                    class="quick-variant-add-to-card-modal__characteristic"
                    v-for="characteristic in characteristics"
                    :key="characteristic.code"
                    :header="
                        isLocalSelected(characteristic.code) ? characteristic.name : `Выберите ${characteristic.name}`
                    "
                    :selected-option="
                        isLocalSelected(characteristic.code) &&
                        characteristic.selectedOption &&
                        characteristic.selectedOption.name
                            ? characteristic.selectedOption.name
                            : ''
                    "
                >
                    <div class="quick-variant-add-to-card-modal__options">
                        <template v-if="characteristic.type === 'radio'">
                            <product-option-tag
                                class="quick-variant-add-to-card-modal__option"
                                v-for="option in characteristic.options"
                                :key="`${characteristic.code}-${option.value}`"
                                :selected="isLocalSelected(characteristic.code) ? option.isSelected : false"
                                :disabled="option.isDisabled"
                                @click.stop="onSelectOption(characteristic.code, option.value)"
                            >
                                {{ option.name }}
                            </product-option-tag>
                        </template>

                        <template v-if="characteristic.type === 'color'">
                            <product-color-tag
                                class="quick-variant-add-to-card-modal__option"
                                v-for="option in characteristic.options"
                                :key="`${characteristic.code}-${option.value}`"
                                :color="option.value"
                                :selected="isLocalSelected(characteristic.code) ? option.isSelected : false"
                                :disabled="option.isDisabled"
                                @click.stop="onSelectOption(characteristic.code, option.value)"
                            >
                                {{ option.name }}
                            </product-color-tag>
                        </template>
                    </div>
                </product-option-panel>

                <div
                    :class="{
                        'quick-variant-add-to-card-modal__buy-section': true,
                        'quick-variant-add-to-card-modal__buy-section--hidden': !isAllOptionsSelected,
                    }"
                >
                    <v-counter v-model="count" :min="1" :max="productPreview.stock.qty" />
                    <buy-button @click="buy">
                        {{ !inCart ? 'Купить' : 'В корзине' }}
                    </buy-button>
                </div>
            </template>
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
import {
    NAME as PREVIEW_MODULE,
    PRODUCT_OPTIONS,
    PRODUCT_PREVIEW,
    PRODUCT_PREVIEW_STATUS,
} from '@store/modules/Preview';
import { FETCH_PRODUCT_PREVIEW } from '@store/modules/Preview/actions';
import { CHARACTERISTICS, GET_NEXT_COMBINATION } from '@store/modules/Preview/getters';
import { NAME as CART_MODULE } from '@store/modules/Cart';
import { IS_IN_CART } from '@store/modules/Cart/getters';
import { ADD_CART_ITEM } from '@store/modules/Cart/actions';
import ProductOptionPanel from '@components/product/ProductOptionPanel/ProductOptionPanel.vue';
import ProductOptionTag from '@components/product/ProductOptionTag/ProductOptionTag.vue';
import ProductColorTag from '@components/product/ProductColorTag/ProductColorTag.vue';
import BuyButton from '@components/BuyButton/BuyButton.vue';
import VCounter from '@controls/VCounter/VCounter.vue';

import './QuickVariantAddToCardModal.css';

const NAME = modalName.general.QUICK_VARIANT_ADD_TO_CARD;

export default {
    name: 'quick-variant-add-to-card-modal',

    components: {
        VCounter,
        BuyButton,
        PinModal,
        ProductOptionPanel,
        ProductOptionTag,
        ProductColorTag,
    },

    data() {
        return {
            count: 1,
            localSelectedState: {},

            isLoading: true,
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: (state) => state[MODALS][NAME] && state[MODALS][NAME].open,
            modalState: (state) => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),

        ...mapState(PREVIEW_MODULE, {
            productPreview: PRODUCT_PREVIEW,
            productPreviewStatus: PRODUCT_PREVIEW_STATUS,
            productOptions: PRODUCT_OPTIONS,
        }),

        ...mapGetters(PREVIEW_MODULE, {
            characteristics: CHARACTERISTICS,
            getNextCombination: GET_NEXT_COMBINATION,
        }),

        ...mapGetters(CART_MODULE, {
            isInCart: IS_IN_CART,
        }),

        inCart() {
            const { id } = this[PRODUCT_PREVIEW];
            return this.isInCart(cartItemTypes.PRODUCT, id);
        },

        isAllOptionsSelected() {
            const localSelectedKeys = Object.keys(this.localSelectedState);
            const selected = this.characteristics.filter(
                (characteristic) =>
                    typeof characteristic.selectedOption !== 'undefined' && characteristic.selectedOption
            );

            if (
                selected.length === this.characteristics.length &&
                localSelectedKeys.length === this.characteristics.length
            ) {
                return true;
            }

            return false;
        },
    },

    async beforeMount() {
        const { offerId, code } = this.modalState || {};

        await this.fetchProductPreview({
            offerId,
            code,
            clear: true,
        });

        this.isLoading = false;
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(PREVIEW_MODULE, {
            fetchProductPreview: FETCH_PRODUCT_PREVIEW,
        }),
        ...mapActions(CART_MODULE, {
            addToCart: ADD_CART_ITEM,
        }),

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false, state: null });
        },

        isLocalSelected(charCode) {
            return typeof this.localSelectedState[charCode] !== 'undefined';
        },

        async onSelectOption(charCode, optValue) {
            const { code } = this.getNextCombination(charCode, optValue);

            this.isLoading = true;

            try {
                await this.fetchProductPreview({ code });
                this.$set(this.localSelectedState, charCode, optValue);
            } catch (error) {
                console.error(error);
            }

            this.isLoading = false;
        },

        async buy() {
            if (!this.inCart) {
                const { referralCode } = this.modalState;

                this.isLoading = true;

                try {
                    await this.addToCart({
                        offerId: this.productPreview.id,
                        storeId: this.productPreview.stock.storeId,
                        count: this.count,
                        referralCode,
                    });

                    this.isLoading = false;

                    this.onClose();

                    this[CHANGE_MODAL_STATE]({
                        name: modalName.general.SNACK_NOTIFICATION,
                        open: true,
                        state: {
                            closeTimeout: 1500,
                            message: 'Товар добавлен в корзину',
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
