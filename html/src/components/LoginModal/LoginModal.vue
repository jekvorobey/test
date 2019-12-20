<template>
    <general-modal v-if="isOpen" type="sm" class="login-modal" @close="onClose">
        <template v-slot:content>
            <h3 class="login-modal__hl">Войти</h3>
            <form class="login-modal__form" method="post" @submit.prevent="onSubmit">
                <v-input v-model="email">
                    E-mail
                </v-input>
                <v-password v-model="password">
                    Пароль
                </v-password>
                <div class="login-modal__form-submit">
                    <v-button type="submit">Войти</v-button>
                </div>
            </form>
        </template>
    </general-modal>
</template>
<script>
import VButton from '../controls/VButton/VButton.vue';
import VInput from '../controls/VInput/VInput.vue';
import VPassword from '../controls/VPassword/VPassword.vue';
import GeneralModal from '../GeneralModal/GeneralModal.vue';

import { mapState, mapActions } from 'vuex';

import { NAME as AUTH_MODULE } from '../../store/modules/Auth';
import { LOGIN } from '../../store/modules/Auth/actions';

import { NAME as CART_MODULE } from '../../store/modules/Cart';
import { FETCH_CART_DATA } from '../../store/modules/Cart/actions';

import { NAME as MODAL_MODULE, MODALS } from '../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../store/modules/Modal/actions';

import './LoginModal.css';

export const NAME = 'login-modal';

export default {
    name: NAME,

    components: {
        VButton,
        VInput,
        VPassword,
        GeneralModal,
    },

    data() {
        return {
            email: 'test@gs.ru',
            password: 123456,
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: state => state[MODALS][NAME] && state[MODALS][NAME].open,
        }),

        maxDate() {
            return this.availableDates.length > 0 ? this.availableDates[this.availableDates.length - 1] : null;
        },

        minDate() {
            return this.availableDates.length > 0 ? this.availableDates[0] : null;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(AUTH_MODULE, [LOGIN]),
        ...mapActions(CART_MODULE, [FETCH_CART_DATA]),

        async onSubmit() {
            try {
                await this[LOGIN]({ email: this.email, password: this.password });
                this[FETCH_CART_DATA]();
                this.$emit('login');
                this.onClose();
            } catch (error) {
                console.log(error);
            }
        },

        onClose() {
            this.$emit('close');
            this.CHANGE_MODAL_STATE({ name: NAME, open: false });
        },
    },
};
</script>
