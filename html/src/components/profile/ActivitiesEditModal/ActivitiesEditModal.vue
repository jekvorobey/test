<template>
    <general-modal class="activities-edit-modal" header="Ваш профиль" type="sm" @close="onClose" :is-mobile="isTablet">
        <template v-slot:content>
            <h4 class="activities-edit-modal__hl">Ваш профиль</h4>
            <div class="activities-edit-modal__list">
                <v-check
                    v-for="activity in allActivities"
                    v-model="selectedActivities"
                    name="activities"
                    :id="`activity-${activity.id}`"
                    :key="activity.id"
                    :value="activity.id"
                >
                    {{ activity.name }}
                </v-check>
            </div>

            <div class="activities-edit-modal__submit">
                <v-button class="activities-edit-modal__submit-btn" @click="onSubmit">
                    Сохранить
                </v-button>
            </div>
        </template>
    </general-modal>
</template>
<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VButton from '@controls/VButton/VButton.vue';
import VCheck from '@controls/VCheck/VCheck.vue';
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import { mapActions, mapGetters, mapState } from 'vuex';
import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as CABINET_MODULE, ACTIVITIES, All_ACTIVITIES } from '@store/modules/Profile/modules/Cabinet';
import { UPDATE_ACTIVITIES } from '@store/modules/Profile/modules/Cabinet/actions';

import { getRandomInt } from '@util/helpers';
import _cloneDeep from 'lodash/cloneDeep';
import '@images/sprites/cross.svg';
import './ActivitiesEditModal.css';

const CABINET_MODULE_PATH = `${PROFILE_MODULE}/${CABINET_MODULE}`;

export const NAME = 'activities-edit-modal';

export default {
    name: NAME,

    components: {
        VSvg,
        VButton,
        VCheck,
        GeneralModal,
    },

    data() {
        return {
            selectedActivities: [],
        };
    },

    computed: {
        ...mapState(CABINET_MODULE_PATH, [All_ACTIVITIES, ACTIVITIES]),

        computedSelectedActivities() {
            return this.selectedActivities;
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(CABINET_MODULE_PATH, [UPDATE_ACTIVITIES]),

        onSubmit() {
            const newActivities = this[All_ACTIVITIES].filter(p => this.selectedActivities.includes(p.id));
            this[UPDATE_ACTIVITIES](newActivities);
            this.onClose();
        },

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },

    beforeMount() {
        this.selectedActivities = this[ACTIVITIES].map(p => p.id);
    },
};
</script>
