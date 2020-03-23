<template>
    <section class="section guides-view">
        <h2 class="guides-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>

        <div class="container container--tablet-lg guides-view__container">
            <ul class="guides-view__list">
                <guide-card
                    class="guides-view__list-item"
                    v-for="guide in guides"
                    :key="guide.id"
                    :image="guide.image"
                    :title="guide.title"
                    @click.native="onOpenGuide(guide.code)"
                />
            </ul>
        </div>
    </section>
</template>

<script>
import GuideCard from '@components/GuideCard/GuideCard.vue';

import guideImg1 from '@images/mock/guide1.png';
import guideImg2 from '@images/mock/guide2.png';
import './Guides.css';

export default {
    name: 'guides',

    components: {
        GuideCard,
    },

    data() {
        return {
            guides: [
                {
                    id: 1,
                    image: guideImg1,
                    code: 'shampuni-i-kondicionery',
                    title: 'Шампуни и кондиционеры Aveda для вьющихся волос',
                },
                {
                    id: 2,
                    image: guideImg2,
                    code: 'masky-r-co',
                    title: 'Маски R+Co: секрет увлажнения',
                },
            ],
        };
    },

    methods: {
        onOpenGuide(id) {
            this.$router.push({ name: 'GuideDetails', params: { guideId: id } });
        },
    },
};
</script>
