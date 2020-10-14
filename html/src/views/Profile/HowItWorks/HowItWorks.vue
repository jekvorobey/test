<template>
    <section class="section how-it-works-view">
        <h2 class="how-it-works-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>

        <v-accordion
            class="how-it-works-view__accordion"
            key-field="id"
            :items="topics"
            :item-expanded="(item) => item.isExpanded && !item.isDisabled"
            :item-toggled="(item) => (item.isExpanded = !item.isExpanded)"
            :is-single="false"
        >
            <template v-slot:content="{ item, index }">
                <div class="container container--tablet-lg how-it-works-view__accordion-content">
                    <v-html
                        v-if="item.description"
                        class="how-it-works-view__accordion-desc"
                        v-html="item.description"
                    />
                    <img class="how-it-works-view__accordion-img" :src="mockImg1" v-if="item.img" />
                    <div class="how-it-works-view__accordion-links" v-if="index === 0">
                        <v-link class="how-it-works-view__accordion-link" :to="{ name: 'Preferences' }">
                            Личные предпочтения&nbsp;&nbsp;
                            <v-svg modifier="icon--rotate-deg270" name="arrow-small" width="24" height="24" />
                        </v-link>
                        <v-link class="how-it-works-view__accordion-link" :to="{ name: 'ProPreferences' }">
                            Профессиональные предпочтения&nbsp;&nbsp;
                            <v-svg modifier="icon--rotate-deg270" name="arrow-small" width="24" height="24" />
                        </v-link>
                    </div>
                    <div class="how-it-works-view__accordion-links" v-if="index === 1">
                        <v-link class="how-it-works-view__accordion-link" :to="{ name: 'Promopage' }">
                            Моя промостраница&nbsp;&nbsp;
                            <v-svg modifier="icon--rotate-deg270" name="arrow-small" width="24" height="24" />
                        </v-link>
                    </div>
                    <div class="how-it-works-view__accordion-links" v-if="index === 2">
                        <v-link class="how-it-works-view__accordion-link" :to="{ name: 'Promocodes' }">
                            Мои промокоды&nbsp;&nbsp;
                            <v-svg modifier="icon--rotate-deg270" name="arrow-small" width="24" height="24" />
                        </v-link>
                    </div>
                </div>
            </template>
        </v-accordion>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VHtml from '@controls/VHtml/VHtml.vue';
import VAccordion from '@controls/VAccordion/VAccordion.vue';

import mockImg1 from '@images/mock/howItWorks1.png';
import '@images/sprites/arrow-small.svg';
import './HowItWorks.css';

export default {
    name: 'how-it-works',

    components: {
        VSvg,
        VLink,
        VHtml,
        VAccordion,
    },

    data() {
        return {
            mockImg1,
            topics: [
                {
                    id: 1,
                    title: 'Настраивайте свои предпочтения',
                    description: `Мы понимаем, что у современного профессионала нет свободного времени для отслеживания актуальных предложений. Настройте свои личные и профессиональные предпочтения по брендам и категориям товаров, а мы поможем выбрать самое лучшее и необходимое.`,
                    image: mockImg1,
                    isExpanded: true,
                },
                {
                    id: 2,
                    title: 'Создайте промостраницу для продвижения любимых товаров',
                },
                {
                    id: 3,
                    title: 'Делитесь промокодами и специальными товарными предложениями',
                },
            ],
        };
    },
};
</script>
