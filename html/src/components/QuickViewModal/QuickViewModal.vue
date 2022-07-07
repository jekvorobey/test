<template>
    <general-modal type="wide" class="quick-view-modal" @close="onClose">
        <template v-slot:content>
            <div class="quick-view-modal__body" v-if="productPreview">
                <ul class="quick-view-modal__gallery">
                    <li
                        v-if="!currentGalleryImages || !currentGalleryImages.length"
                        class="quick-view-modal__gallery-item quick-view-modal__gallery-item--empty"
                    >
                        <no-photo-stub />
                    </li>
                    <li class="quick-view-modal__gallery-item" v-for="image in currentGalleryImages" :key="image.id">
                        <v-picture>
                            <source :srcset="image.desktop.webp" type="image/webp" media="(min-width: 480px)" />
                            <source :srcset="image.desktop.orig" media="(min-width: 480px)" />
                            <source :srcset="image.tablet.webp" type="image/webp" media="(max-width: 479px)" />
                            <source :srcset="image.tablet.orig" media="(max-width: 479px)" />
                            <img class="v-picture__img" :src="image.default" alt="" />
                        </v-picture>
                    </li>
                </ul>
                <div class="quick-view-modal__detail">
                    <product-detail-panel
                        class="quick-view-modal__detail-header"
                        :title="productPreview.title"
                        :reviews-count="productPreview.reviewsCount"
                        :vendor-code="productPreview.vendorCode"
                        :rating="productPreview.rating"
                    />
                    <v-scroll class="quick-view-modal__detail-scroll">
                        <product-option-panel
                            class="quick-view-modal__detail-section quick-view-modal__detail-options"
                            :key="char.code"
                            v-for="char in characteristics"
                            :header="char.name"
                            :selected-option="char.selectedOption && char.selectedOption.name"
                            :note="char.note"
                        >
                            <div class="quick-view-modal__detail-options-tags" v-if="char.type === 'radio'">
                                <product-option-tag
                                    class="quick-view-modal__detail-options-item"
                                    v-for="option in char.options"
                                    :key="`${char.code}-${option.value}`"
                                    :selected="option.isSelected"
                                    :disabled="option.isDisabled"
                                    @click.stop="onSelectOption(char.code, option.value)"
                                    @mouseover="onShowOption(char.code, !option.isSelected ? option.value : null)"
                                    @mouseleave="onHideOption"
                                >
                                    {{ option.name }}
                                </product-option-tag>
                            </div>

                            <div class="quick-view-modal__detail-options-colors" v-if="char.type === 'color'">
                                <product-color-tag
                                    class="quick-view-modal__detail-options-item"
                                    v-for="option in char.options"
                                    :key="`${char.code}-${option.value}`"
                                    :color="option.value"
                                    :selected="option.isSelected"
                                    :disabled="option.isDisabled"
                                    @click.stop="onSelectOption(char.code, option.value)"
                                    @mouseover="onShowOption(char.code, option.value)"
                                    @mouseleave="onHideOption"
                                />
                            </div>
                        </product-option-panel>

                        <product-cart-panel
                            class="quick-view-modal__detail-cart"
                            :productId="productPreview.productId"
                            :price="productPreview.price"
                            :old-price="productPreview.oldPrice"
                            :bonus="productPreview.bonus"
                            :is-price-hidden="productPreview.isPriceHidden"
                            :disabled="!canBuy"
                            @cart="onCartStateChange"
                            @wishlist="onToggleFavorite(productPreview.productId)"
                        >
                            {{ buyBtnText }}
                        </product-cart-panel>
                        <product-delivery-panel
                            :deliveryMethods="productPreview.deliveryMethods"
                            @pickup-points="onPickupPoints"
                        />
                    </v-scroll>
                    <a :href="`/product/${productPreview.code}`" style="text-align: center; border: none;">Подробнее о товаре</a>
                </div>

                <div class="quick-view-modal__detail-tags">
                    <tag
                        class="quick-view-modal__detail-tags-item"
                        v-for="badge in badges"
                        :key="badge"
                        :text="badge"
                    />
                </div>
            </div>
            <template v-if="isPending">
                <div class="quick-view-modal__mask" />
                <v-spinner class="quick-view-modal__spinner" show />
            </template>
        </template>
    </general-modal>
</template>

<script>
import VPicture from '@controls/VPicture/VPicture.vue';
import VScroll from '@controls/VScroll/VScroll.vue';

import GeneralModal from '@components/GeneralModal/GeneralModal.vue';
import ProductCartPanel from '@components/product/ProductCartPanel/ProductCartPanel.vue';
import ProductDetailPanel from '@components/product/ProductDetailPanel/ProductDetailPanel.vue';
import ProductDeliveryPanel from '@components/product/ProductDeliveryPanel/ProductDeliveryPanel.vue';
import VSpinner from '@controls/VSpinner/VSpinner.vue';
import Tag from '@components/Tag/Tag.vue';
import NoPhotoStub from '@components/NoPhotoStub/NoPhotoStub.vue';

import ProductOptionTag from '@components/product/ProductOptionTag/ProductOptionTag.vue';
import ProductColorTag from '@components/product/ProductColorTag/ProductColorTag.vue';
import ProductOptionPanel from '@components/product/ProductOptionPanel/ProductOptionPanel.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import {
    NAME as PREVIEW_MODULE,
    PRODUCT_PREVIEW,
    PRODUCT_PREVIEW_STATUS,
    PRODUCT_OPTIONS,
} from '@store/modules/Preview';
import { CHARACTERISTICS, GET_NEXT_COMBINATION } from '@store/modules/Preview/getters';
import { FETCH_PRODUCT_PREVIEW } from '@store/modules/Preview/actions';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as CART_MODULE } from '@store/modules/Cart';
import { IS_IN_CART } from '@store/modules/Cart/getters';
import { ADD_CART_ITEM } from '@store/modules/Cart/actions';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { TOGGLE_FAVORITES_ITEM } from '@store/modules/Favorites/actions';

import { NAME as GEO_MODULE, SELECTED_CITY } from '@store/modules/Geolocation';

import { $retailRocket } from '@services';
import { requestStatus, modalName } from '@enums';
import { cartItemTypes } from '@enums/product';
import { generateProductUrl, prepareProductImage } from '@util/catalog';
import './QuickViewModal.css';
import { RetailRocketHelper } from '@services/RetailRocketService';

const NAME = modalName.general.QUICK_VIEW;

const desktopSize = 600;
const tabletSize = 400;

export default {
    name: NAME,

    components: {
        NoPhotoStub,
        VPicture,
        VSpinner,
        VScroll,

        Tag,
        GeneralModal,
        ProductCartPanel,
        ProductOptionPanel,
        ProductDetailPanel,
        ProductDeliveryPanel,

        ProductOptionTag,
        ProductColorTag,
    },

    data() {
        return {
            optionImage: null,
            optionImages: [],
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: (state) => state[MODALS][NAME] && state[MODALS][NAME].open,
            modalState: (state) => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),

        ...mapState(PREVIEW_MODULE, [PRODUCT_PREVIEW, PRODUCT_PREVIEW_STATUS, PRODUCT_OPTIONS]),
        ...mapGetters(PREVIEW_MODULE, [CHARACTERISTICS, GET_NEXT_COMBINATION]),
        ...mapState(GEO_MODULE, [SELECTED_CITY]),
        ...mapGetters(CART_MODULE, [IS_IN_CART]),

        badges() {
            const { productPreview } = this;
            const { badges } = productPreview || {};
            return badges || [];
        },

        currentGalleryImages() {
            const { productImages, optionImage } = this;
            const mainImage = optionImage && prepareProductImage(optionImage, desktopSize, tabletSize);
            return mainImage ? [mainImage, ...productImages.slice(1)] : productImages;
        },

        productImages() {
            let media = [];
            if (this.optionImages && this.optionImages.length) {
                media = this.optionImages;
            } else media = this[PRODUCT_PREVIEW] ? this[PRODUCT_PREVIEW].media : [];
            return media.slice(0, 4).map((i) => prepareProductImage(i, desktopSize, tabletSize));
        },

        inCart() {
            const { id } = this[PRODUCT_PREVIEW];
            return this[IS_IN_CART](cartItemTypes.PRODUCT, id);
        },

        canBuy() {
            const { stock } = this[PRODUCT_PREVIEW];
            return stock && stock.qty > 0;
        },

        buyBtnText() {
            if (!this.canBuy) return 'Нет в наличии';
            return this.inCart ? 'В корзине' : 'Добавить в корзину';
        },

        isPending() {
            return this[PRODUCT_PREVIEW_STATUS] === requestStatus.PENDING;
        },
    },

    watch: {
        [SELECTED_CITY](value) {
            this.onSelectedCityChanged(value);
        },

        [PRODUCT_PREVIEW](value) {
            if (value) this.setRetailRocketProductView();
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(PREVIEW_MODULE, [FETCH_PRODUCT_PREVIEW]),
        ...mapActions(CART_MODULE, [ADD_CART_ITEM]),
        ...mapActions(FAVORITES_MODULE, [TOGGLE_FAVORITES_ITEM]),

        onSelectOption(charCode, optValue) {
            const { code } = this[GET_NEXT_COMBINATION](charCode, optValue);
            this[FETCH_PRODUCT_PREVIEW]({ code });
        },

        onShowOption(charCode, optValue) {
            if (!optValue) {
                return;
            }

            const { images } = this[GET_NEXT_COMBINATION](charCode, optValue);
            this.optionImages = [];
            if (Array.isArray(images) && images.length) {
                this.optionImage = images[0];
                this.optionImages = images.map((image) => prepareProductImage(image, desktopSize, tabletSize));
            } else {
                this.optionImage = null;
                this.optionImages = [];
            }
        },

        onHideOption() {
            const { isPending } = this;
            if (!isPending) {
                this.optionImage = null;
                this.optionImages = [];
            }
        },

        onPickupPoints() {
            const { categoryCodes, code } = this[PRODUCT_PREVIEW] || {};
            const category = categoryCodes[categoryCodes.length - 1];
            const path = generateProductUrl(category.code, code);
            this.$router.push({ path, query: { modal: 'pickup' } }, () => {
                this.onClose();
            });
        },

        async onSelectedCityChanged() {
            this[FETCH_PRODUCT_PREVIEW](this.modalState);
        },

        onToggleFavorite() {
            const { productId } = this[PRODUCT_PREVIEW];
            this[TOGGLE_FAVORITES_ITEM](productId);
        },

        onCartStateChange() {
            const { referralCode } = this.modalState;
            const { id, stock } = this[PRODUCT_PREVIEW];

            this.onClose();
            this[CHANGE_MODAL_STATE]({
                name: modalName.general.ADD_TO_CART,
                open: true,
                state: {
                    offerId: id,
                    storeId: stock.storeId,
                    type: cartItemTypes.PRODUCT,
                    referralCode,
                },
            });
        },

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },

        async setRetailRocketProductView() {
            const ids = await RetailRocketHelper.collectIdsForProductView(this[PRODUCT_PREVIEW], this[PRODUCT_OPTIONS]);

            if (ids.length > 0) {
                $retailRocket.addProductView(ids);
            }
        },
    },

    async beforeMount() {
        const { offerId, code } = this.modalState || {};
        this[FETCH_PRODUCT_PREVIEW]({ offerId, code, clear: true });
    },
};
</script>
