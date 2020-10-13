<template>
    <li class="breadcrumb-item">
        <self-router-link class="breadcrumb-item__link" :to="to" :disabled="disabled" same-disabled>
            <slot />
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
};
</script>
