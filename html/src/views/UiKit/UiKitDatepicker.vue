<template>
    <section class="section ui-kit-section">
        <form style="width: 50%;">
            <v-datepicker
                v-model="value"
                :disable="disable"
                :mode="mode"
                :locale="locale"
                allow-input
                :disabled="disabled2"
            >
                Дата1
            </v-datepicker>
            <v-datepicker v-model="values" :disable="disable1" :mode="mode1" :locale="locale">
                Дата2
            </v-datepicker>
            <v-datepicker
                v-model="values2"
                :enable="enable2"
                :mode="mode2"
                :locale="locale"
                :disabled="disabled2"
                inline
            >
                Дата3
            </v-datepicker>
        </form>
    </section>
</template>
<script>
import VDatepicker from '../../components/controls/VDatepicker/VDatepicker.vue';
import { mapState } from 'vuex';

export default {
    name: 'ui-kit-datepicker',
    components: {
        VDatepicker,
    },
    data() {
        return {
            allowInput: false,
            value: [],
            disable: ['2019-08-27', '2019-08-28', '2019-08-29'],
            values: ['2019-08-23'],
            disable1: ['2019-08-27', '2019-08-28', '2019-08-29'],
            values2: [],
            enable2: ['2019-08-26', '2019-08-27', '2019-08-28', '2019-08-29'],
            mode: 'single',
            mode1: 'multiple',
            mode2: 'range',
            disabled2: false,
        };
    },
    computed: {
        ...mapState(['locale']),
    },
};
</script>