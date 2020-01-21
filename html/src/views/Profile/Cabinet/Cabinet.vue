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
                    <info-row class="cabinet-view__panel-item" name="ФИО" value="Динис Базгутдинов" />
                    <info-row class="cabinet-view__panel-item" name="Дата рождения" />
                    <info-row class="cabinet-view__panel-item" name="Пол" value="Мужской" />
                    <info-row class="cabinet-view__panel-item" name="Номер телефона" value="+7 916 123-45-67" />
                    <info-row class="cabinet-view__panel-item" name="Email" value="disbag@gmail.com" />
                    <info-row class="cabinet-view__panel-item" name="Портфолио">
                        <ul>
                            <li>
                                <a class="cabinet-view__panel-item-link">Работы в Инстаграме</a>
                            </li>
                            <li>
                                <a class="cabinet-view__panel-item-link">Портфолио «Свадебные прически»</a>
                            </li>
                        </ul>
                    </info-row>
                    <info-row class="cabinet-view__panel-item" name="Профиль" value="Стилист, визажист" />
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
                    <info-row class="cabinet-view__panel-item" name="Наименование ИП" value="ООО «Соколов»" />
                    <info-row class="cabinet-view__panel-item" name="ИНН" value="471101415706" />
                    <info-row class="cabinet-view__panel-item" name="Расчетный счет" value="17600000658470000" />
                    <info-row class="cabinet-view__panel-item" name="БИК" value="1299786" />
                    <info-row class="cabinet-view__panel-item" name="Банк" value="Сбербанк" />
                    <info-row
                        class="cabinet-view__panel-item"
                        name="Корреспондентский счет банка"
                        value="68000007970000008"
                    />
                    <info-row
                        class="cabinet-view__panel-item"
                        name="Юридический адрес"
                        value="Россия, г. Москва, г. Зеленоград, Самый Центральный проспект, к. 305, офис 134"
                    />
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
            <details-modal v-if="isDetailsOpen" />
        </transition>
    </section>
</template>

<script>
import VSvg from '../../../components/controls/VSvg/VSvg.vue';
import VLink from '../../../components/controls/VLink/VLink.vue';

import InfoRow from '../../../components/profile/InfoRow/InfoRow.vue';
import InfoPanel from '../../../components/profile/InfoPanel/InfoPanel.vue';
import ImagePicker from '../../../components/profile/ImagePicker/ImagePicker.vue';

import DetailsModal, { NAME as DETAILS_MODAL_NAME } from '../../../components/profile/DetailsModal/DetailsModal.vue';

import { mapActions, mapState } from 'vuex';
import { $store } from '../../../services/ServiceLocator';

import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

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
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isDetailsOpen: state => state[MODALS][DETAILS_MODAL_NAME] && state[MODALS][DETAILS_MODAL_NAME].open,
        }),

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
    },
};
</script>
