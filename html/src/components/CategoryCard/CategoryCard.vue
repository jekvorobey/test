<template>
    <div class="category-card">
        <router-link class="category-card__img" :to="url">
            <v-picture :image="image" :alt="name" />
        </router-link>
        {{ name }}
    </div>
</template>

<script>
import VPicture from '../controls/VPicture/VPicture.vue';
import './CategoryCard.css';

export default {
    name: 'category-card',

    components: {
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

