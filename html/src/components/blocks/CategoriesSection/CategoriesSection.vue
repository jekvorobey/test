<template>
    <section class="section categories-section">
        <div class="container categories-section__container">
            <ul class="categories-section__list">
                <li
                    v-for="category in categories"
                    :key="category.id"
                    class="categories-section__item"
                >
                    <category-list-panel :items="category.items">
                        <category-card
                            class="categories-section__item"
                            :name="category.name"
                            :image="category.image"
                            :code="category.code"
                        />
                    </category-list-panel>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import CategoryCard from '@components/CategoryCard/CategoryCard.vue';
import CategoryListPanel from '@components/CategoryListPanel/CategoryListPanel.vue';

import './CategoriesSection.css';

export default {
    name: 'categories-section',

    components: {
        CategoryCard,
        CategoryListPanel,
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
