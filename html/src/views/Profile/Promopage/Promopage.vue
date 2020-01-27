<template>
    <section class="section promopage-view">
        <div class="promopage-view__header">
            <h2 class="promopage-view__hl">
                {{ $t(`profile.routes.${$route.name}`) }}
            </h2>
            <span class="text-grey text-sm">{{ products.length }} продуктов</span>
        </div>

        <info-panel class="promopage-view__panel" :header="name">
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
                <li class="promopage-view__panel-item" v-for="item in products" :key="item.id">
                    <catalog-product-card
                        class="promopage-view__panel-card"
                        :product-id="item.id"
                        :name="item.name"
                        :type="item.type"
                        :href="`/catalog/${item.categoryCodes[item.categoryCodes.length - 1]}/${item.code}`"
                        :image="item.image"
                        :price="item.price"
                        :old-price="item.oldPrice"
                        :tags="item.tags"
                        :rating="item.rating"
                        :show-wishlist-btn="false"
                        @addItem="ADD_CART_ITEM({ offerId: item.id })"
                    />
                    <button class="promopage-view__panel-item-btn" @click.prevent>
                        <v-svg name="cross" width="24" height="24" />
                    </button>
                </li>
            </ul>
        </info-panel>

        <transition name="fade">
            <promopage-edit-modal v-if="isNameEditOpen" />
            <promopage-add-modal v-else-if="isProductAddOpen" />
            <promopage-add-by-link-modal v-else-if="isProductAddByLinkOpen" />
        </transition>
    </section>
</template>

<script>
import VSvg from '../../../components/controls/VSvg/VSvg.vue';
import VLink from '../../../components/controls/VLink/VLink.vue';

import InfoPanel from '../../../components/profile/InfoPanel/InfoPanel.vue';
import CatalogProductCard from '../../../components/CatalogProductCard/CatalogProductCard.vue';

import PromopageEditModal, {
    NAME as PROMOPAGE_EDIT_MODAL_NAME,
} from '../../../components/profile/PromopageEditModal/PromopageEditModal.vue';

import PromopageAddModal, {
    NAME as PROMOPAGE_ADD_MODAL_NAME,
} from '../../../components/profile/PromopageAddModal/PromopageAddModal.vue';

import PromopageAddByLinkModal, {
    NAME as PROMOPAGE_ADD_BY_LINK_MODAL_NAME,
} from '../../../components/profile/PromopageAddByLinkModal/PromopageAddByLinkModal.vue';

import { $store, $progress, $logger } from '../../../services/ServiceLocator';
import { mapState, mapActions } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import { NAME as PROFILE_MODULE, PROMO_DATA } from '../../../store/modules/Profile';
import { FETCH_PROMO_DATA } from '../../../store/modules/Profile/actions';

import { NAME as CART_MODULE } from '../../../store/modules/Cart';
import { ADD_CART_ITEM } from '../../../store/modules/Cart/actions';

import '../../../assets/images/sprites/cross.svg';
import '../../../assets/images/sprites/copy.svg';
import '../../../assets/images/sprites/edit.svg';
import '../../../assets/images/sprites/link.svg';
import '../../../assets/images/sprites/link-add.svg';
import '../../../assets/images/sprites/plus-small.svg';
import './Promopage.css';

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
        ...mapState(MODAL_MODULE, {
            isNameEditOpen: state =>
                state[MODALS][PROMOPAGE_EDIT_MODAL_NAME] && state[MODALS][PROMOPAGE_EDIT_MODAL_NAME].open,
            isProductAddOpen: state =>
                state[MODALS][PROMOPAGE_ADD_MODAL_NAME] && state[MODALS][PROMOPAGE_ADD_MODAL_NAME].open,
            isProductAddByLinkOpen: state =>
                state[MODALS][PROMOPAGE_ADD_BY_LINK_MODAL_NAME] && state[MODALS][PROMOPAGE_ADD_BY_LINK_MODAL_NAME].open,
        }),

        ...mapState(PROFILE_MODULE, {
            products: state => (state[PROMO_DATA] ? state[PROMO_DATA].products : []),
            name: state => (state[PROMO_DATA] ? state[PROMO_DATA].name : ''),
        }),

        isTablet() {
            return this.$mq.tablet;
        },

        iconSize() {
            return this.$mq.tablet ? 24 : 16;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(CART_MODULE, [ADD_CART_ITEM]),

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
        const { promoData } = $store.state.profile;

        // если все загружено, пропускаем
        if (promoData) next();
        else {
            $progress.start();
            $store
                .dispatch(`${PROFILE_MODULE}/${FETCH_PROMO_DATA}`)
                .then(() => {
                    next(vm => $progress.finish());
                })
                .catch(error => {
                    next(vm => $progress.fail());
                    $logger.error(error);
                });
        }
    },

    beforeMount() {},
};
</script>
