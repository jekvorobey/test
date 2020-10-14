<template>
    <section class="section preferences-view">
        <h2 class="preferences-view__hl">
            {{ pageTitle }}
        </h2>

        <preferences-entity-panel
            v-for="entityType in entityTypes"
            :key="entityType"
            :entity-type="entityType"
            :equal-preferences="equalPreferences"
            :in-process="inProcess[entityType]"
            @change-equal="onChangeEqual"
            @delete="onDelete"
            @delete-all="onDeleteAll"
        />

        <transition name="fade">
            <preference-edit-modal v-if="$isServer || isPreferencesOpen" @submit="onSubmit" />
        </transition>
    </section>
</template>

<script>
import PreferenceEditModal from '@components/profile/PreferenceEditModal/PreferenceEditModal.vue';
import PreferencesEntityPanel from '@components/profile/PreferencesEntityPanel/PreferencesEntityPanel.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';

import { NAME as PREFERENCES_MODULE, CUSTOMER, TYPE } from '@store/modules/Profile/modules/Preferences';
import { GET_CUSTOMER_BY_TYPE } from '@store/modules/Profile/modules/Preferences/getters';
import {
    FETCH_PREFERENCES_DATA,
    SET_LOAD,
    SET_TYPE,
    FETCH_ALL_PREFERENCES_DATA,
    UPDATE_EQUAL_PREFERENCES,
    UPDATE_ENTITIES,
} from '@store/modules/Profile/modules/Preferences/actions';

import { $store, $progress, $logger, $context } from '@services';
import { preferenceEntityTypes, preferenceType } from '@enums/profile';
import { modalName } from '@enums';
import metaMixin from '@plugins/meta';
import '@images/sprites/cross.svg';
import '@images/sprites/plus-small.svg';
import '@images/sprites/info-middle.svg';
import './Preferences.css';

const PREFERENCES_MODULE_PATH = `${PROFILE_MODULE}/${PREFERENCES_MODULE}`;

function getPreferenceType(name) {
    switch (name) {
        case 'Preferences':
            return preferenceType.PERSONAL;
        case 'ProPreferences':
            return preferenceType.PROFESSIONAL;
    }
}

export default {
    name: 'preferences',
    mixins: [metaMixin],

    components: {
        PreferencesEntityPanel,
        PreferenceEditModal,
    },

    metaInfo() {
        const { pageTitle } = this;
        return {
            title: pageTitle,
        };
    },

    data() {
        return {
            inProcess: {
                [preferenceEntityTypes.BRANDS]: false,
                [preferenceEntityTypes.CATEGORIES]: false,
            },
            actualEqual: [],
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isPreferencesOpen: (state) =>
                state[MODALS][modalName.profile.PREFERENCE_EDIT] &&
                state[MODALS][modalName.profile.PREFERENCE_EDIT].open,
        }),
        ...mapState(PREFERENCES_MODULE_PATH, [CUSTOMER, TYPE]),
        ...mapGetters(PREFERENCES_MODULE_PATH, [GET_CUSTOMER_BY_TYPE]),

        prefType() {
            return this[TYPE];
        },

        equalPreferences() {
            const { prefType } = this;
            const customer = this[GET_CUSTOMER_BY_TYPE](prefType);
            return customer.equal_preferences;
        },

        entityTypes() {
            return preferenceEntityTypes;
        },

        pageTitle() {
            return this.$t(`profile.routes.${this.$route.name}`);
        },

        isTablet() {
            return this.$mq.tablet;
        },

        iconSize() {
            return this.$mq.tablet ? 24 : 16;
        },
    },

    watch: {
        equalPreferences(value) {
            if (value) this.actualEqual = [...value];
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(PREFERENCES_MODULE_PATH, [
            UPDATE_ENTITIES,
            UPDATE_EQUAL_PREFERENCES,
            FETCH_PREFERENCES_DATA,
            SET_TYPE,
            FETCH_ALL_PREFERENCES_DATA,
        ]),

        hasEqual(entityType) {
            const { actualEqual } = this;
            return actualEqual.includes(entityType);
        },

        toggleEqual(entityType) {
            const { actualEqual } = this;
            if (actualEqual.includes(entityType)) actualEqual.splice(actualEqual.indexOf(entityType), 1);
            else actualEqual.push(entityType);
            return actualEqual;
        },

        async onChangeEqual(entityType) {
            this.inProcess[entityType] = true;
            const items = [...this.toggleEqual(entityType)];
            await this[UPDATE_EQUAL_PREFERENCES](items);
            this.inProcess[entityType] = false;
        },

        async onDelete({ prefType, type, items }) {
            await this.onSubmit({ prefType, type, items });
        },

        async onDeleteAll({ prefType, type }) {
            await this.onDelete({ prefType, type, items: [] });
        },

        async onSubmit({ prefType, type, items = [] }) {
            this.inProcess[type] = true;
            const isEqual = prefType === preferenceType.PROFESSIONAL && this.hasEqual(type);
            const equals = isEqual ? this.toggleEqual(type) : null;
            await this[UPDATE_ENTITIES]({ prefType, type, items, equals });
            this.inProcess[type] = false;
        },
    },

    beforeRouteEnter(to, from, next) {
        const { name } = to;
        const { load } = $store.state[PROFILE_MODULE][PREFERENCES_MODULE];

        if (load) {
            next();
            $store.dispatch(`${PREFERENCES_MODULE_PATH}/${SET_LOAD}`, false);
            return;
        }

        const prefType = getPreferenceType(name);

        $progress.start();
        Promise.all([
            $store.dispatch(`${PREFERENCES_MODULE_PATH}/${FETCH_ALL_PREFERENCES_DATA}`),
            $store.dispatch(`${PREFERENCES_MODULE_PATH}/${FETCH_PREFERENCES_DATA}`, {
                prefType,
                isServer: $context.isServer,
            }),
        ])
            .then(() => {
                $store.dispatch(`${PREFERENCES_MODULE_PATH}/${SET_TYPE}`, prefType);
                next(() => {
                    $progress.finish();
                });
            })
            .catch((thrown) => {
                $logger.error(thrown);
                next(() => {
                    $progress.fail();
                });
            });
    },

    created() {
        this.preferenceType = preferenceType;
        this.preferenceEntityTypes = preferenceEntityTypes;
        this.actualEqual = [...this.equalPreferences];
    },
};
</script>
