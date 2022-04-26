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
                        :placeholder="
                            strongFullNameValidation ? 'Введите фамилию, имя и отчество' : 'Введите имя и фамилию'
                        "
                        :error="nameError"
                    >
                        {{ strongFullNameValidation ? 'Фамилия, Имя и Отчество' : 'Имя и Фамилия' }}
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

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import validationMixin, { required, minLength, email, nameRu, fio } from '@plugins/validation';
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

    props: {
        requiredFields: {
            type: Array,
            default() {
                return ['name', 'phone'];
            },
        },

        strongFullNameValidation: {
            type: Boolean,
            default: false,
        },
    },

    validations() {
        let validations = {
            form: {
                name: {},
                phone: {},
                email: {},
            },
        };

        this.requiredFields.forEach((field) => {
            if (typeof validations.form[field] !== 'undefined') {
                validations.form[field]['required'] = required;
            }
        });

        if (this.strongFullNameValidation) {
            validations.form.name['nameRu'] = nameRu;
            validations.form.name['fio'] = fio;
        }

        validations.form.phone['minLength'] = minLength(12);
        validations.form.email['email'] = email;

        return validations;
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
            isOpen: (state) => state[MODALS][NAME] && state[MODALS][NAME].open,
            modalState: (state) => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),

        isTablet() {
            return this.$mq.tablet;
        },

        header() {
            return 'Получатель';
        },

        emailError() {
            if (this.$v.form.email.$dirty) {
                if (typeof this.$v.form.email.required !== 'undefined' && !this.$v.form.email.required) {
                    return this.$t('validation.errors.required');
                }

                if (typeof this.$v.form.email.email !== 'undefined' && !this.$v.form.email.email) {
                    return this.$t('validation.errors.email');
                }
            }

            return null;
        },

        nameError() {
            if (this.$v.form.name.$dirty) {
                if (!this.$v.form.name.required) return this.$t('validation.errors.required');

                if (typeof this.$v.form.name.nameRu !== 'undefined' && this.$v.form.name.nameRu === false) {
                    return 'Только русские буквы, тире и пробелы';
                }

                if (typeof this.$v.form.name.fio !== 'undefined' && this.$v.form.name.fio === false) {
                    return 'Введите ФИО';
                }
            }

            return null;
        },

        phoneError() {
            if (this.$v.form.phone.$dirty) {
                if (!this.$v.form.phone.required) return this.$t('validation.errors.required');
                if (!this.$v.form.phone.minLength) return 'Неверно введен номер';
            }
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onSubmit() {
            this.$v.$touch();
            if (this.$v.$invalid) return;

            let recipient = { ...this.form };

            if (this.strongFullNameValidation) {
                recipient.name = recipient.name
                    .split(' ')
                    .filter((chunk) => chunk !== '')
                    .join(' ');
            }

            this.$emit('save', recipient);
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
