<template>
    <general-popup-panel
        popover-class="tooltip--white category-list-panel"
        placement="bottom-start"
        trigger="hover"
        :disabled="isTabletLg || !subcategories.length"
    >
        <slot />
        <template v-slot:body>
            <ul class="category-list-panel__list">
                <li class="category-list-panel__item" v-for="item in subcategories" :key="item.id">
                    <router-link class="category-list-panel__item-link" :to="item.href">
                        <span class="category-list-panel__item-link-text">{{ item.name }}</span>
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

    props: {
        items: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    computed: {
        isTabletLg() {
            return this.$mq.tabletLg;
        },

        subcategories() {
            return this.items.map((item) => {
                return {
                    ...item,
                    href: generateCategoryUrl(productGroupTypes.CATALOG, null, item.code),
                };
            });
        },
    },
};
</script>
