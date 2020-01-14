<template>
    <section class="section guide-details-view">
        <v-link class="guide-details-view__back-link" :to="backUrl">
            <v-svg modifier="icon--rotate-deg90" name="arrow-small" width="24" height="24" />&nbsp;Назад ко всем гайдам
        </v-link>
        <h2 class="guide-details-view__hl">Шампуни и кондиционеры Aveda для вьющихся волос</h2>

        <ul class="guide-details-view__list">
            <li class="guide-details-view__list-item" v-for="{ product: item, desc } in guides" :key="item.id">
                <catalog-product-card
                    class="guide-details-view__list-card"
                    :product-id="item.id"
                    :name="item.name"
                    :type="item.type"
                    :href="`/catalog/${item.categoryCodes[item.categoryCodes.length - 1]}/${item.code}`"
                    :image="item.image"
                    :price="item.price"
                    :old-price="item.oldPrice"
                    :tags="item.tags"
                    :rating="item.rating"
                />
                <v-html class="guide-details-view__list-desc" v-html="desc" />
            </li>
        </ul>
    </section>
</template>

<script>
import VSvg from '../../../components/controls/VSvg/VSvg.vue';
import VLink from '../../../components/controls/VLink/VLink.vue';
import VHtml from '../../../components/controls/VHtml/VHtml.vue';

import CatalogProductCard from '../../../components/CatalogProductCard/CatalogProductCard.vue';

import { mapState, mapActions } from 'vuex';
import { LOCALE } from '../../../store';

import { NAME as PROFILE_MODULE, BREADCRUMBS } from '../../../store/modules/Profile';
import { UPDATE_BREADCRUMB } from '../../../store/modules/Profile/actions';

import '../../../assets/images/sprites/arrow-small.svg';
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
                    desc: `<p><b>ЧТО</b> Шампунь для вьющихся волос, подчеркивает текстуру натуральных кудрей. Подходит для ежедневного применения.</p>
                    <p><b>ПРЕИМУЩЕСТВА </b> Гидролизованный протеин сои поддерживает и выделяет натуральный завиток.</p>
                    <p><b>ЧЕГО ОЖИДАТЬ </b> Шампунь с кремовой текстурой. Аромат лайма, лимона, бергамота.</p>`,
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
                    desc: `<p><b>ЧТО</b> Шампунь для вьющихся волос, подчеркивает текстуру натуральных кудрей. Подходит для ежедневного применения.</p>
                    <p><b>ПРЕИМУЩЕСТВА </b> Гидролизованный протеин сои поддерживает и выделяет натуральный завиток.</p>
                    <p><b>ЧЕГО ОЖИДАТЬ </b> Шампунь с кремовой текстурой. Аромат лайма, лимона, бергамота.</p>`,
                },
            ],
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState('route', {
            guideId: state => state.params && state.params.guideId,
        }),

        backUrl() {
            return { name: 'Guides' };
        },
    },

    methods: {
        ...mapActions(PROFILE_MODULE, [UPDATE_BREADCRUMB]),
    },

    beforeRouteEnter(to, from, next) {
        const { name, params } = to;
        next(vm => {
            vm[UPDATE_BREADCRUMB]([
                { name: vm.$t('profile.routes.Guides'), to: { name: 'Guides' } },
                { name: 'ШАМПУНИ И КОНДИЦИОНЕРЫ AVEDA ДЛЯ ВЬЮЩИХСЯ ВОЛОС', to: { name, params } },
            ]);
        });
    },

    beforeRouteUpdate(to, from, next) {
        const { name, params } = to;

        this[UPDATE_BREADCRUMB]([
            { name: vm.$t('profile.routes.Guides'), to: { name: 'Guides' } },
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
