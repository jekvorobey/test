<template>
    <info-panel class="preferences-entity-panel" :header="header">
        <template v-slot:controls>
            <div class="preferences-entity-panel__links">
                <v-link
                    class="preferences-entity-panel__link"
                    tag="button"
                    @click="onAddEntities"
                    :disabled="disabledButtons.add"
                >
                    <v-svg name="plus-small" :width="iconSize" :height="iconSize" />
                    <span>&nbsp;&nbsp;Добавить</span>
                </v-link>

                <v-link
                    class="preferences-entity-panel__link"
                    tag="button"
                    @click="onDeleteAll"
                    :disabled="disabledButtons.delete"
                >
                    <v-svg name="cross" :width="iconSize" :height="iconSize" />
                    <span>&nbsp;&nbsp;Удалить все</span>
                </v-link>
            </div>
        </template>

        <div class="container container--tablet-lg">
            <v-check
                v-if="prefType === preferenceType.PROFESSIONAL"
                :checked="isEqual"
                @change="onChangeEqual(entityType)"
                :id="`pro-preferences-${entityType}`"
                :name="`pro-preferences-${entityType}`"
            >
                Профессиональные предпочтения совпадают с личными
            </v-check>

            <div v-if="!!equalPreferencesMap[entityType] && prefType === preferenceType.PROFESSIONAL">
                <h3 class="preferences-entity-panel__hl">
                    {{ $t(`profile.preferences.${entityType}.choosen`) }}
                </h3>
                <p class="preferences-entity-panel__list">
                    {{ entitiesList }}
                </p>
            </div>
            <transition-group
                tag="ul"
                class="preferences-entity-panel__tags"
                name="tag-item"
                v-else-if="actualEntities.length"
            >
                <tag-item
                    class="preferences-entity-panel__tags-item"
                    v-for="(item, index) in actualEntities"
                    :key="item.id"
                    :text="item.name"
                    @delete="onDeleteEntity(index)"
                />
            </transition-group>
            <div class="container container--tablet-lg preferences-entity-panel__empty-container" v-else>
                <v-svg name="info-middle" width="24" height="24" />

                <span class="preferences-entity-panel__empty-text">
                    {{ $t(`profile.preferences.${entityType}.notChoosen`) }}
                </span>

                <v-button class="btn--outline" @click="onAddEntities">
                    Добавить
                </v-button>
            </div>
        </div>
    </info-panel>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VCheck from '@controls/VCheck/VCheck.vue';
import VButton from '@controls/VButton/VButton.vue';

import InfoPanel from '@components/profile/InfoPanel/InfoPanel.vue';
import TagItem from '@components/TagItem/TagItem.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { NAME as PROFILE_MODULE } from '@store/modules/Profile';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import {
    NAME as PREFERENCES_MODULE,
    AVAILABLE,
    CUSTOMER,
    TYPE,
} from '@store/modules/Profile/modules/Preferences';
import { BRANDS, CATEGORIES, GET_CUSTOMER_BY_TYPE, EQUAL_PREFERENCES_MAP } from '@store/modules/Profile/modules/Preferences/getters';
import {
    DELETE_ENTITY,
    DELETE_ALL_ENTITIES,
    UPDATE_ENTITIES,
    UPDATE_EQUAL_PREFERENCES,
} from '@store/modules/Profile/modules/Preferences/actions';

import _debounce from 'lodash/debounce';
import { $store, $progress, $logger, $context } from '@services';
import { preferenceEntityTypes, preferenceType } from '@enums/profile';
import { modalName } from '@enums';
import '@images/sprites/cross.svg';
import '@images/sprites/plus-small.svg';
import '@images/sprites/info-middle.svg';
import './PreferencesEntityPanel.css';

const PREFERENCES_MODULE_PATH = `${PROFILE_MODULE}/${PREFERENCES_MODULE}`;

export default {
    name: 'preferences-entity-panel',

    components: {
        VSvg,
        VLink,
        VCheck,
        VButton,

        InfoPanel,
        TagItem,
    },

    props: {
        entityType: {
            type: String,
        }, 

        equalPreferences: {
            type: Array,
            default() {
                return [];
            },
        }
    },

    data() {
        return {
            actualEntities: [],
        };
    },

    computed: {
        ...mapState(PREFERENCES_MODULE_PATH, [
            AVAILABLE,
            TYPE,
        ]),
        ...mapGetters(PREFERENCES_MODULE_PATH, [GET_CUSTOMER_BY_TYPE]),

        prefType() {
            return this[TYPE];
        },

        entities() {
            const { entitiesMap, available, entityType } = this;
            const availableEntities = available[entityType];
            return availableEntities.filter((e) => !!entitiesMap[e.id]);
        },

        entitiesMap(){
            const { prefType, entityType, isEqual } = this;
            const customer = this[GET_CUSTOMER_BY_TYPE](prefType);
            const entities = customer[entityType] || [];

            const map = {};
            for (const entityId of entities) map[entityId] = entityId;
            return map;
        },

        equalPreferencesMap() {
            const { equalPreferences = [] } = this;
            const map = {};
            for (const entityType of equalPreferences) map[entityType] = entityType;
            return map;
        },

        header(){
            const { entityType } = this;
            return this.$t(`profile.preferences.${entityType}.title`);
        },

        disabledButtons(){
            const { prefType, entityType, isEqual, available, entities } = this;
            const availableEntities = available[entityType];
            
            return {
                add: isEqual || (availableEntities.length === entities.length),
                delete: isEqual || entities.length === 0,
            };
        },

        isEqual(){
            const { equalPreferencesMap, entityType, prefType } = this;
            return prefType === preferenceType.PROFESSIONAL && !!equalPreferencesMap[entityType];
        },

        isTablet() {
            return this.$mq.tablet;
        },

        iconSize() {
            return this.$mq.tablet ? 24 : 16;
        },

        entitiesList() {
            return this.actualEntities && this.actualEntities.map(e => e.name).join(', ');
        },
    },

    watch: {
        equalPreferences(){
            this.initCollections();
        },

        entities(){
            this.initCollections();
        },

        [TYPE]() {
            this.initHandlers();
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(PREFERENCES_MODULE_PATH, [
            UPDATE_ENTITIES,
            UPDATE_EQUAL_PREFERENCES,
        ]),

        onChangeEqual(entityType) {
            this.$emit('change-equal', entityType);
        },

        onDeleteEntity(index) {
            this.actualEntities.splice(index, 1);
            this.debounce_updateEntities(this.actualEntities.map(e => e.id));
        },

        onDeleteAll() {
            const { prefType, entityType } = this;
            this.onSubmit(prefType, entityType, []);
        },

        async onSubmit(prefType, type, items = []) {
            try {
                await this[UPDATE_ENTITIES]({ prefType, type, items });
            } catch (error) {
                $logger.error(error);
            }
        },

        onAddEntities() {
            const { prefType, available, entityType, actualEntities } = this;

            let availableEntities = available[entityType]|| [];
            let entities = actualEntities || [];

            this[CHANGE_MODAL_STATE]({
                name: modalName.profile.PREFERENCE_EDIT,
                open: true,
                state: {
                    type: entityType,
                    prefType,
                    availableEntities,
                    entities,
                },
            });
        },

        initCollections(){
            const { entities = [], equalPreferences = [] } = this;
            this.actualEntities = [...entities];
        },

        initHandlers() {
            const { prefType, entityType } = this;
            this.debounce_updateEntities = _debounce(
                items => this[UPDATE_ENTITIES]({ prefType, type: entityType, items }),
                1000
            );
        },
    },

    created() {
        this.preferenceType = preferenceType;
        this.preferenceEntityTypes = preferenceEntityTypes;
        this.initHandlers();
        this.initCollections()
    },
};
</script>