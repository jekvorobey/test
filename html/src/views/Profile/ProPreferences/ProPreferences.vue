<template>
    <section class="section pro-preferences-view">
        <h2 class="pro-preferences-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
        <info-panel class="pro-preferences-view__panel" header="Бренды">
            <template v-slot:controls>
                <div class="pro-preferences-view__panel-links">
                    <v-link class="pro-preferences-view__panel-link" tag="button" @click="onAddEntities(type.BRANDS)">
                        <v-svg name="plus-small" :width="iconSize" :height="iconSize" />
                        <span>&nbsp;&nbsp;Добавить</span>
                    </v-link>
                    <v-link
                        class="link--grey pro-preferences-view__panel-link"
                        tag="button"
                        @click="onDeleteAll(type.BRANDS)"
                    >
                        <v-svg name="cross" :width="iconSize" :height="iconSize" />
                        <span>&nbsp;&nbsp;Удалить все</span>
                    </v-link>
                </div>
            </template>
            <div class="container container--tablet-lg">
                <v-check v-model="brandsSame" id="pro-preferences-brands" name="pro-preferences-brands">
                    Профессиональные предпочтения совпадают с личными
                </v-check>
                <transition-group tag="ul" class="pro-preferences-view__panel-tags" name="tag-item">
                    <tag-item
                        class="pro-preferences-view__panel-tags-item"
                        v-for="(item, index) in brands"
                        :key="item.id"
                        :text="item.name"
                        @delete="onDeleteEntity(type.BRANDS, index)"
                    />
                </transition-group>
            </div>
        </info-panel>

        <info-panel class="pro-preferences-view__panel" header="Категории">
            <template v-slot:controls>
                <div class="pro-preferences-view__panel-links">
                    <v-link
                        class="pro-preferences-view__panel-link"
                        tag="button"
                        @click="onAddEntities(type.CATEGORIES)"
                    >
                        <v-svg name="plus-small" :width="iconSize" :height="iconSize" />
                        <span>&nbsp;&nbsp;Добавить</span>
                    </v-link>
                    <v-link
                        class="link--grey pro-preferences-view__panel-link"
                        tag="button"
                        @click="onDeleteAll(type.CATEGORIES)"
                    >
                        <v-svg name="cross" :width="iconSize" :height="iconSize" />
                        <span>&nbsp;&nbsp;Удалить все</span>
                    </v-link>
                </div>
            </template>
            <div class="container container--tablet-lg">
                <v-check v-model="categoriesSame" id="pro-preferences-categories" name="pro-preferences-categories">
                    Профессиональные предпочтения совпадают с личными
                </v-check>
                <transition-group tag="ul" class="pro-preferences-view__panel-tags" name="tag-item">
                    <tag-item
                        class="pro-preferences-view__panel-tags-item"
                        v-for="(item, index) in categories"
                        :key="item.id"
                        :text="item.name"
                        @delete="onDeleteEntity(type.CATEGORIES, index)"
                    />
                </transition-group>
            </div>
        </info-panel>

        <transition name="fade">
            <preference-edit-modal v-if="isPreferencesOpen" />
        </transition>
    </section>
</template>

<script>
import VSvg from '../../../components/controls/VSvg/VSvg.vue';
import VLink from '../../../components/controls/VLink/VLink.vue';
import VCheck from '../../../components/controls/VCheck/VCheck.vue';
import InfoPanel from '../../../components/profile/InfoPanel/InfoPanel.vue';
import TagItem from '../../../components/TagItem/TagItem.vue';

import PreferenceEditModal, {
    NAME as PREFERENCES_EDIT_MODAL_NAME,
} from '../../../components/profile/PreferenceEditModal/PreferenceEditModal.vue';

import { mapState, mapActions } from 'vuex';
import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import {
    NAME as PROFILE_MODULE,
    PREFERENCES_DATA,
    PRO_PREFERENCES_DATA,
    AVAILABLE_PROFILES,
} from '../../../store/modules/Profile';
import { DELETE_ENTITY, DELETE_ALL_ENTITIES, UPDATE_ENTITIES } from '../../../store/modules/Profile/actions';

import '../../../assets/images/sprites/cross.svg';
import '../../../assets/images/sprites/plus-small.svg';
import './ProPreferences.css';

const entityTypes = {
    BRANDS: 'brands',
    CATEGORIES: 'categories',
};

export default {
    name: 'pro-preferences',

    components: {
        VSvg,
        VLink,
        VCheck,

        InfoPanel,
        TagItem,

        PreferenceEditModal,
    },

    data() {
        return {
            brandsSame: false,
            categoriesSame: false,
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isPreferencesOpen: state =>
                state[MODALS][PREFERENCES_EDIT_MODAL_NAME] && state[MODALS][PREFERENCES_EDIT_MODAL_NAME].open,
        }),

        ...mapState(PROFILE_MODULE, {
            [entityTypes.BRANDS]: state =>
                (state[PRO_PREFERENCES_DATA] && state[PRO_PREFERENCES_DATA][entityTypes.BRANDS]) || [],
            [entityTypes.CATEGORIES]: state =>
                (state[PRO_PREFERENCES_DATA] && state[PRO_PREFERENCES_DATA][entityTypes.CATEGORIES]) || [],

            preferencesBrands: state => (state[PREFERENCES_DATA] && state[PREFERENCES_DATA][entityTypes.BRANDS]) || [],
            preferencesCategories: state =>
                (state[PREFERENCES_DATA] && state[PREFERENCES_DATA][entityTypes.CATEGORIES]) || [],

            availableBrands: state => (state && state.availableBrands) || [],
            availableCategories: state => (state && state.availableCategories) || [],
        }),

        type() {
            return entityTypes;
        },

        isTablet() {
            return this.$mq.tablet;
        },

        iconSize() {
            return this.$mq.tablet ? 24 : 16;
        },
    },

    watch: {
        brandsSame(value) {
            if (value)
                this[UPDATE_ENTITIES]({
                    type: entityTypes.BRANDS,
                    items: [...this.preferencesBrands],
                    data: PRO_PREFERENCES_DATA,
                });
        },

        categoriesSame(value) {
            if (value)
                this[UPDATE_ENTITIES]({
                    type: entityTypes.CATEGORIES,
                    items: [...this.preferencesCategories],
                    data: PRO_PREFERENCES_DATA,
                });
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(PROFILE_MODULE, [DELETE_ENTITY, DELETE_ALL_ENTITIES, UPDATE_ENTITIES]),

        onDeleteEntity(type, index) {
            this[DELETE_ENTITY]({ type, index, data: PRO_PREFERENCES_DATA });
        },

        onDeleteAll(type) {
            this[DELETE_ALL_ENTITIES]({ type, data: PRO_PREFERENCES_DATA });
        },

        onAddEntities(type) {
            let availableEntities = [];
            let entities = [];

            switch (type) {
                case entityTypes.BRANDS:
                    availableEntities = this.availableBrands;
                    entities = this[type];
                    break;

                case entityTypes.CATEGORIES:
                    availableEntities = this.availableCategories;
                    entities = this[type];
                    break;
            }

            this[CHANGE_MODAL_STATE]({
                name: PREFERENCES_EDIT_MODAL_NAME,
                open: true,
                state: {
                    type,
                    availableEntities,
                    entities,
                    data: PRO_PREFERENCES_DATA,
                },
            });
        },
    },
};
</script>
