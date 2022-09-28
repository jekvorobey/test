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
                    <label class="v-input__label">Фамилия, Имя и Отчество</label>
                    <v-suggestion
                            class="cabinet-info-panel__item-input"
                            placeholder="Введите свою фамилию и имя"
                            :value="form.name"
                            :items="suggestFioItems"
                            :error="fioError"
                            @input="debounce_suggestFio"
                            @selected="onFioSuggestSelect"
                            style="max-width: 100%; height: 39px;"
                    >
                        <template v-slot:item="{ item }">
                            {{ item.value }}
                        </template>
                    </v-suggestion>

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
            <transition name="fade">
                <phone-edit-modal v-if="$isServer || isPhoneEditOpen && isMainRecipient" :phone="form.phone" @successfulSavePhone="successfulSavePhone"/>
            </transition>
        </template>
    </general-modal>
</template>
<script>
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import VInputMask from '@controls/VInput/VInputMask.vue';
import InfoRow from '@components/profile/InfoRow/InfoRow.vue';
import VSuggestion from '@controls/VSuggestion/VSuggestion.vue';

import AttentionPanel from '@components/AttentionPanel/AttentionPanel.vue';
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import { mapState, mapGetters, mapActions } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import validationMixin, { required, minLength, email, nameRu, fio } from '@plugins/validation';
import { getRandomIntInclusive } from '@util';
import {httpCodes, modalName} from '@enums';
import { phoneMaskOptions } from '@settings';
import './CheckoutRecipientModal.css';
import _debounce from "lodash/debounce";
import {SEND_CODE, UPDATE_PERSONAL} from "@store/modules/Profile/modules/Cabinet/actions";
import {$dadata} from "@services";
import {NAME as PROFILE_MODULE} from "@store/modules/Profile";
import {NAME as CABINET_MODULE} from "@store/modules/Profile/modules/Cabinet";
import { NAME as CHECKOUT_MODULE } from '@store/modules/Checkout';
import {RECIPIENTS} from '@store/modules/Checkout/getters';
import {verificationCodeType} from "@enums/auth";
import PhoneEditModal from '@components/profile/PhoneEditModal/PhoneEditModal.vue';
const NAME = modalName.checkout.RECIPIENT_EDIT;
const CABINET_MODULE_PATH = `${PROFILE_MODULE}/${CABINET_MODULE}`;

export default {
    name: NAME,
    mixins: [validationMixin],

    components: {
        VButton,
        VInput,
        VInputMask,
        InfoRow,
        VSuggestion,

        GeneralModal,
        AttentionPanel,
        PhoneEditModal,
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
            internalFullName: '',
            suggestFioItems: [],
            fioError: null,
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
            isPhoneEditOpen: (state) =>
                state[MODALS][modalName.profile.PHONE_EDIT] && state[MODALS][modalName.profile.PHONE_EDIT].open,
        }),

         ...mapGetters(CHECKOUT_MODULE, [RECIPIENTS,]),

        isMainRecipient() {
            return this[RECIPIENTS][0].name === null || this[RECIPIENTS][0].phone === null;
        },

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
        ...mapActions(CABINET_MODULE_PATH, [UPDATE_PERSONAL, SEND_CODE]),

        successfulSavePhone() {
            // Сохраняем ФИО и закрываем модалку
            this.emitSaveFioBySuggestion();
            this.onClose();
        },

        emitSaveFioBySuggestion() {
            let recipient = { ...this.form };

            if (this.isMainRecipient){
                // Парсим ФИО как для strongFullNameValidation
                let fio = recipient.name.split(' ').filter((chunk) => chunk !== '').join(' ').split(' ');
                // сохраняем в БД как имя пользователя
                this.updatePersonal(fio[0], fio[1], fio[2]);
            }

            if (this.strongFullNameValidation) {
                recipient.name = recipient.name
                    .split(' ')
                    .filter((chunk) => chunk !== '')
                    .join(' ');
            }
            // Сохраняет получателя без сохранения в БД (скорее всего)
            this.$emit('save', recipient);
        },

        async onNameInputChange(value) {
            const { suggestions } = await $dadata.post(
                'suggest/fio',
                {
                    query: value,
                },
                {}
            );
            this.suggestFioItems = suggestions ? suggestions : [];
        },

        onFioSuggestSelect(item) {
            const {
                data: { name, surname, patronymic },
            } = item;

            if (name && surname && patronymic) {
                this.fioError = null;
                this.internalFullName = `${surname} ${name} ${patronymic}`;
                this.form.name = `${surname} ${name} ${patronymic}`;
            } else {
                this.internalFullName = item.value;
                this.form.name = item.value;
                this.fioError = 'Укажите полностью фамилию, имя и отчество';
            }
        },

        async updatePersonal(lastName, firstName, middleName) {
            try {
                await this[UPDATE_PERSONAL]({
                    lastName,
                    firstName,
                    middleName,
                });
            } catch (error) {
                if (error.status === httpCodes.FORBIDDEN) this[CHECK_SESSION](true);
            }
        },

        async onSubmit() {
            this.$v.$touch();
            if (this.$v.$invalid) return;

            // Только для основного пользователя (если вошел без ФИО или телефона)
            if (this.isMainRecipient) {
                // Подтверждение мобильного телефона
                const { phone } = { ...this.form };
                try {
                    await this[SEND_CODE]({
                        destination: phone,
                        type: verificationCodeType.PROFILE_PHONE,
                    });
                    this[CHANGE_MODAL_STATE]({ name: modalName.profile.PHONE_EDIT, open: true });
                } catch (error) {
                    const { data, message } = error;
                    const { message: dataMessage } = data || {};

                    this[CHANGE_MODAL_STATE]({
                        name: modalName.general.NOTIFICATION,
                        open: true,
                        state: {
                            title: 'Уведомление',
                            message: dataMessage || message,
                        },
                    });
                }
            } else {
                this.emitSaveFioBySuggestion();
                this.onClose();
            }
        },

        onClose() {
            this.$emit('close');
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },

        init() {
            if (this.modalState.recipient) this.form = Object.assign({}, this.form, this.modalState.recipient);
        },
    },

    created(){
        this.debounce_suggestFio = _debounce(this.onNameInputChange, 400);
    },

    beforeMount() {
        this.init();
    },
};
</script>
