<template>
    <li class="breadcrumb-item">
        <router-link class="breadcrumb-item__link" :to="to">
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
    },
};
</script>
