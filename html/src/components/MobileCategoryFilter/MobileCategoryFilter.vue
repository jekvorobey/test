<template>
    <div class="mobile-category-filter">
        <transition-group tag="ul" name="fade-in" appear>
            <li v-if="selectedCategories.length > 0" key="back" class="container mobile-category-filter__item">
                <v-link class="mobile-category-filter__back-button" tag="button" @click="back">
                    <v-svg name="arrow-small" width="24" height="24" />
                    Назад
                </v-link>
            </li>

            <li v-for="category in currentCategories" :key="category.id" class="container mobile-category-filter__item">
                <v-link :to="category.url" class="mobile-category-filter__item-link">
                    {{ category.name }}
                </v-link>
                <v-link
                    v-if="Array.isArray(category.items) && category.items.length > 0"
                    class="mobile-category-filter__item-button"
                    tag="button"
                    @click="selectCategory(category)"
                >
                    <v-svg name="arrow-down" width="24" height="24" />
                </v-link>
            </li>
        </transition-group>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { NAME as CATALOG_MODULE } from '@store/modules/Catalog';
import { ACTIVE_CATEGORY } from '@store/modules/Catalog/getters';

import './MobileCategoryFilter.css';
import { generateCategoryUrl } from '@util/catalog';
import { productGroupTypes } from '@enums/product';

import VLink from '@controls/VLink/VLink.vue';

export default {
    name: 'mobile-category-filter',

    components: {
        VLink,
    },

    props: {
        categories: {
            type: Array,
            required: true,
        },

        productGroupType: {
            type: String,
            default: productGroupTypes.CATALOG,
        },

        productEntityCode: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            selectedCategories: [],
        };
    },

    computed: {
        ...mapGetters(CATALOG_MODULE, {
            ACTIVE_CATEGORY,
        }),

        selectedCategory() {
            return this.selectedCategories.length > 0
                ? this.selectedCategories[this.selectedCategories.length - 1]
                : null;
        },

        currentCategories() {
            const categories = this.selectedCategory ? this.selectedCategory.items : this.categories;

            if (!categories) {
                return [];
            }

            return categories.map((c) => ({
                ...c,
                url: generateCategoryUrl(
                    this.productGroupType,
                    this.productEntityCode.length > 0 ? this.productEntityCode : null,
                    c.code
                ),
            }));
        },
    },

    methods: {
        selectCategory(category) {
            this.selectedCategories.push(category);
        },

        back() {
            if (this.selectedCategories.length > 0) this.selectedCategories.pop();
            else this.showCategories = false;
        },
    },
};
</script>
