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

import SeparatorSection from '@components/blocks/SeparatorSection/SeparatorSection.vue';
import SliderBannersSection from '@components/blocks/SliderBannersSection/SliderBannersSection.vue';
import ListBannersSection from '@components/blocks/ListBannersSection/ListBannersSection.vue';
import InstagramSection from '@components/blocks/InstagramSection/InstagramSection.vue';
import SingleBannerSection from '@components/blocks/SingleBannerSection/SingleBannerSection.vue';

import CategoriesSection from '@components/blocks/CategoriesSection/CategoriesSection.vue';
import ProductsSection from '@components/blocks/ProductsSection/ProductsSection.vue';
import BrandsSection from '@components/blocks/BrandsSection/BrandsSection.vue';

import RetailRocketHitsSection from '@components/blocks/RetailRocketHitsSection/RetailRocketHitsSection.vue';
import RetailRocketRecomSection from '@components/blocks/RetailRocketRecomSection/RetailRocketRecomSection.vue';

import { $store, $progress, $logger } from '@services';
import { mapState, mapActions } from 'vuex';

import { NAME as LANDING_MODULE, RENDER_DATA } from '@store/modules/Landing';
import { FETCH_LANDING_DATA } from '@store/modules/Landing/actions';

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

        RetailRocketRecomSection,
        RetailRocketHitsSection,
    },

    // head: {
    //     title: {
    //         inner: 'landing',
    //         separator: '-',
    //         complement: ' Welcome!',
    //     },
    // },

    computed: {
        ...mapState(LANDING_MODULE, [RENDER_DATA]),

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    methods: {
        ...mapActions(LANDING_MODULE, [FETCH_LANDING_DATA]),
    },

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        const { load } = $store.state[LANDING_MODULE];

        if (load) next();
        else {
            $progress.start();
            $store
                .dispatch(`${LANDING_MODULE}/${FETCH_LANDING_DATA}`)
                .then(() => {
                    $progress.finish();
                    next();
                })
                .catch(() => {
                    $progress.fail();
                    next();
                });
        }
    },
};
</script>
