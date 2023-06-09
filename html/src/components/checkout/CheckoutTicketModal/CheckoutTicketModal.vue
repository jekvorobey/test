<template>
    <general-modal
        v-if="isOpen"
        type="sm"
        class="checkout-ticket-modal"
        :header="header"
        :is-mobile="isTablet"
        @close="onClose"
    >
        <template v-slot:content>
            <div class="checkout-ticket-modal__body">
                <h3 v-if="!isTablet" class="checkout-ticket-modal__hl">{{ header }}</h3>
                <form class="checkout-ticket-modal__form" @submit.prevent="onSubmit">
                    <v-select
                        class="checkout-ticket-modal__form-row"
                        track-by="id"
                        label="name"
                        placeholder="Выберите профессию"
                        v-model="selectedProfession"
                        :options="professions"
                        :searchable="false"
                        :allow-empty="false"
                        :show-labels="false"
                        show-error
                    >
                        Профессия
                    </v-select>

                    <v-input
                        class="checkout-ticket-modal__form-row"
                        v-model="name"
                        placeholder="Введите ФИО"
                        :error="nameError"
                    >
                        ФИО
                        <template v-slot:error="{ error }">
                            <transition name="slide-in-bottom" mode="out-in">
                                <div :key="error" v-if="error">{{ error }}</div>
                            </transition>
                        </template>
                    </v-input>

                    <v-input-mask
                        class="checkout-ticket-modal__form-row"
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

                    <v-input class="checkout-ticket-modal__form-row" v-model="form.email" :error="emailError">
                        Email
                        <template v-slot:error="{ error }">
                            <transition name="slide-in-bottom" mode="out-in">
                                <div :key="error" v-if="error">{{ error }}</div>
                            </transition>
                        </template>
                    </v-input>
                </form>
            </div>
            <div class="checkout-ticket-modal__submit">
                <v-button class="checkout-ticket-modal__submit-btn" @click="onSubmit">Добавить участника</v-button>
            </div>
        </template>
    </general-modal>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import VInputMask from '@controls/VInput/VInputMask.vue';
import VSelect from '@controls/VSelect/VSelect.vue';

import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import { mapState, mapActions } from 'vuex';
import { NAME as CHECKOUT_MODULE, PROFESSIONS } from '@store/modules/Checkout';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import validationMixin, { required, minLength, email, nameRu } from '@plugins/validation';
import { getRandomIntInclusive } from '@util';
import { modalName } from '@enums';
import { phoneMaskOptions } from '@settings';
import './CheckoutTicketModal.css';

const NAME = modalName.checkout.TICKET_EDIT;

export default {
    name: NAME,
    mixins: [validationMixin],

    components: {
        VButton,
        VInput,
        VInputMask,
        VSelect,

        GeneralModal,
    },

    validations: {
        name: {
            required,
            nameRu,
        },

        form: {
            firstName: {
                required,
            },

            lastName: {
                required,
            },

            middleName: {
                required,
            },

            phone: {
                required,
                minLength: minLength(12),
            },

            email: {
                required,
                email,
            },

            professionId: {
                required,
            },
        },
    },

    data() {
        return {
            name: null,

            form: {
                id: getRandomIntInclusive(0, 100000),
                firstName: null,
                lastName: null,
                middleName: null,
                phone: null,
                email: null,
                professionId: null,
            },

            selectedProfession: null,
            maskOptions: { ...phoneMaskOptions },
        };
    },

    computed: {
        ...mapState(CHECKOUT_MODULE, [PROFESSIONS]),
        ...mapState(MODAL_MODULE, {
            isOpen: (state) => state[MODALS][NAME] && state[MODALS][NAME].open,
            modalState: (state) => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),

        isTablet() {
            return this.$mq.tablet;
        },

        header() {
            return 'Участник';
        },

        emailError() {
            if (this.$v.form.email.$dirty) {
                if (!this.$v.form.email.required) return this.$t('validation.errors.required');
                if (!this.$v.form.email.email) return this.$t('validation.errors.email');
            }
        },

        nameError() {
            if (this.$v.name.$dirty) {
                if (!this.$v.name.required) return this.$t('validation.errors.required');
                if (!this.$v.name.nameRu) return 'Только русские буквы, тире и пробелы';
                if (
                    !this.$v.form.lastName.required ||
                    !this.$v.form.firstName.required ||
                    !this.$v.form.middleName.required
                )
                    return 'Введите ФИО';
            }
        },

        phoneError() {
            if (this.$v.form.phone.$dirty) {
                if (!this.$v.form.phone.required) return this.$t('validation.errors.required');
                if (!this.$v.form.phone.minLength) return 'Неверно введен номер';
            }
        },
    },

    watch: {
        name(value) {
            const fullName = (value && value.trim().replace(/\s\s+/g, ' ')) || '';
            const parts = fullName.split(' ', 3);
            parts.forEach((p) => p && p.trim());
            this.form.lastName = parts[0] || null;
            this.form.firstName = parts[1] || null;
            this.form.middleName = parts[2] || null;
        },

        selectedProfession(value) {
            if (value) this.form.professionId = value.id;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onSubmit() {
            this.$v.$touch();
            if (this.$v.$invalid) return;
            const { id } = this.modalState;
            this.$emit('save', { ticket: { ...this.form }, id });
            this.onClose();
        },

        onClose() {
            this.$emit('close');
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },

        init() {
            const { ticket } = this.modalState;
            if (ticket) {
                const { firstName, lastName, middleName } = ticket;
                let name = '';
                if (lastName) name += `${lastName} `;
                if (firstName) name += `${firstName} `;
                if (middleName) name += `${middleName}`;

                this.form = Object.assign({}, this.form, ticket);
                this.name = name;
            }

            this.selectedProfession = this[PROFESSIONS][0];
        },
    },

    beforeMount() {
        this.init();
    },
};
</script>
