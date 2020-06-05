<template>
    <div class="return-check-products">
        <h3 class="return-check-products__title">Продукты</h3>
        <ul class="return-check-products__list" v-if="selectedProducts">
            <li
                class="retrun-check-products__list-item"
                v-for="product in selectedProducts"
                :key="product.id"
            >
                <return-panel-product-card
                    :product="product"
                    :id="product.id"
                    :type="product.type"
                    :name="product.name"
                    :image="product.image"
                    :price="product.price"
                    :old-price="product.oldPrice"
                    :count="product.stock.qty"
                    :description="product.description"
                    :href="generateItemProductUrl(product)"
                    ref="products"
                />
            </li>
        </ul>
        <div class="return-product-selection__bottom">
            <div class="return-product-selection__controls">
                <v-button class="return-product-selection__next-btn">Продолжить</v-button>
                <v-button class="return-product-selection__back-btn btn--transparent">Назад</v-button>
            </div>
            <div class="return-product-selection__info">
                Сумма к возрату: <span class="return-product-selection__info-sum">
                    <price class="text-bold return-product-selection__price" v-bind="totalPrice" />
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';

import Price from '@components/Price/Price.vue'

import ReturnPanelProductCard from '@components/ReturnPanelProductCard/ReturnPanelProductCard.vue';

import { mapState, mapActions } from 'vuex';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';

import { NAME as RETURN_MODULE, SELECTED_PRODUCTS } from '@store/modules/Profile/modules/ReturnPage';
import { SET_STEP } from '@store/modules/Profile/modules/ReturnPage/actions';

import { generateProductUrl } from '@util/catalog';
import { returnFormSteps } from '@enums/profile';
import './ReturnCheckProducts.css';

const RETURN_PAGE_PATH = `${PROFILE_MODULE}/${RETURN_MODULE}`;

export default {
    name: 'return-check-products',

    components: {
        Price,
        VButton,

        ReturnPanelProductCard,
    },

    computed: {
        ...mapState(RETURN_PAGE_PATH , [SELECTED_PRODUCTS]),

        totalPrice() {
            return {
                value: 3300,
                currency: 'RUB',
            };
        },
    },

    methods: {
        generateItemProductUrl(product) {
            if (Array.isArray(product.categoryCodes)) {
                const categoryCode = product.categoryCodes[product.categoryCodes.length - 1];
                return generateProductUrl(categoryCode, product.code);
            }
        },
    },

    beforeMount() {
        console.log('beforeMount');
        console.log(this);
    }
};
</script>
