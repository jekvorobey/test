<template>
    <info-page :landing="landing"></info-page>
</template>

<script>
import InfoPage from './InfoPage.vue';

import { mapState } from 'vuex';
import './InfoPages.css';
import { getLanding } from '@api';

export default {
    name: 'agreements',
    components: {
        InfoPage,
    },
    props: {
        page: String,
    },
    data() {
        return {
            landing: {},
        };
    },

    computed: {
        ...mapState('route', {
            page: (state) => state.params.page,
        }),
    },
    beforeMount() {
        getLanding(this.page).then((response) => {
            this.landing = response;
        });
    },
};
</script>
