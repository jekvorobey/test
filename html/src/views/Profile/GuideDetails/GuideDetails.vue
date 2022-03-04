<template>
    <section class="section guide-details-view">
        <div class="container container--tablet-lg">
            <v-link class="guide-details-view__back-link" :to="backUrl">
                <v-svg modifier="icon--rotate-deg90" name="arrow-small" width="24" height="24" />&nbsp;Назад ко всем
                гайдам
            </v-link>
            <h2 class="guide-details-view__hl">Шампуни и кондиционеры Aveda для вьющихся волос</h2>
        </div>
        <div class="container container--tablet-lg guide-details-view__container">
            <ul class="guide-details-view__list">
                <li class="guide-details-view__list-item" v-for="{ product: item, desc } in guides" :key="item.id">
                    <catalog-product-card
                        class="guide-details-view__list-card"
                        :offer-id="item.id"
                        :product-id="item.productId"
                        :name="item.name"
                        :type="item.type"
                        :href="`/product/${item.code}`"
                        :image="item.image"
                        :price="item.price"
                        :old-price="item.oldPrice"
                        :badges="item.badges"
                        :rating="item.rating"
                        :is-small="isTablet"
                        :show-buy-btn="item.stock.qty > 0"
                        :freeBuy="item.freeBuy"
                    />
                    <v-html class="container container--tablet guide-details-view__list-desc" v-html="desc" />
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VHtml from '@controls/VHtml/VHtml.vue';

import CatalogProductCard from '@components/CatalogProductCard/CatalogProductCard.vue';

import { mapState, mapActions } from 'vuex';
import { LOCALE } from '@store';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { UPDATE_BREADCRUMB } from '@store/modules/Profile/actions';

import '@images/sprites/arrow-small.svg';
import './GuideDetails.css';

export default {
    name: 'guide-details',

    components: {
        VSvg,
        VLink,
        VHtml,

        CatalogProductCard,
    },

    data() {
        return {
            guides: [
                {
                    id: 1,
                    product: {
                        id: 413,
                        name: 'Фен для волос La Ric, индиго',
                        code: 'fen-dlya-volos-la-ric-indigo',
                        categoryCodes: ['dlya_uhoda_za_kozhey', 'lico', 'uvlazhnenie_i_pitanie'],
                        price: '9 818 ₽',
                        oldPrice: '',
                        tags: [],
                        type: 'product',
                        rating: 5,
                        image: { id: 64, sourceExt: 'jpg' },
                    },
                    desc: `<p><strong>ЧТО</strong> Шампунь для вьющихся волос, подчеркивает текстуру натуральных кудрей. Подходит для ежедневного применения.</p>
                    <p><strong>ПРЕИМУЩЕСТВА </strong> Гидролизованный протеин сои поддерживает и выделяет натуральный завиток.</p>
                    <p><strong>ЧЕГО ОЖИДАТЬ </strong> Шампунь с кремовой текстурой. Аромат лайма, лимона, бергамота.</p>`,
                },
                {
                    id: 2,
                    product: {
                        id: 413,
                        name: 'Фен для волос La Ric, индиго',
                        code: 'fen-dlya-volos-la-ric-indigo',
                        categoryCodes: ['dlya_uhoda_za_kozhey', 'lico', 'uvlazhnenie_i_pitanie'],
                        price: '9 818 ₽',
                        oldPrice: '',
                        tags: [],
                        type: 'product',
                        rating: 5,
                        image: { id: 64, sourceExt: 'jpg' },
                    },
                    desc: `<p><strong>ЧТО</strong> Шампунь для вьющихся волос, подчеркивает текстуру натуральных кудрей. Подходит для ежедневного применения.</p>
                    <p><strong>ПРЕИМУЩЕСТВА </strong> Гидролизованный протеин сои поддерживает и выделяет натуральный завиток.</p>
                    <p><strong>ЧЕГО ОЖИДАТЬ </strong> Шампунь с кремовой текстурой. Аромат лайма, лимона, бергамота.</p>`,
                },
            ],
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState('route', {
            guideId: (state) => state.params && state.params.guideId,
        }),

        backUrl() {
            return { name: 'Guides' };
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        ...mapActions(PROFILE_MODULE, [UPDATE_BREADCRUMB]),
    },

    beforeRouteEnter(to, from, next) {
        const { name, params } = to;
        next((vm) => {
            vm[UPDATE_BREADCRUMB]([
                { name: vm.$t('profile.routes.Guides'), to: { name: 'Guides' } },
                { name: 'ШАМПУНИ И КОНДИЦИОНЕРЫ AVEDA ДЛЯ ВЬЮЩИХСЯ ВОЛОС', to: { name, params } },
            ]);
        });
    },

    beforeRouteUpdate(to, from, next) {
        const { name, params } = to;

        this[UPDATE_BREADCRUMB]([
            { name: this.$t('profile.routes.Guides'), to: { name: 'Guides' } },
            { name: 'ШАМПУНИ И КОНДИЦИОНЕРЫ AVEDA ДЛЯ ВЬЮЩИХСЯ ВОЛОС', to: { name, params } },
        ]);
        next();
    },

    beforeRouteLeave(to, from, next) {
        this[UPDATE_BREADCRUMB]([]);
        next();
    },
};
</script>
