<template>
    <section class="section ui-kit-section">
        <v-datepicker v-model="value" :mode="mode" allow-input>
            Дата1
        </v-datepicker>
        <v-datepicker v-model="values" :mode="mode1">
            Дата2
        </v-datepicker>
        <v-datepicker v-model="values2" :mode="mode2" inline>
            Дата3
        </v-datepicker>
    </section>
</template>
<script>
import VDatepicker from '../../components/controls/VDatepicker/VDatepicker.vue';

export default {
    name: 'ui-kit-datepicker',
    components: {
        VDatepicker,
    },
    data() {
        return {
            allowInput: false,
            values: ['2019-02-12'],
            values2: ['2019-02-12', '2019-03-12'],
            value: [],
            mode: 'single',
            mode1: 'multiple',
            mode2: 'range',
        };
    },
};
</script>