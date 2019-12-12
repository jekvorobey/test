<template>
    <section class="section landing-view">
        <component
            v-for="renderItem in renderData"
            :key="renderItem.id"
            :is="renderItem.component"
            v-bind="renderItem.data"
        />
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

import landingModule from '../../store/modules/Landing';
import { mapState } from 'vuex';
import { $store, $progress, $logger } from '../../services/ServiceLocator';

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
    },

    head: {
        title: {
            inner: 'landing',
            separator: '-',
            complement: ' Welcome!',
        },
    },

    computed: {
        ...mapState('landing', ['renderData']),
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
