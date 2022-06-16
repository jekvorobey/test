<template>
    <div class="signature-auth">
        <h1>Авторизуем вас...</h1>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { NAME as AUTH_MODULE } from '@store/modules/Auth';
import { LOGIN_BY_SIGNATURE } from '@store/modules/Auth/actions';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';
import { modalName } from '@enums';
import { NAME as MODAL_MODULE } from '@store/modules/Modal';

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

            this.$nextTick(() => {
                this[CHANGE_MODAL_STATE]({
                    name: modalName.general.NOTIFICATION,
                    open: true,
                    state: {
                        title: 'Ошибка!',
                        message: 'Не удалось авторизоваться',
                    },
                });
            });
        }
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
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
