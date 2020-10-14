<template>
    <div class="brand-card">
        <router-link class="brand-card__img" to="/">
            <v-picture :image="image" :alt="name" />
        </router-link>
    </div>
</template>

<script>
import VPicture from '@controls/VPicture/VPicture.vue';
import './BrandCard.css';

export default {
    name: 'brand-card',
    components: {
        VPicture,
    },

    props: {
        brandId: {
            type: [Number, String],
        },

        name: {
            type: String,
        },

        image: {
            type: [Object, String],
        },
    },
};
</script>
