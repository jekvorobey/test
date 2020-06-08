<template>
    <div class="return-product-selection" v-if="products && products.length">
        <div class="container container--tablet-lg">
            <h3 class="return-product-selection__title">Выберите продукты, которые хотите вернуть</h3>
            <v-check
                id="checkbox-all"
                name="all"
                value="all"
                :checked="allChecked"
                :indeterminate="indeterminate"
                @change="onSelectAll"
            >Выбрать все продукты</v-check>
        </div>
        <ul class="return-product-selection__product-list">
            <li
                class="return-product-selection__product-item"
                v-for="product in products"
                :key="product.id"
            >
                <v-check
                    :id="`${product.id}`"
                    :value="`${product.id}`"
                    name="product-checkbox"
                    v-model="checkboxes"
                />
                <return-panel-product-card
                    :product="product"
                    :id="product.id"
                    :type="product.type"
                    :href="generateItemProductUrl(product)"
                    ref="products"
                />
            </li>
        </ul>
        <div class="return-product-selection__bottom">
            <div class="return-product-selection__controls">
                <v-button class="return-product-selection__next-btn" @click="onNextStep" :disabled="isBtnDisabled">Продолжить</v-button>
                <v-button class="return-product-selection__back-btn btn--transparent">Назад</v-button>
            </div>
            <div class="return-product-selection__info">
                Сумма к возрату:
                <span class="return-product-selection__info-sum">
                    <price class="text-bold return-product-selection__price" v-bind="totalPrice" />
                </span>
            </div>
        </div>
    </div>
    <div class="return-product-selection" v-else>Продуктов для возврата нет</div>
</template>

<script>
import VCheck from '@controls/VCheck/VCheck.vue';
import VButton from '@controls/VButton/VButton.vue';

import Price from '@components/Price/Price.vue';

import ReturnPanelProductCard from '@components/ReturnPanelProductCard/ReturnPanelProductCard.vue';
import PackageProductCard from '@components/PackageProductCard/PackageProductCard.vue';

import { mapState, mapActions } from 'vuex';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';

import { NAME as RETURN_MODULE, PRODUCTS } from '@store/modules/Profile/modules/ReturnPage';
import { SET_STEP, SET_SELECTED_PRODUCTS } from '@store/modules/Profile/modules/ReturnPage/actions';

import { generateProductUrl } from '@util/catalog';
import { returnFormSteps } from '@enums/profile';
import './ReturnProductSelection.css';

const RETURN_PAGE_PATH = `${PROFILE_MODULE}/${RETURN_MODULE}`

export default {
    name: 'return-product-selection',

    components: {
        VCheck,
        VButton,

        Price,

        ReturnPanelProductCard,
        PackageProductCard,
    },

    data () {
        return {
            checkboxes: [],
        }
    },

    computed: {
        ...mapState(RETURN_PAGE_PATH, [PRODUCTS]),

        allChecked () {
            return this.checkboxes.length > 0 && this.checkboxes.length === this.products.length
        },

        indeterminate () {
            return this.checkboxes.length > 0 && this.checkboxes.length < this.products.length
        },

        totalPrice () {
            return {
                value: 3300,
                currency: 'RUB',
            }
        },

        checkedProducts () {
            return this.$refs.products
                .filter(el => this.isChecked(el.id))
                .map(el => {
                    return {
                        quantity: el.quantity,
                        ...el.product,
                    }
                })
        },

        isBtnDisabled() {
            return this.checkboxes.length < 1;
        }
    },

    methods: {
        ...mapActions(RETURN_PAGE_PATH, [SET_STEP, SET_SELECTED_PRODUCTS]),

        generateItemProductUrl (product) {
            if (Array.isArray(product.categoryCodes)) {
                const categoryCode = product.categoryCodes[product.categoryCodes.length - 1]
                return generateProductUrl(categoryCode, product.code)
            }
        },

        async onNextStep () {
            await this[SET_SELECTED_PRODUCTS](this.checkedProducts)
            this[SET_STEP](returnFormSteps.CHECK)
        },

        onSelectAll () {
            if (this.checkboxes.length > 0) this.checkboxes = []
            else this.checkboxes = [...Object.values(this.products.map(item => `${item.id}`))]
        },

        isChecked (id) {
            return this.checkboxes.includes(`${id}`)
        },
    },
}
</script>
