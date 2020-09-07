<template>
    <general-modal class="portfolio-edit-modal" v-if="isOpen" :header="header" @close="onClose" :is-mobile="isTablet">
        <template v-slot:content>
            <div class="containet container--tablet portfolio-edit-modal__section">
                <h4 class="portfolio-edit-modal__hl">{{ header }}</h4>
                <p class="portfolio-edit-modal__info">
                    Укажи ссылку на свой аккаунт бьюти-профессионала в соцсетях или загрузи скан профильного диплома,
                    либо другого подтверждающего документа.
                </p>

                <ul v-if="editablePortfolio && editablePortfolio.length > 0" class="portfolio-edit-modal__list">
                    <li class="portfolio-edit-modal__list-row" v-for="(v, index) in computedItems" :key="index">
                        <v-input
                            class="portfolio-edit-modal__list-column"
                            v-model="v.link.$model"
                            placeholder="Добавить ссылку"
                            :show-error="false"
                            :error="linkError(v.link)"
                        >
                            {{ index == 0 ? 'Ссылка' : null }}
                            <template v-slot:after>
                                <button
                                    class="portfolio-edit-modal__list-row-btn"
                                    type="button"
                                    @click.stop="onDeletePortfolio(index)"
                                >
                                    <v-svg name="cross" width="24" height="24" />
                                </button>
                            </template>
                        </v-input>

                        <v-input
                            class="portfolio-edit-modal__list-column"
                            v-model="v.name.$model"
                            placeholder="Введите описание"
                            :show-error="false"
                            :error="nameError(v.name)"
                        >
                            {{ index == 0 ? 'Описание ссылки' : null }}
                        </v-input>
                    </li>
                </ul>

                <v-button class="btn--outline portfolio-edit-modal__list-btn" @click="onAddPortfolio">
                    Добавить поле
                </v-button>
            </div>
            <div class="portfolio-edit-modal__section">
                <p class="text-grey">Файлы форматов jpeg, png, pdf, doc, docx, не более 5Mb каждый</p>
                <v-file
                    class="portfolio-edit-modal__files"
                    :accepted-types="fileAcceptedTypes"
                    :max-file-size="5242880"
                    @change="onFilesChanged"
                    @error="onHandleError"
                />
                <div class="status-color-error">
                    <transition name="slide-in-bottom">
                        <span v-if="error" key="error">{{ error }}</span>
                    </transition>
                </div>
            </div>

            <div class="portfolio-edit-modal__submit">
                <v-button
                    class="portfolio-edit-modal__submit-btn"
                    @click="onSubmit"
                    :disabled="isDisabled || inProcess"
                >
                    Отправить
                </v-button>
            </div>
        </template>
    </general-modal>
</template>

<script>
import VFile from '@controls/VFile/VFile.vue';
import VSvg from '@controls/VSvg/VSvg.vue';
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';
import validationMixin, { required, minLength } from '@plugins/validation';

import { mapState, mapActions } from 'vuex';
import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as CABINET_MODULE, PORTFOLIO } from '@store/modules/Profile/modules/Cabinet';
import {
    UPDATE_PORTFOLIO,
    UPLOAD_CERTIFICATE,
    FETCH_CABINET_DATA,
} from '@store/modules/Profile/modules/Cabinet/actions';

import { modalName, mimeType } from '@enums';
import '@images/sprites/cross.svg';
import './PortfolioEditModal.css';

const CABINET_MODULE_PATH = `${PROFILE_MODULE}/${CABINET_MODULE}`;
const NAME = modalName.profile.PORTFOLIO_EDIT;

export default {
    name: NAME,
    mixins: [validationMixin],

    components: {
        VSvg,
        VFile,
        VButton,
        VInput,
        GeneralModal,
    },

    validations: {
        editablePortfolio: {
            oneOrMore: value => value && value.length > 0,

            $each: {
                name: {
                    required,
                },

                link: {
                    required,
                },
            },
        },

        files: {
            oneOrMore: value => value && value.length > 0,
        },
    },

    data() {
        const index = 0;
        return {
            error: null,
            inProcess: false,
            editablePortfolio: [{ id: index, name: null, link: null }],
            files: [],
            index,
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: state => state[MODALS][NAME] && state[MODALS][NAME].open,
        }),

        header() {
            return this.$mq.tablet ? 'Подтверждение статуса' : 'Подтверждение профессионального статуса';
        },

        isTablet() {
            return this.$mq.tablet;
        },

        computedItems() {
            return this.$v.editablePortfolio.$each.$iter;
        },

        isDisabled() {
            return this.$v.editablePortfolio.$invalid && this.$v.files.$invalid;
        },

        fileAcceptedTypes() {
            return [
                mimeType.image.JPEG,
                mimeType.image.PNG,
                mimeType.application.PDF,
                mimeType.application.DOC,
                mimeType.application.DOCX,
            ];
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(CABINET_MODULE_PATH, [UPDATE_PORTFOLIO, UPLOAD_CERTIFICATE, FETCH_CABINET_DATA]),

        nameError(name) {
            if (this.$v.files.$invalid && name.$dirty && !name.required) return this.$t('validation.errors.required');
        },

        linkError(link) {
            if (this.$v.files.$invalid && link.$dirty && !link.required) return this.$t('validation.errors.required');
        },

        onAddPortfolio() {
            this.index += 1;
            this.editablePortfolio.push({ id: this.index, name: null, link: null });
        },

        onDeletePortfolio(index) {
            this.editablePortfolio.splice(index, 1);
        },

        onFilesChanged(files) {
            this.files = files || [];
        },

        onHandleError(files) {
            this.error = 'Не удалось загрузить файлы. Проверьте размер и формат файлов.';
            setTimeout(() => (this.error = null), 5000);
        },

        async onSubmit() {
            this.$v.$touch();
            if (this.$v.editablePortfolio.$invalid && this.$v.files.$invalid) return;

            this.inProcess = true;
            const { files, editablePortfolio } = this;

            if (!this.$v.editablePortfolio.$invalid) await this[UPDATE_PORTFOLIO](editablePortfolio);
            if (!this.$v.files.$invalid)
                await Promise.all(
                    files.map(file => {
                        const formData = new FormData();
                        formData.append('file', file, file.name);
                        return this[UPLOAD_CERTIFICATE](formData);
                    })
                );

            try {
                this[FETCH_CABINET_DATA](this.$isServer);
            } catch (error) {}
            this.onClose();
        },

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },
};
</script>
