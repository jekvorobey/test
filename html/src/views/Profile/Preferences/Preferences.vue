<template>
    <section class="section preferences-view">
        <h2 class="preferences-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
        <info-panel class="preferences-view__panel" header="Бренды">
            <template v-slot:controls>
                <div class="preferences-view__panel-links">
                    <v-link class="preferences-view__panel-link" tag="button" @click="onAddEntities(type.BRANDS)">
                        <v-svg name="plus-small" :width="iconSize" :height="iconSize" />
                        <span>&nbsp;&nbsp;Добавить</span>
                    </v-link>
                    <v-link
                        class="link--grey preferences-view__panel-link"
                        tag="button"
                        @click="onDeleteAll(type.BRANDS)"
                    >
                        <v-svg name="cross" :width="iconSize" :height="iconSize" />
                        <span>&nbsp;&nbsp;Удалить все</span>
                    </v-link>
                </div>
            </template>
            <div class="container container--tablet-lg">
                <transition-group tag="ul" class="preferences-view__panel-tags" name="tag-item">
                    <tag-item
                        class="preferences-view__panel-tags-item"
                        v-for="(item, index) in brands"
                        :key="item.id"
                        :text="item.name"
                        @delete="onDeleteEntity(type.BRANDS, index)"
                    />
                </transition-group>
            </div>
        </info-panel>

        <info-panel class="preferences-view__panel" header="Категории">
            <template v-slot:controls>
                <div class="preferences-view__panel-links">
                    <v-link class="preferences-view__panel-link" tag="button" @click="onAddEntities(type.CATEGORIES)">
                        <v-svg name="plus-small" :width="iconSize" :height="iconSize" />
                        <span>&nbsp;&nbsp;Добавить</span>
                    </v-link>
                    <v-link
                        class="link--grey preferences-view__panel-link"
                        tag="button"
                        @click="onDeleteAll(type.CATEGORIES)"
                    >
                        <v-svg name="cross" :width="iconSize" :height="iconSize" />
                        <span>&nbsp;&nbsp;Удалить все</span>
                    </v-link>
                </div>
            </template>
            <div class="container container--tablet-lg">
                <transition-group tag="ul" class="preferences-view__panel-tags" name="tag-item">
                    <tag-item
                        class="preferences-view__panel-tags-item"
                        v-for="(item, index) in categories"
                        :key="item.id"
                        :text="item.name"
                        @delete="onDeleteEntity(type.CATEGORIES, index)"
                    />
                </transition-group>
            </div>
        </info-panel>

        <transition name="fade">
            <preference-edit-modal v-show="isPreferencesOpen" v-if="$isServer || isPreferencesOpen" />
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

import { NAME as PROFILE_MODULE, PREFERENCES_DATA, AVAILABLE_PROFILES } from '../../../store/modules/Profile';
import { DELETE_ENTITY, DELETE_ALL_ENTITIES } from '../../../store/modules/Profile/actions';

import '../../../assets/images/sprites/cross.svg';
import '../../../assets/images/sprites/plus-small.svg';
import './Preferences.css';

const entityTypes = {
    BRANDS: 'brands',
    CATEGORIES: 'categories',
};

export default {
    name: 'preferences',

    components: {
        VSvg,
        VLink,
        VCheck,

        InfoPanel,
        TagItem,

        PreferenceEditModal,
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isPreferencesOpen: state =>
                state[MODALS][PREFERENCES_EDIT_MODAL_NAME] && state[MODALS][PREFERENCES_EDIT_MODAL_NAME].open,
        }),

        ...mapState(PROFILE_MODULE, {
            [entityTypes.BRANDS]: state =>
                (state[PREFERENCES_DATA] && state[PREFERENCES_DATA][entityTypes.BRANDS]) || [],
            [entityTypes.CATEGORIES]: state =>
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

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(PROFILE_MODULE, [DELETE_ENTITY, DELETE_ALL_ENTITIES]),

        onDeleteEntity(type, index) {
            this[DELETE_ENTITY]({ type, index, data: PREFERENCES_DATA });
        },

        onDeleteAll(type) {
            this[DELETE_ALL_ENTITIES]({ type, data: PREFERENCES_DATA });
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
                    data: PREFERENCES_DATA,
                },
            });
        },
    },
};
</script>
