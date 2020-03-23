<template>
    <section class="section ui-kit-section">
        <h2 class="ui-kit-section__hl">
            Радиокнопки
        </h2>
        <p class="text-grey">
            Мастер радиобаттоны
        </p>
        <form>
            <v-check id="radio-1" v-model="radio_checked" type="radio" name="radio-1" value="По умолчанию">
                По умолчанию
            </v-check>
            <v-check id="radio-2" v-model="radio_checked" type="radio" name="radio-1" value="2" disabled>
                Disabled
            </v-check>
            <v-check id="radio-3" v-model="radio_checked" type="radio" name="radio-1" value="Мастер радиобаттоны">
                Мастер радиобаттоны
            </v-check>
            <v-check
                id="radio-4"
                v-model="radio_checked"
                type="radio"
                name="radio-1"
                value="Радиобаттон с длинным текстом включен и не задизейблен"
            >
                Радиобаттон с длинным текстом включен и не задизейблен
            </v-check>
            <v-check id="radio-5" checked type="radio" name="radio-2" value="Выбран, но задизеблен" disabled>
                Выбран, но задизеблен
            </v-check>
        </form>
        <p>Выбрано: {{ radio_checked }}</p>
    </section>
</template>

<script>
import VCheck from '@controls/VCheck/VCheck.vue';

export default {
    name: 'ui-kit-radio-buttons',
    components: {
        VCheck,
    },
    data() {
        return {
            radio_checked: null,
        };
    },
};
</script>