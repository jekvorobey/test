<template>
    <section class="section categories-section">
        <div class="container categories-section__container">
            <div class="categories-section__list">
                <category-card
                    class="categories-section__item"
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