<template>
    <general-modal type="wide" class="quick-view-modal" @close="onClose">
        <template v-slot:content>
            <div class="quick-view-modal__body" v-if="!isPending">
                <ul class="quick-view-modal__gallery">
                    <li class="quick-view-modal__gallery-item" v-for="image in images" :key="image.id">
                        <v-picture v-if="image && image.id" :image="image" alt="">
                            <template v-slot:source="{ image }">
                                <source
                                    :data-srcset="generateSourcePath(300, 300, image.id, 'webp')"
                                    type="image/webp"
                                    media="(min-width: 480px)"
                                />
                                <source
                                    :data-srcset="generateSourcePath(200, 200, image.id, 'webp')"
                                    type="image/webp"
                                    media="(max-width: 479px)"
                                />
                            </template>
                            <template v-slot:fallback="{ image, lazy, alt }">
                                <img
                                    class="blur-up lazyload v-picture__img"
                                    :data-src="generateSourcePath(300, 300, image.id, image.sourceExt)"
                                    :alt="alt"
                                />
                            </template>
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
                        :price="productPreview.price"
                        :old-price="productPreview.oldPrice"
                        :bonus="productPreview.bonus"
                        :can-buy="productPreview.stock.qty > 0"
                        @cart="onCartStateChange"
                        @wishlist="onWishlistStateChange"
                    />
                    <product-delivery-panel />
                </div>
            </div>
            <v-spinner class="quick-view-modal__spinner" :show="isPending" />
        </template>
    </general-modal>
</template>

<script>
import VPicture from '@controls/VPicture/VPicture.vue';

import GeneralModal from '@components/GeneralModal/GeneralModal.vue';
import ProductCartPanel from '@components/product/ProductCartPanel/ProductCartPanel.vue';
import ProductDetailPanel from '@components/product/ProductDetailPanel/ProductDetailPanel.vue';
import ProductDeliveryPanel from '@components/product/ProductDeliveryPanel/ProductDeliveryPanel.vue';
import VSpinner from '@controls/VSpinner/VSpinner.vue';

import { NAME as ADD_TO_CART_MODAL_NAME } from '@components/AddToCartModal/AddToCartModal.vue';

import { mapState, mapActions } from 'vuex';
import { NAME as PREVIEW_MODULE, PRODUCT_PREVIEW, PRODUCT_PREVIEW_STATUS } from '@store/modules/Preview';
import { FETCH_PRODUCT_PREVIEW } from '@store/modules/Preview/actions';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as CART_MODULE } from '@store/modules/Cart';
import { ADD_CART_ITEM } from '@store/modules/Cart/actions';

import { requestStatus } from '@enums';
import { generatePictureSourcePath } from '@util/file';
import './QuickViewModal.css';

export const NAME = 'quick-view-modal';

export default {
    name: NAME,

    components: {
        VPicture,
        VSpinner,

        GeneralModal,
        ProductCartPanel,
        ProductDetailPanel,
        ProductDeliveryPanel,
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: state => state[MODALS][NAME] && state[MODALS][NAME].open,
            modalState: state => state[MODALS][NAME] && state[MODALS][NAME].state,
        }),

        ...mapState(PREVIEW_MODULE, [PRODUCT_PREVIEW, PRODUCT_PREVIEW_STATUS]),

        images() {
            const preview = this[PRODUCT_PREVIEW];
            return preview ? preview.media.slice(0, 4) : [];
        },

        isPending() {
            return this[PRODUCT_PREVIEW_STATUS] === requestStatus.PENDING;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(PREVIEW_MODULE, [FETCH_PRODUCT_PREVIEW]),
        ...mapActions(CART_MODULE, [ADD_CART_ITEM]),

        generateSourcePath(x, y, id, ext) {
            return generatePictureSourcePath(x, y, id, ext);
        },

        onWishlistStateChange() {},

        onCartStateChange() {
            this.onClose();
            this[CHANGE_MODAL_STATE]({
                name: ADD_TO_CART_MODAL_NAME,
                open: true,
                state: { offerId: this.productPreview.id, storeId: this.productPreview.storeId, type: 'product' },
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
