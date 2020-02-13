
<template>
    <div class="social-login-view">Редирект...</div>
</template>

<script>
import { NAME as AUTH_MODULE } from '../../store/modules/Auth';
import { LOGIN_BY_SOCIAL } from '../../store/modules/Auth/actions';
import { mapActions } from 'vuex';

export default {
    name: 'social-login',

    methods: {
        ...mapActions(AUTH_MODULE, [LOGIN_BY_SOCIAL]),
    },

    async serverPrefetch() {
        try {
            const {
                params: { driver },
                query,
            } = this.$route;

            const url = await this[LOGIN_BY_SOCIAL]({ driver, query });
            return Promise.reject({ url: url || '/' });
        } catch (error) {
            return Promise.reject({ url: '/404' });
        }
    },
};
</script>
