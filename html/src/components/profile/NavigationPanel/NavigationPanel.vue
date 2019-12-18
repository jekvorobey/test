<template>
    <div class="navigation-panel">
        <div class="navigation-panel__group">
            <p class="text-medium navigation-panel__group-hl">Мой профиль</p>
            <ul class="navigation-panel__group-list">
                <li class="navigation-panel__group-item">
                    <v-link class="navigation-panel__group-link" to="/profile" exact>
                        Личные данные
                    </v-link>
                </li>
            </ul>
        </div>

        <div class="navigation-panel__group">
            <p class="text-medium navigation-panel__group-hl">Мой бизнес</p>
            <ul class="navigation-panel__group-list">
                <li class="navigation-panel__group-item">
                    <v-link class="navigation-panel__group-link" to="/profile/referal">
                        Реферальная программа
                    </v-link>
                </li>
                <li class="navigation-panel__group-item">
                    <v-link class="navigation-panel__group-link" to="/profile/pro-preferences">
                        Мои профессиональные предпочтения
                    </v-link>
                </li>
                <li class="navigation-panel__group-item">
                    <v-link class="navigation-panel__group-link" to="/profile/promopage">
                        Моя промостраница
                    </v-link>
                </li>
                <li class="navigation-panel__group-item">
                    <v-link class="navigation-panel__group-link" to="/profile/seo">
                        Товары для продвижения
                    </v-link>
                </li>
                <li class="navigation-panel__group-item">
                    <v-link class="navigation-panel__group-link" to="/profile/promocodes">
                        Мои промокоды
                    </v-link>
                </li>
            </ul>
        </div>

        <!-- <div class="navigation-panel__group">
            <p class="text-medium navigation-panel__group-hl">Обучение</p>
            <ul class="navigation-panel__group-list">
                <li class="navigation-panel__group-item">
                    <v-link class="navigation-panel__group-link" to="/" />
                </li>
            </ul>
        </div> -->

        <v-link class="navigation-panel__group-link">Выйти</v-link>
    </div>
</template>

<script>
import VLink from '../../controls/VLink/VLink.vue';

import './NavigationPanel.css';

export default {
    name: 'navigation-panel',

    components: {
        VLink,
    },
};
</script>
