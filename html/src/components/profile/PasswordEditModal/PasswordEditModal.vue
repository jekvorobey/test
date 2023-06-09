<template>
    <general-modal
        v-if="isOpen"
        class="password-edit-modal"
        type="sm"
        :header="header"
        :is-mobile="isTablet"
        @close="onClose"
    >
        <template v-slot:content>
            <h4 class="password-edit-modal__hl">
                {{ header }}
            </h4>

            <div class="container container--tablet">
                <form class="password-edit-modal__form" @submit.prevent="onSubmit">
                    <v-password
                        v-if="hasPassword"
                        class="password-edit-modal__form-row"
                        v-model="oldPassword"
                        placeholder="Введите старый пароль"
                        :error="oldPasswordError"
                    >
                        Старый пароль
                        <template v-slot:error="{ error }">
                            <transition name="slide-in-bottom" mode="out-in">
                                <div :key="error" v-if="error">{{ error }}</div>
                            </transition>
                        </template>
                    </v-password>

                    <validation-tooltip
                        :tooltips="visualTooltips"
                        :validatedValue="newPassword"
                        :validations="$v.newPassword"
                    ></validation-tooltip>

                    <v-password
                        class="password-edit-modal__form-row"
                        v-model="newPassword"
                        placeholder="Введите новый пароль"
                        :error="newPasswordError"
                    >
                        Новый пароль
                        <template v-slot:error="{ error }">
                            <transition name="slide-in-bottom" mode="out-in">
                                <div :key="error" v-if="error">{{ error }}</div>
                            </transition>
                        </template>
                    </v-password>

                    <v-password
                        v-if="!hasPassword"
                        class="password-edit-modal__form-row"
                        v-model="passwordRepeat"
                        placeholder="Подтвердите ваш новый пароль"
                        :error="passwordRepeatError"
                    >
                        Пароль ещё раз
                        <template v-slot:error="{ error }">
                            <transition name="slide-in-bottom" mode="out-in">
                                <div :key="error" v-if="error">{{ error }}</div>
                            </transition>
                        </template>
                    </v-password>

                    <div v-if="!hasPassword" class="password-edit-modal__form-info text-grey">
                        Нажимая кнопку «Подтвердить», вы соглашаетесь с условиями
                        <a class="password-edit-modal__form-info-link" href="/agreements/public-offer" target="_blank"
                            >оферты</a
                        >
                        и
                        <a
                            class="password-edit-modal__form-info-link"
                            href="/agreements/personal-policy"
                            target="_blank"
                        >
                            политикой конфиденциальности
                        </a>
                    </div>
                </form>
            </div>

            <div class="password-edit-modal__submit">
                <v-button class="password-edit-modal__submit-btn" @click="onSubmit">Подтвердить</v-button>
            </div>
        </template>
    </general-modal>
</template>
<script>
import VButton from '@controls/VButton/VButton.vue';
import VPassword from '@controls/VPassword/VPassword.vue';

import GeneralModal from '@components/GeneralModal/GeneralModal.vue';
import ValidationTooltip from '@components/ValidationTooltip/ValidationTooltip.vue';
import validationMixin, {
    required,
    password,
    minLength,
    hasUpperCase,
    hasLowerCase,
    hasNumbers,
    sameAs,
} from '@plugins/validation';

import { mapActions, mapState } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as CABINET_MODULE, PHONE, HAS_PASSWORD } from '@store/modules/Profile/modules/Cabinet';
import { UPDATE_PASSWORD } from '@store/modules/Profile/modules/Cabinet/actions';

import { modalName } from '@enums';
import './PasswordEditModal.css';

const CABINET_MODULE_PATH = `${PROFILE_MODULE}/${CABINET_MODULE}`;
const NAME = modalName.profile.PASSWORD_EDIT;

export default {
    name: NAME,
    mixins: [validationMixin],

    components: {
        VButton,
        VPassword,
        GeneralModal,
        ValidationTooltip,
    },

    validations() {
        if (this[HAS_PASSWORD]) {
            return {
                oldPassword: {
                    required,
                    password,
                    minLength: minLength(8),
                },

                newPassword: {
                    required,
                    password,
                    minLength: minLength(8),
                    hasUpperCase,
                    hasLowerCase,
                    hasNumbers,
                },
            };
        } else
            return {
                newPassword: {
                    required,
                    password,
                    minLength: minLength(8),
                    hasUpperCase,
                    hasLowerCase,
                    hasNumbers,
                },

                passwordRepeat: {
                    required,
                    sameAs: sameAs('newPassword'),
                },
            };
    },

    data() {
        return {
            oldPassword: null,
            newPassword: null,
            passwordRepeat: null,
            visualTooltips: [
                {
                    text: '8 символов',
                    validator: 'minLength',
                },
                {
                    text: 'A-Z',
                    validator: 'hasUpperCase',
                },
                {
                    text: 'a-z',
                    validator: 'hasLowerCase',
                },
                {
                    text: '0-9',
                    validator: 'hasNumbers',
                },
            ],
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: (state) => state[MODALS][NAME] && state[MODALS][NAME].open,
        }),
        ...mapState(CABINET_MODULE_PATH, [PHONE, HAS_PASSWORD]),

        isTablet() {
            return this.$mq.tablet;
        },

        header() {
            return this[HAS_PASSWORD] ? 'Изменить пароль' : 'Создать пароль';
        },

        newPasswordError() {
            if (this.$v.newPassword.$dirty) {
                if (!this.$v.newPassword.required) return this.$t('validation.errors.required');
                if (!this.$v.newPassword.password)
                    return 'Как минимум 1 заглавная и строчная латинские буквы и 1 цифра';
                if (!this.$v.newPassword.minLength) return 'Не менее 8 символов';
            }
        },

        passwordRepeatError() {
            if (this.$v.passwordRepeat.$dirty) {
                if (!this.$v.passwordRepeat.required) return this.$t('validation.errors.required');
                if (!this.$v.passwordRepeat.sameAs) return 'Не совпадает';
            }
        },

        oldPasswordError() {
            if (this.$v.oldPassword.$dirty) {
                if (!this.$v.oldPassword.required) return this.$t('validation.errors.required');
                if (!this.$v.oldPassword.password)
                    return 'Как минимум 1 заглавная и строчная латинские буквы и 1 цифра';
                if (!this.$v.oldPassword.minLength) return 'Не менее 8 символов';
            }
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(CABINET_MODULE_PATH, [UPDATE_PASSWORD]),

        async updatePassword(data) {
            try {
                await this[UPDATE_PASSWORD](data);
                this.onClose();
            } catch (error) {
                this.onClose();
                alert('Ошибка при смене пароля');
            }
        },

        async onSubmit() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                if (this[HAS_PASSWORD]) this.updatePassword({ old: this.oldPassword, new: this.newPassword });
                else this.updatePassword({ new: this.newPassword });
            }
        },

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },
};
</script>
