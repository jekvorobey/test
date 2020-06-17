<template>
    <div class="return-check-products">
        <h3 class="return-check-products__title">Продукты</h3>
        <ul class="return-check-products__list" v-if="selectedProducts">
            <li class="return-check-products__list-item" v-for="product in selectedProducts" :key="product.id">
                <return-product-card
                    :href="generateItemProductUrl(product)"
                    :type="product.type"
                    :id="product.id"
                    :quantity="product.quantity"
                    :image="product.image"
                    :name="product.name"
                    :price="product.price"
                    :old-price="product.oldPrice"
                    :reason="product.reason"
                    @select-reason="onSelectReason"
                />
            </li>
        </ul>

        <attention-panel class="return-check-products__attention-panel">
            <span class="return-check-products__attention-panel-text">
                После нажатия на кнопку «Продолжить», будет автоматически сформировано заявление на возврат. Вам нужно
                будет его распечатать и подписать, затем отсканировать подписанное заявление и прикрепить на следующем
                шаге.
            </span>
        </attention-panel>

        <div class="return-check-products__bottom">
            <div class="return-check-products__controls">
                <v-button class="return-check-products__next-btn" :disabled="isBtnDisabled" @click="onNextPage">
                    Продолжить
                </v-button>
                <v-button class="return-check-products__back-btn btn--transparent" @click="onClickBack">
                    Назад
                </v-button>
            </div>
            <div class="return-check-products__info">
                Сумма к возрату:
                <span class="return-check-products__info-sum">
                    <price class="text-bold return-check-products__price" v-bind="totalPrice" />
                </span>
            </div>
        </div>

        <transition name="fade">
            <return-reason-modal v-if="isModalOpen" />
        </transition>
    </div>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import Price from '@components/Price/Price.vue';
import AttentionPanel from '@components/AttentionPanel/AttentionPanel.vue';

import ReturnProductCard from '@components/profile/ReturnProductCard/ReturnProductCard.vue';
import ReturnReasonModal from '@components/profile/ReturnReasonModal/ReturnReasonModal.vue';

import { mapState, mapActions } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as RETURN_MODULE, SELECTED_PRODUCTS } from '@store/modules/Profile/modules/ReturnPage';
import { SET_STEP } from '@store/modules/Profile/modules/ReturnPage/actions';

import { generateProductUrl } from '@util/catalog';

import { modalName } from '@enums';
import { returnFormSteps } from '@enums/profile';
import './ReturnCheckProducts.css';

const RETURN_PAGE_PATH = `${PROFILE_MODULE}/${RETURN_MODULE}`;

export default {
    name: 'return-check-products',

    components: {
        VButton,
        AttentionPanel,
        Price,

        ReturnProductCard,
        ReturnReasonModal,
    },

    computed: {
        ...mapState(RETURN_PAGE_PATH, [SELECTED_PRODUCTS]),

        ...mapState(MODAL_MODULE, {
            isModalOpen: state =>
                state[MODALS][modalName.profile.RETURN_REASON] && state[MODALS][modalName.profile.RETURN_REASON].open,
        }),

        totalPrice() {
            let summary = 0;

            this.selectedProducts.map(item => {
                summary += item.quantity * item.price.value;
            });

            return {
                value: summary,
                currency: 'RUB',
            };
        },

        isBtnDisabled() {
            return !this.selectedProducts.every(item => {
                return !!item.reason;
            });
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(RETURN_PAGE_PATH, [SET_STEP]),

        generateItemProductUrl(product) {
            if (Array.isArray(product.categoryCodes)) {
                const categoryCode = product.categoryCodes[product.categoryCodes.length - 1];
                return generateProductUrl(categoryCode, product.code);
            }
        },

        onClickBack() {
            this[SET_STEP](returnFormSteps.SELECT);
        },

        onSelectReason(id) {
            this[CHANGE_MODAL_STATE]({
                name: modalName.profile.RETURN_REASON,
                open: true,
                state: {
                    productId: id,
                },
            });
        },

        onNextPage() {
            this[SET_STEP](returnFormSteps.DOCUMENTS);
        }
    },
};
</script>
