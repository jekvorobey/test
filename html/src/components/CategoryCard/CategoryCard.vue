<template>
    <div class="category-card">
        <router-link class="category-card__img" :to="url">
            <img class="blur-up lazyload" :data-src="image" alt="" />
        </router-link>
        {{ name }}
    </div>
</template>

<script>
import './CategoryCard.css';

export default {
    name: 'category-card',

    props: {
        categoryId: {
            type: [Number, String],
        },

        name: {
            type: String,
        },

        image: {
            type: String,
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

