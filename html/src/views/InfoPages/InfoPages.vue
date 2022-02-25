<template>
    <info-page :landing="landing"></info-page>
</template>

<script>
import InfoPage from './InfoPage.vue';

import { mapState } from 'vuex';
import './InfoPages.css';
import { $http } from '@services';

export default {
    name: 'agreements',
    components: {
        InfoPage,
    },

    data() {
        return {
            landing: this.getLanding,
        };
    },

    computed: {
        ...mapState('route', {
            page: (state) => state.params.page,
        }),

        getLanding() {
            const { page } = this;

            return $http.get('/v1/content/pages', {
                params: {
                    page,
                },
            });
        },
    },
};
</script>
