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

                    <v-link class="promopage-view__panel-link" tag="button">
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

            <ul class="promopage-view__panel-list">
                <li class="promopage-view__panel-item" v-for="product in products" :key="product.id">
                    <catalog-product-card class="promopage-view__panel-card" v-bind="product" />
                    <button class="promopage-view__panel-item-btn" @click.prevent>
                        <v-svg name="cross" width="24" height="24" />
                    </button>
                </li>
            </ul>
        </info-panel>

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
                v-show="isProductAddByLinkOpen"
                v-if="$isServer || (!isNameEditOpen && !isProductAddOpen && isProductAddByLinkOpen)"
            />
        </transition>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';

import InfoPanel from '@components/profile/InfoPanel/InfoPanel.vue';
import CatalogProductCard from '@components/CatalogProductCard/CatalogProductCard.vue';

import PromopageEditModal, {
    NAME as PROMOPAGE_EDIT_MODAL_NAME,
} from '@components/profile/PromopageEditModal/PromopageEditModal.vue';

import PromopageAddModal, {
    NAME as PROMOPAGE_ADD_MODAL_NAME,
} from '@components/profile/PromopageAddModal/PromopageAddModal.vue';

import PromopageAddByLinkModal, {
    NAME as PROMOPAGE_ADD_BY_LINK_MODAL_NAME,
} from '@components/profile/PromopageAddByLinkModal/PromopageAddByLinkModal.vue';

import { $store, $progress, $logger } from '@services';
import { mapState, mapActions } from 'vuex';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROMOPAGE_MODULE, TITLE, ITEMS, RANGE, ACTIVE_PAGE } from '@store/modules/Profile/modules/Promopage';
import { FETCH_PROMOPAGE, SET_LOAD_PATH } from '@store/modules/Profile/modules/Promopage/actions';

import { DEFAULT_PAGE } from '@constants';
import '@images/sprites/cross.svg';
import '@images/sprites/copy.svg';
import '@images/sprites/edit.svg';
import '@images/sprites/link.svg';
import '@images/sprites/link-add.svg';
import '@images/sprites/plus-small.svg';
import './Promopage.css';
import { generateProductUrl } from '../../../util/catalog';

const PROMOPAGE_MODULE_PATH = `${PROFILE_MODULE}/${PROMOPAGE_MODULE}`;

export default {
    name: 'promopage',

    components: {
        VSvg,
        VLink,

        InfoPanel,
        CatalogProductCard,

        PromopageEditModal,
        PromopageAddModal,
        PromopageAddByLinkModal,
    },

    computed: {
        ...mapState(PROMOPAGE_MODULE_PATH, [TITLE, ITEMS, RANGE]),
        ...mapState(MODAL_MODULE, {
            isNameEditOpen: state =>
                state[MODALS][PROMOPAGE_EDIT_MODAL_NAME] && state[MODALS][PROMOPAGE_EDIT_MODAL_NAME].open,
            isProductAddOpen: state =>
                state[MODALS][PROMOPAGE_ADD_MODAL_NAME] && state[MODALS][PROMOPAGE_ADD_MODAL_NAME].open,
            isProductAddByLinkOpen: state =>
                state[MODALS][PROMOPAGE_ADD_BY_LINK_MODAL_NAME] && state[MODALS][PROMOPAGE_ADD_BY_LINK_MODAL_NAME].open,
        }),

        products() {
            const items = this[ITEMS] || [];
            return items.map(item => {
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

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(PROMOPAGE_MODULE_PATH, [FETCH_PROMOPAGE]),

        onAddProduct() {
            this[CHANGE_MODAL_STATE]({ name: PROMOPAGE_ADD_MODAL_NAME, open: true });
        },

        onAddProductByLink() {
            this[CHANGE_MODAL_STATE]({ name: PROMOPAGE_ADD_BY_LINK_MODAL_NAME, open: true });
        },

        onEditName() {
            this[CHANGE_MODAL_STATE]({ name: PROMOPAGE_EDIT_MODAL_NAME, open: true });
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
                    next(vm => $progress.finish());
                })
                .catch(error => {
                    next(vm => $progress.fail());
                    $logger.error(error);
                });
        }
    },
};
</script>
