<template>
    <info-panel class="cabinet-requisites-panel" header="Реквизиты">
        <div class="container container--tablet-lg">
            <ul class="cabinet-view__panel-list">
                <info-row class="cabinet-requisites-panel__item" name="ИНН">
                    <v-input
                        class="cabinet-requisites-panel__item-input"
                        maxLength="12"
                        placeholder="Введите ИНН"
                        :value="$v.form.inn.$model"
                        :error="$v.form.inn.$invalid"
                        :show-error="false"
                        @input="onInnChange"
                    />
                </info-row>
                <info-row class="cabinet-requisites-panel__item" name="Наименование ИП">
                    <v-input
                        class="cabinet-requisites-panel__item-input"
                        :value="$v.form.name.$model"
                        :show-error="false"
                        disabled
                    />
                </info-row>
                <info-row class="cabinet-requisites-panel__item" name="Расчетный счет">
                    <v-input
                        class="cabinet-requisites-panel__item-input"
                        v-model="form.account"
                        maxLength="20"
                        :show-error="false"
                        :error="$v.form.account.$invalid"
                    />
                </info-row>
                <info-row class="cabinet-requisites-panel__item" name="БИК">
                    <v-input
                        class="cabinet-requisites-panel__item-input"
                        :value="$v.form.bik.$model"
                        :error="$v.form.bik.$invalid"
                        :show-error="false"
                        @input="onBikChange"
                    />
                </info-row>
                <info-row class="cabinet-requisites-panel__item" name="КПП">
                    <v-input
                        class="cabinet-requisites-panel__item-input"
                        placeholder="Введите КПП"
                        :value="$v.form.kpp.$model"
                        :error="$v.form.kpp.$invalid"
                        maxLength="9"
                        :show-error="false"
                        @input="onKppChange"
                    />
                </info-row>
                <info-row class="cabinet-requisites-panel__item" name="Банк">
                    <v-input
                        class="cabinet-requisites-panel__item-input"
                        :value="form.bank"
                        :show-error="false"
                        disabled
                    />
                </info-row>
                <info-row class="cabinet-requisites-panel__item" name="Город, в котором находится отделение банка">
                    <v-input
                        class="cabinet-requisites-panel__item-input"
                        :value="form.payment_city"
                        :show-error="false"
                        disabled
                    />
                </info-row>
                <info-row class="cabinet-requisites-panel__item" name="Корреспондентский счет банка">
                    <v-input
                        class="cabinet-requisites-panel__item-input"
                        :value="$v.form.correspondentAccount.$model"
                        :show-error="false"
                        disabled
                    />
                </info-row>
                <info-row v-if="displayRow" class="cabinet-requisites-panel__item" name="Юридический адрес">
                    <v-input
                        class="cabinet-requisites-panel__item-textarea"
                        tag="textarea"
                        :value="form.address"
                        :show-error="false"
                        disabled
                    />
                </info-row>
            </ul>
        </div>
        <div class="cabinet-requisites-panel__controls">
            <v-button class="cabinet-requisites-panel__save-btn" :disabled="saveDisabled" @click="onSave"
                >Сохранить реквизиты</v-button
            >
        </div>
    </info-panel>
</template>

<script>
import VInput from '@controls/VInput/VInput.vue';
import VButton from '@controls/VButton/VButton.vue';

import InfoRow from '@components/profile/InfoRow/InfoRow.vue';
import InfoPanel from '@components/profile/InfoPanel/InfoPanel.vue';

import _debounce from 'lodash/debounce';
import { mapActions, mapState, mapGetters } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as CABINET_MODULE, REQUISITES } from '@store/modules/Profile/modules/Cabinet';
import { UPDATE_REQUISITES } from '@store/modules/Profile/modules/Cabinet/actions';

import { $dadata } from '@services';
import { httpCodes, modalName } from '@enums';
import { genderType } from '@enums/profile';
import { phoneMaskOptions } from '@settings';
import validationMixin, { required, inn, rs, bik, kpp } from '@plugins/validation';
import './CabinetRequisitesPanel.css';

const CABINET_MODULE_PATH = `${PROFILE_MODULE}/${CABINET_MODULE}`;

export default {
    name: 'cabinet-requisites-panel',
    mixins: [validationMixin],

    components: {
        VInput,
        VButton,

        InfoRow,
        InfoPanel,
    },

    validations: {
        form: {
            name: {
                required,
            },

            address: {
                 required,
            },

            payment_city: {
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

            kpp: {
                kpp,
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
                kpp: null,
                correspondentAccount: null,
                payment_city: null,
            },

            existBank: false,
            existInn: false,

            displayRow: false,
        };
    },

    computed: {
        ...mapState(CABINET_MODULE_PATH, [REQUISITES]),

        isTablet() {
            return this.$mq.tablet;
        },

        saveDisabled() {
            return this.$v.$invalid;
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
            this.form.address = null;
        },

        resetBank() {
            this.form.correspondentAccount = null;
            this.form.payment_city = null;
            this.form.b = null;
        },

        async findCompany(query, count = 1) {
            try {
                const { suggestions } = await $dadata.post('/findById/party', { query, count });
                this.existInn = suggestions.length !== 0;
                if (!this.existInn) return this.resetCompany();

                const suggestion = suggestions[0];
                this.form.name = suggestion.data.name.short_with_opf;
                this.form.address = suggestion.data.address.unrestricted_value;
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

                if (!this.form.bank || this.form.bank.length === 0) {
                    this.form.bank = suggestion.value;
                }

                this.form.correspondentAccount = suggestion.data.correspondent_account;
                this.form.payment_city = suggestion.data.payment_city;
            } catch (error) {
                $logger.error(error);
            }
        },

        onInnChange(value) {
            this.form.inn = value;
            if (!this.$v.form.inn.$invalid) this.findCompany(value);
            else this.resetCompany();
        },

        onKppChange(value) {
            this.form.kpp = value;
        },

        onBikChange(value) {
            this.form.bik = value;
            if (!this.$v.form.bik.$invalid) this.findBank(value);
            else this.resetBank();
        },

        async onSave() {
            const state = {
                title: 'Уведомление',
                message: 'Реквизиты обновлены',
                altBtn: {
                    message: 'Перейти к покупкам',
                    action: '/catalog',
                },
            };

            try {
                await this[UPDATE_REQUISITES]({ ...this.form });
            } catch (e) {
                state.message = 'Ошибка обновления. Данные не сохранены.';
            }

            this[CHANGE_MODAL_STATE]({
                name: modalName.general.NOTIFICATION,
                open: true,
                state,
            });
        },
    },

    created() {
        const requisites = this[REQUISITES] || {};
        this.form = { ...requisites };
    },

    beforeMount() {
        this.$watch('form', () => this.$v.$touch(), {
            deep: true,
        });
    },
};
</script>
