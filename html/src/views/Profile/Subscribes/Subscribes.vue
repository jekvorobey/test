<template>
    <section class="section subscribes-view">
        <div class="container container--tablet-lg">
            <h2 class="subscribes-view__hl">
                {{ pageTitle }}
            </h2>
        </div>

        <info-panel class="subscribes-view__panel" header="Что вас интересует?">
            <div class="container container--tablet-lg">
                <v-check
                    v-model="$v.actualSubscribes.topics.$model"
                    v-for="topic in content.topics"
                    :id="`topic-${topic.id}`"
                    :key="topic.id"
                    :value="topic.id"
                    name="topics"
                >
                    {{ topic.name }}
                    <div class="text-grey text-sm">
                        {{ topic.description }}
                    </div>
                </v-check>
            </div>
        </info-panel>

        <info-panel class="subscribes-view__panel" header="Как часто?">
            <div class="container container--tablet-lg">
                <v-check
                    v-model="$v.actualSubscribes.periodicity.$model"
                    v-for="period in content.periods"
                    :id="`period-${period.value}`"
                    :key="period.value"
                    :value="period.value"
                    type="radio"
                    name="period"
                >
                    {{ period.name }}
                </v-check>
            </div>
        </info-panel>

        <info-panel class="subscribes-view__panel" header="Предпочитаемый способ связи">
            <div class="container container--tablet-lg">
                <v-check
                    v-model="$v.actualSubscribes.channels.$model"
                    v-for="channel in content.channels"
                    :id="`channel-${channel.value}`"
                    :key="channel.value"
                    :value="channel.value"
                    name="channels"
                >
                    {{ channel.name }}
                </v-check>
            </div>
        </info-panel>

        <div class="container subscribes-view__submit">
            <transition name="fade-in">
                <v-button
                    v-if="isDirty"
                    class="subscribes-view__submit-btn"
                    :class="{ 'btn--outline ': inProcess }"
                    key="submit"
                    :disabled="inProcess"
                    @click="onSave"
                >
                    <v-spinner v-if="inProcess" height="24" width="24" show />
                    <template v-else>Сохранить</template>
                </v-button>
            </transition>
        </div>
    </section>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VSpinner from '@controls/VSpinner/VSpinner.vue';
import VCheck from '@controls/VCheck/VCheck.vue';

import InfoPanel from '@components/profile/InfoPanel/InfoPanel.vue';

import { mapState, mapActions } from 'vuex';

import { NAME as AUTH_MODULE } from '@store/modules/Auth';
import { CHECK_SESSION } from '@store/modules/Auth/actions';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';

import { NAME as SUBSCRIBES_MODULE, CONTENT, SUBSCRIBES } from '@store/modules/Profile/modules/Subscribes';
import { SET_LOAD, FETCH_SUBSCRIBES_DATA, UPDATE_SUBSCRIBES } from '@store/modules/Profile/modules/Subscribes/actions';

import _cloneDeep from 'lodash/cloneDeep';
import { $store, $progress, $context } from '@services';
import { modalName, httpCodes } from '@enums';
import validationMixin from '@plugins/validation';
import metaMixin from '@plugins/meta';
import './Subscribes.css';

const SUBSCRIBES_MODULE_PATH = `${PROFILE_MODULE}/${SUBSCRIBES_MODULE}`;

export default {
    name: 'subscribes',
    mixins: [metaMixin, validationMixin],

    components: {
        VButton,
        VCheck,
        VSpinner,

        InfoPanel,
    },

    metaInfo() {
        const { pageTitle } = this;
        return {
            title: pageTitle,
        };
    },

    validations: {
        actualSubscribes: {
            channels: {},
            periodicity: {},
            topics: {},
        },
    },

    data() {
        return {
            inProcess: false,
            actualSubscribes: { channels: [], periodicity: 1, topics: [] },
        };
    },

    computed: {
        ...mapState(SUBSCRIBES_MODULE_PATH, [CONTENT, SUBSCRIBES]),

        pageTitle() {
            return this.$t(`profile.routes.${this.$route.name}`);
        },

        isDirty() {
            return this.$v.$anyDirty;
        },
    },

    watch: {
        [SUBSCRIBES](value) {
            this.setActualSubscribes(value);
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(SUBSCRIBES_MODULE_PATH, [UPDATE_SUBSCRIBES]),

        setActualSubscribes(value) {
            this.actualSubscribes = _cloneDeep(value);
            this.$v.$reset();
        },

        async onSave() {
            try {
                const { actualSubscribes } = this;

                this.inProcess = true;
                await this[UPDATE_SUBSCRIBES](actualSubscribes);
                this.inProcess = false;
            } catch (error) {
                this.inProcess = false;
                this[CHANGE_MODAL_STATE]({
                    name: modalName.general.NOTIFICATION,
                    open: true,
                    state: {
                        title: 'Уведомление',
                        message: 'Произошла ошибка. Попробуйте ещё раз позже',
                    },
                });
            }
        },
    },

    beforeRouteEnter(to, from, next) {
        const { isServer } = $context;
        const { load } = $store.state[PROFILE_MODULE][SUBSCRIBES_MODULE];

        if (load) {
            $store.dispatch(`${SUBSCRIBES_MODULE_PATH}/${SET_LOAD}`, false);
            return next();
        }

        $progress.start();
        $store
            .dispatch(`${SUBSCRIBES_MODULE_PATH}/${FETCH_SUBSCRIBES_DATA}`, isServer)
            .then(() => {
                next(() => {
                    $progress.finish();
                });
            })
            .catch((thrown) => {
                $progress.fail();
                if (thrown.status === httpCodes.FORBIDDEN) {
                    $store.dispatch(`${AUTH_MODULE}/${CHECK_SESSION}`, true);
                    return next(false);
                }
                next();
            });
    },

    created() {
        this.setActualSubscribes(this[SUBSCRIBES]);
    },
};
</script>
