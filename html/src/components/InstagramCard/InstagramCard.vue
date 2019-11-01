<template>
    <div class="instagram-card">
        <div class="instagram-card__img">
            <v-picture :image="image" />
        </div>
    </div>
</template>

<script>
import VPicture from '../controls/VPicture/VPicture.vue';
import './InstagramCard.css';

export default {
    name: 'instagram-card',

    components: {
        VPicture,
    },

    props: {
        instagramCardId: {
            type: [Number, String],
        },

        image: {
            type: [Object, String],
        },
    },
};
</script>

