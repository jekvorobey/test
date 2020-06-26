<template>
    <section class="section preferences-view">
        <h2 class="preferences-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
        <info-panel class="preferences-view__panel" header="Бренды">
            <template v-slot:controls>
                <div class="preferences-view__panel-links">
                    <v-link
                        class="preferences-view__panel-link"
                        tag="button"
                        @click="onAddEntities(preferenceEntityTypes.BRANDS)"
                        :disabled="
                            actualBrands.length === availableBrands.length ||
                            (sameBrands && prefType === preferenceType.PROFESSIONAL)
                        "
                    >
                        <v-svg name="plus-small" :width="iconSize" :height="iconSize" />
                        <span>&nbsp;&nbsp;Добавить</span>
                    </v-link>
                    <v-link
                        class="preferences-view__panel-link"
                        tag="button"
                        @click="onDeleteAll(preferenceEntityTypes.BRANDS)"
                        :disabled="
                            actualBrands.length === 0 || (sameBrands && prefType === preferenceType.PROFESSIONAL)
                        "
                        v-if="actualBrands.length"
                    >
                        <v-svg name="cross" :width="iconSize" :height="iconSize" />
                        <span>&nbsp;&nbsp;Удалить все</span>
                    </v-link>
                </div>
            </template>
            <div class="container container--tablet-lg" v-if="actualBrands.length">
                <v-check
                    v-if="prefType === preferenceType.PROFESSIONAL"
                    :checked="sameBrands"
                    @change="setBrands($event)"
                    id="pro-preferences-brands"
                    name="pro-preferences-brands"
                >
                    Профессиональные предпочтения совпадают с личными
                </v-check>

                <div v-if="sameBrands && prefType === preferenceType.PROFESSIONAL">
                    <h3 class="preferences-view__panel-hl">
                        Выбранные бренды
                    </h3>
                    <p class="preferences-view__panel-list">
                        {{ brandList }}
                    </p>
                </div>

                <transition-group tag="ul" class="preferences-view__panel-tags" name="tag-item" v-else>
                    <tag-item
                        class="preferences-view__panel-tags-item"
                        v-for="(item, index) in actualBrands"
                        :key="item.id"
                        :text="item.name"
                        @delete="onDeleteEntity(preferenceEntityTypes.BRANDS, index)"
                    />
                </transition-group>
            </div>
            <div class="container container--tablet-lg preferences-view__empty-container" v-else>
                <v-svg name="info-middle" width="24" height="24" />
                <span class="preferences-view__empty-text">
                    Вы ещё не добавляли предпочтения по брендам
                </span>
                <v-button class="btn--outline" @click="onAddEntities(preferenceEntityTypes.BRANDS)">Добавить</v-button>
            </div>
        </info-panel>

        <info-panel class="preferences-view__panel" header="Категории">
            <template v-slot:controls>
                <div class="preferences-view__panel-links">
                    <v-link
                        class="preferences-view__panel-link"
                        tag="button"
                        @click="onAddEntities(preferenceEntityTypes.CATEGORIES)"
                        :disabled="
                            actualCategories.length === availableCategories.length ||
                            (sameCategories && prefType === preferenceType.PROFESSIONAL)
                        "
                    >
                        <v-svg name="plus-small" :width="iconSize" :height="iconSize" />
                        <span>&nbsp;&nbsp;Добавить</span>
                    </v-link>
                    <v-link
                        class="preferences-view__panel-link"
                        tag="button"
                        @click="onDeleteAll(preferenceEntityTypes.CATEGORIES)"
                        :disabled="
                            actualCategories.length === 0 ||
                            (sameCategories && prefType === preferenceType.PROFESSIONAL)
                        "
                        v-if="actualCategories.length"
                    >
                        <v-svg name="cross" :width="iconSize" :height="iconSize" />
                        <span>&nbsp;&nbsp;Удалить все</span>
                    </v-link>
                </div>
            </template>
            <div class="container container--tablet-lg" v-if="actualCategories.length">
                <v-check
                    v-if="prefType === preferenceType.PROFESSIONAL"
                    :checked="sameCategories"
                    @change="setCategories($event)"
                    id="pro-preferences-categories"
                    name="pro-preferences-categories"
                >
                    Профессиональные предпочтения совпадают с личными
                </v-check>

                <div v-if="sameCategories && prefType === preferenceType.PROFESSIONAL">
                    <h3 class="preferences-view__panel-hl">
                        Выбранные категории
                    </h3>
                    <p class="preferences-view__panel-list">
                        {{ categoryList }}
                    </p>
                </div>

                <transition-group tag="ul" class="preferences-view__panel-tags" name="tag-item" v-else>
                    <tag-item
                        class="preferences-view__panel-tags-item"
                        v-for="(item, index) in actualCategories"
                        :key="item.id"
                        :text="item.name"
                        @delete="onDeleteEntity(preferenceEntityTypes.CATEGORIES, index)"
                    />
                </transition-group>
            </div>
            <div class="container container--tablet-lg preferences-view__empty-container" v-else>
                <v-svg name="info-middle" width="24" height="24" />
                <span class="preferences-view__empty-text">
                    Вы ещё не добавляли предпочтения по категориям продуктов
                </span>
                <v-button class="btn--outline" @click="onAddEntities(preferenceEntityTypes.CATEGORIES)"
                    >Добавить</v-button
                >
            </div>
        </info-panel>

        <transition name="fade">
            <preference-edit-modal v-if="$isServer || isPreferencesOpen" @submit="onSubmit" />
        </transition>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VCheck from '@controls/VCheck/VCheck.vue';
import VButton from '@controls/VButton/VButton.vue';

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
    TYPE,
    SAME_BRANDS,
    SAME_CATEGORIES,
} from '@store/modules/Profile/modules/Preferences';
import { BRANDS, CATEGORIES, GET_CUSTOMER_BY_TYPE } from '@store/modules/Profile/modules/Preferences/getters';
import {
    DELETE_ENTITY,
    DELETE_ALL_ENTITIES,
    FETCH_PREFERENCES_DATA,
    SET_LOAD,
    UPDATE_ENTITIES,
    SET_TYPE,
    UPDATE_SAME_SELECT,
} from '@store/modules/Profile/modules/Preferences/actions';

import _debounce from 'lodash/debounce';
import { $store, $progress, $logger, $context } from '@services';
import { preferenceEntityTypes, preferenceType } from '@enums/profile';
import { modalName } from '@enums';
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

    components: {
        VSvg,
        VLink,
        VCheck,
        VButton,

        InfoPanel,
        TagItem,

        PreferenceEditModal,
    },

    data() {
        return {
            actualBrands: [],
            actualCategories: [],

            // sameBrands: this.sameBrands,
            // sameCategories: this.sameCategories,
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isPreferencesOpen: state =>
                state[MODALS][modalName.profile.PREFERENCE_EDIT] &&
                state[MODALS][modalName.profile.PREFERENCE_EDIT].open,
        }),
        ...mapState(PREFERENCES_MODULE_PATH, [
            AVAILABLE_BRANDS,
            AVAILABLE_CATEGORIES,
            CUSTOMER,
            TYPE,
            SAME_BRANDS,
            SAME_CATEGORIES,
        ]),
        ...mapGetters(PREFERENCES_MODULE_PATH, [BRANDS, CATEGORIES, GET_CUSTOMER_BY_TYPE]),

        prefType() {
            return this[TYPE];
        },

        isTablet() {
            return this.$mq.tablet;
        },

        iconSize() {
            return this.$mq.tablet ? 24 : 16;
        },

        brandList() {
            return this.actualBrands.length ? this.actualBrands.map(brand => brand.name).join(', ') : '';
        },

        categoryList() {
            return this.actualCategories.length ? this.actualCategories.map(category => category.name).join(', ') : '';
        },
    },

    watch: {
        [BRANDS](value) {
            this.actualBrands = [...(value || [])];
        },

        [CATEGORIES](value) {
            this.actualCategories = [...(value || [])];
        },

        [TYPE]() {
            this.initHandlers();
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(PREFERENCES_MODULE_PATH, [FETCH_PREFERENCES_DATA, UPDATE_ENTITIES, SET_TYPE, UPDATE_SAME_SELECT]),

        onDeleteEntity(type, i) {
            switch (type) {
                case preferenceEntityTypes.BRANDS:
                    this.actualBrands.splice(i, 1);
                    this.debounce_updateBrands(this.actualBrands.map(e => e.id));
                    break;

                case preferenceEntityTypes.CATEGORIES:
                    this.actualCategories.splice(i, 1);
                    this.debounce_updateCategories(this.actualCategories.map(e => e.id));
                    break;
            }
        },

        onDeleteAll(type) {
            const { prefType } = this;
            this.onSubmit({ prefType, type, items: [] });
        },

        async onSubmit({ prefType, type, items = [] }) {
            try {
                await this[UPDATE_ENTITIES]({ prefType, type, items });
                switch (type) {
                    case preferenceEntityTypes.BRANDS:
                        this.actualBrands = [...this[BRANDS]];
                        break;

                    case preferenceEntityTypes.CATEGORIES:
                        this.actualCategories = [...this[CATEGORIES]];
                        break;
                }
            } catch (error) {
                $logger.error(error);
            }
        },

        onAddEntities(type) {
            const { prefType } = this;

            let availableEntities = [];
            let entities = [];

            switch (type) {
                case preferenceEntityTypes.BRANDS:
                    availableEntities = this[AVAILABLE_BRANDS];
                    entities = this.actualBrands;
                    break;

                case preferenceEntityTypes.CATEGORIES:
                    availableEntities = this[AVAILABLE_CATEGORIES];
                    entities = this.actualCategories;
                    break;
            }

            this[CHANGE_MODAL_STATE]({
                name: modalName.profile.PREFERENCE_EDIT,
                open: true,
                state: {
                    type,
                    prefType,
                    availableEntities,
                    entities,
                },
            });
        },

        initCollections() {
            this.actualBrands = [...this[BRANDS]];
            this.actualCategories = [...this[CATEGORIES]];
        },

        initHandlers() {
            const { prefType } = this;
            this.debounce_updateBrands = _debounce(
                items => this[UPDATE_ENTITIES]({ prefType, type: preferenceEntityTypes.BRANDS, items }),
                1000
            );

            this.debounce_updateCategories = _debounce(
                items => this[UPDATE_ENTITIES]({ prefType, type: preferenceEntityTypes.CATEGORIES, items }),
                1000
            );
        },

        setBrands(e) {
            const { sameBrands, sameCategories } = $store.state[PROFILE_MODULE][PREFERENCES_MODULE];
            this[UPDATE_SAME_SELECT]({ sameBrands: e, sameCategories });
            if (e) {
                const customer = this[GET_CUSTOMER_BY_TYPE](preferenceType.PERSONAL) || {};
                const brands = customer[preferenceEntityTypes.BRANDS] || [];
                this[UPDATE_ENTITIES]({
                    prefType: preferenceType.PROFESSIONAL,
                    type: preferenceEntityTypes.BRANDS,
                    items: [...brands],
                });
            }
        },

        setCategories(e) {
            const { sameBrands, sameCategories } = $store.state[PROFILE_MODULE][PREFERENCES_MODULE];
            this[UPDATE_SAME_SELECT]({ sameBrands, sameCategories: e });
            if (e) {
                const customer = this[GET_CUSTOMER_BY_TYPE](preferenceType.PERSONAL) || {};
                const categories = customer[preferenceEntityTypes.CATEGORIES] || [];
                this[UPDATE_ENTITIES]({
                    prefType: preferenceType.PROFESSIONAL,
                    type: preferenceEntityTypes.CATEGORIES,
                    items: [...categories],
                });
            }
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
        $store
            .dispatch(`${PREFERENCES_MODULE_PATH}/${FETCH_PREFERENCES_DATA}`, { prefType, isServer: $context.isServer })
            .then(() => {
                $store.dispatch(`${PREFERENCES_MODULE_PATH}/${SET_TYPE}`, prefType);
                next(vm => {
                    $progress.finish();
                });
            })
            .catch(thrown => {
                $logger.error(thrown);
                next(vm => {
                    $progress.fail();
                });
            });
    },

    created() {
        this.preferenceType = preferenceType;
        this.preferenceEntityTypes = preferenceEntityTypes;
    },

    beforeMount() {
        this.initHandlers();
        this.initCollections();
    },
};
</script>
