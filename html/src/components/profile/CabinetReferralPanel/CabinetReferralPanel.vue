<template>
    <info-panel class="cabinet-referral-panel" header="Реферальные данные">
        <div class="container container--tablet-lg">
            <ul class="cabinet-view__panel-list">
                <info-row class="cabinet-referral-panel__item" name="Ваш реферальный код">
                    <!--<template>
                        <v-input
                            class="cabinet-referral-panel__item-input"
                            v-model="$v.code.$model"
                            :show-error="false"
                            :error="isReferralCodeDirty && $v.code.$invalid"/>
                        <v-button
                            class="cabinet-info-panel__item-btn"
                            v-if="isReferralCodeDirty"
                            :disabled="$v.code.$invalid"
                            @click="onSubmit">
                            Подтвердить
                        </v-button>
                    </template>-->
                    <template>
                        {{ referralCode }}
                    </template>
                </info-row>

                <info-row class="cabinet-referral-panel__item" name="Ваш QR код">
                    <template>
                        <span
                            ref="qrSvg"
                            @click="QRDownload"
                            v-if="qrImage"
                            v-html="qrImage"
                            class="cabinet-referral-panel__qr-code"
                        ></span>
                    </template>
                </info-row>

                <info-row class="cabinet-referral-panel__item" name="Реферальная ссылка">
                    <v-link class="cabinet-referral-panel__link" tag="button" @click="onCopyToClipboard($event)">
                        <v-svg name="link" :width="iconSize" :height="iconSize"/>
                        <span>&nbsp;&nbsp;Скопировать ссылку</span>
                    </v-link>
                </info-row>
                <info-row
                    class="cabinet-referral-panel__item"
                    name="Персональная скидка"
                    :value="referralPersonalDiscount.percent && `${referralPersonalDiscount.percent}%`"
                />
            </ul>
        </div>
    </info-panel>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import VInputMask from '@controls/VInput/VInputMask.vue';

import InfoRow from '@components/profile/InfoRow/InfoRow.vue';
import InfoPanel from '@components/profile/InfoPanel/InfoPanel.vue';
import {mapActions, mapState} from 'vuex';

import {NAME as AUTH_MODULE, REFERRAL_CODE, USER} from '@store/modules/Auth';
import {SET_REFERRER_CODE} from '@store/modules/Auth/actions';

import {NAME as MODAL_MODULE} from '@store/modules/Modal';
import {CHANGE_MODAL_STATE} from '@store/modules/Modal/actions';

import {NAME as PROFILE_MODULE} from '@store/modules/Profile';
import {
    CAN_EDIT_REFERRAL_CODE,
    NAME as CABINET_MODULE,
    REFERRAL_PERSONAL_DISCOUNT,
} from '@store/modules/Profile/modules/Cabinet';
import {SET_CAN_EDIT_CODE, UPDATE_REFERRER_CODE} from '@store/modules/Profile/modules/Cabinet/actions';

import {saveToClipboard} from '@util';
import {generateReferralLink} from '@util/profile';
import {modalName} from '@enums';
import validationMixin, {minLength, referrerCode, required} from '@plugins/validation';
import {QRGenerate} from "@util/qr-generator";
import {svgToPng} from "@util/svg-to-png-converter";
import './CabinetReferralPanel.css';

const CABINET_MODULE_PATH = `${PROFILE_MODULE}/${CABINET_MODULE}`;

export default {
    name: 'cabinet-referral-panel',
    mixins: [validationMixin],

    components: {
        VLink,
        VButton,
        VInput,
        VInputMask,

        InfoRow,
        InfoPanel,
    },

    validations: {
        code: {
            required,
            minLength: minLength(2),
            referrerCode,
        },
    },

    data() {
        return {
            code: null,
            qrImage: null
        };
    },

    computed: {
        ...mapState(CABINET_MODULE_PATH, [REFERRAL_PERSONAL_DISCOUNT, CAN_EDIT_REFERRAL_CODE]),
        ...mapState(AUTH_MODULE, {
            [REFERRAL_CODE]: (state) => (state[USER] && state[USER][REFERRAL_CODE]) || false,
        }),

        codeError() {
            if (this.$v.code.$dirty) {
                if (!this.$v.code.required) return this.$t('validation.errors.required');
                if (!this.$v.code.minLength) return 'Минимальная длина 2 символа';
                if (!this.$v.code.referrerCode) return 'Допустимы латинские буквы, цифры, тире и нижние подчеркивания';
            }
        },

        isReferralCodeDirty() {
            return this.code !== this[REFERRAL_CODE] && this.$v.code.$dirty;
        },

        iconSize() {
            return this.$mq.tablet ? 24 : 16;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(AUTH_MODULE, [SET_REFERRER_CODE]),
        ...mapActions(CABINET_MODULE_PATH, [UPDATE_REFERRER_CODE, SET_CAN_EDIT_CODE]),

        async QRDownload() {
            let svgData = await QRGenerate(1000, this.code);

            await svgToPng(svgData, 0, 'black')
                .then(pngData => {
                    let downloadLink = document.createElement("a");
                    downloadLink.href = pngData;
                    downloadLink.download = this.code + '.png';
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                })
                .catch(error => console.log('svgToPng error: ', error))
        },

        onCopyToClipboard(e) {
            const link = generateReferralLink(this[REFERRAL_CODE]);
            const result = saveToClipboard(link);
            const message = result ? 'Успешно скопировано' : 'Не удается скопировать';
            this[CHANGE_MODAL_STATE]({name: modalName.general.NOTIFICATION, open: true, state: {message}});
            e.target.focus();
        },

        async onSubmit() {
            this.$v.code.$touch();

            if (!this.$v.code.$invalid) {
                try {
                    const {code, can_edit_referral_code} = await this[UPDATE_REFERRER_CODE](this.code);

                    this[SET_REFERRER_CODE](code);
                    this[SET_CAN_EDIT_CODE](can_edit_referral_code);
                } catch (error) {
                    this[CHANGE_MODAL_STATE]({
                        name: modalName.general.NOTIFICATION,
                        open: true,
                        state: {
                            title: 'Ошибка при смене реферального кода',
                            message:
                                'Произошла ошибка при смене реферального кода.\nВозможно такой код уже существует. Попробуйте снова.',
                        },
                    });
                }
            }
        },
    },

    async mounted() {
        this.qrImage = await QRGenerate(200, this.code)
    },

    created() {
        this.code = this[REFERRAL_CODE];
    },
};
</script>
