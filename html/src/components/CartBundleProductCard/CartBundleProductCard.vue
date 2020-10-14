<template>
    <div class="cart-bundle-product-card" :class="[{ 'cart-bundle-product-card--inactive': !isActive }]">
        <general-popup-panel
            popover-class="tooltip--white cart-bundle-product-card__panel"
            trigger="manual"
            placement="bottom-start"
            :open="isPanelOpen && selectedItem !== null"
            :disabled="isTablet"
            @onHide="onHidePanel"
        >
            <div class="cart-bundle-product-card__images" :class="`length-is-${items.length}`">
                <div
                    class="cart-bundle-product-card__image"
                    v-for="({ image }, index) in items"
                    :key="index"
                    @mouseover="onOpenPanel(index)"
                    @mouseout="onHidePanel"
                >
                    <v-picture v-if="image && image.id">
                        <source
                            :data-srcset="generateSourcePath(300, 300, image.id, 'webp')"
                            type="image/webp"
                            media="(min-width: 480px)"
                        />
                        <source
                            :data-srcset="generateSourcePath(72, 72, image.id, 'webp')"
                            type="image/webp"
                            media="(max-width: 479px)"
                        />
                        <img
                            class="blur-up lazyload v-picture__img"
                            :data-src="generateSourcePath(300, 300, image.id)"
                            alt=""
                        />
                    </v-picture>
                    <v-svg v-else id="cart-bundle-product-card-empty" name="logo" width="48" height="48" />
                </div>
            </div>
            <template v-slot:header />
            <template v-slot:body>
                <div class="cart-bundle-product-card__panel-body" v-if="selectedItem">
                    <div class="cart-bundle-product-card__panel-body-image">
                        <v-picture
                            :key="selectedItem.image.id"
                            v-if="selectedItem && selectedItem.image && selectedItem.image.id"
                        >
                            <source
                                :data-srcset="generateSourcePath(300, 300, selectedItem.image.id, 'webp')"
                                type="image/webp"
                            />
                            <source :data-srcset="generateSourcePath(300, 300, selectedItem.image.id)" />
                            <img
                                class="blur-up lazyload v-picture__img"
                                :data-src="generateSourcePath(300, 300, selectedItem.image.id)"
                                alt=""
                            />
                        </v-picture>
                        <v-svg v-else id="cart-bundle-product-card-empty" name="logo" width="48" height="48" />
                    </div>

                    <div class="cart-bundle-product-card__panel-body-info">
                        <div class="cart-bundle-product-card__panel-body-info-name">
                            {{ selectedItem.name }}
                        </div>

                        <div class="cart-bundle-product-card__panel-body-info-prices">
                            <price
                                class="text-bold cart-bundle-product-card__panel-body-info-price"
                                v-bind="selectedItem.price"
                            />
                            <price
                                class="text-sm text-grey cart-bundle-product-card__panel-body-info-price"
                                v-if="selectedItem.oldPrice"
                                v-bind="selectedItem.oldPrice"
                            />
                        </div>
                    </div>
                </div>
            </template>
        </general-popup-panel>

        <div class="cart-bundle-product-card__body">
            <div class="cart-bundle-product-card__body-bundle-info">
                <v-link class="cart-bundle-product-card__body-name">{{ name }}</v-link>
                <ol class="cart-bundle-product-card__list">
                    <li class="cart-bundle-product-card__list-item" v-for="item in items" :key="item.id">
                        {{ item.name }};
                    </li>
                </ol>

                <p class="status-color-error text-sm" v-if="!isActive">Товар закончился</p>
            </div>

            <div class="cart-bundle-product-card__body-count" v-if="showCount">
                <v-counter :value="count" :min="1" :max="maxBundlesCount" @input="debounce_countChange" />
            </div>

            <div class="cart-bundle-product-card__body-prices">
                <price tag="div" class="text-bold cart-bundle-product-card__price" v-bind="price" />
                <price
                    tag="div"
                    class="text-grey text-strike cart-bundle-product-card__price--old"
                    v-if="oldPrice"
                    v-bind="oldPrice"
                />
                <div
                    class="text-grey cart-bundle-product-card__body-bonus"
                    :class="{ 'cart-bundle-product-card__body-bonus--hidden': referralPartner || bonus === 0 }"
                >
                    + {{ bonus }} {{ bonusLabel }}
                </div>
            </div>

            <div class="cart-bundle-product-card__body-controls" v-if="showControls">
                <favorites-button
                    class="cart-bundle-product-card__body-controls-link"
                    :is-active="inFavorites"
                    is-small
                    @click="onToggleFavorite"
                >
                    &nbsp;{{ favoritesBtnText }}
                </favorites-button>

                <v-link class="cart-bundle-product-card__body-controls-link" tag="button" @click="onDeleteClick">
                    <v-svg name="cross-small" width="10" height="10" />
                    &nbsp;{{ deleteBtnText }}
                </v-link>
            </div>
        </div>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VPicture from '@controls/VPicture/VPicture.vue';
import VCounter from '@controls/VCounter/VCounter.vue';

import Price from '@components/Price/Price.vue';
import FavoritesButton from '@components/FavoritesButton/FavoritesButton.vue';
import GeneralPopupPanel from '@components/GeneralPopupPanel/GeneralPopupPanel.vue';

import { mapGetters, mapActions, mapState } from 'vuex';
import { NAME as AUTH_MODULE, USER, REFERRAL_PARTNER } from '@store/modules/Auth';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { IS_IN_FAVORITES } from '@store/modules/Favorites/getters';
import { ADD_FAVORITES_ITEM, DELETE_FAVORITES_ITEM } from '@store/modules/Favorites/actions';

import _debounce from 'lodash/debounce';
import { pluralize } from '@util';
import { generatePictureSourcePath } from '@util/file';
import '@images/sprites/cross-small.svg';
import '@images/sprites/wishlist-middle.svg';
import '@images/sprites/logo.svg';
import './CartBundleProductCard.css';

export default {
    name: 'cart-bundle-product-card',

    components: {
        VSvg,
        VLink,
        VPicture,
        VCounter,

        Price,
        FavoritesButton,
        GeneralPopupPanel,
    },

    props: {
        bundleId: {
            type: Number,
            required: true,
        },

        name: {
            type: String,
            default: 'Выгодный комплект',
            required: true,
        },

        price: {
            type: [Object, String],
        },

        oldPrice: {
            type: [Object, String],
        },

        items: {
            type: Array,
            required: true,
        },

        count: {
            type: Number,
            default: 1,
            required: true,
        },

        bonus: {
            type: Number,
            default: 0,
        },

        showCount: {
            type: Boolean,
            default: false,
        },

        showControls: {
            type: Boolean,
            default: false,
        },

        isActive: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            isPanelOpen: false,
            selectedItem: null,
        };
    },

    computed: {
        ...mapGetters(FAVORITES_MODULE, [IS_IN_FAVORITES]),
        ...mapState(AUTH_MODULE, {
            [REFERRAL_PARTNER]: (state) => (state[USER] && state[USER][REFERRAL_PARTNER]) || false,
        }),

        favoritesBtnText() {
            if (this.isTablet) return '';
            if (this.inFavorites) return 'В избранном';
            return 'Перенести в избранное';
        },

        deleteBtnText() {
            if (this.isTablet) return '';
            return 'Удалить';
        },

        maxBundlesCount() {
            return Math.min(...this.items.map((item) => item.stock.qty));
        },

        bonusLabel() {
            const { bonus } = this;
            return pluralize(bonus, ['бонус', 'бонуса', 'бонусов']);
        },

        inFavorites() {
            const { items = [] } = this;
            return items.every((i) => this[IS_IN_FAVORITES](i.productId));
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        ...mapActions(FAVORITES_MODULE, [ADD_FAVORITES_ITEM, DELETE_FAVORITES_ITEM]),

        onToggleFavorite() {
            const { inFavorites, items = [] } = this;

            for (const { productId } of items) {
                if (inFavorites) this[DELETE_FAVORITES_ITEM](productId);
                else this[ADD_FAVORITES_ITEM](productId);
            }
        },

        onDeleteClick() {
            this.$emit('deleteBundle', this.bundleId);
        },

        onCountChange(value) {
            const { bundleId } = this;
            if (value > 0) this.$emit('countChange', { id: bundleId, count: value });
        },

        generateSourcePath(x, y, id, ext) {
            return generatePictureSourcePath(x, y, id, ext);
        },

        onOpenPanel(index) {
            const { items } = this;
            this.selectedItem = items[index] || null;
            this.isPanelOpen = true;
        },

        onHidePanel() {
            this.isPanelOpen = false;
        },
    },

    created() {
        this.debounce_countChange = _debounce(this.onCountChange, 200);
    },
};
</script>
