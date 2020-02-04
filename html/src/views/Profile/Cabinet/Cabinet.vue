<template>
    <section class="section cabinet-view">
        <div class="container container--tablet-lg">
            <h2 class="cabinet-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
            <image-picker class="cabinet-view__avatar" @fileChanged="onImageChanged" />
        </div>
        <info-panel class="cabinet-view__panel" header="Личные данные">
            <template v-slot:controls>
                <v-link class="cabinet-view__panel-link" tag="button">
                    <v-svg name="edit" :width="iconSize" :height="iconSize" />
                    <span>&nbsp;&nbsp;Изменить</span>
                </v-link>
            </template>
            <div class="container container--tablet-lg">
                <ul class="cabinet-view__panel-list">
                    <info-row class="cabinet-view__panel-item" name="ФИО" :value="fullName" />
                    <info-row class="cabinet-view__panel-item" name="Дата рождения" :value="bornDate" />
                    <info-row class="cabinet-view__panel-item" name="Пол" :value="sex" />
                    <info-row class="cabinet-view__panel-item" name="Номер телефона" :value="phone" />
                    <info-row class="cabinet-view__panel-item" name="Email" :value="email" />
                    <info-row class="cabinet-view__panel-item" name="Портфолио">
                        <ul v-if="portfolios && portfolios.length > 0">
                            <li v-for="portfolio in portfolios" :key="portfolio.id">
                                <a
                                    class="cabinet-view__panel-item-link"
                                    :href="portfolio.ref"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    {{ portfolio.name }}
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
                                {{ portfolios && portfolios.length > 0 ? 'Изменить' : 'Заполнить' }}
                            </v-link>
                        </template>
                    </info-row>
                    <info-row class="cabinet-view__panel-item" name="Профиль" :value="profilesString">
                        <template v-slot:link>
                            <v-link
                                class="cabinet-view__panel-item-link"
                                tag="button"
                                @click.prevent="onOpenProfilesModal"
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
                <v-link class="cabinet-view__panel-link" tag="button">
                    <v-svg name="edit" :width="iconSize" :height="iconSize" />
                    <span>&nbsp;&nbsp;Изменить</span>
                </v-link>
            </template>
            <div class="container container--tablet-lg">
                <ul class="cabinet-view__panel-list">
                    <info-row class="cabinet-view__panel-item" name="Пароль">
                        • • • • • • • • • • •
                    </info-row>
                </ul>
            </div>
        </info-panel>

        <info-panel class="cabinet-view__panel" header="Социальные сети">
            <template v-slot:controls>
                <v-link class="cabinet-view__panel-link" tag="button">
                    <v-svg name="edit" :width="iconSize" :height="iconSize" />
                    <span>&nbsp;&nbsp;Изменить</span>
                </v-link>
            </template>
            <div class="container container--tablet-lg">
                <ul class="cabinet-view__panel-list">
                    <info-row class="cabinet-view__panel-item" name="Vkontakte">
                        <template v-slot:link>
                            <v-link class="cabinet-view__panel-item-link" tag="button">
                                Подключить
                            </v-link>
                        </template>
                    </info-row>
                    <info-row class="cabinet-view__panel-item" name="Facebook" value="Dinis Bazgutdinov">
                        <template v-slot:link>
                            <v-link
                                class="cabinet-view__panel-item-link cabinet-view__panel-item-link--grey"
                                tag="button"
                            >
                                Отключить
                            </v-link>
                        </template>
                    </info-row>
                    <info-row class="cabinet-view__panel-item" name="Instagram" value="@disbag">
                        <template v-slot:link>
                            <v-link
                                class="cabinet-view__panel-item-link cabinet-view__panel-item-link--grey"
                                tag="button"
                            >
                                Отключить
                            </v-link>
                        </template>
                    </info-row>
                </ul>
            </div>
        </info-panel>

        <info-panel class="cabinet-view__panel" header="Реквизиты">
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
            <template v-slot:controls>
                <v-link class="cabinet-view__panel-link" tag="button">
                    <v-svg name="edit" :width="iconSize" :height="iconSize" />
                    <span>&nbsp;&nbsp;Изменить</span>
                </v-link>
            </template>
            <div class="container container--tablet-lg">
                <ul class="cabinet-view__panel-list">
                    <info-row
                        class="text-sm cabinet-view__panel-item cabinet-view__panel-item--dropzone"
                        name="Не более 10 файлов, jpeg, png, mp4, mov. Фото не более 5Mb, видео до 15Mb"
                    >
                        <div class="cabinet-view__panel-dropzone">
                            Выберите фото
                        </div>
                    </info-row>
                </ul>
            </div>
        </info-panel>

        <transition name="fade">
            <details-modal v-if="$isServer || (isDetailsOpen && !isPortofiosOpen && !isProfilesOpen)" />
        </transition>
        <transition name="fade">
            <portfolio-modal v-if="$isServer || (isPortofiosOpen && !isDetailsOpen && !isProfilesOpen)" />
        </transition>
        <transition name="fade">
            <profile-modal v-if="$isServer || (isProfilesOpen && !isDetailsOpen && !isPortofiosOpen)" />
        </transition>
    </section>
</template>

<script>
import VSvg from '../../../components/controls/VSvg/VSvg.vue';
import VLink from '../../../components/controls/VLink/VLink.vue';

import InfoRow from '../../../components/profile/InfoRow/InfoRow.vue';
import InfoPanel from '../../../components/profile/InfoPanel/InfoPanel.vue';
import ImagePicker from '../../../components/profile/ImagePicker/ImagePicker.vue';

import PortfolioModal, {
    NAME as PORTFOLIOS_MODAL_NAME,
} from '../../../components/profile/PortfolioModal/PortfolioModal.vue';
import ProfileModal, { NAME as PROFILE_MODAL_NAME } from '../../../components/profile/ProfileModal/ProfileModal.vue';
import DetailsModal, { NAME as DETAILS_MODAL_NAME } from '../../../components/profile/DetailsModal/DetailsModal.vue';

import { mapActions, mapState, mapGetters } from 'vuex';
import { $store } from '../../../services/ServiceLocator';

import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import { NAME as PROFILE_MODULE, CABINET_DATA } from '../../../store/modules/Profile';
import { FULL_NAME, PROFILES_STRING, REQUISITES } from '../../../store/modules/Profile/getters';

import '../../../assets/images/sprites/edit.svg';
import './Cabinet.css';

export default {
    name: 'cabinet',

    components: {
        VSvg,
        VLink,

        InfoRow,
        InfoPanel,
        ImagePicker,

        DetailsModal,
        PortfolioModal,
        ProfileModal,
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isDetailsOpen: state => state[MODALS][DETAILS_MODAL_NAME] && state[MODALS][DETAILS_MODAL_NAME].open,
            isPortofiosOpen: state => state[MODALS][PORTFOLIOS_MODAL_NAME] && state[MODALS][PORTFOLIOS_MODAL_NAME].open,
            isProfilesOpen: state => state[MODALS][PROFILE_MODAL_NAME] && state[MODALS][PROFILE_MODAL_NAME].open,
        }),
        ...mapState(PROFILE_MODULE, {
            bornDate: state => state[CABINET_DATA] && state[CABINET_DATA].bornDate,
            sex: state => state[CABINET_DATA] && state[CABINET_DATA].sex,
            phone: state => state[CABINET_DATA] && state[CABINET_DATA].phone,
            email: state => state[CABINET_DATA] && state[CABINET_DATA].email,
            portfolios: state => state[CABINET_DATA] && state[CABINET_DATA].portfolios,
        }),
        ...mapGetters(PROFILE_MODULE, [FULL_NAME, PROFILES_STRING, REQUISITES]),

        isTablet() {
            return this.$mq.tablet;
        },

        iconSize() {
            return this.$mq.tablet ? 24 : 16;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onImageChanged() {},

        onOpenDetailsModal() {
            this[CHANGE_MODAL_STATE]({ name: DETAILS_MODAL_NAME, open: true });
        },

        onOpenPortfoliosModal() {
            this[CHANGE_MODAL_STATE]({ name: PORTFOLIOS_MODAL_NAME, open: true });
        },

        onOpenProfilesModal() {
            this[CHANGE_MODAL_STATE]({ name: PROFILE_MODAL_NAME, open: true });
        },
    },
};
</script>
