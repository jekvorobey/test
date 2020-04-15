<template>
    <section class="section preferences-view">
        <h2 class="preferences-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
        <info-panel class="preferences-view__panel" header="Бренды">
            <template v-slot:controls>
                <div class="preferences-view__panel-links">
                    <v-link
                        class="preferences-view__panel-link"
                        tag="button"
                        @click="onAddEntities(type.BRANDS)"
                        :disabled="actualBrands.length === availableBrands.length"
                    >
                        <v-svg name="plus-small" :width="iconSize" :height="iconSize" />
                        <span>&nbsp;&nbsp;Добавить</span>
                    </v-link>
                    <v-link
                        class="preferences-view__panel-link"
                        tag="button"
                        @click="onDeleteAll(type.BRANDS)"
                        :disabled="actualBrands.length === 0"
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
                        v-for="(item, index) in actualBrands"
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
                    <v-link
                        class="preferences-view__panel-link"
                        tag="button"
                        @click="onAddEntities(type.CATEGORIES)"
                        :disabled="actualCategories.length === availableCategories.length"
                    >
                        <v-svg name="plus-small" :width="iconSize" :height="iconSize" />
                        <span>&nbsp;&nbsp;Добавить</span>
                    </v-link>
                    <v-link
                        class="preferences-view__panel-link"
                        tag="button"
                        @click="onDeleteAll(type.CATEGORIES)"
                        :disabled="actualCategories.length === 0"
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
                        v-for="(item, index) in actualCategories"
                        :key="item.id"
                        :text="item.name"
                        @delete="onDeleteEntity(type.CATEGORIES, index)"
                    />
                </transition-group>
            </div>
        </info-panel>

        <transition name="fade">
            <preference-edit-modal
                v-show="isPreferencesOpen"
                v-if="$isServer || isPreferencesOpen"
                @submit="onSubmit"
            />
        </transition>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VCheck from '@controls/VCheck/VCheck.vue';
import InfoPanel from '@components/profile/InfoPanel/InfoPanel.vue';
import TagItem from '@components/TagItem/TagItem.vue';

import PreferenceEditModal from '@components/profile/PreferenceEditModal/PreferenceEditModal.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';

import {
    NAME as PREFERENCES_MODULE,
    AVAILABLE_BRANDS,
    AVAILABLE_CATEGORIES,
    CUSTOMER,
} from '@store/modules/Profile/modules/Preferences';
import { BRANDS, CATEGORIES } from '@store/modules/Profile/modules/Preferences/getters';
import {
    DELETE_ENTITY,
    DELETE_ALL_ENTITIES,
    FETCH_PREFERENCES_DATA,
    SET_LOAD,
    UPDATE_ENTITIES,
} from '@store/modules/Profile/modules/Preferences/actions';

import _debounce from 'lodash/debounce';
import { $store, $progress, $logger } from '@services';
import { modalName } from '@enums';
import '@images/sprites/cross.svg';
import '@images/sprites/plus-small.svg';
import './Preferences.css';

const PREFERENCES_MODULE_PATH = `${PROFILE_MODULE}/${PREFERENCES_MODULE}`;

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

    data() {
        return {
            actualBrands: [],
            actualCategories: [],
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isPreferencesOpen: (state) =>
                state[MODALS][modalName.profile.PREFERENCE_EDIT] &&
                state[MODALS][modalName.profile.PREFERENCE_EDIT].open,
        }),
        ...mapState(PREFERENCES_MODULE_PATH, [AVAILABLE_BRANDS, AVAILABLE_CATEGORIES, CUSTOMER]),
        ...mapGetters(PREFERENCES_MODULE_PATH, [BRANDS, CATEGORIES]),

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
        ...mapActions(PREFERENCES_MODULE_PATH, [FETCH_PREFERENCES_DATA, UPDATE_ENTITIES]),

        onDeleteEntity(type, i) {
            switch (type) {
                case entityTypes.BRANDS:
                    this.actualBrands.splice(i, 1);
                    this.debounce_updateBrands(this.actualBrands.map((e) => e.id));
                    break;

                case entityTypes.CATEGORIES:
                    this.actualCategories.splice(i, 1);
                    this.debounce_updateCategories(this.actualCategories.map((e) => e.id));
                    break;
            }
        },

        onDeleteAll(type) {
            this.onSubmit({ type, items: [] });
        },

        async onSubmit({ type, items = [] }) {
            try {
                await this[UPDATE_ENTITIES]({ type, items });
                switch (type) {
                    case entityTypes.BRANDS:
                        this.actualBrands = [...this[BRANDS]];
                        break;

                    case entityTypes.CATEGORIES:
                        this.actualCategories = [...this[CATEGORIES]];
                        break;
                }
            } catch (error) {
                $logger.error(error);
            }
        },

        onAddEntities(type) {
            let availableEntities = [];
            let entities = [];

            switch (type) {
                case entityTypes.BRANDS:
                    availableEntities = this[AVAILABLE_BRANDS];
                    entities = this.actualBrands;
                    break;

                case entityTypes.CATEGORIES:
                    availableEntities = this[AVAILABLE_CATEGORIES];
                    entities = this.actualCategories;
                    break;
            }

            this[CHANGE_MODAL_STATE]({
                name: modalName.profile.PREFERENCE_EDIT,
                open: true,
                state: {
                    type,
                    availableEntities,
                    entities,
                },
            });
        },
    },

    async serverPrefetch() {
        try {
            await this[FETCH_PREFERENCES_DATA](this.$isServer);
        } catch (error) {
            $logger.error(error);
        }
    },

    beforeRouteEnter(to, from, next) {
        const { load } = $store.state[PROFILE_MODULE][PREFERENCES_MODULE];

        if (load) {
            next();
            $store.dispatch(`${PREFERENCES_MODULE_PATH}/${SET_LOAD}`, false);
            return;
        }

        $progress.start();
        $store
            .dispatch(`${PREFERENCES_MODULE_PATH}/${FETCH_PREFERENCES_DATA}`)
            .then(() => {
                next((vm) => {
                    $progress.finish();
                });
            })
            .catch((thrown) => {
                $progress.fail();
                $logger.error('beforeRouteEnter', thrown.error);
                $progress.finish();
                next();
            });
    },

    beforeMount() {
        this.actualBrands = [...this[BRANDS]];
        this.actualCategories = [...this[CATEGORIES]];

        this.debounce_updateBrands = _debounce(
            (items) => this[UPDATE_ENTITIES]({ type: entityTypes.BRANDS, items }),
            1000
        );

        this.debounce_updateCategories = _debounce(
            (items) => this[UPDATE_ENTITIES]({ type: entityTypes.CATEGORIES, items }),
            1000
        );
    },
};
</script>
