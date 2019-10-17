<template>
    <div class="instagram-card">
        <div class="instagram-card__img" to="/">
            <img class="blur-up lazyload" :data-src="image" alt="" />
        </div>
    </div>
</template>

<script>
import './InstagramCard.css';

export default {
    name: 'instagram-card',

    props: {
        instagramCardId: {
            type: [Number, String],
        },

        image: {
            type: String,
        },
    },
};
</script>

