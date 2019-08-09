<template >
    <div class="v-sticky">
        <div class="v-sticky__container">
            <slot name="sticky" />
        </div>
        <slot />
    </div>
</template>

<script>
import './VSticky.css';

export default {
    name: 'v-sticky',
};
</script>
