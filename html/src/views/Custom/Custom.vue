<template>
    <section class="section custom-view">
        <div class="container custom-view__container">
            <div class="custom-view__body">
                <div class="custom-view__breadcrumbs">
                    <component
                        v-for="renderItem in pageData.breadcrumbs"
                        :key="renderItem.id"
                        :is="renderItem.component"
                        v-bind="renderItem.data"
                    />
                </div>

                <div
                    class="custom-view__menu"
                    :class="{ 'custom-view__menu--hidden': !pageData.menu || pageData.menu.length === 0 }"
                >
                    <component
                        v-for="renderItem in pageData.menu"
                        :key="renderItem.id"
                        :is="renderItem.component"
                        v-bind="renderItem.data"
                    />
                </div>

                <div class="custom-view__main">
                    <component
                        v-for="renderItem in pageData.main"
                        :key="renderItem.id"
                        :is="renderItem.component"
                        v-bind="renderItem.data"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Vue from 'vue';

import BreadcrumbsWidget from '@components/widgets/BreadcrumbsWidget/BreadcrumbsWidget.vue';
import NavWidget from '@components/widgets/NavWidget/NavWidget.vue';

import SectionWidget from '@components/widgets/SectionWidget/SectionWidget.vue';
import ContainerWidget from '@components/widgets/ContainerWidget/ContainerWidget.vue';

import SimpleTextWidget from '@components/widgets/SimpleTextWidget/SimpleTextWidget.vue';
import HtmlTextWidget from '@components/widgets/HtmlTextWidget/HtmlTextWidget.vue';
import PictureWidget from '@components/widgets/PictureWidget/PictureWidget.vue';
import SliderWidget from '@components/widgets/SliderWidget/SliderWidget.vue';
import GridWidget from '@components/widgets/GridWidget/GridWidget.vue';
import ProductCardWidget from '@components/widgets/ProductCardWidget/ProductCardWidget.vue';
import TableWidget from '@components/widgets/TableWidget/TableWidget.vue';

import { mapState, mapActions } from 'vuex';
import { NAME as CUSTOM_MODULE, PAGE_DATA } from '@store/modules/Custom';
import { FETCH_CUSTOM_PAGE_DATA, SET_LOAD_PATH } from '@store/modules/Custom/actions';

import { $store, $progress } from '@services';
import { httpCodes } from '@enums';
import { createNotFoundRoute } from '@util/router';
import './Custom.css';

Vue.component(BreadcrumbsWidget.name, BreadcrumbsWidget);
Vue.component(NavWidget.name, NavWidget);

Vue.component(SectionWidget.name, SectionWidget);
Vue.component(ContainerWidget.name, ContainerWidget);

Vue.component(SimpleTextWidget.name, SimpleTextWidget);
Vue.component(HtmlTextWidget.name, HtmlTextWidget);
Vue.component(PictureWidget.name, PictureWidget);
Vue.component(SliderWidget.name, SliderWidget);
Vue.component(GridWidget.name, GridWidget);
Vue.component(ProductCardWidget.name, ProductCardWidget);
Vue.component(TableWidget.name, TableWidget);

export default {
    name: 'custom',

    computed: {
        ...mapState(CUSTOM_MODULE, [PAGE_DATA]),
    },

    methods: {
        ...mapActions(CUSTOM_MODULE, [FETCH_CUSTOM_PAGE_DATA]),
    },

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        const {
            fullPath,
            params: { pathMatch },
        } = to;

        const { loadPath } = $store.state[CUSTOM_MODULE];

        if (loadPath === fullPath) next();
        else {
            $progress.start();
            $store
                .dispatch(`${CUSTOM_MODULE}/${FETCH_CUSTOM_PAGE_DATA}`, pathMatch)
                .then(() => {
                    $store.dispatch(`${CUSTOM_MODULE}/${SET_LOAD_PATH}`, fullPath);
                    $progress.finish();
                    next();
                })
                .catch(() => {
                    $progress.fail();
                    next(createNotFoundRoute(to));
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

        try {
            const {
                params: { pathMatch },
            } = to;

            this.$progress.start();
            await this[FETCH_CUSTOM_PAGE_DATA](pathMatch);
            this.$progress.finish();
            next();
        } catch (error) {
            this.$progress.fail();
            next(createNotFoundRoute(to));
        }
    },
};
</script>
