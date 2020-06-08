<template>
    <general-modal
        v-if="isOpen"
        class="return-select-reason-modal"
        type="sm"
        header="Выберите причину возврата"
        @close="onClose"
        :is-mobile="isTablet"
    >
        <template v-slot:content>
            Форма с выбором причины возврата
        </template>
    </general-modal>
</template>
<script>
import VCheck from '@controls/VCheck/VCheck.vue';
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import { mapActions, mapState } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';

import { modalName } from '@enums';
import './ReturnSelectReasonModal.css';

const NAME = modalName.profile.RETURN_SELECT_REASON;

export default {
    name: NAME,

    components: {
        VCheck,
        GeneralModal,
    },

    data() {
        return {
            reason_selected: null,
        }
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: state => state[MODALS][modalName.profile.RETURN_SELECT_REASON] && state[MODALS][modalName.profile.RETURN_SELECT_REASON].open,
            modalState: state => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onClose() {
            this.$emit('close');
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },
};
</script>
