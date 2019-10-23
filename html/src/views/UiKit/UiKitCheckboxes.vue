<template>
    <section class="section ui-kit-section">
        <h2 class="ui-kit-section__hl">
            Чекбоксы
        </h2>
        <p class="text-grey">
            Мастер чекбоксы
        </p>
        <form>
            <v-check id="checkbox-1" v-model="checkbox_checked1" name="checkbox-1" value="1">По умолчанию</v-check>
            <v-check id="checkbox-2" v-model="checkbox_checked2" name="checkbox-2" value="2" disabled>Disabled</v-check>
            <v-check id="checkbox-3" v-model="checkbox_checked3" name="checkbox-3" value="3">
                Мастер чекбоксы
            </v-check>
            <v-check
                id="checkbox-4"
                v-model="checkbox_checked4"
                name="checkbox-4"
                value="чекбокс с длинным текстом включен и не задизейблен"
            >
                чекбокс с длинным текстом включен и не задизейблен
            </v-check>
            <v-check
                id="checkbox-5"
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

            <v-check id="checkbox-6" v-model="checkboxes_checked" name="checkboxes" :value="values.first">{{values.first}}</v-check>
            <v-check id="checkbox-7" v-model="checkboxes_checked" name="checkboxes" :value="values.second">{{values.second}}</v-check>
            <v-check id="checkbox-8" v-model="checkboxes_checked" name="checkboxes" :value="values.third">{{values.third}}</v-check>

            <v-check id="checkbox-all" :checked="allChecked" @change="onChange" name="all" value="all" :indeterminate="indeterminate">Все выбраны</v-check>

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
            values: {
                first: 'first',
                second: 'second',
                third: 'third',
            }
        };
    },
    computed: {
        indeterminate() {
            return this.checkboxes_checked.length > 0 && this.checkboxes_checked.length !== Object.keys(this.values).length;
        },
        allChecked() {
            return this.checkboxes_checked.length > 0 && this.checkboxes_checked.every(v => !!this.values[v]);
        },
    },
    methods: {
        onChange() {
            if(this.checkboxes_checked.length > 0) this.checkboxes_checked = [];
            else this.checkboxes_checked = [...Object.values(this.values)];
        },
    },
};
</script>