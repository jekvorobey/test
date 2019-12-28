<template>
    <section class="section landing-view">
        <component
            v-for="renderItem in renderData"
            :key="renderItem.id"
            :is="renderItem.component"
            v-bind="renderItem.data"
        />

        <transition name="fade-in">
            <quick-view-modal v-if="isQuickViewOpen && !isTabletLg" />
            <add-to-cart-modal v-else-if="isAddToCartOpen" />
        </transition>
    </section>
</template>

<script>
import Vue from 'vue';

import SeparatorSection from '../../components/blocks/SeparatorSection/SeparatorSection.vue';
import SliderBannersSection from '../../components/blocks/SliderBannersSection/SliderBannersSection.vue';
import ListBannersSection from '../../components/blocks/ListBannersSection/ListBannersSection.vue';
import InstagramSection from '../../components/blocks/InstagramSection/InstagramSection.vue';
import SingleBannerSection from '../../components/blocks/SingleBannerSection/SingleBannerSection.vue';

import CategoriesSection from '../../components/blocks/CategoriesSection/CategoriesSection.vue';
import ProductsSection from '../../components/blocks/ProductsSection/ProductsSection.vue';
import BrandsSection from '../../components/blocks/BrandsSection/BrandsSection.vue';

import QuickViewModal, { NAME as QUICK_VIEW_MODAL_NAME } from '../../components/QuickViewModal/QuickViewModal.vue';
import AddToCartModal, { NAME as ADD_TO_CART_MODAL_NAME } from '../../components/AddToCartModal/AddToCartModal.vue';

import { $store, $progress, $logger } from '../../services/ServiceLocator';
import { mapState } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '../../store/modules/Modal';

import landingModule, { NAME as LANDING_MODULE, RENDER_DATA } from '../../store/modules/Landing';

import './Landing.css';

export default {
    name: 'landing',
    components: {
        SeparatorSection,
        SliderBannersSection,
        ListBannersSection,
        SingleBannerSection,
        BrandsSection,
        CategoriesSection,
        ProductsSection,
        InstagramSection,

        QuickViewModal,
        AddToCartModal,
    },

    head: {
        title: {
            inner: 'landing',
            separator: '-',
            complement: ' Welcome!',
        },
    },

    computed: {
        ...mapState(LANDING_MODULE, [RENDER_DATA]),
        ...mapState(MODAL_MODULE, {
            isQuickViewOpen: state => state[MODALS][QUICK_VIEW_MODAL_NAME] && state[MODALS][QUICK_VIEW_MODAL_NAME].open,
            isAddToCartOpen: state =>
                state[MODALS][ADD_TO_CART_MODAL_NAME] && state[MODALS][ADD_TO_CART_MODAL_NAME].open,
        }),

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        const register = !!$store._modulesNamespaceMap[`${landingModule.name}/`];
        if (!register)
            $store.registerModule(landingModule.name, landingModule, {
                preserveState: !!$store.state.landing,
            });

        if ($store.state.landing.load) {
            next();
        } else {
            $progress.start();
            $store.dispatch(`${landingModule.name}/FETCH_LANDING_DATA`).then(() => next(vm => $progress.finish()));
        }
    },

    beforeRouteUpdate(to, from, next) {
        // вызывается когда маршрут, что рендерит этот компонент изменился,
        // но этот компонент будет повторно использован в новом маршруте.
        // Например, для маршрута с динамическими параметрами `/foo/:id`, когда мы
        // перемещаемся между `/foo/1` и `/foo/2`, экземпляр того же компонента `Foo`
        // будет использован повторно, и этот хук будет вызван когда это случится.
        // Также имеется доступ в `this` к экземпляру компонента.

        this.$progress.start();
        this.$store
            .dispatch(`${landingModule.name}/FETCH_LANDING_DATA`)
            .then(() => next(vm => this.$progress.finish()));
    },

    // Server-side only
    // This will be called by the server renderer automatically
    //serverPrefetch() {
    // return the Promise from the action
    // so that the component waits before rendering
    //},
};
</script>
