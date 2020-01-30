<template>
    <section class="section sets-view">
        <div class="container">
            <breadcrumbs class="sets-view__breadcrumbs">
                <breadcrumb-item key="main" to="/">
                    Главная
                </breadcrumb-item>
                <breadcrumb-item key="sets" :to="{ path: $route.path }">
                    Подборки товаров
                </breadcrumb-item>
            </breadcrumbs>
        </div>

        <section class="section sets-view__section sets-view__sets">
            <h1 class="container sets-view__section-hl">Подборки товаров</h1>
            <div class="container sets-view__sets-container">
                <transition-group
                    tag="ul"
                    class="sets-view__sets-list"
                    name="list-item"
                    @before-enter="onBeforeEnterItems"
                    @enter="onEnterItems"
                    @after-enter="onAfterEnterItems"
                    @leave="onLeaveItems"
                >
                    <banner-card
                        class="sets-view__sets-list-item"
                        button-text="Смотреть товары"
                        tag="li"
                        v-for="banner in items"
                        :key="banner.id"
                        :image="banner.image"
                        :title="banner.title"
                    />
                </transition-group>

                <div class="sets-view__sets-controls" v-if="pagesCount > 1">
                    <v-button
                        v-if="activePage < pagesCount"
                        class="btn--outline sets-view__sets-controls-btn"
                        @click="onShowMore"
                    >
                        Показать ещё
                    </v-button>

                    <v-pagination :value="activePage" :page-count="pagesCount" @input="onPageChanged" />
                </div>
            </div>
        </section>

        <section class="section sets-view__section sets-view__seo">
            <div class="container sets-view__seo-container">
                <h2 class="sets-view__section-hl sets-view__seo-hl">Блок SEO текста</h2>
                <v-expander class="sets-view__seo-text" :min-height="80" has-mask>
                    Помада L'Oreal Paris Color Riche — это первый матовый тинт для губ с ультранасыщенным цветом,
                    который абсолютно не ощущается на губах. Выбери из 10 модных оттенков те, которые тебе по душе. Эта
                    помада не оставит тебя равнодушной. Экспериментируй и наслаждайся, а Color Riche поможет тебе в
                    этом. Мы заботимся о надёжных поставщиках, качестве товаров и безопасной оплате. А что делать вам?
                    Просто наслаждаться покупками. Для экономии не нужен повод, поэтому мы каждый день даём вам скидки
                    на популярные товары самых разных категорий.

                    <template v-slot:btn="{ isExpanded }">
                        {{ isExpanded ? 'Скрыть' : 'Показать больше' }}
                    </template>
                </v-expander>
            </div>
        </section>
    </section>
</template>

<script>
import VButton from '../../components/controls/VButton/VButton.vue';
import VPagination from '../../components/controls/VPagination/VPagination.vue';
import VExpander from '../../components/VExpander/VExpander.vue';

import BannerCard from '../../components/BannerCard/BannerCard.vue';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '../../components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';

import { $store, $progress } from '../../services/ServiceLocator';

import { mapState, mapGetters } from 'vuex';
import setModule, { NAME as SET_MODULE, ITEMS } from '../../store/modules/Set';
import { FETCH_SETS_DATA, SET_LOAD } from '../../store/modules/Set/actions';

import { registerModuleIfNotExists } from '../../util/store';
import './Sets.css';

const itemAnimationDelayDelta = 100;
let counter = 0;

export default {
    name: 'sets',

    components: {
        VButton,
        VPagination,
        VExpander,

        BannerCard,

        Breadcrumbs,
        BreadcrumbItem,
    },

    data() {
        return {
            activePage: 0,
            pagesCount: 10,
        };
    },

    computed: {
        ...mapState(SET_MODULE, [ITEMS]),

        isTablet() {
            return this.$mq.tablet;
        },
    },

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        // регистрируем модуль, если такого нет
        registerModuleIfNotExists($store, SET_MODULE, setModule);
        const { load } = $store.state[SET_MODULE];

        // если все загружено, пропускаем
        if (load) next();
        else {
            $progress.start();
            $store
                .dispatch(`${SET_MODULE}/${FETCH_SETS_DATA}`)
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

    methods: {
        onShowMore() {
            this.activePage += 1;
        },

        onPageChanged(page) {
            this.activePage = page;
        },

        onBeforeEnterItems(el) {
            el.dataset.index = counter;
            counter += 1;
            el.style.opacity = 0;
        },

        itemAnimation(el, delay) {
            return new Promise((resolve, reject) => {
                try {
                    setTimeout(() => {
                        requestAnimationFrame(() => {
                            el.style.opacity = 1;
                            resolve();
                        });
                    }, delay);
                } catch (error) {
                    reject(error);
                }
            });
        },

        async onEnterItems(el, done) {
            const delay = el.dataset.index * itemAnimationDelayDelta;
            await this.itemAnimation(el, delay);
            done();
        },

        onAfterEnterItems(el) {
            delete el.dataset.index;
            counter = 0;
        },

        onLeaveItems(el, done) {
            requestAnimationFrame(() => {
                el.style.opacity = 0;
                done();
            });
        },
    },
};
</script>
