<template>
    <section class="section ui-kit-section">
        <h2 class="ui-kit-section__hl">Слайдер диапазона</h2>
        <a href="https://refreshless.com/nouislider/" target="_blank" rel="noopener noreferrer" title="nouislider">
            https://refreshless.com/nouislider/
        </a>
        <p class="text-grey">Мастер инпут type="number"</p>
        <p>
            <input type="number" :value="max" @change="(e) => (max = +e.target.value)" />
        </p>
        <p class="text-grey">Слайдеры</p>
        <v-range style="width: 50%" :min="min" :max="max" :format="format" />
        <br />
        <br />
        <v-range v-model="value" style="width: 50%" :min="min" :max="max" :step="step">
            <template v-slot:label> бабло </template>
        </v-range>
        <br />
        <br />
        <v-range v-model="values" style="width: 50%" :min="min" :max="max" :step="step" :format="format" />
    </section>
</template>
<script>
import VRange from '@controls/VRange/VRange.vue';

export default {
    name: 'ui-kit-range-sliders',
    components: {
        VRange,
    },
    data() {
        return {
            value: [100],
            values: [100, 500],
            step: 10,
            min: 0,
            max: 1000,
            format: {
                // 'to' the formatted value. Receives a number.
                to(value) {
                    return Math.round(value);
                },
                // 'from' the formatted value.
                // Receives a string, should return a number.
                from(value) {
                    return Number(value);
                },
            },
        };
    },
};
</script>
