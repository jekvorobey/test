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
import { seoEvents, ProductsBuilder } from '@services/SeoEventsService';
import { mapState, mapActions } from 'vuex';

import { NAME as LANDING_MODULE, RENDER_DATA } from '@store/modules/Landing';
import { FETCH_LANDING_DATA, FETCH_LANDING_DATA_2 } from '@store/modules/Landing/actions';

import { NAME as AUTH_MODULE, HAS_SESSION } from '@store/modules/Auth';

import metaMixin from '@plugins/meta';
import './Landing.css';

export default {
    name: 'landing',
    mixins: [metaMixin],

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

    metaInfo() {
        return {
            title: 'Бессовестно Талантливый - главная',
        };
    },

    computed: {
        ...mapState(LANDING_MODULE, [RENDER_DATA]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        landingProducts() {
            const newProducts = $store.state[LANDING_MODULE].newProducts.items;
            const bestsellerProducts = $store.state[LANDING_MODULE].bestsellerProducts.items;
            return [...newProducts, ...bestsellerProducts];
        },
    },

    watch: {
        [HAS_SESSION]() {
            this.fetchData();
        },
    },

    methods: {
        ...mapActions(LANDING_MODULE, [FETCH_LANDING_DATA]),

        async fetchData() {
            $progress.start();
            $store
                .dispatch(`${LANDING_MODULE}/${FETCH_LANDING_DATA_2}`)
                .then(() => {
                    $progress.finish();
                })
                .catch(() => {
                    $progress.fail();
                });
        },
    },

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        function proceed() {
            if ($store.state[LANDING_MODULE]) {
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
            }
        }

        if ($store.state[LANDING_MODULE]) proceed();
        else {
            $store.watch(
                (state) => state[LANDING_MODULE],
                (value) => {
                    if (value) proceed();
                }
            );
        }
    },

    async mounted() {
        await this.fetchData();
        const impressions = new ProductsBuilder().createForLandingImpressions(this.landingProducts);
        seoEvents.impressions(impressions);
    },
};
</script>
