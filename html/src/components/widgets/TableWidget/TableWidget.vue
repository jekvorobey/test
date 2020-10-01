<template>
    <div class="table-widget">
        <table class="table-widget__table" v-if="!isTabletLg">
            <colgroup>
                <col width="55%" />
                <col width="20%" />
                <col width="12.5%" />
                <col width="12.5%" />
            </colgroup>
            <thead>
                <tr>
                    <th>Адрес</th>
                    <th>Телефон</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Россия, Москва, г. Зеленоград, Центральный проспект, к. 305, офис 134</td>
                    <td>+7 999 123-45-67</td>
                    <td>
                        <v-link class="table-widget__btn" tag="button">Изменить</v-link>
                    </td>
                    <td>
                        <v-link class="table-widget__btn" tag="button">Удалить</v-link>
                    </td>
                </tr>
                <tr>
                    <td>Россия, Республика Башкортостан, Белебеевский р-н., г. Белебей, ул. Лесная, 1, 1</td>
                    <td>+7 999 123-45-67</td>
                    <td>
                        <v-link class="table-widget__btn" tag="button">Изменить</v-link>
                    </td>
                    <td>
                        <v-link class="table-widget__btn" tag="button">Удалить</v-link>
                    </td>
                </tr>
                <tr>
                    <td>Россия, г. Москва, ул. Академика Королева, 1, 123</td>
                    <td>+7 999 123-45-67</td>
                    <td>
                        <v-link class="table-widget__btn" tag="button">Изменить</v-link>
                    </td>
                    <td>
                        <v-link class="table-widget__btn" tag="button">Удалить</v-link>
                    </td>
                </tr>
            </tbody>
        </table>
        <ul class="table-widget__list" v-else>
            <li class="table-widget__list-item">
                <p>Россия, Москва, г. Зеленоград, Центральный проспект, к. 305, офис 134</p>
                <p>+7 999 123-45-67</p>
                <div>
                    <v-link class="table-widget__btn" tag="button">Изменить</v-link>
                    <v-link class="table-widget__btn" tag="button">Удалить</v-link>
                </div>
            </li>
            <li class="table-widget__list-item">
                <p>Россия, Республика Башкортостан, Белебеевский р-н., г. Белебей, ул. Лесная, 1, 1</p>
                <p>+7 999 123-45-67</p>
                <div>
                    <v-link class="table-widget__btn" tag="button">Изменить</v-link>
                    <v-link class="table-widget__btn" tag="button">Удалить</v-link>
                </div>
            </li>
            <li class="table-widget__list-item">
                <p>Россия, г. Москва, ул. Академика Королева, 1, 123</p>
                <p>+7 999 123-45-67</p>
                <div>
                    <v-link class="table-widget__btn" tag="button">Изменить</v-link>
                    <v-link class="table-widget__btn" tag="button">Удалить</v-link>
                </div>
            </li>
        </ul>

        <div class="container container--tablet-lg table-widget__submit">
            <v-button class="table-widget__submit-btn">Добавить новый адрес</v-button>
        </div>
    </div>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';

import './TableWidget.css';

export default {
    name: 'table-widget',

    components: {
        VLink,
        VButton,
    },

    props: {},

    computed: {
        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },
};
</script>
