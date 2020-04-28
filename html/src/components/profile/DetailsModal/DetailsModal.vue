<template>
    <general-modal class="details-modal" header="Реквизиты" @close="onClose" :is-mobile="isTablet">
        <template v-slot:content>
            <h4 class="details-modal__hl">Реквизиты</h4>
            <span class="details-modal__disclaimer"
                >Часть полей будет заполнена автоматически после заполнения ИНН</span
            >
            <form class="details-modal__form" v-if="!isTablet">
                <div class="details-modal__form-row">
                    <v-input
                        class="details-modal__form-column"
                        maxLength="12"
                        :value="$v.form.inn.$model"
                        :error="innError"
                        @input="onInnChange"
                    >
                        ИНН
                    </v-input>
                    <v-input class="details-modal__form-column" :value="$v.form.bank.$model" disabled>
                        Банк
                    </v-input>
                </div>

                <div class="details-modal__form-row">
                    <v-input class="details-modal__form-column" :value="$v.form.name.$model" disabled>
                        Наименование ИП
                    </v-input>
                    <v-input class="details-modal__form-column" :value="$v.form.correspondentAccount.$model" disabled>
                        Корреспондентский счет банка
                    </v-input>
                </div>

                <div class="details-modal__form-row">
                    <div class="details-modal__form-column">
                        <v-input v-model="form.account" maxLength="20" :error="accountError">
                            Расчетный счет
                        </v-input>
                        <v-input :value="$v.form.bik.$model" :error="bikError" @input="onBikChange">
                            БИК
                        </v-input>
                    </div>

                    <div class="details-modal__form-column">
                        <v-input
                            :value="$v.form.address.$model"
                            class="details-modal__form-textarea"
                            tag="textarea"
                            :auto-height="isTablet"
                            disabled
                        >
                            Юридический адрес
                        </v-input>
                    </div>
                </div>
            </form>
            <form class="details-modal__form" v-else>
                <v-input :value="$v.form.inn.$model" maxLength="12" :error="innError" @input="onInnChange">
                    ИНН
                </v-input>

                <v-input :value="$v.form.name.$model" disabled>
                    Наименование ИП
                </v-input>

                <v-input v-model="form.account" maxLength="20" :error="accountError">
                    Расчетный счет
                </v-input>

                <v-input :value="$v.form.bik.$model" :error="bikError" maxLength="9" @input="onBikChange">
                    БИК
                </v-input>

                <v-input :value="$v.form.bank.$model" disabled>
                    Банк
                </v-input>

                <v-input :value="$v.form.correspondentAccount.$model" disabled>
                    Корреспондентский счет банка
                </v-input>

                <v-input
                    :value="$v.form.address.$model"
                    class="details-modal__form-textarea"
                    tag="textarea"
                    :auto-height="false"
                    disabled
                >
                    Юридический адрес
                </v-input>
            </form>

            <div class="details-modal__submit">
                <v-button class="details-modal__submit-btn" @click="onSubmit">
                    Сохранить
                </v-button>
            </div>
        </template>
    </general-modal>
</template>
<script>
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';
import validationMixin, { required, inn, bik, rs } from '@plugins/validation';

import { mapActions, mapState } from 'vuex';
import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as CABINET_MODULE, REQUISITES } from '@store/modules/Profile/modules/Cabinet';
import { UPDATE_REQUISITES } from '@store/modules/Profile/modules/Cabinet/actions';

import { $dadata, $logger } from '@services';
import { modalName } from '@enums';
import './DetailsModal.css';

const CABINET_MODULE_PATH = `${PROFILE_MODULE}/${CABINET_MODULE}`;
const NAME = modalName.profile.DETAILS;

export default {
    name: NAME,
    mixins: [validationMixin],

    components: {
        VButton,
        VInput,
        GeneralModal,
    },

    validations: {
        form: {
            name: {
                required,
            },

            address: {
                required,
            },

            inn: {
                required,
                inn,
            },

            account: {
                required,
                rs: rs('bik'),
            },

            bank: {
                required,
            },

            bik: {
                required,
                bik,
            },

            correspondentAccount: {
                required,
            },
        },
    },

    data() {
        return {
            form: {
                name: null,
                address: null,
                inn: null,
                account: null,
                bank: null,
                bik: null,
                correspondentAccount: null,
            },

            existBank: false,
            existInn: false,
        };
    },

    computed: {
        ...mapState(CABINET_MODULE_PATH, [REQUISITES]),

        isTablet() {
            return this.$mq.tablet;
        },

        accountError() {
            if (this.$v.form.account.$dirty && this.$v.form.account.$invalid)
                return 'Номер расчетного счета не соответсвует БИК';
        },

        innError() {
            if (this.$v.form.inn.$dirty && this.$v.form.inn.$invalid) return 'Неправильный ИНН';
        },

        bikError() {
            if (
                this.$v.form.bik.$dirty &&
                (this.$v.form.bik.$invalid ||
                    this.$v.form.bank.$invalid ||
                    this.$v.form.correspondentAccount.$invalid ||
                    this.$v.form.address.$invalid)
            )
                return 'Неправильный БИК';
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(CABINET_MODULE_PATH, [UPDATE_REQUISITES]),

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },

        resetCompany() {
            this.form.name = null;
        },

        resetBank() {
            this.form.correspondentAccount = null;
            this.form.address = null;
            this.form.b = null;
        },

        async findCompany(query, count = 1) {
            try {
                const { suggestions } = await $dadata.post('/findById/party', { query, count });
                this.existInn = suggestions.length !== 0;
                if (!this.existInn) return this.resetCompany();

                const suggestion = suggestions[0];
                this.form.name = suggestion.data.name.short_with_opf;
            } catch (error) {
                $logger.error(error);
            }
        },

        async findBank(query, count = 1) {
            try {
                const { suggestions } = await $dadata.post('/findById/bank', { query, count });
                this.existBank = suggestions.length !== 0;
                if (!this.existBank) return this.resetBank();

                const suggestion = suggestions[0];
                this.form.bank = suggestion.data.name.short;
                this.form.correspondentAccount = suggestion.data.correspondent_account;
                this.form.address = suggestion.data.address.unrestricted_value;
            } catch (error) {
                $logger.error(error);
            }
        },

        onInnChange(value) {
            this.form.inn = value;
            if (!this.$v.form.inn.$invalid) this.findCompany(value);
            else this.resetCompany();
        },

        onBikChange(value) {
            this.form.bik = value;
            if (!this.$v.form.bik.$invalid) this.findBank(value);
            else this.resetBank();
        },

        onSubmit() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this[UPDATE_REQUISITES]({ ...this.form });
                this.onClose();
            }
        },
    },

    beforeMount() {
        const requisites = this[REQUISITES] || {};
        this.form = { ...requisites };
    },
};
</script>
