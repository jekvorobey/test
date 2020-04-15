<template>
    <general-modal type="wide" class="quick-view-modal" @close="onClose">
        <template v-slot:content>
            <div class="quick-view-modal__body" v-if="!isPending">
                <ul class="quick-view-modal__gallery">
                    <li
                        v-if="!images || !images.length"
                        class="quick-view-modal__gallery-item quick-view-modal__gallery-item--empty"
                    >
                        <v-svg name="logo" width="56" height="56" />
                    </li>
                    <li class="quick-view-modal__gallery-item" v-for="image in images" :key="image.id">
                        <v-picture>
                            <source :data-srcset="image.bigImage" type="image/webp" media="(min-width: 480px)" />
                            <source :data-srcset="image.smallImage" type="image/webp" media="(max-width: 479px)" />
                            <img class="blur-up lazyload v-picture__img" :data-src="image.defaultImage" alt="" />
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
                    <product-cart-panel
                        class="quick-view-modal__detail-cart"
                        :productId="productPreview.productId"
                        :price="productPreview.price"
                        :old-price="productPreview.oldPrice"
                        :bonus="productPreview.bonus"
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
                </div>
            </div>
            <v-spinner class="quick-view-modal__spinner" :show="isPending" />
        </template>
    </general-modal>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import GeneralModal from '@components/GeneralModal/GeneralModal.vue';
import ProductCartPanel from '@components/product/ProductCartPanel/ProductCartPanel.vue';
import ProductDetailPanel from '@components/product/ProductDetailPanel/ProductDetailPanel.vue';
import ProductDeliveryPanel from '@components/product/ProductDeliveryPanel/ProductDeliveryPanel.vue';
import VSpinner from '@controls/VSpinner/VSpinner.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { NAME as PREVIEW_MODULE, PRODUCT_PREVIEW, PRODUCT_PREVIEW_STATUS } from '@store/modules/Preview';
import { FETCH_PRODUCT_PREVIEW } from '@store/modules/Preview/actions';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as CART_MODULE } from '@store/modules/Cart';
import { IS_IN_CART } from '@store/modules/Cart/getters';
import { ADD_CART_ITEM } from '@store/modules/Cart/actions';

import { NAME as GEO_MODULE, SELECTED_CITY } from '@store/modules/Geolocation';

import { requestStatus, fileExtension, modalName } from '@enums';
import { cartItemTypes } from '@enums/product';
import { generatePictureSourcePath } from '@util/file';
import { generateProductUrl } from '@util/catalog';
import '@images/sprites/logo.svg';
import './QuickViewModal.css';

const NAME = modalName.general.QUICK_VIEW;

export default {
    name: NAME,

    components: {
        VSvg,
        VPicture,
        VSpinner,

        GeneralModal,
        ProductCartPanel,
        ProductDetailPanel,
        ProductDeliveryPanel,
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: (state) => state[MODALS][NAME] && state[MODALS][NAME].open,
            modalState: (state) => state[MODALS][NAME] && state[MODALS][NAME].state,
        }),

        ...mapState(PREVIEW_MODULE, [PRODUCT_PREVIEW, PRODUCT_PREVIEW_STATUS]),
        ...mapState(GEO_MODULE, [SELECTED_CITY]),
        ...mapGetters(CART_MODULE, [IS_IN_CART]),

        images() {
            const { media } = this[PRODUCT_PREVIEW] || {};
            return media.slice(0, 4).map((i) => {
                return {
                    ...i,
                    bigImage: generatePictureSourcePath(300, 300, i.id, fileExtension.image.WEBP),
                    smallImage: generatePictureSourcePath(200, 200, i.id, fileExtension.image.WEBP),
                    defaultImage: generatePictureSourcePath(300, 300, i.id),
                };
            });
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
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(PREVIEW_MODULE, [FETCH_PRODUCT_PREVIEW]),
        ...mapActions(CART_MODULE, [ADD_CART_ITEM]),

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

        onWishlistStateChange() {
            debugger;
        },

        onCartStateChange() {
            this.onClose();
            this[CHANGE_MODAL_STATE]({
                name: modalName.general.ADD_TO_CART,
                open: true,
                state: {
                    offerId: this.productPreview.id,
                    storeId: this.productPreview.storeId,
                    type: cartItemTypes.PRODUCT,
                },
            });
        },

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },

    beforeMount() {
        this[FETCH_PRODUCT_PREVIEW](this.modalState);
    },
};
</script>
