<template>
    <li class="breadcrumb-item" v-bind="itemPropSettings.itemListElement">
        <self-router-link
            class="breadcrumb-item__link"
            :to="to"
            :disabled="disabled"
            same-disabled
            v-bind="itemPropSettings.item"
        >
            <span v-bind="itemPropSettings.name">
                <slot />
            </span>
            <meta itemprop="position" :content="position" />
        </self-router-link>
    </li>
</template>
<script>
import SelfRouterLink from '@controls/VLink/SelfRouterLink.vue';
import './BreadcrumbItem.css';

export default {
    name: 'breadcrumb-item',

    components: {
        SelfRouterLink,
    },

    props: {
        to: {
            type: [String, Object],
        },

        disabled: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        microDataKey() {
            return `breadcrumb-${this.to === '/' ? 'home' : this.to}`;
        },

        position() {
            const list = this.$parent.$children;
            let position;
            list.forEach((item, index) => (item.microDataKey === this.microDataKey ? (position = index) : null));
            return position;
        },

        itemPropSettings() {
            return {
                itemListElement: {
                    itemprop: 'itemListElement',
                    itemscope: true,
                    itemtype: 'https://schema.org/ListItem',
                },
                item: {
                    itemprop: 'item',
                },
                name: {
                    itemprop: 'name',
                },
            };
        },
    },
};
</script>
