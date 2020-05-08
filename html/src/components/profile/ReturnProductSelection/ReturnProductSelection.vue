<template>
    <div class="return-product-selection" v-if="products && products.length">
        <div class="container container--tablet-lg">
            <h3 class="return-product-selection__title">Выберите продукты, которые хотите вернуть</h3>
            <v-check id="select-all" v-model="selectAll" name="select-all" value="selectAll">
                Выбрать все продукты
            </v-check>
        </div>
        <ul class="return-product-selection__product-list">
            <return-panel-product-card
                v-for="product in products"
                :key="product.id"
                :product-id="product.id"
                :type="product.type"
                :name="product.name"
                :image="product.image"
                :price="product.price"
                :old-price="product.oldPrice"
                :count="product.stock.qty"
                :description="product.description"
                :href="generateItemProductUrl(product)"
            />
        </ul>
        <div class="return-product-selection__bottom">
            <div class="return-product-selection__controls">
                <v-button class="return-product-selection__next-btn" @click.prevent="onNextStep">Продолжить</v-button>
                <v-button class="return-product-selection__back-btn btn--transparent">Назад</v-button>
            </div>
            <div class="return-product-selection__info">
                Сумма к возрату: <span class="return-product-selection__info-sum">2 189 руб.</span>
            </div>
        </div>
    </div>
    <div class="return-product-selection" v-else>
        Продуктов для возврата нет
    </div>
</template>

<script>
import VCheck from '@controls/VCheck/VCheck.vue';
import VButton from '@controls/VButton/VButton.vue';

import ReturnPanelProductCard from '@components/ReturnPanelProductCard/ReturnPanelProductCard.vue';

import { mapState, mapActions } from 'vuex';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';

import { NAME as RETURN_MODULE, PRODUCTS } from '@store/modules/Profile/modules/ReturnPage';
import { SET_STEP } from '@store/modules/Profile/modules/ReturnPage/actions';

import { generateProductUrl } from '@util/catalog';
import { returnFormSteps } from '@enums/profile';

import './ReturnProductSelection.css';

const RETURN_PAGE_PATH = `${PROFILE_MODULE}/${RETURN_MODULE}`;

export default {
    name: 'return-product-selection',

    components: {
        VCheck,
        VButton,

        ReturnPanelProductCard,
    },

    data() {
        return {
            selectAll: null,
        };
    },

    computed: {
        ...mapState(RETURN_PAGE_PATH, [PRODUCTS]),
    },

    methods: {
        ...mapActions(RETURN_PAGE_PATH, [SET_STEP]),

        generateItemProductUrl(product) {
            if (Array.isArray(product.categoryCodes)) {
                const categoryCode = product.categoryCodes[product.categoryCodes.length - 1];
                return generateProductUrl(categoryCode, product.code);
            }
        },

        onNextStep() {
            this[SET_STEP](returnFormSteps.CHECK);
        },
    },
};
</script>
