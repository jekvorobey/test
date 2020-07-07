<template>
    <component :is="renderComponent" />
</template>
<script>
import Vacancies from './Vacancies.vue';
import Feedback from './Feedback.vue';

import { mapState } from 'vuex';

import { infoPages } from '@enums';
import './InfoPages.css';

export default {
    name: 'agreements',

    computed: {
        ...mapState('route', {
            page: state => state.params.page,
        }),

        renderComponent() {
            const { page } = this;

            switch (page) {
                case infoPages.VACANCIES: return Vacancies;
                case infoPages.FEEDBACK: return Feedback;
                default: return Vacancies;
            }
        },
    },
};
</script>