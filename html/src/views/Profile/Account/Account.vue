<template>
    <section class="section account-view">
        <h2 class="account-view__hl">Профиль</h2>
        <image-picker class="account-view__avatar" @fileChanged="onImageChanged" />
        <info-panel class="account-view__panel" header="Личные данные">
            <template v-slot:controls>
                <v-link class="account-view__panel-link" tag="button">
                    <v-svg name="edit" width="16" height="16" />
                    &nbsp;&nbsp;Изменить
                </v-link>
            </template>
            <ul class="account-view__panel-list">
                <info-row class="account-view__panel-item" name="ФИО" value="Динис Базгутдинов" />
                <info-row class="account-view__panel-item" name="Дата рождения" />
                <info-row class="account-view__panel-item" name="Пол" value="Мужской" />
                <info-row class="account-view__panel-item" name="Номер телефона" value="+7 916 123-45-67" />
                <info-row class="account-view__panel-item" name="Email" value="disbag@gmail.com" />
                <info-row class="account-view__panel-item" name="Портфолио">
                    <ul>
                        <li>
                            <a class="account-view__panel-item-link">Работы в Инстаграме</a>
                        </li>
                        <li>
                            <a class="account-view__panel-item-link">Портфолио «Свадебные прически»</a>
                        </li>
                    </ul>
                </info-row>
                <info-row class="account-view__panel-item" name="Профиль" value="Стилист, визажист" />
            </ul>
        </info-panel>

        <info-panel class="account-view__panel" header="Пароль">
            <template v-slot:controls>
                <v-link class="account-view__panel-link" tag="button">
                    <v-svg name="edit" width="16" height="16" />
                    &nbsp;&nbsp;Изменить
                </v-link>
            </template>
            <ul class="account-view__panel-list">
                <info-row class="account-view__panel-item" name="Пароль">
                    • • • • • • • • • • •
                </info-row>
            </ul>
        </info-panel>

        <info-panel class="account-view__panel" header="Социальные сети">
            <template v-slot:controls>
                <v-link class="account-view__panel-link" tag="button">
                    <v-svg name="edit" width="16" height="16" />
                    &nbsp;&nbsp;Изменить
                </v-link>
            </template>
            <ul class="account-view__panel-list">
                <info-row class="account-view__panel-item" name="Vkontakte">
                    <template v-slot:link>
                        <v-link class="account-view__panel-item-link" tag="button">
                            Подключить
                        </v-link>
                    </template>
                </info-row>
                <info-row class="account-view__panel-item" name="Facebook" value="Dinis Bazgutdinov">
                    <template v-slot:link>
                        <v-link class="account-view__panel-item-link account-view__panel-item-link--grey" tag="button">
                            Отключить
                        </v-link>
                    </template>
                </info-row>
                <info-row class="account-view__panel-item" name="Instagram" value="@disbag">
                    <template v-slot:link>
                        <v-link class="account-view__panel-item-link account-view__panel-item-link--grey" tag="button">
                            Отключить
                        </v-link>
                    </template>
                </info-row>
            </ul>
        </info-panel>

        <info-panel class="account-view__panel" header="Социальные сети">
            <template v-slot:controls>
                <v-link class="account-view__panel-link" tag="button">
                    <v-svg name="edit" width="16" height="16" />
                    &nbsp;&nbsp;Изменить
                </v-link>
            </template>

            <ul class="account-view__panel-list">
                <info-row class="account-view__panel-item" name="Наименование ИП" value="ООО «Соколов»" />
                <info-row class="account-view__panel-item" name="ИНН" value="471101415706" />
                <info-row class="account-view__panel-item" name="Расчетный счет" value="17600000658470000" />
                <info-row class="account-view__panel-item" name="БИК" value="1299786" />
                <info-row class="account-view__panel-item" name="Банк" value="Сбербанк" />
                <info-row
                    class="account-view__panel-item"
                    name="Корреспондентский счет банка"
                    value="68000007970000008"
                />
                <info-row
                    class="account-view__panel-item"
                    name="Юридический адрес"
                    value="Россия, г. Москва, г. Зеленоград, Самый Центральный проспект, к. 305, офис 134"
                />
            </ul>
        </info-panel>

        <info-panel class="account-view__panel" header="Пароль">
            <template v-slot:controls>
                <v-link class="account-view__panel-link" tag="button">
                    <v-svg name="edit" width="16" height="16" />
                    &nbsp;&nbsp;Изменить
                </v-link>
            </template>
            <ul class="account-view__panel-list">
                <info-row
                    class="text-sm account-view__panel-item account-view__panel-item--dropzone"
                    name="Не более 10 файлов, jpeg, png, mp4, mov. Фото не более 5Mb, видео до 15Mb"
                >
                    <div class="account-view__panel-dropzone">
                        Выберите фото
                    </div>
                </info-row>
            </ul>
        </info-panel>
    </section>
</template>

<script>
import VSvg from '../../../components/controls/VSvg/VSvg.vue';
import VLink from '../../../components/controls/VLink/VLink.vue';
import InfoRow from '../../../components/profile/InfoRow/InfoRow.vue';
import InfoPanel from '../../../components/profile/InfoPanel/InfoPanel.vue';
import ImagePicker from '../../../components/profile/ImagePicker/ImagePicker.vue';

import '../../../assets/images/sprites/edit.svg';
import './Account.css';

export default {
    name: 'account',

    components: {
        VSvg,
        VLink,

        InfoRow,
        InfoPanel,
        ImagePicker,
    },

    data() {
        return {};
    },

    computed: {},

    watch: {},

    methods: {
        onImageChanged(image) {},
    },

    beforeRouteEnter(to, from, next) {
        next();
    },

    beforeRouteUpdate(to, from, next) {
        next();
    },

    beforeMount() {},
};
</script>