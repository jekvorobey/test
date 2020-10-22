<template>
    <general-modal v-if="isOpen" type="sm" class="author-modal" @close="onClose" :header="header" :is-mobile="isTablet">
        <template v-slot:content>
            <div class="container container--tablet author-modal__body">
                <h3 class="author-modal__hl">
                    {{ header }}
                </h3>

                <template v-if="author">
                    <author-card
                        class="author-modal__card"
                        :first-name="author.firstName"
                        :last-name="author.lastName"
                        :nick-name="author.profession"
                        :image="author.avatar"
                    />

                    <div class="author-modal__desc">
                        {{ author.description }}
                    </div>
                </template>
            </div>

            <div class="container container--tablet author-modal__submit">
                <v-button class="author-modal__submit-btn" @click.prevent="onClose">Закрыть</v-button>
            </div>
        </template>
    </general-modal>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';

import AuthorCard from '@components/AuthorCard/AuthorCard.vue';
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import { mapState, mapActions } from 'vuex';
import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { modalName } from '@enums';

import './AuthorModal.css';

const NAME = modalName.masterclass.AUTHOR;

export default {
    name: NAME,

    components: {
        VButton,

        AuthorCard,
        GeneralModal,
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: (state) => (state[MODALS][NAME] && state[MODALS][NAME].open) || false,
            modalState: (state) => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),

        header() {
            return 'О спикере';
        },

        author() {
            const { author } = this.modalState;
            return author;
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },
};
</script>
