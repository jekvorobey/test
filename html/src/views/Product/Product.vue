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
            <div class="container product-view__header">
                <v-sticky class="product-view__header-sticky">
                    <template v-slot:sticky>
                        <div class="product-view__header-gallery">
                            <div
                                class="product-view__header-gallery-item"
                                :class="{ [`product-view__header-gallery-item--${item.type}`]: item.type }"
                                v-for="item in product.media"
                                :key="item.id"
                            >
                                <img :src="item.image" alt="" />
                            </div>
                        </div>
                    </template>
                </v-sticky>
                <div class="product-view__header-detail">
                    <h1 class="product-view__header-detail-hl">
                        {{ product.title }}
                    </h1>
                    <div class="product-view__header-detail-info">
                        <v-rating class="product-view__header-detail-info-rating" :value="product.rating">
                            <template v-slot:activeLabel>
                                <v-svg name="star-small" width="12" height="12" />
                            </template>
                            <template v-slot:inactiveLabel>
                                <v-svg name="star-empty-small" width="12" height="12" />
                            </template>
                        </v-rating>
                        <div class="text-grey product-view__header-detail-info-review">
                            {{ $t('product.review', { n: product.reviewsCount }) }}
                        </div>
                        <div class="text-grey product-view__header-detail-info-code">
                            {{ $t('product.vendorCode', { code: product.vendorCode }) }}
                        </div>
                    </div>

                    <div class="product-view__header-detail-section product-view__header-detail-options">
                        <div class="product-view__header-detail-options-selected">
                            <div>{{ product.option.title }}</div>
                            <div class="text-grey text-sm">16 оттенков</div>
                        </div>
                        <div class="product-view__header-detail-options-list">
                            <div
                                class="product-view__header-detail-options-item"
                                :class="{
                                    'product-view__header-detail-options-item--selected':
                                        option.value === product.option.value,
                                }"
                                v-for="option in product.options"
                                :key="option.id"
                            >
                                <div
                                    class="product-view__header-detail-options-item-square"
                                    :style="[{ backgroundColor: option.value, outlineColor: option.value }]"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="product-view__header-detail-section">
                        <div class="product-view__header-detail-price-panel">
                            <div class="product-view__header-detail-price-panel-prices">
                                <div class="text-bold product-view__header-detail-price-panel-current">
                                    {{ product.price }}₽
                                </div>
                                <div class="text-grey text-strike product-view__header-detail-price-panel-old">
                                    {{ product.oldPrice }}₽
                                </div>
                            </div>
                            <div class="text-grey product-view__header-detail-price-panel-bonus">
                                +{{ $t('product.bonus', { n: product.bonus }) }}
                            </div>
                        </div>
                        <div class="product-view__header-detail-control-panel">
                            <v-button class="product-view__header-detail-control-panel-btn">
                                Добавить в корзину
                            </v-button>
                            <v-link class="product-view__header-detail-control-panel-wishlist">
                                <v-svg id="product-wishlist" name="wishlist-middle" width="20" height="18" />
                                &nbsp;В избранное
                            </v-link>
                        </div>
                    </div>

                    <div class="product-view__header-detail-section">
                        <p>Получить в г. Москва</p>
                        <p>Экспресс доставка курьером — 550 ₽, сегодня, 21 июня</p>
                        <p>Доставка курьером — 350 ₽, завтра, 22 июня</p>
                        <p>Из пунктов выдачи или постаматов — бесплатно, 23 июня</p>
                    </div>

                    <div class="product-view__header-detail-section">
                        <p class="text-bold">
                            Описание и характеристики
                        </p>
                        <p>
                            Двадцать три насыщенных, ярких оттенка помады воплощают в себе современную интерпретацию
                            классики от Тома Форда. Редкое экзотическое масло муру-муру из Бразилии и масло цветков
                            ромашки создают кремовую текстуру и обеспечивают...
                        </p>
                        <v-link>Подробнее</v-link>
                    </div>
                    <div>
                        <span><img :src="mockImg" /><v-link>&nbsp;&nbsp;&nbsp;На страницу бренда</v-link></span>
                    </div>
                </div>
            </div>
        </section>
        <section class="section product-view__section">
            <div class="container product-view__socials">
                <div class="product-view__socials-inner">Подписаться</div>
            </div>
        </section>
        <section class="section product-view__section">
            <div class="container product-view__profitable">
                <h2 class="product-view__section-hl">Выгодный комплект</h2>
                <div class="product-view__profitable-grid">
                    <ul class="product-view__profitable-list">
                        <li
                            class="product-view__profitable-list-item"
                            v-for="item in product.profitable.items"
                            :key="item.id"
                        >
                            <catalog-product-card
                                class="product-view__profitable-card"
                                :product-id="item.id"
                                :name="item.name"
                                :href="'/'"
                                :image="item.image"
                                :price="item.price"
                                :old-price="item.oldPrice"
                                :tags="item.tags"
                                :rating="item.rating"
                            />
                        </li>
                    </ul>
                    <div class="product-view__profitable-total" />
                    <div class="product-view__profitable-price-panel">
                        <div class="product-view__profitable-price-panel-prices">
                            <div class="text-bold product-view__profitable-price-panel-price">
                                {{ product.profitable.price }}&nbsp;₽
                            </div>
                            <div class="text-grey text-strike product-view__profitable-price-panel-old">
                                {{ product.profitable.oldPrice }}&nbsp;₽
                            </div>
                        </div>
                        <div class="text-grey product-view__profitable-price-panel-profit">
                            Вы сэкономите&nbsp;{{ product.profitable.oldPrice - product.profitable.price }}&nbsp;₽
                        </div>
                        <v-button class="product-view__profitable-price-panel-btn">Добавить в корзину</v-button>
                    </div>
                </div>
            </div>
        </section>
        <section v-if="product.description" class="section product-view__section product-view__info">
            <div class="container product-view__info-container">
                <div class="product-view__info-header">
                    <h2 class="product-view__section-hl">Описание</h2>
                    <v-html class="product-view__info-text" v-html="product.description.content" />
                </div>
                <div class="product-view__info-media">
                    <img class="blur-up lazyload" :data-src="product.description.image" />
                </div>
            </div>
        </section>
        <section v-if="product.howto" class="section product-view__info">
            <div class="container product-view__info-container">
                <div class="product-view__info-header">
                    <h2 class="product-view__section-hl">Способ применения</h2>
                    <v-html class="product-view__info-text" v-html="product.howto.content" />
                </div>
                <div class="product-view__info-media">
                    <img class="blur-up lazyload" :data-src="product.howto.image" />
                </div>
            </div>
        </section>

        <section v-if="product.howto" class="section product-view__section product-view__characteristics">
            <div class="container">
                <h2 class="product-view__section-hl">Характеристики</h2>
                <ul class="product-view__characteristics-list">
                    <li
                        class="product-view__characteristics-item"
                        v-for="item in product.characteristics"
                        :key="item.id"
                    >
                        <div class="product-view__characteristics-item-title">{{ item.title }}</div>
                        <div class="product-view__characteristics-item-value">{{ item.value }}</div>
                    </li>
                </ul>
            </div>
        </section>

        <section v-if="product.masterClasses" class="section product-view__masterclass">
            <div class="container">
                <h2 class="product-view__section-hl">Мастер-классы с этим продуктом</h2>
                <v-button class="btn--outline product-view__section-link">
                    {{ $t('product.showAll') }}
                </v-button>
                <ul class="product-view__masterclass-list">
                    <li class="product-view__masterclass-item" v-for="item in product.masterClasses" :key="item.id">
                        <img class="blur-up lazyload" :data-src="item.image" />
                    </li>
                </ul>
            </div>
        </section>

        <section class="section product-view__section">
            <div class="container product-view__reviews">
                <div class="product-view__reviews-inner">
                    <div class="product-view__reviews-header">
                        <h2 class="product-view__section-hl product-view__reviews-header-hl">
                            Отзывы<span class="text-grey product-view__reviews-header-hl-count">12</span>
                        </h2>
                        <div class="product-view__section-header-rating">
                            Средняя оценка&nbsp;
                            <span class="product-view__reviews-header-rating-count">
                                {{ product.reviews.middleRating }}
                            </span>
                            <v-rating :value="product.reviews.middleRating">
                                <template v-slot:activeLabel>
                                    <v-svg name="star-small" width="12" height="12" />
                                </template>
                                <template v-slot:inactiveLabel>
                                    <v-svg name="star-empty-small" width="12" height="12" />
                                </template>
                            </v-rating>
                        </div>
                        <div class="product-view__reviews-header-sort">
                            Сначала новые <v-svg name="arrow-down" width="12" height="12" />
                        </div>
                    </div>

                    <ul class="product-view__reviews-list">
                        <product-review-card
                            class="product-view__reviews-list-item"
                            tag="li"
                            v-for="item in product.reviews.items"
                            :key="item.id"
                            v-bind="item"
                        />
                    </ul>
                </div>
                <v-button class="btn--outline product-view__section-link product-view__reviews-link">
                    {{ $t('product.makeReview') }}
                </v-button>
            </div>
        </section>
    </section>
</template>

<script>
import VSvg from '../../components/controls/VSvg/VSvg.vue';
import VLink from '../../components/controls/VLink/VLink.vue';
import VButton from '../../components/controls/VButton/VButton.vue';
import VRating from '../../components/controls/VRating/VRating.vue';
import VSticky from '../../components/controls/VSticky/VSticky.vue';
import VHtml from '../../components/controls/VHtml/VHtml.vue';
import Tag from '../../components/Tag/Tag.vue';

import CatalogProductCard from '../../components/CatalogProductCard/CatalogProductCard.vue';
import CatalogBannerCard from '../../components/CatalogBannerCard/CatalogBannerCard.vue';
import ProductReviewCard from '../../components/ProductReviewCard/ProductReviewCard.vue';

import productModule, { PRODUCT } from '../../store/modules/Product';
import {} from '../../store/modules/Product/getters';
import { FETCH_PRODUCT_DATA } from '../../store/modules/Product/actions';
import { mapState, mapActions, mapGetters } from 'vuex';
import { $store, $progress, $logger } from '../../services/ServiceLocator';

import _debounce from 'lodash/debounce';
import productBrand1 from '../../assets/images/mock/brandProduct1.png';
import '../../assets/images/sprites/star-empty-small.svg';
import '../../assets/images/sprites/star-small.svg';
import '../../assets/images/sprites/wishlist-middle.svg';
import './Product.css';

export const DISPATCH_FETCH_PRODUCT_DATA = `${productModule.name}/${FETCH_PRODUCT_DATA}`;

export default {
    name: 'product',
    components: {
        VSvg,
        VButton,
        VLink,
        VRating,
        VSticky,
        VHtml,

        CatalogProductCard,
        ProductReviewCard,
    },

    data() {
        return {
            mockImg: productBrand1,
        };
    },

    computed: {
        ...mapGetters(productModule.name, []),
        ...mapState(productModule.name, [PRODUCT]),
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

        const { productCode } = $store.state.product;

        // если все загружено, пропускаем
        if (productCode === code) next();
        else {
            $progress.start();
            $store
                .dispatch(DISPATCH_FETCH_PRODUCT_DATA, { code })
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
