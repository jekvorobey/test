<template>
    <transition-group
        tag="ol"
        class="breadcrumbs"
        name="fade-in"
        itemscope
        itemtype="https://schema.org/BreadcrumbList"
    >
        <slot />
    </transition-group>
</template>

<script>
import './Breadcrumbs.css';

export default {
    name: 'breadcrumbs',
};
</script>
