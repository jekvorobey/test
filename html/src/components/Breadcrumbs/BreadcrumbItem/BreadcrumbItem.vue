<template>
    <li class="breadcrumb-item">
        <span class="breadcrumb-item__link" v-if="disabled">
            <slot />
        </span>
        <router-link class="breadcrumb-item__link" v-else :to="to" :disabled="disabled">
            <slot />
        </router-link>
    </li>
</template>
<script>
import './BreadcrumbItem.css';

export default {
    name: 'breadcrumb-item',

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
