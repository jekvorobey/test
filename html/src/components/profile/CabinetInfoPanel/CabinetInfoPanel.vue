<template>
    <info-panel class="cabinet-info-panel" header="Личные данные">
        <div class="container container--tablet-lg">
            <ul class="cabinet-view__panel-list">
                <info-row class="cabinet-info-panel__item" name="ФИО">
                    <v-input
                        class="cabinet-info-panel__item-input"
                        v-model="personal.fullName"
                        placeholder="Введите свое ФИО"
                        :show-error="false"
                        :error="$v.personal.fullName.$dirty && $v.personal.fullName.$invalid"
                        @keydown="onKeyDown"
                        @paste="onPaste"
                    />
                </info-row>
                <info-row class="cabinet-info-panel__item" name="Дата рождения">
                    <v-datepicker
                        class="cabinet-info-panel__item-input"
                        placeholder="дд/мм/гггг"
                        v-model="personal.birthday"
                        :show-error="false"
                        :locale="datepickerLocale"
                        allow-input
                        date-format="Y-m-d"
                        alt-format="d/m/Y"
                        alt-input
                    />
                </info-row>
                <info-row class="cabinet-info-panel__item" name="Пол">
                    <div class="cabinet-info-panel__item-checkboxes">
                        <v-check
                            class="cabinet-info-panel__item-check"
                            type="radio"
                            name="gender"
                            v-for="type in genderType"
                            v-model="personal.gender"
                            :id="`gender-${type}`"
                            :key="type"
                            :value="type"
                        >
                            {{ $t(`genderType.${type}`) }}
                        </v-check>
                    </div>
                </info-row>
                <info-row class="cabinet-info-panel__item" name="Номер телефона">
                    <v-input-mask
                        class="cabinet-info-panel__item-input"
                        v-model="$v.credential.phone.$model"
                        placeholder="+7 ___ ___-__-__"
                        :options="maskOptions"
                        :show-error="false"
                        :error="isPhoneDirty && $v.credential.phone.$invalid"
                    />
                    <v-button
                        class="cabinet-info-panel__item-btn"
                        v-if="isPhoneDirty"
                        :disabled="$v.credential.phone.$invalid"
                        @click="onConfirmPhone"
                    >
                        Подтвердить
                    </v-button>
                </info-row>
                <info-row class="cabinet-info-panel__item" name="Email">
                    <v-input
                        class="cabinet-info-panel__item-input"
                        v-model="$v.credential.email.$model"
                        placeholder="Ваш Email"
                        :show-error="false"
                        :error="isEmailDirty && $v.credential.email.$invalid"
                    />
                    <v-button
                        class="cabinet-info-panel__item-btn"
                        v-if="isEmailDirty"
                        :disabled="$v.credential.email.$invalid"
                        @click="onConfirmEmail"
                    >
                        Подтвердить
                    </v-button>
                </info-row>
                <info-row class="cabinet-info-panel__item" name="Профессиональная специализация">
                    <v-select
                        class="cabinet-info-panel__item-select"
                        v-model="selectedActivities"
                        label="name"
                        track-by="id"
                        placeholder="Укажите вашу специализацию"
                        :options="allActivities"
                        :searchable="false"
                        :show-labels="false"
                        :close-on-select="false"
                        multiple
                    >
                        <template v-slot:option="{ option }">
                            <v-check
                                :id="option.name"
                                class="cabinet-info-panel__item-check cabinet-info-panel__item-check--no-event"
                                :name="option.name"
                                :checked="isSelectedActivity(option)"
                            >
                                {{ option.name }}
                            </v-check>
                        </template>
                    </v-select>
                </info-row>
            </ul>
        </div>

        <transition name="fade">
            <email-edit-modal v-if="$isServer || isEmailEditOpen" :email="credential.email" />
        </transition>

        <transition name="fade">
            <phone-edit-modal v-if="$isServer || isPhoneEditOpen" :phone="credential.phone" />
        </transition>
    </info-panel>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import VInputMask from '@controls/VInput/VInputMask.vue';
import VCheck from '@controls/VCheck/VCheck.vue';
import VDatepicker from '@controls/VDatepicker/VDatepicker.vue';
import VSelect from '@controls/VSelect/VSelect.vue';

import InfoRow from '@components/profile/InfoRow/InfoRow.vue';
import InfoPanel from '@components/profile/InfoPanel/InfoPanel.vue';
import PhoneEditModal from '@components/profile/PhoneEditModal/PhoneEditModal.vue';
import EmailEditModal from '@components/profile/EmailEditModal/EmailEditModal.vue';

import _debounce from 'lodash/debounce';
import { mapActions, mapState, mapGetters } from 'vuex';
import { LOCALE, LOCALIZATIONS } from '@store';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import {
    NAME as CABINET_MODULE,
    BIRTHDAY,
    GENDER,
    PHONE,
    EMAIL,
    FIRST_NAME,
    LAST_NAME,
    MIDDLE_NAME,
    ACTIVITIES,
    All_ACTIVITIES,
} from '@store/modules/Profile/modules/Cabinet';
import { FULL_NAME } from '@store/modules/Profile/modules/Cabinet/getters';
import {
    UPDATE_PERSONAL,
    UPDATE_CREDENTIAL,
    UPDATE_ACTIVITIES,
    SEND_CODE,
} from '@store/modules/Profile/modules/Cabinet/actions';

import { nameAll } from '@regex/validation';
import { verificationCodeType } from '@enums/auth';
import { httpCodes, interval, modalName } from '@enums';
import { genderType } from '@enums/profile';
import { phoneMaskOptions } from '@settings';
import validationMixin, { required, email, minLength } from '@plugins/validation';
import './CabinetInfoPanel.css';

const CABINET_MODULE_PATH = `${PROFILE_MODULE}/${CABINET_MODULE}`;

export default {
    name: 'cabinet-info-panel',
    mixins: [validationMixin],

    components: {
        VButton,
        VInput,
        VInputMask,
        VCheck,
        VDatepicker,
        VSelect,

        InfoRow,
        InfoPanel,
        EmailEditModal,
        PhoneEditModal,
    },

    validations: {
        personal: {
            [FULL_NAME]: {
                required,
            },

            [BIRTHDAY]: {
                required,
            },

            [GENDER]: {
                required,
            },
        },

        credential: {
            [PHONE]: {
                required,
                minLength: minLength(12),
            },

            [EMAIL]: {
                required,
                email,
            },
        },
    },

    data() {
        return {
            personal: {
                [FULL_NAME]: null,
                [BIRTHDAY]: null,
                [GENDER]: null,
            },

            credential: {
                [PHONE]: null,
                [EMAIL]: null,
            },

            selectedActivities: [],

            maskOptions: {
                ...phoneMaskOptions,
            },
        };
    },

    computed: {
        ...mapState(CABINET_MODULE_PATH, [
            BIRTHDAY,
            GENDER,
            PHONE,
            EMAIL,
            LAST_NAME,
            FIRST_NAME,
            MIDDLE_NAME,
            ACTIVITIES,
            All_ACTIVITIES,
        ]),
        ...mapGetters(CABINET_MODULE_PATH, [FULL_NAME]),
        ...mapState({
            datepickerLocale: (state) =>
                state[LOCALIZATIONS][state[LOCALE]] && state[LOCALIZATIONS][state[LOCALE]].flatpickrLocale,
        }),

        ...mapState(MODAL_MODULE, {
            isEmailEditOpen: (state) =>
                state[MODALS][modalName.profile.EMAIL_EDIT] && state[MODALS][modalName.profile.EMAIL_EDIT].open,
            isPhoneEditOpen: (state) =>
                state[MODALS][modalName.profile.PHONE_EDIT] && state[MODALS][modalName.profile.PHONE_EDIT].open,
        }),

        isPhoneDirty() {
            return this.credential.phone !== this[PHONE] && this.$v.credential.phone.$dirty;
        },

        isEmailDirty() {
            return this.credential.email !== this[EMAIL] && this.$v.credential.email.$dirty;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(CABINET_MODULE_PATH, [UPDATE_PERSONAL, UPDATE_CREDENTIAL, UPDATE_ACTIVITIES, SEND_CODE]),

        isSelectedActivity(activity) {
            return this.selectedActivities.some((a) => a.id === activity.id);
        },

        async updateActivities(activities) {
            try {
                await this[UPDATE_ACTIVITIES](activities);
            } catch (error) {
                if (error.status === httpCodes.FORBIDDEN) this[CHECK_SESSION](true);
            }
        },

        async updatePersonal(lastName, firstName, middleName, birthday, gender) {
            try {
                await this[UPDATE_PERSONAL]({
                    lastName,
                    firstName,
                    middleName,
                    birthday,
                    gender,
                });
            } catch (error) {
                if (error.status === httpCodes.FORBIDDEN) this[CHECK_SESSION](true);
            }
        },

        onPaste(e) {
            const pasteData = e.clipboardData.getData('text');
            if (!nameAll.test(pasteData)) e.preventDefault();
        },

        onKeyDown(e) {
            if (!nameAll.test(e.key)) e.preventDefault();
        },

        async onConfirmPhone() {
            const { credential } = this;
            try {
                await this[SEND_CODE]({
                    destination: credential[PHONE],
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
        },

        async onConfirmEmail() {
            const { credential } = this;
            try {
                await this[SEND_CODE]({
                    destination: credential[EMAIL],
                    type: verificationCodeType.PROFILE_EMAIL,
                });

                this[CHANGE_MODAL_STATE]({ name: modalName.profile.EMAIL_EDIT, open: true });
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
        },

        onSubmitInfo() {
            this.$v.personal.$touch();
            const { fullName, birthday, gender } = this.personal;
            const names = fullName.replace(/\s\s+/g, ' ').split(' ');
            const birth = birthday[0] && birthday[0].split(' ')[0];
            this.updatePersonal(names[0], names[1], names[2], birth, gender);
        },

        onSubmitActivities() {
            this.updateActivities(this.selectedActivities);
        },
    },

    created() {
        this.debounce_submitInfo = _debounce(this.onSubmitInfo, interval.TWO_SECONDS);
        this.debounce_submitActivities = _debounce(this.onSubmitActivities, interval.TWO_SECONDS);

        this.genderType = genderType;
        this.personal[FULL_NAME] = this[FULL_NAME];
        this.personal[BIRTHDAY] = [this[BIRTHDAY]];
        this.personal[GENDER] = this[GENDER];
        this.credential[PHONE] = this[PHONE];
        this.credential[EMAIL] = this[EMAIL];
        this.selectedActivities = this[ACTIVITIES];
    },

    beforeMount() {
        this.$watch('selectedActivities', this.debounce_submitActivities);
        this.$watch('personal', this.debounce_submitInfo, {
            deep: true,
        });
    },
};
</script>
