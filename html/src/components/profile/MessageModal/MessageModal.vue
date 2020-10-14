<template>
    <general-modal
        v-if="isOpen"
        class="message-modal"
        type="sm"
        header="Новое сообщение"
        @close="onClose"
        :is-mobile="isTablet"
    >
        <template v-slot:content>
            <h4 class="message-modal__hl">Новое сообщение</h4>
            <form class="message-modal__form" ref="form" enctype="multipart/form-data" @submit.prevent="onSubmit">
                <v-input
                    class="message-modal__form-row"
                    v-model="theme"
                    name="theme"
                    placeholder="Введите тему"
                    :readonly="readonlyTheme"
                >
                    Тема
                </v-input>

                <v-input
                    v-model="message"
                    class="message-modal__form-row message-modal__form-textarea"
                    tag="textarea"
                    placeholder="Текст сообщения"
                    name="message"
                    :rows="3"
                    :auto-height="false"
                >
                    Сообщение
                </v-input>

                <!-- <input type="file" name="files[]" /> -->

                <v-button class="message-modal__submit-btn" @click="onSubmit" :disabled="inProcess">
                    Отправить сообщение
                </v-button>
            </form>
        </template>
    </general-modal>
</template>
<script>
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';
import validationMixin, { required } from '@plugins/validation';

import { mapActions, mapState } from 'vuex';
import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as MESSAGES_MODULE, THEMES } from '@store/modules/Profile/modules/Messages';
import { CREATE_CHAT, FETCH_THEMES } from '@store/modules/Profile/modules/Messages/actions';

import { modalName } from '@enums';
import './MessageModal.css';

const MESSAGES_MODULE_PATH = `${PROFILE_MODULE}/${MESSAGES_MODULE}`;
const NAME = modalName.profile.MESSAGE;

export default {
    name: NAME,
    mixins: [validationMixin],

    components: {
        VButton,
        VInput,
        GeneralModal,
    },

    validations: {
        theme: {
            required,
        },

        message: {
            required,
        },
    },

    data() {
        return {
            inProcess: false,
            theme: '',
            message: '',
            readonlyTheme: false,
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: state => state[MODALS][modalName.profile.MESSAGE] && state[MODALS][modalName.profile.MESSAGE].open,
            modalState: state => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),
        ...mapState(MESSAGES_MODULE_PATH, [THEMES]),

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(MESSAGES_MODULE_PATH, [CREATE_CHAT, FETCH_THEMES]),

        async onSubmit() {
            if (this.$v.$invalid || this.inProcess) return;

            try {
                this.inProcess = true;
                const { form } = this.$refs;
                const formData = new FormData(form);
                await this[CREATE_CHAT](formData);
                this.$emit('created');
                this.onClose();
            } catch (error) {
                this.inProcess = false;
            }
        },

        async getThemeByCode(code) {
            this.readonlyTheme = true;

            await this[FETCH_THEMES]();
            const theme = this[THEMES].find(t => t.type === code);

            if (theme) {
                this.theme = theme.name;
                return;
            }

            this.readonlyTheme = false;
        },

        onClose() {
            this.$emit('close');
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },

    beforeMount() {
        if (this.modalState.themeCode) this.getThemeByCode(this.modalState.themeCode);
    },
};
</script>
