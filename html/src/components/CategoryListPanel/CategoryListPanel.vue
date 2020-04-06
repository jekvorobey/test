<template>
    <general-popup-panel popover-class="tooltip--white category-list-panel" trigger="hover" :disabled="isTabletLg || !subcategories.length">
        <slot />
        <template v-slot:body>
            <ul class="category-list-panel__list">
                <li v-for="item in subcategories" :key="item.id" class="category-list-panel__item">
                    <router-link class="category-list-panel__link" :to="item.href">
                        {{item.name}}
                    </router-link>
                </li>
            </ul>
        </template>
    </general-popup-panel>
</template>

<script>
import GeneralPopupPanel from '@components/GeneralPopupPanel/GeneralPopupPanel.vue';

import { generateCategoryUrl } from '@util/catalog';
import { productGroupTypes } from '@enums/product';

import './CategoryListPanel.css';

export default {
    name: 'category-list-panel',

    components: {
        GeneralPopupPanel,
    },

    computed: {
        isTabletLg() {
            return this.$mq.tabletLg;
        },

        subcategories() {
            return this.items.map(item => {
                return {
                    ...item,
                    href: generateCategoryUrl(productGroupTypes.CATALOG, null, item.code),
                };
            })
        },
    },

    props: {
        items: {
            type: Array,
            default() {
                return [];
            },
        }
    },
};
</script>
