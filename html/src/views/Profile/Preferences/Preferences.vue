<template>
    <section class="section preferences-view">
        <h2 class="preferences-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
        <info-panel class="preferences-view__panel" header="Бренды">
            <template v-slot:controls>
                <div class="preferences-view__panel-links">
                    <v-link class="preferences-view__panel-link" tag="button">
                        <v-svg name="edit" :width="iconSize" :height="iconSize" />
                        <template v-if="!isTablet">&nbsp;&nbsp;Изменить</template>
                    </v-link>
                    <v-link class="link--grey preferences-view__panel-link" tag="button">
                        <v-svg name="cross" :width="iconSize" :height="iconSize" />
                        <template v-if="!isTablet">&nbsp;&nbsp;Удалить все</template>
                    </v-link>
                </div>
            </template>
            <div class="container container--tablet-lg">
                <transition-group tag="ul" class="preferences-view__panel-tags" name="tag-item">
                    <tag-item
                        class="preferences-view__panel-tags-item"
                        v-for="item in brandTags"
                        :key="item"
                        :text="item"
                    />
                </transition-group>
            </div>
        </info-panel>

        <info-panel class="preferences-view__panel" header="Категории">
            <template v-slot:controls>
                <div class="preferences-view__panel-links">
                    <v-link class="preferences-view__panel-link" tag="button">
                        <v-svg name="edit" :width="iconSize" :height="iconSize" />
                        <template v-if="!isTablet">&nbsp;&nbsp;Изменить</template>
                    </v-link>
                    <v-link class="link--grey preferences-view__panel-link" tag="button">
                        <v-svg name="cross" :width="iconSize" :height="iconSize" />
                        <template v-if="!isTablet">&nbsp;&nbsp;Удалить все</template>
                    </v-link>
                </div>
            </template>
            <div class="container container--tablet-lg">
                <transition-group tag="ul" class="preferences-view__panel-tags" name="tag-item">
                    <tag-item
                        class="preferences-view__panel-tags-item"
                        v-for="item in categoriesTags"
                        :key="item"
                        :text="item"
                    />
                </transition-group>
            </div>
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
import './Preferences.css';

export default {
    name: 'preferences',

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

    computed: {
        isTablet() {
            return this.$mq.tablet;
        },

        iconSize() {
            return this.$mq.tablet ? 24 : 16;
        },
    },

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
