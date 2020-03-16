<template>
    <li class="guide-card">
        <div class="guide-card__img">
            <v-picture :image="image" />
        </div>
        <div class="guide-card__title">{{ title }}</div>
    </li>
</template>

<script>
import VPicture from '@controls/VPicture/VPicture.vue';
import './GuideCard.css';

export default {
    name: 'guide-card',

    components: {
        VPicture,
    },

    props: {
        title: {
            type: String,
        },

        image: {
            type: [Object, String],
        },
    },
};
</script>
