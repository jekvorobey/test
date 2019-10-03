<template>
    <div class="category-card">
        <router-link class="category-card__img" to="/">
            <img class="blur-up lazyload" :data-src="image" alt="" />
        </router-link>
        {{ name }}
    </div>
</template>

<script>
import './CategoryCard.css';

export default {
    name: 'category-card',

    components: {},

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
    },
};
</script>

