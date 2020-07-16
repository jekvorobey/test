<template>
    <general-modal
        v-if="isOpen"
        type="sm"
        class="checkout-recipient-modal"
        :header="header"
        @close="onClose"
        :is-mobile="isTablet"
    >
        <template v-slot:content>
            <div class="checkout-recipient-modal__body">
                <h3 v-if="!isTablet" class="checkout-recipient-modal__hl">{{ header }}</h3>
                <form class="checkout-recipient-modal__form" @submit.prevent="onSubmit">
                    <v-input
                        class="checkout-recipient-modal__form-row"
                        v-model="form.name"
                        placeholder="Введите имя и фамилию"
                        :error="nameError"
                    >
                        Имя и Фамилия
                        <template v-slot:error="{ error }">
                            <transition name="slide-in-bottom" mode="out-in">
                                <div :key="error" v-if="error">{{ error }}</div>
                            </transition>
                        </template>
                    </v-input>
                    <v-input-mask
                        class="checkout-recipient-modal__form-row"
                        v-model="form.phone"
                        placeholder="+7 ___ ___-__-__"
                        :options="maskOptions"
                        :error="phoneError"
                        raw
                    >
                        Телефон
                        <template v-slot:error="{ error }">
                            <transition name="slide-in-bottom" mode="out-in">
                                <div :key="error" v-if="error">{{ error }}</div>
                            </transition>
                        </template>
                    </v-input-mask>
                    <v-input class="checkout-recipient-modal__form-row" v-model="form.email" :error="emailError">
                        Email
                        <template v-slot:error="{ error }">
                            <transition name="slide-in-bottom" mode="out-in">
                                <div :key="error" v-if="error">{{ error }}</div>
                            </transition>
                        </template>
                    </v-input>
                </form>
            </div>

            <attention-panel class="checkout-recipient-modal__panel">
                При получении заказа необходимо иметь с собой документ, удостоверяющий личность
            </attention-panel>

            <div class="checkout-recipient-modal__submit">
                <v-button class="checkout-recipient-modal__submit-btn" @click="onSubmit">
                    Добавить получателя
                </v-button>
            </div>
        </template>
    </general-modal>
</template>
<script>
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import VInputMask from '@controls/VInput/VInputMask.vue';

import AttentionPanel from '@components/AttentionPanel/AttentionPanel.vue';
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import { mapState, mapActions } from 'vuex';
import { NAME as CHECKOUT_MODULE } from '@store/modules/Checkout';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import validationMixin, { required, minLength, email } from '@plugins/validation';
import { getRandomIntInclusive } from '@util';
import { modalName } from '@enums';
import { phoneMaskOptions } from '@settings';
import './CheckoutRecipientModal.css';

const NAME = modalName.checkout.RECIPIENT_EDIT;

export default {
    name: NAME,
    mixins: [validationMixin],

    components: {
        VButton,
        VInput,
        VInputMask,

        GeneralModal,
        AttentionPanel,
    },

    validations: {
        form: {
            name: {
                required,
            },

            phone: {
                required,
                minLength: minLength(12),
            },

            email: {
                email,
            },
        },
    },

    data() {
        return {
            form: {
                id: getRandomIntInclusive(0, 100000),
                name: null,
                phone: null,
                email: null,
            },

            maskOptions: { ...phoneMaskOptions },
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: state => state[MODALS][NAME] && state[MODALS][NAME].open,
            modalState: state => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),

        isTablet() {
            return this.$mq.tablet;
        },

        header() {
            return 'Получатель';
        },

        emailError() {
            if (this.$v.form.email.$dirty && !this.$v.form.email.email) return 'Неправильный формат';
        },

        nameError() {
            if (this.$v.form.name.$dirty && !this.$v.form.name.required) return 'Обязательное поле';
        },

        phoneError() {
            if (this.$v.form.phone.$dirty) {
                if (!this.$v.form.phone.required) return 'Обязательное поле';
                if (!this.$v.form.phone.minLength) return 'Неверно введен номер';
            }
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onSubmit() {
            this.$v.$touch();
            if (this.$v.$invalid) return;
            this.$emit('save', { ...this.form });
            this.onClose();
        },

        onClose() {
            this.$emit('close');
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },

        init() {
            if (this.modalState.recipient) this.form = Object.assign({}, this.form, this.modalState.recipient);
        },
    },

    beforeMount() {
        this.init();
    },
};
</script>
