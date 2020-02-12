<template>
    <ul class="catalog-product-list-page">
        <component
            class="catalog-product-list-page__item"
            v-for="item in page.items"
            :key="item.id"
            :class="getClass(item.type)"
            :is="getComponent(item.type)"
            :item="item"
        />
    </ul>
</template>

<script>
import './CatalogProductListPage.css';

export default {
    name: 'catalog-product-list-page',

    components: {
        CatalogBannerListCard,
        CatalogProductListCard,
    },

    props: {
        page: {
            type: Object,
            default() {
                return {
                    items: [],
                };
            },
        },
    },

    methods: {
        getComponent(type) {
            switch (type) {
                case catalogItemTypes.PRODUCT:
                    return CatalogProductListCard.name;
                case catalogItemTypes.BANNER:
                    return CatalogBannerListCard.name;
                default:
                    'div';
            }
        },

        getClass(type) {
            return { 'catalog-product-list-page__item--banner': type === catalogItemTypes.BANNER };
        },
    },
};
</script>