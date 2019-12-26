<template>
    <general-modal type="wide" class="quick-view-modal" @close="onClose">
        <template v-slot:content>
            <div class="quick-view-modal__body">
                <div class="quick-view-modal__gallery">
                    <div
                        class="quick-view-modal__gallery-item"
                        v-for="image in productPreview.media.slice(0, 4)"
                        :key="image.id"
                    >
                        <v-picture v-if="image && image.id" :image="image" alt="">
                            <template v-slot:source="{ image, lazy }">
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
                    </div>
                </div>
                <div class="quick-view-modal__detail">
                    <h1 class="quick-view-modal__detail-hl">
                        {{ productPreview.title }}
                    </h1>
                    <div class="quick-view-modal__detail-info">
                        <v-rating class="quick-view-modal__detail-info-rating" :value="productPreview.rating" readonly>
                            <template v-slot:activeLabel>
                                <v-svg name="star-small" width="16" height="16" />
                            </template>
                            <template v-slot:inactiveLabel>
                                <v-svg name="star-empty-small" width="16" height="16" />
                            </template>
                        </v-rating>
                        <div class="text-grey quick-view-modal__detail-info-review">
                            {{ $t('product.review', { n: productPreview.reviewsCount }) }}
                        </div>
                        <div class="text-grey quick-view-modal__detail-info-code">
                            {{ $t('product.vendorCode', { code: productPreview.vendorCode }) }}
                        </div>
                    </div>

                    <div
                        class="quick-view-modal__detail-section quick-view-modal__detail-panels"
                        v-observe-visibility="onPriceVisibilityChanged"
                    >
                        <div class="quick-view-modal__detail-price-panel">
                            <div class="quick-view-modal__detail-price-panel-prices">
                                <price
                                    class="text-bold quick-view-modal__detail-price-panel-current"
                                    :value="productPreview.price.value"
                                    :currency="productPreview.price.currency"
                                />
                                <price
                                    v-if="productPreview.oldPrice"
                                    class="text-grey text-strike quick-view-modal__detail-price-panel-old"
                                    :value="productPreview.oldPrice.value"
                                    :currency="productPreview.oldPrice.currency"
                                />
                            </div>
                            <div class="text-grey quick-view-modal__detail-price-panel-bonus">
                                +{{ $t('product.bonus', { n: productPreview.bonus }) }}
                            </div>
                        </div>
                        <div class="quick-view-modal__detail-control-panel">
                            <v-button
                                class="quick-view-modal__detail-control-panel-btn"
                                @click.prevent="ADD_CART_ITEM({ offerId: productPreview.id })"
                            >
                                Добавить в корзину
                            </v-button>
                            <v-link class="quick-view-modal__detail-control-panel-wishlist">
                                <v-svg id="product-wishlist" name="wishlist-middle" width="20" height="18" />
                                &nbsp;В избранное
                            </v-link>
                        </div>
                    </div>

                    <div class="quick-view-modal__detail-section">
                        <p>
                            Получить в
                            <a href="#">г. Москва&nbsp;<v-svg name="arrow-down" width="12" height="12"/></a>
                        </p>
                        <p>
                            Экспресс доставка курьером — 550 ₽,
                            <span class="text-grey">сегодня,&nbsp;21&nbsp;июня</span>
                        </p>
                        <p>Доставка курьером — 350 ₽, <span class="text-grey">завтра,&nbsp;22&nbsp;июня</span></p>
                        <p>
                            Из пунктов <a href="#">выдачи</a> или <a href="#">постаматов</a> — бесплатно,
                            <span class="text-grey">23&nbsp;июня</span>
                        </p>
                    </div>
                </div>
            </div>
        </template>
    </general-modal>
</template>

<script>
import VButton from '../controls/VButton/VButton.vue';
import VPicture from '../controls/VPicture/VPicture.vue';
import GeneralModal from '../GeneralModal/GeneralModal.vue';
import { mapState, mapActions } from 'vuex';

import { NAME as PREVIEW_MODULE, PRODUCT_PREVIEW } from '../../store/modules/Preview';
import { FETCH_PRODUCT_PREVIEW } from '../../store/modules/Preview/actions';

import { NAME as MODAL_MODULE, MODALS } from '../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../store/modules/Modal/actions';

import { generatePictureSourcePath } from '../../util/images';
import './QuickViewModal.css';

export const NAME = 'quick-view-modal';

export default {
    name: NAME,

    components: {
        VButton,
        VPicture,
        GeneralModal,
    },

    data() {
        return {};
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: state => state[MODALS][NAME] && state[MODALS][NAME].open,
            modalState: state => state[MODALS][NAME] && state[MODALS][NAME].state,
        }),

        ...mapState(PREVIEW_MODULE, [PRODUCT_PREVIEW]),
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(PREVIEW_MODULE, [FETCH_PRODUCT_PREVIEW]),

        generateSourcePath(x, y, id, ext) {
            return generatePictureSourcePath(x, y, id, ext);
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
