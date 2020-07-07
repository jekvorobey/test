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
                <div
                    class="cabinet-view__avatar-placeholder"
                    :class="{ 'cabinet-view__avatar-placeholder--empty': !avatarPlaceholder }"
                >
                    <template v-if="avatarPlaceholder">
                        {{ avatarPlaceholder }}
                    </template>
                    <v-svg v-else name="account-middle" width="32" height="32" />
                </div>
            </image-picker>
        </div>

        <attention-panel v-if="!canBuy" class="cabinet-view__attention">
            <div class="cabinet-view__attention-inner">
                <div class="cabinet-view__attention-inner-info">
                    <strong>Профессиональный статус: не подтвержден</strong><br />
                    <template
                        v-if="((portfolio && portfolio.length === 0) && (certificates && certificates.length === 0))"
                    >
                        В данный момент наши эксперты изучают Ваше портфолио. Как только мы подтвердим Ваш статус
                        Профессионала, Вы получите от нас SMS-оповещение и сразу сможете совершать покупки.
                    </template>
                    <template v-else>
                        В данный момент наши эксперты изучают Ваше портфолио
                    </template>
                </div>
                <v-button
                    v-if="((portfolio && portfolio.length === 0) && (certificates && certificates.length === 0))"
                    class="btn--outline cabinet-view__attention-inner-btn"
                    @click="onOpenPortfoliosModal"
                >
                    Подтвердить статус
                </v-button>
            </div>
        </attention-panel>

        <attention-panel v-if="!fullName || !hasPhone" class="cabinet-view__attention">
            <div class="cabinet-view__attention-inner">
                <div class="cabinet-view__attention-inner-info">
                    <strong>Заполни профиль для совершения покупок</strong><br />
                    Чтобы получить доступ к покупкам, укажи свои ФИО и номер телефона
                </div>
                <v-button class="btn--outline cabinet-view__attention-inner-btn" @click="onScrollToPrivate">
                    Заполнить данные
                </v-button>
            </div>
        </attention-panel>

        <cabinet-info-panel ref="personal" class="cabinet-view__panel" />

        <cabinet-referral-panel v-if="referralPartner" class="cabinet-view__panel" />

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

        <info-panel class="cabinet-view__panel" header="Социальные сети для авторизации">
            <div class="container container--tablet-lg">
                <ul class="cabinet-view__panel-list">
                    <info-row
                        class="cabinet-view__panel-item cabinet-view__panel-item--inline"
                        v-for="driver in socialDrivers"
                        :name="$t(`profile.socials.${driver}`)"
                        :value="socialMap[driver] && socialMap[driver].name"
                        :key="driver"
                    >
                        <template v-slot:link>
                            <v-link class="cabinet-view__panel-item-link" tag="button" @click="onChangeSocial(driver)">
                                {{ socialMap[driver] ? 'Подключить' : 'Отключить' }}
                            </v-link>
                        </template>
                    </info-row>
                </ul>
            </div>
        </info-panel>

        <cabinet-requisites-panel v-if="referralPartner" class="cabinet-view__panel" />

        <div class="cabinet-view__controls">
            <v-button class="cabinet-view__save-btn" @click="onSave">Сохранить</v-button>
        </div>

        <transition name="fade">
            <password-edit-modal v-if="$isServer || (hasPhone && isPasswordEditOpen)" />
        </transition>

        <transition name="fade">
            <portfolio-edit-modal v-if="$isServer || isPortofioEditOpen" />
        </transition>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';

import AttentionPanel from '@components/AttentionPanel/AttentionPanel.vue';

import InfoRow from '@components/profile/InfoRow/InfoRow.vue';
import InfoPanel from '@components/profile/InfoPanel/InfoPanel.vue';
import ImagePicker from '@components/profile/ImagePicker/ImagePicker.vue';

import CabinetInfoPanel from '@components/profile/CabinetInfoPanel/CabinetInfoPanel.vue';
import CabinetReferralPanel from '@components/profile/CabinetReferralPanel/CabinetReferralPanel.vue';
import CabinetRequisitesPanel from '@components/profile/CabinetRequisitesPanel/CabinetRequisitesPanel.vue';

import PasswordEditModal from '@components/profile/PasswordEditModal/PasswordEditModal.vue';
import PortfolioEditModal from '@components/profile/PortfolioEditModal/PortfolioEditModal.vue';

import { $store, $progress, $logger } from '@services';
import { mapState, mapActions, mapGetters } from 'vuex';

import { LOCALE } from '@store';

import { NAME as AUTH_MODULE, HAS_SESSION, USER, CAN_BUY, REFERRAL_PARTNER, REFERRAL_CODE } from '@store/modules/Auth';
import { GET_SOCIAL_LINK, CHECK_SESSION, FETCH_USER } from '@store/modules/Auth/actions';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import {
    NAME as CABINET_MODULE,
    AVATAR,
    HAS_PASSWORD,
    SOCIAL,
    CERTIFICATES,
    LAST_NAME,
    FIRST_NAME,
    PHONE,
    PORTFOLIO,
} from '@store/modules/Profile/modules/Cabinet';
import {
    SET_LOAD,
    FETCH_CABINET_DATA,
    UPDATE_AVATAR,
    DELETE_AVATAR,
    DELETE_SOCIAL,
    UPLOAD_CERTIFICATE,
    DELETE_CERTIFICATE,
    LOAD_CERTIFICATE,
} from '@store/modules/Profile/modules/Cabinet/actions';
import { FULL_NAME } from '@store/modules/Profile/modules/Cabinet/getters';

import { socials, httpCodes, modalName, mimeType } from '@enums';
import { cancelRoute } from '@settings';
import '@images/sprites/edit.svg';
import '@images/sprites/link.svg';
import '@images/sprites/account-middle.svg';
import './Cabinet.css';

const CABINET_MODULE_PATH = `${PROFILE_MODULE}/${CABINET_MODULE}`;

const avatarAcceptedTypes = {
    [mimeType.image.JPEG]: '.jpg',
    [mimeType.image.PNG]: '.png',
};

const panelScrollOffset = 24;

export default {
    name: 'cabinet',

    components: {
        VSvg,
        VLink,
        VButton,

        AttentionPanel,

        InfoRow,
        InfoPanel,
        ImagePicker,

        CabinetInfoPanel,
        CabinetReferralPanel,
        CabinetRequisitesPanel,

        PasswordEditModal,
        PortfolioEditModal,
    },

    data() {
        return {
            socialDrivers: [socials.VKONTAKTE, socials.FACEBOOK, socials.GOOGLE],
            files: [],
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState(AUTH_MODULE, {
            [CAN_BUY]: state => (state[USER] && state[USER][CAN_BUY]) || false,
            [REFERRAL_PARTNER]: state => (state[USER] && state[USER][REFERRAL_PARTNER]) || false,
            [REFERRAL_CODE]: state => (state[USER] && state[USER][REFERRAL_CODE]) || false,
        }),

        ...mapState(MODAL_MODULE, {
            isPasswordEditOpen: state =>
                state[MODALS][modalName.profile.PASSWORD_EDIT] && state[MODALS][modalName.profile.PASSWORD_EDIT].open,
            isPortofioEditOpen: state =>
                state[MODALS][modalName.profile.PORTFOLIO_EDIT] && state[MODALS][modalName.profile.PORTFOLIO_EDIT].open,
        }),

        ...mapGetters(CABINET_MODULE_PATH, [FULL_NAME]),
        ...mapState(CABINET_MODULE_PATH, [
            AVATAR,
            HAS_PASSWORD,
            SOCIAL,
            LAST_NAME,
            FIRST_NAME,
            PHONE,
            CERTIFICATES,
            PORTFOLIO,
        ]),

        avatarPlaceholder() {
            return `${(this[LAST_NAME] && this[LAST_NAME].slice(0, 1)) || ''}${(this[FIRST_NAME] &&
                this[FIRST_NAME].slice(0, 1)) ||
                ''}`;
        },

        avatarAcceptedTypes() {
            return avatarAcceptedTypes;
        },

        expectedTypesMap() {
            return acceptedTypes;
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
        ...mapActions(AUTH_MODULE, [GET_SOCIAL_LINK, FETCH_USER]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(CABINET_MODULE_PATH, [FETCH_CABINET_DATA, UPDATE_AVATAR, DELETE_AVATAR, DELETE_SOCIAL]),

        onScrollToPrivate() {
            const { personal } = this.$refs;
            window.scrollTo({
                top: personal.$el.offsetTop,
                behavior: 'smooth',
            });
        },

        onImageChanged(data) {
            this[UPDATE_AVATAR](data);
            this[FETCH_USER]();
        },

        onImageDelete() {
            this[DELETE_AVATAR]();
            this[FETCH_USER]();
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

        onOpenPortfoliosModal() {
            this[CHANGE_MODAL_STATE]({ name: modalName.profile.PORTFOLIO_EDIT, open: true });
        },

        onOpenPasswordModal() {
            this[CHANGE_MODAL_STATE]({ name: modalName.profile.PASSWORD_EDIT, open: true });
        },

        onSave() {
            this[CHANGE_MODAL_STATE]({
                name: modalName.general.NOTIFICATION,
                open: true,
                state: {
                    title: 'Уведомление',
                    message: 'Все данные сохранены',
                },
            });
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
};
</script>
