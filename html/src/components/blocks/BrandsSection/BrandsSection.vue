<template>
    <section class="section brands-section">
        <div class="container">
            <h2 class="landing-view__section-hl brands-section__hl">
                {{ titleText }}
            </h2>
            <popular-brands
                class="brands-section__list"
                :items="items"
                :popular-count="popularCount"
                :rest-count="restCount"
                :btn-text="btnText"
            />
        </div>
    </section>
</template>

<script>
import PopularBrands from '../../PopularBrands/PopularBrands.vue';
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

        btnText: {
            type: String,
        },
    },
};
</script>