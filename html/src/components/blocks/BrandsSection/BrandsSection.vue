<template>
    <section class="section brands-section">
        <div class="container">
            <h2 class="brands-section__hl">
                {{ titleText }}
            </h2>
            <popular-brands class="brands-section__list" :items="items" />
        </div>
    </section>
</template>

<script>
import PopularBrands from '@components/PopularBrands/PopularBrands.vue';
import './BrandsSection.css';

export default {
    name: 'brands-section',

    components: {
        PopularBrands,
    },

    props: {
        titleText: {
            type: String,
            default: 'Title',
        },

        items: {
            type: Array,
        },

        popularCount: {
            type: Number,
        },

        restCount: {
            type: Number,
        },
    },
};
</script>