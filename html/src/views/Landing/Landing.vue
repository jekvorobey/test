<template>
    <section class="section landing-view">
        <div class="container">
            <ul class="landing-view__categories">
                <li :key="link.id" v-for="link in categoryLinks">
                    <router-link :to="link.to">{{ link.title }}</router-link>
                </li>
            </ul>

            <div class="landing-view__banners">
                <div class="landing-view__banners-left">
                    <div class="landing-view__main-banner">
                        <img class="lazyload" data-src="https://via.placeholder.com/150x150" />
                    </div>
                    <div class="landing-view__main-banner">
                        <img class="lazyload" data-src="https://via.placeholder.com/150x150" />
                    </div>
                </div>
                <div class="landing-view__banners-right">слайдер с баннерами</div>
            </div>

            <div class="landing-view__category-cards">
                карточки категорий
            </div>

            <section class="section landing-view__products">
                <h2 class="landing-view____products-hl">Новинки</h2>
                <router-link class="landing-view__products-link" to="/">Смотреть все</router-link>
            </section>

            <div class="landing-view__products">
                Слайдер с товарами
            </div>

            <div class="landing-view__category-banners">
                <div class="landing-view__category-banner">
                    <img class="lazyload" data-src="https://via.placeholder.com/150x150" />
                </div>
                <div class="landing-view__category-banner">
                    <img class="lazyload" data-src="https://via.placeholder.com/150x150" />
                </div>
                <div class="landing-view__category-banner">
                    <img class="lazyload" data-src="https://via.placeholder.com/150x150" />
                </div>
            </div>

            <div class="landing-view__products">
                Слайдер с товарами
            </div>

            <div class="landing-view__brands-slider">
                Слайдер с брендами
            </div>

            <div class="landing-view__instagram">
                Панель с инстаграмом
            </div>
        </div>
    </section>
</template>

<script>
import { $store, $progress } from '../../services/ServiceLocator';

import './Landing.css';

export default {
    name: 'landing',
    components: {},
    metaInfo: {
        title: 'landing',
        titleTemplate: '%s - Welcome!',
        htmlAttrs: {
            lang: 'ru',
        },
    },
    data() {
        return {
            categoryLinks: [
                {
                    id: 1,
                    title: 'Уход за волосами',
                    to: '/',
                },
                {
                    id: 2,
                    title: 'Для лица и тела',
                    to: '/',
                },
                {
                    id: 3,
                    title: 'Для рук и ног',
                    to: '/',
                },
                {
                    id: 4,
                    title: 'Макияж',
                    to: '/',
                },
                {
                    id: 5,
                    title: 'Для ногтей',
                    to: '/',
                },
                {
                    id: 6,
                    title: 'Инструменты',
                    to: '/',
                },
                {
                    id: 7,
                    title: 'Аксессуары',
                    to: '/',
                },
                {
                    id: 8,
                    title: 'Мужская коллекция',
                    to: '/',
                },
            ],
        };
    },

    computed: {},

    methods: {},

    beforeMount() {},

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        if (process.env.VUE_ENV === 'server') {
            next();
            return;
        }

        // const register = !!$store._modulesNamespaceMap[`${itemListModule.name}/`];
        // if (!register)
        //     $store.registerModule(itemListModule.name, itemListModule, {
        //         preserveState: !!$store.state.item_list,
        //     });
        // $progress.start();
        // if (!$store.state.item_list.items[to.params.id]) {
        //     $store.dispatch(`${itemListModule.name}/FETCH_ITEMS`, { ids: [to.params.id] }).then(() => {
        //         next(vm => $progress.finish());
        //     });
        // } else next(vm => $progress.finish());
        next();
    },

    beforeRouteUpdate(to, from, next) {
        // вызывается когда маршрут, что рендерит этот компонент изменился,
        // но этот компонент будет повторно использован в новом маршруте.
        // Например, для маршрута с динамическими параметрами `/foo/:id`, когда мы
        // перемещаемся между `/foo/1` и `/foo/2`, экземпляр того же компонента `Foo`
        // будет использован повторно, и этот хук будет вызван когда это случится.
        // Также имеется доступ в `this` к экземпляру компонента.

        // if (!this.$store.state.item_list.items[to.params.id]) {
        //     this.$progress.start();
        //     this.fetchItems().then(() => {
        //         this.$progress.finish();
        //         next();
        //     });
        // } else next();
        next();
    },

    // Server-side only
    // This will be called by the server renderer automatically
    serverPrefetch() {
        // return the Promise from the action
        // so that the component waits before rendering
        //this.$store.registerModule(itemListModule.name, itemListModule);
        return Promise.resolve();
    },
};
</script>
