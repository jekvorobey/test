<template>
    <section class="section cabinet-view">
        <div class="container container--tablet-lg">
            <h2 class="cabinet-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
            <image-picker
                class="cabinet-view__avatar"
                :image="avatar"
                :valid-types-map="avatarAcceptedTypes"
                @changed="onImageChanged"
                @delete="onImageDelete"
            >
                <div class="cabinet-view__avatar-placeholder">
                    {{ avatarPlaceholder }}
                </div>
            </image-picker>
        </div>

        <attention-panel v-if="!canBuy" class="cabinet-view__attention">
            <div class="cabinet-view__attention-inner">
                <div>Статус: <strong class="cabinet-view__attention-inner-warning">Нет доступа к покупкам</strong></div>
                <template v-if="!phone || (portfolio && portfolio.length === 0)">
                    Чтобы получить доступ к покупкам, заполните
                    <v-link tag="button" class="cabinet-view__attention-inner-link" @click.prevent="onScrollToPrivate">
                        портфолио и телефон
                    </v-link>
                </template>
                <template v-else>
                    В данный момент наши эксперты изучают Ваше портфолио
                </template>
            </div>
        </attention-panel>

        <info-panel ref="panel" class="cabinet-view__panel" header="Личные данные">
            <template v-slot:controls>
                <v-link class="cabinet-view__panel-link" tag="button" @click="onOpenPersonalModal">
                    <v-svg name="edit" :width="iconSize" :height="iconSize" />
                    <span>&nbsp;&nbsp;Изменить</span>
                </v-link>
            </template>
            <div class="container container--tablet-lg">
                <ul class="cabinet-view__panel-list">
                    <info-row class="cabinet-view__panel-item" name="ФИО" :value="fullName" />
                    <info-row class="cabinet-view__panel-item" name="Дата рождения" :value="computedBirthday" />
                    <info-row class="cabinet-view__panel-item" name="Пол">
                        {{ gender ? $t(`genderType.${gender}`) : '' }}
                    </info-row>
                    <info-row class="cabinet-view__panel-item" name="Номер телефона" :value="phone">
                        <template v-slot:link>
                            <v-link
                                class="cabinet-view__panel-item-link"
                                tag="button"
                                @click.prevent="onOpenPhoneModal"
                            >
                                Изменить
                            </v-link>
                        </template>
                    </info-row>
                    <info-row class="cabinet-view__panel-item" name="Email" :value="email">
                        <template v-slot:link>
                            <v-link
                                class="cabinet-view__panel-item-link"
                                tag="button"
                                @click.prevent="onOpenEmailModal"
                            >
                                Изменить
                            </v-link>
                        </template>
                    </info-row>
                    <info-row class="cabinet-view__panel-item" name="Портфолио">
                        <ul v-if="portfolio && portfolio.length > 0">
                            <li v-for="(item, index) in portfolio" :key="index">
                                <a
                                    class="cabinet-view__panel-item-link"
                                    :href="item.link"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    {{ item.name }}
                                </a>
                            </li>
                        </ul>
                        <template v-else>
                            -
                        </template>

                        <template v-slot:link>
                            <v-link
                                class="cabinet-view__panel-item-link"
                                tag="button"
                                @click.prevent="onOpenPortfoliosModal"
                            >
                                {{ portfolio && portfolio.length > 0 ? 'Изменить' : 'Заполнить' }}
                            </v-link>
                        </template>
                    </info-row>
                    <info-row class="cabinet-view__panel-item" name="Профиль" :value="profilesString">
                        <template v-slot:link>
                            <v-link
                                class="cabinet-view__panel-item-link"
                                tag="button"
                                @click.prevent="onOpenActivitiesEditModal"
                            >
                                {{ profilesString ? 'Изменить' : 'Заполнить' }}
                            </v-link>
                        </template>
                    </info-row>
                </ul>
            </div>
        </info-panel>

        <info-panel class="cabinet-view__panel" header="Пароль">
            <template v-slot:controls>
                <v-link v-if="hasPhone" class="cabinet-view__panel-link" tag="button" @click="onOpenPasswordModal">
                    <v-svg name="edit" :width="iconSize" :height="iconSize" />
                    <span>&nbsp;&nbsp;{{ hasPassword ? 'Изменить' : 'Создать' }}</span>
                </v-link>
            </template>
            <div class="container container--tablet-lg">
                <ul class="cabinet-view__panel-list">
                    <info-row class="cabinet-view__panel-item" name="Пароль">
                        <template v-if="hasPassword">• • • • • • • • • • •</template>
                    </info-row>
                </ul>
            </div>
        </info-panel>

        <info-panel class="cabinet-view__panel" header="Социальные сети">
            <div class="container container--tablet-lg">
                <ul class="cabinet-view__panel-list">
                    <info-row
                        class="cabinet-view__panel-item"
                        v-for="driver in socialDrivers"
                        :name="$t(`profile.socials.${driver}`)"
                        :value="socialMap[driver] && socialMap[driver].name"
                        :key="driver"
                    >
                        <template v-slot:link>
                            <v-link class="cabinet-view__panel-item-link" tag="button" @click="onChangeSocial(driver)">
                                {{ socialMap[driver] ? 'Открепить' : 'Прикрепить' }}
                            </v-link>
                        </template>
                    </info-row>
                </ul>
            </div>
        </info-panel>

        <info-panel v-if="referralPartner" class="cabinet-view__panel" header="Реквизиты">
            <template v-slot:controls>
                <v-link class="cabinet-view__panel-link" tag="button" @click="onOpenDetailsModal">
                    <v-svg name="edit" :width="iconSize" :height="iconSize" />
                    <span>&nbsp;&nbsp;Изменить</span>
                </v-link>
            </template>
            <div class="container container--tablet-lg">
                <ul class="cabinet-view__panel-list">
                    <info-row class="cabinet-view__panel-item" name="Наименование ИП" :value="requisites.name" />
                    <info-row class="cabinet-view__panel-item" name="ИНН" :value="requisites.inn" />
                    <info-row class="cabinet-view__panel-item" name="Расчетный счет" :value="requisites.account" />
                    <info-row class="cabinet-view__panel-item" name="БИК" :value="requisites.bik" />
                    <info-row class="cabinet-view__panel-item" name="Банк" :value="requisites.bank" />
                    <info-row
                        class="cabinet-view__panel-item"
                        name="Корреспондентский счет банка"
                        :value="requisites.correspondentAccount"
                    />
                    <info-row class="cabinet-view__panel-item" name="Юридический адрес" :value="requisites.address" />
                </ul>
            </div>
        </info-panel>

        <info-panel class="cabinet-view__panel" header="Сертификаты">
            <div class="container container--tablet-lg">
                <ul class="cabinet-view__panel-list">
                    <info-row
                        class="text-sm cabinet-view__panel-item cabinet-view__panel-item--dropzone"
                        :name="certificateRowName"
                    >
                        <v-filepond
                            style="width: 400px;"
                            name="file"
                            label-file-loading="Загрузка..."
                            label-file-processing="Сохранение..."
                            label-file-processing-error="Ошибка при сохранении"
                            label-file-processing-complete="Успешно"
                            label-filer-remove-error="Ошибка при удалении"
                            label-tap-to-cancel="Нажмите чтобы отменить"
                            label-tap-to-undo="Нажмите чтобы удалить"
                            label-button-remove-item="Удалить"
                            label-button-abort-item="Удалить"
                            label-button-abort-item-load="Отменить"
                            label-button-abort-item-processing="Отменить"
                            max-file-size="5MB"
                            label-max-file-size="Максимальный размер файла {filesize}"
                            label-max-file-size-exceeded="Файл слишком большой"
                            label-file-type-not-allowed="Неверный формат файла"
                            file-validate-type-label-expected-types="Типы {allTypes}"
                            :file-validate-type-label-expected-types-map="expectedTypesMap"
                            :label-idle="labelTemplate"
                            :acceptedFileTypes="acceptedTypes"
                            :fileValidateTypeDetectType="fileValidateTypeDetectType"
                            :files="files"
                            :server="serverOptions"
                            :chunk-uploads="false"
                            :allow-paste="false"
                            :allow-multiple="true"
                        />
                    </info-row>
                </ul>
            </div>
        </info-panel>

        <transition name="fade">
            <personal-edit-modal v-if="$isServer || isPersonalEditOpen" />
        </transition>
        <transition name="fade">
            <portfolio-edit-modal v-if="$isServer || isPortofioEditOpen" />
        </transition>
        <transition name="fade">
            <activities-edit-modal v-if="$isServer || isActivitiesEditOpen" />
        </transition>
        <transition name="fade">
            <email-edit-modal v-if="$isServer || isEmailEditOpen" />
        </transition>
        <transition name="fade">
            <phone-edit-modal v-if="$isServer || isPhoneEditOpen" />
        </transition>
        <transition name="fade">
            <password-edit-modal v-if="$isServer || (hasPhone && isPasswordEditOpen)" />
        </transition>
        <transition name="fade">
            <details-modal v-if="$isServer || isDetailsOpen" />
        </transition>
    </section>
</template>

<script>
import VSvg from '../../../components/controls/VSvg/VSvg.vue';
import VLink from '../../../components/controls/VLink/VLink.vue';
import VFilepond, { fileValidation } from '../../../components/controls/VFilepond/VFilepond.vue';

import AttentionPanel from '../../../components/AttentionPanel/AttentionPanel.vue';

import InfoRow from '../../../components/profile/InfoRow/InfoRow.vue';
import InfoPanel from '../../../components/profile/InfoPanel/InfoPanel.vue';
import ImagePicker from '../../../components/profile/ImagePicker/ImagePicker.vue';

import PortfolioEditModal, {
    NAME as PORTFOLIOS_MODAL_NAME,
} from '../../../components/profile/PortfolioEditModal/PortfolioEditModal.vue';
import EmailEditModal, {
    NAME as EDIT_EMAIL_MODAL_NAME,
} from '../../../components/profile/EmailEditModal/EmailEditModal.vue';
import ActivitiesEditModal, {
    NAME as ACTIVITIES_MODAL_NAME,
} from '../../../components/profile/ActivitiesEditModal/ActivitiesEditModal.vue';
import PhoneEditModal, {
    NAME as EDIT_PHONE_MODAL_NAME,
} from '../../../components/profile/PhoneEditModal/PhoneEditModal.vue';
import PersonalEditModal, {
    NAME as EDIT_PERSONAL_MODAL_NAME,
} from '../../../components/profile/PersonalEditModal/PersonalEditModal.vue';
import PasswordEditModal, {
    NAME as EDIT_PASSWORD_MODAL_NAME,
} from '../../../components/profile/PasswordEditModal/PasswordEditModal.vue';
import DetailsModal, { NAME as DETAILS_MODAL_NAME } from '../../../components/profile/DetailsModal/DetailsModal.vue';

import { $store, $progress, $logger } from '../../../services/ServiceLocator';
import { mapState, mapActions, mapGetters } from 'vuex';

import { LOCALE } from '../../../store';

import { NAME as AUTH_MODULE, HAS_SESSION } from '../../../store/modules/Auth';
import { GET_SOCIAL_LINK, CHECK_SESSION } from '../../../store/modules/Auth/actions';

import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '../../../store/modules/Profile';
import {
    NAME as CABINET_MODULE,
    BIRTHDAY,
    GENDER,
    PHONE,
    EMAIL,
    PORTFOLIO,
    ACTIVITIES,
    REQUISITES,
    AVATAR,
    HAS_PASSWORD,
    SOCIAL,
    CERTIFICATES,
    FIRST_NAME,
    LAST_NAME,
    CAN_BUY,
    REFERRAL_PARTNER,
} from '../../../store/modules/Profile/modules/Cabinet';
import { FULL_NAME, PROFILES_STRING } from '../../../store/modules/Profile/modules/Cabinet/getters';
import {
    SET_LOAD,
    FETCH_CABINET_DATA,
    UPDATE_AVATAR,
    DELETE_AVATAR,
    DELETE_SOCIAL,
    UPLOAD_CERTIFICATE,
    DELETE_CERTIFICATE,
    LOAD_CERTIFICATE,
} from '../../../store/modules/Profile/modules/Cabinet/actions';

import { socials, mimeType, httpCodes } from '../../../assets/scripts/enums/general';
import { cancelRoute } from '../../../assets/scripts/settings/general';
import '../../../assets/images/sprites/edit.svg';
import './Cabinet.css';

const CABINET_MODULE_PATH = `${PROFILE_MODULE}/${CABINET_MODULE}`;

const avatarAcceptedTypes = {
    [mimeType.image.JPEG]: '.jpg',
    [mimeType.image.PNG]: '.png',
};

const acceptedTypes = {
    [mimeType.image.JPEG]: '.jpg',
    [mimeType.image.PNG]: '.png',
    [mimeType.application.PDF]: '.pdf',
    [mimeType.application.DOC]: '.doc',
    [mimeType.application.DOCX]: '.docx',
};

const panelScrollOffset = 24;

export default {
    name: 'cabinet',

    components: {
        VSvg,
        VLink,
        VFilepond,

        AttentionPanel,

        InfoRow,
        InfoPanel,
        ImagePicker,

        DetailsModal,
        PortfolioEditModal,
        ActivitiesEditModal,
        EmailEditModal,
        PhoneEditModal,
        PersonalEditModal,
        PasswordEditModal,
    },

    data() {
        return {
            socialDrivers: [socials.VKONTAKTE, socials.FACEBOOK, socials.GOOGLE],
            files: [],
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState(MODAL_MODULE, {
            isDetailsOpen: state => state[MODALS][DETAILS_MODAL_NAME] && state[MODALS][DETAILS_MODAL_NAME].open,
            isPortofioEditOpen: state =>
                state[MODALS][PORTFOLIOS_MODAL_NAME] && state[MODALS][PORTFOLIOS_MODAL_NAME].open,
            isActivitiesEditOpen: state =>
                state[MODALS][ACTIVITIES_MODAL_NAME] && state[MODALS][ACTIVITIES_MODAL_NAME].open,
            isEmailEditOpen: state => state[MODALS][EDIT_EMAIL_MODAL_NAME] && state[MODALS][EDIT_EMAIL_MODAL_NAME].open,
            isPhoneEditOpen: state => state[MODALS][EDIT_PHONE_MODAL_NAME] && state[MODALS][EDIT_PHONE_MODAL_NAME].open,
            isPersonalEditOpen: state =>
                state[MODALS][EDIT_PERSONAL_MODAL_NAME] && state[MODALS][EDIT_PERSONAL_MODAL_NAME].open,
            isPasswordEditOpen: state =>
                state[MODALS][EDIT_PASSWORD_MODAL_NAME] && state[MODALS][EDIT_PASSWORD_MODAL_NAME].open,
        }),
        ...mapState(CABINET_MODULE_PATH, [
            CAN_BUY,
            AVATAR,
            BIRTHDAY,
            GENDER,
            PHONE,
            EMAIL,
            PORTFOLIO,
            ACTIVITIES,
            REQUISITES,
            HAS_PASSWORD,
            SOCIAL,
            CERTIFICATES,
            LAST_NAME,
            FIRST_NAME,
            REFERRAL_PARTNER,
        ]),
        ...mapGetters(CABINET_MODULE_PATH, [FULL_NAME, PROFILES_STRING]),

        serverOptions() {
            const that = this;

            return {
                process: async (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
                    try {
                        const formData = new FormData();
                        formData.append(fieldName, file, file.name);
                        const data = await that[UPLOAD_CERTIFICATE](formData);
                        load(data.id);
                    } catch (err) {
                        error(err);
                    }

                    // Should expose an abort method so the request can be cancelled
                    return {
                        abort: () => {
                            // This function is entered if the user has tapped the cancel button
                            //request.abort();
                            // Let FilePond know the request has been cancelled
                            abort();
                        },
                    };
                },

                load: async (source, load, error, progress, abort, headers) => {
                    try {
                        const name = source.url.split('/').pop();
                        const blob = await that[LOAD_CERTIFICATE](name);
                        blob.name = source.name;
                        load(blob);
                    } catch (err) {
                        error(err);
                    }

                    // Should expose an abort method so the request can be cancelled
                    return {
                        abort: () => {
                            // User tapped cancel, abort our ongoing actions here
                            // Let FilePond know the request has been cancelled
                            abort();
                        },
                    };
                },

                revert: async (uniqueFileId, load, error) => {
                    try {
                        await that[DELETE_CERTIFICATE](Number(uniqueFileId));
                        load();
                    } catch (err) {
                        error(err);
                    }
                },

                remove: async (source, load, error) => {
                    try {
                        await that[DELETE_CERTIFICATE](Number(source.id));
                        load();
                    } catch (err) {
                        error(err);
                    }
                },

                fetch: null,
            };
        },

        computedBirthday() {
            const birthday = this[BIRTHDAY];
            if (!birthday) return null;
            const options = { month: 'long', day: 'numeric', year: 'numeric' };
            const date = new Date(birthday);
            return date.toLocaleDateString(this[LOCALE], options);
        },

        avatarPlaceholder() {
            return `${(this[LAST_NAME] && this[LAST_NAME].slice(0, 1)) || ''}${(this[FIRST_NAME] &&
                this[FIRST_NAME].slice(0, 1)) ||
                ''}`;
        },

        labelTemplate() {
            return "<span class='filepond--label-action'>Выберите файл</span> или перетащите его сюда";
        },

        avatarAcceptedTypes() {
            return avatarAcceptedTypes;
        },

        acceptedTypes() {
            return Object.keys(this.expectedTypesMap);
        },

        expectedTypesMap() {
            return acceptedTypes;
        },

        certificateRowName() {
            return `Файлы формата ${Object.values(this.expectedTypesMap).join(', ')}, не более 5 МБ каждый.`;
        },

        socialMap() {
            const social = this[SOCIAL] || [];
            const socialMap = {};
            social.forEach(d => (socialMap[d.driver] = d));
            return socialMap;
        },

        hasPhone() {
            return !!this[PHONE];
        },

        isTablet() {
            return this.$mq.tablet;
        },

        iconSize() {
            return this.$mq.tablet ? 24 : 16;
        },
    },

    methods: {
        ...mapActions(AUTH_MODULE, [GET_SOCIAL_LINK]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(CABINET_MODULE_PATH, [
            FETCH_CABINET_DATA,
            UPDATE_AVATAR,
            DELETE_AVATAR,
            DELETE_SOCIAL,
            UPLOAD_CERTIFICATE,
            DELETE_CERTIFICATE,
            LOAD_CERTIFICATE,
        ]),

        fileValidateTypeDetectType(source, type) {
            return fileValidation(source, type);
        },

        onScrollToPrivate() {
            const { panel } = this.$refs;
            window.scrollTo({
                top: panel.$el.offsetTop,
                behavior: 'smooth',
            });
        },

        onImageChanged(data) {
            this[UPDATE_AVATAR](data);
        },

        onImageDelete() {
            this[DELETE_AVATAR]();
        },

        async onChangeSocial(driver) {
            const social = this.socialMap[driver];
            if (this.socialMap[driver]) this[DELETE_SOCIAL](social);
            else {
                try {
                    const backUrl = this.$route.fullPath;
                    const redirectUrl = `${document.location.origin}/social-login`;
                    const socialUrl = await this[GET_SOCIAL_LINK]({ backUrl, driver, redirectUrl });
                    document.location.href = socialUrl;
                } catch (error) {
                    return;
                }
            }
        },

        onOpenDetailsModal() {
            this[CHANGE_MODAL_STATE]({ name: DETAILS_MODAL_NAME, open: true });
        },

        onOpenPortfoliosModal() {
            this[CHANGE_MODAL_STATE]({ name: PORTFOLIOS_MODAL_NAME, open: true });
        },

        onOpenActivitiesEditModal() {
            this[CHANGE_MODAL_STATE]({ name: ACTIVITIES_MODAL_NAME, open: true });
        },

        onOpenEmailModal() {
            this[CHANGE_MODAL_STATE]({ name: EDIT_EMAIL_MODAL_NAME, open: true });
        },

        onOpenPhoneModal() {
            this[CHANGE_MODAL_STATE]({ name: EDIT_PHONE_MODAL_NAME, open: true });
        },

        onOpenPersonalModal() {
            this[CHANGE_MODAL_STATE]({ name: EDIT_PERSONAL_MODAL_NAME, open: true });
        },

        onOpenPasswordModal() {
            this[CHANGE_MODAL_STATE]({ name: EDIT_PASSWORD_MODAL_NAME, open: true });
        },
    },

    async serverPrefetch() {
        try {
            await this[FETCH_CABINET_DATA](this.$isServer);
        } catch (error) {
            $logger.error(error);
        }
    },

    beforeRouteEnter(to, from, next) {
        const { load } = $store.state[PROFILE_MODULE][CABINET_MODULE];

        if (load) {
            next();
            $store.dispatch(`${CABINET_MODULE_PATH}/${SET_LOAD}`, false);
            return;
        }

        $progress.start();
        $store
            .dispatch(`${CABINET_MODULE_PATH}/${FETCH_CABINET_DATA}`)
            .then(() => {
                next(vm => {
                    $progress.finish();
                });
            })
            .catch(thrown => {
                $progress.fail();
                if (thrown.status === httpCodes.FORBIDDEN) {
                    $store.dispatch(`${AUTH_MODULE}/${CHECK_SESSION}`, true);
                    return next(false);
                }
                next();
            });
    },

    beforeMount() {
        const certificates = this[CERTIFICATES];
        this.files = certificates.map(c => {
            return {
                source: c,
                options: {
                    type: 'local',
                },
            };
        });
    },
};
</script>
