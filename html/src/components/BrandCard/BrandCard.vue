<template>
    <div class="brand-card">
        <router-link class="brand-card__img" to="/">
            <img class="blur-up lazyload" :data-src="image" :alt="name" />
        </router-link>
    </div>
</template>

<script>
import './BrandCard.css';

export default {
    name: 'brand-card',

    props: {
        brandId: {
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

