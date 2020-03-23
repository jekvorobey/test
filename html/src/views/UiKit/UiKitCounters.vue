<template>
    <section class="section ui-kit-section">
        <h2 class="ui-kit-section__hl">
            Счётчики
        </h2>
        <p class="text-grey">
            Шаг 1
        </p>
        <v-counter v-model="value" min="1" max="200" />
        <br />
        <br />
        <p class="text-grey">
            Шаг 20
        </p>
        <v-counter v-model="value1" min="0" max="200" step="20" />
    </section>
</template>
<script>
import VCounter from '@controls/VCounter/VCounter.vue';

export default {
    name: 'ui-kit-counters',
    components: {
        VCounter,
    },
    data() {
        return {
            value: 0,
            value1: 400,
        };
    },
};
</script>