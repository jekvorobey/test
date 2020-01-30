<template>
    <section class="section brands-view">
        <div class="container">
            <breadcrumbs class="brands-view__breadcrumbs">
                <breadcrumb-item key="main" to="/">
                    Главная
                </breadcrumb-item>
                <breadcrumb-item key="brands" :to="{ path: $route.path }">
                    Бренды
                </breadcrumb-item>
            </breadcrumbs>
        </div>

        <categories-section class="brands-view__categories" :categories="categories" />

        <separator-section class="brands-view__separator" />

        <section class="section brands-view__section">
            <div class="container">
                <h1 class="brands-view__section-hl">Бренды</h1>
                <group-list class="brands-view__brands" :items="brandsCatalog" :columns="columns" />
            </div>
        </section>
    </section>
</template>

<script>
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '../../components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';

import GroupList from '../../components/GroupList/GroupList.vue';
import SeparatorSection from '../../components/blocks/SeparatorSection/SeparatorSection.vue';
import CategoriesSection from '../../components/blocks/CategoriesSection/CategoriesSection.vue';

import { $store, $progress } from '../../services/ServiceLocator';

import { mapState, mapGetters } from 'vuex';
import { CATEGORIES } from '../../store';

import brandModule, { NAME as BRAND_MODULE, ITEMS } from '../../store/modules/Brand';
import { FETCH_BRANDS_DATA, SET_LOAD } from '../../store/modules/Brand/actions';
import { BRANDS_CATALOG } from '../../store/modules/Brand/getters';

import { registerModuleIfNotExists } from '../../util/store';
import './Brands.css';

export default {
    name: 'brands',

    components: {
        Breadcrumbs,
        BreadcrumbItem,

        GroupList,
        SeparatorSection,
        CategoriesSection,
    },

    computed: {
        ...mapState([CATEGORIES]),
        ...mapGetters(BRAND_MODULE, [BRANDS_CATALOG]),

        columns() {
            if (this.isTablet) return 2;
            return this.isTabletLg ? 3 : 6;
        },

        isTablet() {
            return this.$mq.tablet;
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        // регистрируем модуль, если такого нет
        registerModuleIfNotExists($store, BRAND_MODULE, brandModule);
        const { load } = $store.state[BRAND_MODULE];

        // если все загружено, пропускаем
        if (load) next();
        else {
            $progress.start();
            $store
                .dispatch(`${BRAND_MODULE}/${FETCH_BRANDS_DATA}`)
                .then(() =>
                    next(vm => {
                        $progress.finish();
                    })
                )
                .catch(error => {
                    next(vm => {
                        $progress.fail();
                        $progress.finish();
                    });
                });
        }
    },
};
</script>
