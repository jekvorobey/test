<template>
    <section class="section product-view">
        <div class="container">
            <transition-group tag="ol" class="section product-view__breadcrumbs" name="fade-in">
                <li class="product-view__breadcrumbs-item" key="main">
                    <router-link to="/">{{ 'Главная' }}</router-link>
                </li>

                <li class="product-view__breadcrumbs-item" key="all">
                    <router-link to="/catalog">{{ 'Каталог' }}</router-link>
                </li>

                <!-- <li class="product-view__breadcrumbs-item" v-for="category in activeCategories" :key="category.id">
                    <router-link :to="`/catalog/${category.code}`">
                        {{ category.name }}
                    </router-link>
                </li> -->
            </transition-group>
        </div>
        <section class="section">
            <div class="container product-view__grid">
                <div class="product-view__grid-gallery">
                    <div class="product-view__grid-gallery-item" v-for="item in product.media" :key="item.id">
                        <img class="blur-up lazyload" :data-src="item.image" alt=""/>
                    </div>
                </div>
                <div class="product-view__grid-detail" >
                    <div>{{ product.title }}</div>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import productModule, { PRODUCT } from '../../store/modules/Product';
import { } from '../../store/modules/Product/getters';
import { FETCH_PRODUCT_DATA } from '../../store/modules/Product/actions';
import { mapState, mapActions, mapGetters } from 'vuex';
import { $store, $progress, $logger } from '../../services/ServiceLocator';

import _debounce from 'lodash/debounce';
import './Product.css';

export const DISPATCH_FETCH_PRODUCT_DATA = `${productModule.name}/${FETCH_PRODUCT_DATA}`;

export default {
    name: 'product',
    components: {},

    data() {
        return {};
    },

    computed: {
        ...mapGetters(productModule.name, []),
        ...mapState(productModule.name, [ PRODUCT ]),
        ...mapState('route', { code: state => state.params.code }),
    },

    methods: {
        ...mapActions(productModule.name, [FETCH_PRODUCT_DATA]),
    },

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        const {
            params: { code },
        } = to;

        // регистрируем модуль, если такого нет
        const register = !!$store._modulesNamespaceMap[`${productModule.name}/`];
        if (!register)
            $store.registerModule(productModule.name, productModule, {
                preserveState: !!$store.state.product,
            });

        const { code: productCode } = $store.state.product;

        // если все загружено, пропускаем
        if (productCode === code) next();
        else {
            $progress.start();
            $store.dispatch(DISPATCH_FETCH_PRODUCT_DATA, { code })
                .then(() => next(vm => $progress.finish()))
                .catch(() => {
                    $progress.fail();
                    $logger.error(error);
                });
        }
    },

    beforeRouteUpdate(to, from, next) {
        // вызывается, когда маршрут, что рендерит этот компонент, изменился,
        // но этот компонент будет повторно использован в новом маршруте.
        // Например, для маршрута с динамическими параметрами `/foo/:id`, когда мы
        // перемещаемся между `/foo/1` и `/foo/2`, экземпляр того же компонента `Foo`
        // будет использован повторно, и этот хук будет вызван когда это случится.
        // Также имеется доступ в `this` к экземпляру компонента.

        this.debounce_fetchProduct(to, from);
        next();
    },

    beforeMount() {
        this.debounce_fetchProduct = _debounce(async (to, from) => {
            try {
                const { productCode } = this.$store.state.product;
                const {
                    params: { code },
                } = to;

                this.$progress.start();

                if (productCode !== code) await this[FETCH_PRODUCT_DATA]({ code });
                else await Promise.resolve();

                this.$progress.finish();
            } catch (error) {
                $logger.error('debounce_fetchProduct', error);
                this.$progress.fail();
            }
        }, 500);
    },
};
</script>
