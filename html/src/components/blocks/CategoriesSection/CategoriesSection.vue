<template>
    <section class="section">
        <div class="container categories-section">
            <div class="categories-section__grid">
                <category-card
                    class="categories-section__card"
                    v-for="category in categories"
                    :key="category.id"
                    :name="category.name"
                    :image="category.image"
                    :code="category.code"
                />
            </div>
        </div>
    </section>
</template>

<script>
import CategoryCard from '../../../components/CategoryCard/CategoryCard.vue';
import './CategoriesSection.css';

export default {
    name: 'categories-section',

    components: {
        CategoryCard,
    },

    props: {
        categories: {
            type: Array,
            default() {
                return [];
            },
        },
    },
};
</script>