<template>
    <section class="section ui-kit-section">
        <h2 class="ui-kit-section__hl">
            Чекбоксы
        </h2>
        <p class="text-grey">
            Мастер чекбоксы
        </p>
        <form>
            <v-check v-model="checkbox_checked1" name="checkbox-1" value="1">По умолчанию</v-check>
            <v-check v-model="checkbox_checked2" name="checkbox-2" value="2" disabled>Disabled</v-check>
            <v-check v-model="checkbox_checked3" name="checkbox-3" value="3">
                Мастер чекбоксы
            </v-check>
            <v-check
                v-model="checkbox_checked4"
                name="checkbox-4"
                value="чекбокс с длинным текстом включен и не задизейблен"
            >
                чекбокс с длинным текстом включен и не задизейблен
            </v-check>
            <v-check
                v-model="checkbox_checked5"
                name="checkbox-5"
                value="чекбокс с длинным текстом включен и не задизейблен"
                disabled
            >
                чекбокс выбран, но задизеблен
            </v-check>
            <p>Выбрано По умолчанию: {{ checkbox_checked1 }}</p>
            <p>Выбрано disabled: {{ checkbox_checked2 }}</p>
            <p>Выбрано Мастер чекбоксы: {{ checkbox_checked3 }}</p>
            <p>Выбрано чекбокс с длинным текстом включен и не задизейблен: {{ checkbox_checked4 }}</p>

            <v-check v-model="checkboxes_checked" name="checkboxes" value="1">1</v-check>
            <v-check v-model="checkboxes_checked" name="checkboxes" value="2">2</v-check>
            <v-check v-model="checkboxes_checked" name="checkboxes" value="3">3</v-check>

            <p>Выбрано: {{ checkboxes_checked }}</p>
        </form>
    </section>
</template>
<script>
import VCheck from '../../components/controls/VCheck/VCheck.vue';

export default {
    name: 'ui-kit-checkbox-buttons',
    components: {
        VCheck,
    },
    data() {
        return {
            checkbox_checked1: false,
            checkbox_checked2: false,
            checkbox_checked3: false,
            checkbox_checked4: false,
            checkbox_checked5: true,
            checkboxes_checked: [],
        };
    },
};
</script>