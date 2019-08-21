<template>
    <section class="section ui-kit-section">
        <v-range :value="30"></v-range>
    </section>
</template>
<script>
import VRange from '../../components/controls/VRange/VRange.vue';

export default {
    name: 'ui-kit-range-sliders',
    components: {
        VRange,
    },
};
</script>