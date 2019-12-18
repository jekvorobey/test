<template>
    <section class="section pro-preferences-view">
        <h2 class="pro-preferences-view__hl">Мои профессиональные предпочтения</h2>
        <info-panel class="pro-preferences-view__panel" header="Бренды">
            <template v-slot:controls>
                <div class="pro-preferences-view__panel-links">
                    <v-link class="pro-preferences-view__panel-link" tag="button">
                        <v-svg name="edit" width="16" height="16" />
                        &nbsp;&nbsp;Изменить
                    </v-link>
                    <v-link class="link--grey pro-preferences-view__panel-link" tag="button">
                        <v-svg name="cross" width="16" height="16" />
                        &nbsp;&nbsp;Удалить все
                    </v-link>
                </div>
            </template>
            <v-check v-model="brandsSame" id="pro-preferences-brands" name="pro-preferences-brands">
                Профессиональные предпочтения совпадают с личными
            </v-check>
            <transition-group tag="ul" class="pro-preferences-view__panel-tags" name="tag-item">
                <tag-item class="catalog-view__main-tags-item" v-for="item in brandTags" :key="item" :text="item" />
            </transition-group>
        </info-panel>

        <info-panel class="pro-preferences-view__panel" header="Категории">
            <template v-slot:controls>
                <div class="pro-preferences-view__panel-links">
                    <v-link class="pro-preferences-view__panel-link" tag="button">
                        <v-svg name="edit" width="16" height="16" />
                        &nbsp;&nbsp;Изменить
                    </v-link>
                    <v-link class="link--grey pro-preferences-view__panel-link" tag="button">
                        <v-svg name="cross" width="16" height="16" />
                        &nbsp;&nbsp;Удалить все
                    </v-link>
                </div>
            </template>
            <v-check v-model="categoriesSame" id="pro-preferences-brands" name="pro-preferences-brands">
                Профессиональные предпочтения совпадают с личными
            </v-check>
            <transition-group tag="ul" class="pro-preferences-view__panel-tags" name="tag-item">
                <tag-item
                    class="catalog-view__main-tags-item"
                    v-for="item in categoriesTags"
                    :key="item"
                    :text="item"
                />
            </transition-group>
        </info-panel>
    </section>
</template>

<script>
import VSvg from '../../../components/controls/VSvg/VSvg.vue';
import VLink from '../../../components/controls/VLink/VLink.vue';
import VCheck from '../../../components/controls/VCheck/VCheck.vue';
import InfoPanel from '../../../components/profile/InfoPanel/InfoPanel.vue';
import TagItem from '../../../components/TagItem/TagItem.vue';

import '../../../assets/images/sprites/cross.svg';
import '../../../assets/images/sprites/edit.svg';
import './ProPreferences.css';

export default {
    name: 'pro-preferences',

    components: {
        VSvg,
        VLink,
        VCheck,

        InfoPanel,
        TagItem,
    },

    data() {
        return {
            brandsSame: false,
            categoriesSame: false,
            brandTags: [
                'L’Oreal Paris',
                'Carolina Herrera',
                'Crystal',
                'Arabesque Perfumes',
                'gli elementi',
                'Gliss Kur',
                'Jimmy Choo',
                'ADIDAS',
            ],

            categoriesTags: ['Кондиционер: Смываемый', 'Лицо', 'Глаза: Тени', 'Глаза: Подводка'],
        };
    },

    computed: {},

    watch: {},

    methods: {},

    beforeRouteEnter(to, from, next) {
        next();
    },

    beforeRouteUpdate(to, from, next) {
        next();
    },

    beforeMount() {},
};
</script>
