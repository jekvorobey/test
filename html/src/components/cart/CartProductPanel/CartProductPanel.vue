<template>
    <div class="cart-product-panel">
        <attention-panel class="cart-product-panel__alert">
            Точная дата доставки будет рассчитана на следующем шаге оформления заказа
        </attention-panel>

        <template v-if="userProfessional">
            <transition-group
                class="cart-product-panel__list"
                tag="ul"
                name="cart-item"
                @before-enter="onBeforeEnterItems"
                @enter="onEnterItems"
                @after-enter="onAfterEnterItems"
                @leave="onLeaveItems"
            >
                <li
                    class="cart-product-panel__list-item"
                    v-for="({ p: product, count, type }, index) in products"
                    :key="product.id"
                    v-if="!product.isNeedMerchantDiploma"
                >
                    <cart-product-card
                        v-if="type === cartItemTypes.PRODUCT"
                        :data-index="index"
                        :offer-id="product.id"
                        :product-id="product.productId"
                        :type="product.type"
                        :name="product.name"
                        :image="product.image"
                        :price="product.price"
                        :bonus="product.bonus"
                        :old-price="product.oldPrice"
                        :count="count"
                        :max-count="product.stock && product.stock.qty"
                        :href="product.url"
                        :is-active="product.active"
                        :user-can-buy="product.userCanBuy"
                        show-count
                        show-controls
                        @toggle-favorite-item="onToggleFavorite(product)"
                        @countChange="onAddCartItem(product.id, product.stock.storeId, $event.count)"
                        @deleteItem="onDeleteCartItem(product.id, product.stock.storeId)"
                    />
                    <cart-bundle-product-card
                        v-else-if="type === cartItemTypes.BUNDLE_PRODUCT"
                        :bundle-id="product.id"
                        :name="product.name"
                        :price="product.price"
                        :bonus="product.bonus"
                        :old-price="product.oldPrice"
                        :items="product.items"
                        :count="count"
                        :is-active="product.active"
                        :user-can-buy="product.userCanBuy"
                        show-count
                        show-controls
                        @countChange="onAddCartBundleItem(product.id, $event.count)"
                        @deleteBundle="onDeleteCartBundleItem(product.id)"
                    />
                </li>
            </transition-group>

            <template v-if="filteredProducts.merchantDiploma.length > 0">
                <div class="cart-product-panel__list-header">
                    <div class="cart-product-panel__list-header-title">Товары для прошедших обучение</div>
                    <div class="cart-product-panel__list-header-hint">
                      Для приобретения данных товаров вы должны иметь
                      сертификат о завершении обучения
                    </div>
                    <div v-if="isDiplomaStructureReady" :key="isDiplomaStructureReady">
                        <div v-if="diplomaCodes && diplomaCodes.length > 0"
                             v-for="(item, index) in diplomaCodes"
                             :key="item.brand"
                             class="diploma-codes"
                        >
                            <div class="diploma-codes__input">
                              <span>Бренд: <strong>{{ item.brand }}</strong></span>
                              <v-input
                                  class="checkout-product-panel__item-controls-input"
                                  placeholder="Введите код своего диплома"
                                  v-model="item.value"
                                  :error="item.error"
                                  @input="clearDiplomaError(index)"
                              />
                            </div>
                            <v-button
                                class="diploma-codes__btn"
                                :disabled="item.value === ''"
                                :loading="item.loading"
                                @click="sendDiploma(item.brand, index)"
                            >Отправить</v-button>
                        </div>
                    </div>
                </div>

                <transition-group
                    v-if="filteredProducts.merchantDiploma.length > 0"
                    class="cart-product-panel__list"
                    tag="ul"
                    name="cart-item"
                    @before-enter="onBeforeEnterItems"
                    @enter="onEnterItems"
                    @after-enter="onAfterEnterItems"
                    @leave="onLeaveItems"
                >
                    <li
                        class="cart-product-panel__list-item"
                        v-for="({ p: product, count, type }, index) in filteredProducts.merchantDiploma"
                        :key="product.id"
                    >
                        <cart-product-card
                            v-if="type === cartItemTypes.PRODUCT"
                            :data-index="index"
                            :offer-id="product.id"
                            :product-id="product.productId"
                            :type="product.type"
                            :name="product.name"
                            :image="product.image"
                            :price="product.price"
                            :bonus="product.bonus"
                            :old-price="product.oldPrice"
                            :count="count"
                            :max-count="product.stock && product.stock.qty"
                            :href="product.url"
                            :is-active="product.active"
                            :user-can-buy="product.userCanBuy"
                            show-count
                            show-controls
                            @toggle-favorite-item="onToggleFavorite(product)"
                            @countChange="onAddCartItem(product.id, product.stock.storeId, $event.count)"
                            @deleteItem="onDeleteCartItem(product.id, product.stock.storeId)"
                        />

                        <cart-bundle-product-card
                            v-else-if="type === cartItemTypes.BUNDLE_PRODUCT"
                            :bundle-id="product.id"
                            :name="product.name"
                            :price="product.price"
                            :bonus="product.bonus"
                            :old-price="product.oldPrice"
                            :items="product.items"
                            :count="count"
                            :is-active="product.active"
                            :user-can-buy="product.userCanBuy"
                            show-count
                            show-controls
                            @countChange="onAddCartBundleItem(product.id, $event.count)"
                            @deleteBundle="onDeleteCartBundleItem(product.id)"
                        />
                    </li>
                </transition-group>
            </template>
        </template>

        <template v-else>
            <transition-group
                v-if="filteredProducts.common.length > 0"
                class="cart-product-panel__list"
                tag="ul"
                name="cart-item"
                @before-enter="onBeforeEnterItems"
                @enter="onEnterItems"
                @after-enter="onAfterEnterItems"
                @leave="onLeaveItems"
            >
                <li
                    class="cart-product-panel__list-item"
                    v-for="({ p: product, count, type }, index) in filteredProducts.common"
                    :key="product.id"
                >
                    <cart-product-card
                        v-if="type === cartItemTypes.PRODUCT"
                        :data-index="index"
                        :offer-id="product.id"
                        :product-id="product.productId"
                        :type="product.type"
                        :name="product.name"
                        :image="product.image"
                        :price="product.price"
                        :bonus="product.bonus"
                        :old-price="product.oldPrice"
                        :count="count"
                        :max-count="product.stock && product.stock.qty"
                        :href="product.url"
                        :is-active="product.active"
                        :user-can-buy="product.userCanBuy"
                        show-count
                        show-controls
                        @toggle-favorite-item="onToggleFavorite(product)"
                        @countChange="onAddCartItem(product.id, product.stock.storeId, $event.count)"
                        @deleteItem="onDeleteCartItem(product.id, product.stock.storeId)"
                    />

                    <cart-bundle-product-card
                        v-else-if="type === cartItemTypes.BUNDLE_PRODUCT"
                        :bundle-id="product.id"
                        :name="product.name"
                        :price="product.price"
                        :bonus="product.bonus"
                        :old-price="product.oldPrice"
                        :items="product.items"
                        :count="count"
                        :is-active="product.active"
                        :user-can-buy="product.userCanBuy"
                        show-count
                        show-controls
                        @countChange="onAddCartBundleItem(product.id, $event.count)"
                        @deleteBundle="onDeleteCartBundleItem(product.id)"
                    />
                </li>
            </transition-group>

            <template v-if="filteredProducts.professional.length > 0">
                <div class="cart-product-panel__list-header">
                    <div class="cart-product-panel__list-header-title">Продукты для профессионалов</div>
                    <div class="cart-product-panel__list-header-hint">
                        Покупка и цены станут доступны только после прохождения модерации
                    </div>
                </div>

                <transition-group
                    v-if="filteredProducts.professional.length > 0"
                    class="cart-product-panel__list"
                    tag="ul"
                    name="cart-item"
                    @before-enter="onBeforeEnterItems"
                    @enter="onEnterItems"
                    @after-enter="onAfterEnterItems"
                    @leave="onLeaveItems"
                >
                    <li
                        class="cart-product-panel__list-item"
                        v-for="({ p: product, count, type }, index) in filteredProducts.professional"
                        :key="product.id"
                    >
                        <cart-product-card
                            v-if="type === cartItemTypes.PRODUCT"
                            :data-index="index"
                            :offer-id="product.id"
                            :product-id="product.productId"
                            :type="product.type"
                            :name="product.name"
                            :image="product.image"
                            :price="product.price"
                            :bonus="product.bonus"
                            :old-price="product.oldPrice"
                            :count="count"
                            :max-count="product.stock && product.stock.qty"
                            :href="product.url"
                            :is-active="product.active"
                            :user-can-buy="product.userCanBuy"
                            show-count
                            show-controls
                            @toggle-favorite-item="onToggleFavorite(product)"
                            @countChange="onAddCartItem(product.id, product.stock.storeId, $event.count)"
                            @deleteItem="onDeleteCartItem(product.id, product.stock.storeId)"
                        />

                        <cart-bundle-product-card
                            v-else-if="type === cartItemTypes.BUNDLE_PRODUCT"
                            :bundle-id="product.id"
                            :name="product.name"
                            :price="product.price"
                            :bonus="product.bonus"
                            :old-price="product.oldPrice"
                            :items="product.items"
                            :count="count"
                            :is-active="product.active"
                            :user-can-buy="product.userCanBuy"
                            show-count
                            show-controls
                            @countChange="onAddCartBundleItem(product.id, $event.count)"
                            @deleteBundle="onDeleteCartBundleItem(product.id)"
                        />
                    </li>
                </transition-group>
            </template>
        </template>
    </div>
</template>

<script>
import CartProductCard from '@components/CartProductCard/CartProductCard.vue';
import CartBundleProductCard from '@components/CartBundleProductCard/CartBundleProductCard.vue';
import VInput from '@controls/VInput/VInput.vue';
import VButton from '@controls/VButton/VButton.vue';
import AttentionPanel from '@components/AttentionPanel/AttentionPanel.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { LOCALE } from '@store';

import { NAME as CART_MODULE } from '@store/modules/Cart';
import { DELIVERY_INFO } from '@store/modules/Cart/getters';
import {
  ADD_CART_ITEM,
  DELETE_CART_ITEM,
  DELETE_CART_BUNDLE,
  ADD_CART_BUNDLE,
  CHECK_DIPLOMA_CODE
} from '@store/modules/Cart/actions';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { TOGGLE_FAVORITES_ITEM } from '@store/modules/Favorites/actions';

import { NAME as AUTH_MODULE, HAS_SESSION } from '@store/modules/Auth';

import { cartItemTypes } from '@enums/product';
import { generateProductUrl } from '@util/catalog';
import './CartProductPanel.css';

const itemAnimationDelayDelta = 100;
let counter = 0;

export default {
    name: 'cart-product-panel',

    components: {
        AttentionPanel,
        VInput,
        VButton,
        CartProductCard,
        CartBundleProductCard,
    },

    props: {
        items: {
            type: Array,
            default() {
                return [];
            },
        },

        userProfessional: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isDiplomaStructureReady: false,
            diplomaCodes: [],
        };
    },
    computed: {
        ...mapState([LOCALE]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapGetters(CART_MODULE, [DELIVERY_INFO]),

        products() {
            return this.items.map((item) => {
                const price = item.p.price
                    ? Object.assign(item.p.price, { isPriceHidden: item.p.isPriceHidden })
                    : { isPriceHidden: item.p.isPriceHidden };

                const oldPrice = item.p.oldPrice
                    ? Object.assign(item.p.oldPrice, { isPriceHidden: item.p.isPriceHidden })
                    : null;

                return {
                    ...item,
                    p: { ...item.p, url: this.generateItemProductUrl(item.p), price, oldPrice },
                };
            });
        },

        filteredProducts() {
            let products = {
                common: [],
                professional: [],
                merchantDiploma: [],
            };
            for (const product of this.products) {
                if (product.type === cartItemTypes.BUNDLE_PRODUCT) {
                    products.common.push(product);
                } else {
                    if (product.p.isNeedMerchantDiploma) {
                        products.merchantDiploma.push(product);
                    } else if (product.p.isOnlyForProfessional && !product.p.isNeedMerchantDiploma) {
                        products.professional.push(product);
                    } else if (!product.p.isOnlyForProfessional && !product.p.isNeedMerchantDiploma) {
                        products.common.push(product);
                    }
                }
            }

            return products;
        },
        // Получение массива уникальных брендов
        uniqBrandsDiploma() {
            const items =
                this.filteredProducts.merchantDiploma &&
                this.filteredProducts.merchantDiploma.map((item) => item.p.brandName);

            return items.reduce((acc, item) => {
                if (acc.includes(item)) {
                    return acc;
                }
                return [...acc, item];
            }, []);
        },
    },

    methods: {
        ...mapActions(CART_MODULE, [ADD_CART_ITEM, ADD_CART_BUNDLE, DELETE_CART_ITEM, DELETE_CART_BUNDLE, CHECK_DIPLOMA_CODE]),
        ...mapActions(FAVORITES_MODULE, [TOGGLE_FAVORITES_ITEM]),

        generateItemProductUrl(product) {
            if (Array.isArray(product.categoryCodes)) {
                const categoryCode = product.categoryCodes[product.categoryCodes.length - 1];
                return generateProductUrl(categoryCode, product.code);
            }
        },

        onToggleFavorite({ productId }) {
            this[TOGGLE_FAVORITES_ITEM](productId);
        },

        onAddCartItem(offerId, storeId, count) {
            this[ADD_CART_ITEM]({ offerId, storeId, count });
        },

        onDeleteCartItem(offerId, storeId) {
            this[DELETE_CART_ITEM]({ offerId, storeId });
        },

        onAddCartBundleItem(bundleId, count) {
            this[ADD_CART_BUNDLE]({ bundleId, count });
        },

        onDeleteCartBundleItem(bundleId) {
            this[DELETE_CART_BUNDLE](bundleId);
        },

        onBeforeEnterItems(el) {
            el.dataset.index = counter;
            counter += 1;
            el.style.opacity = 0;
        },

        itemAnimation(el, delay) {
            return new Promise((resolve, reject) => {
                try {
                    setTimeout(() => {
                        requestAnimationFrame(() => {
                            el.style.opacity = 1;
                            resolve();
                        });
                    }, delay);
                } catch (error) {
                    reject(error);
                }
            });
        },

        async onEnterItems(el, done) {
            const delay = el.dataset.index * itemAnimationDelayDelta;
            await this.itemAnimation(el, delay);
            done();
        },

        onAfterEnterItems(el) {
            delete el.dataset.index;
            counter = 0;
        },

        onLeaveItems(el, done) {
            requestAnimationFrame(() => {
                el.style.opacity = 0;
                done();
            });
        },
        // Убрать ошибку при вводе новых данных
        clearDiplomaError(index) {
          this.diplomaCodes[index].error = null;
        },
        // Создание базовой структуры для соотвествия каждого инпута своему бренду
        initDiplomaCodesStructure() {
          this.diplomaCodes = [];

          if(this.uniqBrandsDiploma && this.uniqBrandsDiploma.length > 0) {
            this.uniqBrandsDiploma.forEach(brand => this.diplomaCodes.push({
              brand,
              value: "",
              loading: false,
              error: null
            }));
            this.isDiplomaStructureReady = true;
          }
        },
        // Получение массива offer_id по выбранному бренду
        getOfferIdsList(code) {
          if (
              this.filteredProducts &&
              this.filteredProducts.merchantDiploma &&
              this.filteredProducts.merchantDiploma.length > 0
          ) {
            let filteredMerchantsDiploma = this.filteredProducts.merchantDiploma.filter(merchant => merchant.p.brandName === code )

            return filteredMerchantsDiploma.map(item => item.p.id)
          }
        },
        async sendDiploma(brandCode, index) {
            const payload = {
              offer_ids: this.getOfferIdsList(brandCode),
              diploma_code: this.diplomaCodes[index].value
            };

            this.diplomaCodes[index].loading = true;
            const error = await this[CHECK_DIPLOMA_CODE](payload);
            this.diplomaCodes[index].value = "";
            this.diplomaCodes[index].loading = false;

            if (error) {
              this.diplomaCodes[index].error = error.message;
              setTimeout(() => {
                this.diplomaCodes[index].error = null;
              }, 5000)
            } else {
              // Заново пересобрать структуру инпутов кодов диплома по брендам
              this.initDiplomaCodesStructure()
            }
        },
    },

    created() {
        this.cartItemTypes = cartItemTypes;
    },

    mounted() {
        // Подготовка начальной структуры для ввода кодов диплома по брендам
        this.$nextTick(() => {
          this.initDiplomaCodesStructure();
        })
    }
};
</script>