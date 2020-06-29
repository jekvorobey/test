<template>
    <section class="section promopage-view">
        <div class="promopage-view__header">
            <h2 class="promopage-view__hl">
                {{ $t(`profile.routes.${$route.name}`) }}
            </h2>
            <span v-if="items && items.length" class="text-grey text-sm">{{ items && items.length }} продуктов</span>
        </div>

        <info-panel class="promopage-view__panel" :header="title">
            <template v-slot:controls>
                <v-link class="promopage-view__panel-link" tag="button" @click="onEditName">
                    <v-svg name="edit" :width="iconSize" :height="iconSize" />
                </v-link>

                <div class="promopage-view__panel-controls" v-if="!isTablet">
                    <v-link class="promopage-view__panel-link" tag="button" @click="onAddProduct">
                        <v-svg name="plus-small" :width="iconSize" :height="iconSize" />
                        &nbsp;&nbsp;Добавить
                    </v-link>

                    <v-link class="promopage-view__panel-link" tag="button" @click="onAddProductByLink">
                        <v-svg name="link-add" :width="iconSize" :height="iconSize" />
                        &nbsp;&nbsp;Добавить по ссылке
                    </v-link>

                    <v-link class="promopage-view__panel-link" tag="button" @click="onCopyReferralLink">
                        <v-svg name="link" :width="iconSize" :height="iconSize" />
                        &nbsp;&nbsp;Скопировать ссылку
                    </v-link>
                </div>
            </template>

            <div class="container container--tablet-lg">
                <div class="promopage-view__panel-links" v-if="isTablet">
                    <v-link class="promopage-view__panel-link" tag="button" @click="onAddProduct">
                        <v-svg name="plus-small" :width="iconSize" :height="iconSize" />
                        &nbsp;&nbsp;Добавить
                    </v-link>

                    <v-link class="promopage-view__panel-link" tag="button" @click="onAddProductByLink">
                        <v-svg name="link-add" :width="iconSize" :height="iconSize" />
                        &nbsp;&nbsp;Добавить по ссылке
                    </v-link>
                </div>
            </div>

            <ul class="promopage-view__panel-list" v-if="items && items.length">
                <li class="promopage-view__panel-item" v-for="item in products" :key="item.id">
                    <catalog-product-card
                        class="promopage-view__panel-card"
                        v-bind="item"
                        :offer-id="item.id"
                        @preview="onPreview(item.code)"
                    />
                    <button class="promopage-view__panel-item-btn" @click.prevent="onDeleteProduct(item.productId)">
                        <v-svg name="cross" width="24" height="24" />
                    </button>
                </li>
            </ul>

            <div class="promopage-view__attention" v-else>
                <v-svg name="info-middle" class="promopage-view__attention-icon" width="24" height="24" />
                <p class="promopage-view__attention-text">
                    Вы еще не добавляли товары на персональную промо-страницу.<br />
                    Добавьте ваши любимые продукты, чтобы рекомендовать их своей аудитории.
                </p>
                <v-button class="btn btn--outline" @click="onAddProduct">Добавить</v-button>
            </div>
        </info-panel>

        <div class="container container--tablet-lg promopage-view__controls" v-if="pagesCount > 1">
            <show-more-button
                btn-class="btn--outline promopage-view__controls-btn"
                v-if="activePage < pagesCount"
                @click="onShowMore"
                :show-preloader="showMore"
            >
                Показать ещё
            </show-more-button>
            <v-pagination :value="activePage" :page-count="pagesCount" @input="onPageChanged" />
        </div>

        <transition name="fade">
            <promopage-edit-modal
                v-if="$isServer || (isNameEditOpen && !isProductAddOpen && !isProductAddByLinkOpen)"
            />
        </transition>

        <transition name="fade">
            <promopage-add-modal v-if="$isServer || (!isNameEditOpen && isProductAddOpen && !isProductAddByLinkOpen)" />
        </transition>

        <transition name="fade">
            <promopage-add-by-link-modal
                v-if="$isServer || (!isNameEditOpen && !isProductAddOpen && isProductAddByLinkOpen)"
            />
        </transition>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VPagination from '@controls/VPagination/VPagination.vue';

import InfoPanel from '@components/profile/InfoPanel/InfoPanel.vue';
import CatalogProductCard from '@components/CatalogProductCard/CatalogProductCard.vue';
import ShowMoreButton from '@components/ShowMoreButton/ShowMoreButton.vue';

import PromopageEditModal from '@components/profile/PromopageEditModal/PromopageEditModal.vue';
import PromopageAddModal from '@components/profile/PromopageAddModal/PromopageAddModal.vue';
import PromopageAddByLinkModal from '@components/profile/PromopageAddByLinkModal/PromopageAddByLinkModal.vue';

import { $store, $progress, $logger } from '@services';
import { mapState, mapActions, mapGetters } from 'vuex';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as AUTH_MODULE, REFERRAL_CODE, USER } from '@store/modules/Auth';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROMOPAGE_MODULE, TITLE, ITEMS, RANGE, ACTIVE_PAGE } from '@store/modules/Profile/modules/Promopage';
import { PAGES_COUNT } from '@store/modules/Profile/modules/Promopage/getters';
import { FETCH_PROMOPAGE, SET_LOAD_PATH, DELETE_PRODUCT } from '@store/modules/Profile/modules/Promopage/actions';

import { saveToClipboard } from '@util';
import { generateProductUrl } from '@util/catalog';
import { generateReferralPromopageLink } from '@util/profile';
import { DEFAULT_PAGE } from '@constants';
import { modalName } from '@enums';
import '@images/sprites/cross.svg';
import '@images/sprites/copy.svg';
import '@images/sprites/edit.svg';
import '@images/sprites/link.svg';
import '@images/sprites/link-add.svg';
import '@images/sprites/plus-small.svg';
import '@images/sprites/info-middle.svg';
import './Promopage.css';

const PROMOPAGE_MODULE_PATH = `${PROFILE_MODULE}/${PROMOPAGE_MODULE}`;

export default {
    name: 'promopage',

    components: {
        VSvg,
        VLink,
        VButton,
        VPagination,

        InfoPanel,
        CatalogProductCard,
        ShowMoreButton,

        PromopageEditModal,
        PromopageAddModal,
        PromopageAddByLinkModal,
    },

    data() {
        return {
            showMore: false,
        };
    },

    computed: {
        ...mapState(PROMOPAGE_MODULE_PATH, [TITLE, ITEMS, RANGE, ACTIVE_PAGE]),
        ...mapGetters(PROMOPAGE_MODULE_PATH, [PAGES_COUNT]),

        ...mapState(AUTH_MODULE, {
            [REFERRAL_CODE]: (state) => (state[USER] && state[USER][REFERRAL_CODE]) || null,
        }),

        ...mapState(MODAL_MODULE, {
            isNameEditOpen: (state) =>
                state[MODALS][modalName.profile.PROMO_EDIT] && state[MODALS][modalName.profile.PROMO_EDIT].open,
            isProductAddOpen: (state) =>
                state[MODALS][modalName.profile.PROMO_ADD] && state[MODALS][modalName.profile.PROMO_ADD].open,
            isProductAddByLinkOpen: (state) =>
                state[MODALS][modalName.profile.PROMO_ADD_BY_LINK] &&
                state[MODALS][modalName.profile.PROMO_ADD_BY_LINK].open,
        }),

        products() {
            const items = this[ITEMS] || [];
            return items.map((item) => {
                return {
                    ...item,
                    href: generateProductUrl(item.categoryCodes[item.categoryCodes.length - 1], item.code),
                    showWishlistBtn: false,
                    showBuyBtn: false,
                };
            });
        },

        isTablet() {
            return this.$mq.tablet;
        },

        iconSize() {
            return this.$mq.tablet ? 24 : 16;
        },
    },

    watch: {
        [ACTIVE_PAGE](value) {
            this.onPageChanged(value);
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(PROMOPAGE_MODULE_PATH, [FETCH_PROMOPAGE, DELETE_PRODUCT]),

        onCopyReferralLink(e) {
            const link = generateReferralPromopageLink(this[REFERRAL_CODE]);
            const result = saveToClipboard(link);
            const message = result ? 'Успешно скопировано' : 'Не удается скопировать';
            this[CHANGE_MODAL_STATE]({ name: modalName.general.NOTIFICATION, open: true, state: { message } });
            e.target.focus();
        },

        onPreview(code) {
            this[CHANGE_MODAL_STATE]({ name: 'quick-view-modal', open: true, state: { code } });
        },

        onDeleteProduct(id) {
            this[DELETE_PRODUCT]({ id, refresh: true });
        },

        onAddProduct() {
            this[CHANGE_MODAL_STATE]({ name: modalName.profile.PROMO_ADD, open: true });
        },

        onAddProductByLink() {
            this[CHANGE_MODAL_STATE]({ name: modalName.profile.PROMO_ADD_BY_LINK, open: true });
        },

        onEditName() {
            this[CHANGE_MODAL_STATE]({ name: modalName.profile.PROMO_EDIT, open: true });
        },

        onShowMore() {
            this.showMore = true;
            this.$router.replace({
                path: this.$route.path,
                query: { ...this.$route.query, page: this[ACTIVE_PAGE] + 1 },
            });
        },

        onPageChanged(page) {
            this.showMore = false;
            this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page } });
        },
    },

    beforeRouteEnter(to, from, next) {
        const {
            fullPath,
            query: { page = DEFAULT_PAGE },
        } = to;

        const { loadPath } = $store.state[PROFILE_MODULE][PROMOPAGE_MODULE];

        // если все загружено, пропускаем
        if (fullPath === loadPath) next();
        else {
            $progress.start();
            $store
                .dispatch(`${PROMOPAGE_MODULE_PATH}/${FETCH_PROMOPAGE}`, { page })
                .then(() => {
                    $store.dispatch(`${PROMOPAGE_MODULE_PATH}/${SET_LOAD_PATH}`, fullPath);
                    next((vm) => $progress.finish());
                })
                .catch((error) => {
                    next((vm) => $progress.fail());
                });
        }
    },

    async beforeRouteUpdate(to, from, next) {
        // вызывается, когда маршрут, что рендерит этот компонент, изменился,
        // но этот компонент будет повторно использован в новом маршруте.
        // Например, для маршрута с динамическими параметрами `/foo/:id`, когда мы
        // перемещаемся между `/foo/1` и `/foo/2`, экземпляр того же компонента `Foo`
        // будет использован повторно, и этот хук будет вызван когда это случится.
        // Также имеется доступ в `this` к экземпляру компонента.

        const {
            query: { page = DEFAULT_PAGE },
        } = to;

        if (page == this.activePage) return next();

        try {
            this.$progress.start();
            await this[FETCH_PROMOPAGE]({ page, showMore: this.showMore });
            this.$progress.finish();
            next();
        } catch (error) {
            this.$progress.fail();
            next(false);
        }

        this.showMore = false;
    },
};
</script>
