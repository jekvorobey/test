<template>
    <general-modal
        v-if="isOpen"
        type="sm"
        class="personal-edit-modal"
        :header="header"
        @close="onClose"
        :is-mobile="isTablet"
    >
        <template v-slot:content>
            <div class="personal-edit-modal__body">
                <h3 v-if="!isTablet" class="personal-edit-modal__hl">{{ header }}</h3>
                <form class="personal-edit-modal__form" @submit.prevent="onSubmit">
                    <v-input class="personal-edit-modal__form-row" v-model="form.lastName">
                        Фамилия
                    </v-input>
                    <v-input class="personal-edit-modal__form-row" v-model="form.firstName">
                        Имя
                    </v-input>
                    <v-input class="personal-edit-modal__form-row" v-model="form.middleName">
                        Отчество
                    </v-input>
                    <v-datepicker v-model="form.birthday" :locale="datepickerLocale" allow-input>
                        Дата рождения
                    </v-datepicker>
                    <p class="personal-edit-modal__form-label">Пол</p>
                    <v-check
                        class="personal-edit-modal__form-row"
                        type="radio"
                        name="gender"
                        v-for="type in genderType"
                        v-model="form.gender"
                        :id="`gender-${type}`"
                        :key="type"
                        :value="type"
                    >
                        {{ $t(`genderType.${type}`) }}
                    </v-check>
                </form>
                <div class="email-edit-modal__submit">
                    <v-button class="email-edit-modal__submit-btn" @click="onSubmit">
                        Сохранить
                    </v-button>
                </div>
            </div>
        </template>
    </general-modal>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import VCheck from '@controls/VCheck/VCheck.vue';
import VDatepicker from '@controls/VDatepicker/VDatepicker.vue';
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import { mapState, mapActions } from 'vuex';
import { LOCALE, LOCALIZATIONS } from '@store';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as AUTH_MODULE } from '@store/modules/Auth';
import { CHECK_SESSION } from '@store/modules/Auth/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import {
    NAME as CABINET_MODULE,
    FIRST_NAME,
    LAST_NAME,
    MIDDLE_NAME,
    BIRTHDAY,
    GENDER,
} from '@store/modules/Profile/modules/Cabinet';
import { UPDATE_PERSONAL } from '@store/modules/Profile/modules/Cabinet/actions';

import { httpCodes } from '@enums/general';
import { genderType } from '@enums/profile';
import './PersonalEditModal.css';

const CABINET_MODULE_PATH = `${PROFILE_MODULE}/${CABINET_MODULE}`;

export const NAME = 'personal-edit-modal';

export default {
    name: NAME,

    components: {
        VButton,
        VCheck,
        VInput,
        VDatepicker,
        GeneralModal,
    },

    data() {
        return {
            form: {
                firstName: null,
                lastName: null,
                middleName: null,
                birthday: null,
                gender: null,
            },
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState({
            datepickerLocale: state =>
                state[LOCALIZATIONS][state[LOCALE]] && state[LOCALIZATIONS][state[LOCALE]].flatpickrLocale,
        }),
        ...mapState(CABINET_MODULE_PATH, [FIRST_NAME, LAST_NAME, MIDDLE_NAME, BIRTHDAY, GENDER]),
        ...mapState(MODAL_MODULE, {
            isOpen: state => state[MODALS][NAME] && state[MODALS][NAME].open,
        }),

        header() {
            return 'Изменить личные данные';
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },
    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(AUTH_MODULE, [CHECK_SESSION]),
        ...mapActions(CABINET_MODULE_PATH, [UPDATE_PERSONAL]),

        async updatePersonal(firstName, lastName, middleName, birthday, gender) {
            try {
                await this[UPDATE_PERSONAL]({
                    firstName,
                    lastName,
                    middleName,
                    birthday,
                    gender,
                });
                this.onClose();
            } catch (error) {
                if (error.status === httpCodes.FORBIDDEN) this[CHECK_SESSION](true);
            }
        },

        onSubmit() {
            this.updatePersonal(
                this.form.firstName,
                this.form.lastName,
                this.form.middleName,
                this.form.birthday[0],
                this.form.gender
            );
        },

        onClose() {
            this.$emit('close');
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },

    beforeMount() {
        this.genderType = genderType;
        this.form.firstName = this[FIRST_NAME];
        this.form.lastName = this[LAST_NAME];
        this.form.middleName = this[MIDDLE_NAME];
        this.form.birthday = [this[BIRTHDAY]];
        this.form.gender = this[GENDER];
    },
};
</script>
