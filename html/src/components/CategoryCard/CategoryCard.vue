<template>
    <div class="category-card">
        <router-link class="category-card__img" :to="url">
            <v-picture v-if="image" :image="image" :alt="name" />
            <v-svg v-else id="category-card-empty" name="logo" />
        </router-link>
        {{ name }}
    </div>
</template>

<script>
import VSvg from '../controls/VSvg/VSvg.vue';
import VPicture from '../controls/VPicture/VPicture.vue';
import '../../assets/images/sprites/logo.svg';
import './CategoryCard.css';

export default {
    name: 'category-card',

    components: {
        VSvg,
        VPicture,
    },

    props: {
        categoryId: {
            type: [Number, String],
        },

        name: {
            type: String,
        },

        image: {
            type: [Object, String],
        },

        code: {
            type: String,
        },
    },

    computed: {
        url() {
            return this.code ? `/catalog/${this.code}` : `/catalog`;
        },
    },
};
</script>

