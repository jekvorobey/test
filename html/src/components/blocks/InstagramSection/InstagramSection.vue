<template>
    <section class="section">
        <div class="container instagram-section">
            <frisbuy-product-container v-bind="$props" />
        </div>
    </section>
</template>

<script>
import FrisbuyProductContainer from '@components/FrisbuyProductContainer/FrisbuyProductContainer.vue';
import './InstagramSection.css';

export default {
    name: 'instagram-section',

    props: {
        id: {
            type: String,
            default: 'frisbuy-widget',
        },

        script: {
            type: String,
        },
    },

    components: {
        FrisbuyProductContainer,
    },
};
</script>
