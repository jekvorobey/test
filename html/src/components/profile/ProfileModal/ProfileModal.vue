<template>
    <general-modal class="profile-modal" header="Ваш профиль" type="sm" @close="onClose" :is-mobile="isTablet">
        <template v-slot:content>
            <h4 class="profile-modal__hl">Ваш профиль</h4>
            <div class="profile-modal__list">
                <v-check
                    v-for="profile in availableProfiles"
                    v-model="selectedProfiles"
                    name="profile"
                    :id="`profile-${profile.id}`"
                    :key="profile.id"
                    :value="profile.id"
                >
                    {{ profile.name }}
                </v-check>
            </div>

            <div class="profile-modal__submit">
                <v-button class="profile-modal__submit-btn" @click="onSubmit">
                    Сохранить
                </v-button>
            </div>
        </template>
    </general-modal>
</template>
<script>
import VSvg from '../../controls/VSvg/VSvg.vue';
import VButton from '../../controls/VButton/VButton.vue';
import VCheck from '../../controls/VCheck/VCheck.vue';
import GeneralModal from '../../GeneralModal/GeneralModal.vue';

import { mapActions, mapGetters, mapState } from 'vuex';
import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import { NAME as PROFILE_MODULE, AVAILABLE_PROFILES } from '../../../store/modules/Profile';
import { UPDATE_PROFILES } from '../../../store/modules/Profile/actions';
import { PORTFOLIOS, PROFILES } from '../../../store/modules/Profile/getters';

import { getRandomInt } from '../../../util/helpers';
import _cloneDeep from 'lodash/cloneDeep';
import '../../../assets/images/sprites/cross.svg';
import './ProfileModal.css';

export const NAME = 'profile-modal';

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
            selectedProfiles: [],
        };
    },

    computed: {
        ...mapState(PROFILE_MODULE, [AVAILABLE_PROFILES]),
        ...mapGetters(PROFILE_MODULE, [PROFILES]),

        computedSelectedProfiles() {
            return this.selectedProfiles;
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(PROFILE_MODULE, [UPDATE_PROFILES]),

        onSubmit() {
            const newProfiles = this[AVAILABLE_PROFILES].filter(p => this.selectedProfiles.includes(p.id));
            this[UPDATE_PROFILES](newProfiles);
            this.onClose();
        },

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },

    beforeMount() {
        this.selectedProfiles = this[PROFILES].map(p => p.id);
    },
};
</script>
