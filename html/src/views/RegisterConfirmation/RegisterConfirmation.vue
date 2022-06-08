<template>
    <div class="signature-auth">
        <h1>Авторизуем вас...</h1>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { NAME as AUTH_MODULE } from '@store/modules/Auth';
import { LOGIN_BY_SIGNATURE } from '@store/modules/Auth/actions';

export default {
    name: 'register-confirmation',

    props: {
        id: {
            type: [String, Number],
            required: true,
        },

        signature: {
            type: String,
            required: true,
        },
    },

    data() {
        return {};
    },

    async mounted() {
        try {
            await this.loginBySignature({
                userId: this.id,
                signature: this.signature,
            });

            await this.$router.replace('/profile');
        } catch (error) {
            console.error(error);
            await this.$router.replace('/');
        }
    },

    methods: {
        ...mapActions(AUTH_MODULE, {
            loginBySignature: LOGIN_BY_SIGNATURE,
        }),
    },
};
</script>

<style scoped>
.signature-auth {
    padding: 20px;
    text-align: center;
}
</style>
