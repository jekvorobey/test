<template>
    <transition-group tag="ol" class="breadcrumbs" name="fade-in">
        <slot />
    </transition-group>
</template>

<script>
import './Breadcrumbs.css';

export default {
    name: 'breadcrumbs',
};
</script>
