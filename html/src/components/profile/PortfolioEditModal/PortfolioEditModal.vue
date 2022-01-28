<template>
    <general-modal class="portfolio-edit-modal" v-if="isOpen" :header="header" @close="onClose" :is-mobile="isTablet">
        <template v-slot:content>
            <h4 class="portfolio-edit-modal__hl">{{ header }}</h4>
            <transition name="fade" mode="out-in">
                <div
                    v-if="!files.length && editablePortfolio && editablePortfolio.length > 0"
                    class="containet container--tablet portfolio-edit-modal__section"
                >
                    <p class="portfolio-edit-modal__info">
                        Укажи ссылку на свой аккаунт бьюти-профессионала в соцсетях
                    </p>
                    <v-input
                        class="portfolio-edit-modal__input"
                        v-model="computedItems[0].link.$model"
                        placeholder="Добавить ссылку"
                        :show-error="false"
                        :error="linkError(computedItems[0].link)"
                    >
                        <span class="text-grey">Ссылка</span>
                        <template v-slot:after>
                            <button
                                v-if="editablePortfolio && editablePortfolio.length > 0 && editablePortfolio[0].link"
                                class="portfolio-edit-modal__input-close-btn"
                                type="button"
                                @click.stop="onDeletePortfolio"
                            >
                                <v-svg name="cross" width="24" height="24" />
                            </button>
                        </template>
                    </v-input>
                </div>
            </transition>
            <transition name="fade" mode="out-in">
                <div v-if="!editablePortfolio[0].link && !files.length" class="portfolio-edit-modal__divider">
                    <div class="portfolio-edit-modal__divider-line"></div>
                    <span class="portfolio-edit-modal__divider-text">или</span>
                    <div class="portfolio-edit-modal__divider-line"></div>
                </div>
            </transition>
            <transition name="fade" mode="out-in">
                <div v-if="!editablePortfolio[0].link" class="portfolio-edit-modal__section">
                    <p class="portfolio-edit-modal__info--no-margin">
                        Загрузи скан профильного диплома, либо другого подтверждающего документа
                    </p>
                    <p class="text-grey portfolio-edit-modal__info-formats">Файлы форматов jpeg, png, pdf, doc, docx</p>
                    <v-file
                        class="portfolio-edit-modal__files"
                        :files="files"
                        :accepted-types="fileAcceptedTypes"
                        :max-file-size="5242880"
                        :max-files="1"
                        @change="onFilesChanged"
                        @error="onHandleError"
                    >
                        <template v-slot:file="{ file }">
                            <v-file-item
                                ref="fileItem"
                                class="v-file__item portfolio-edit-modal__file-item"
                                :class="{ 'portfolio-edit-modal__file-item--loaded': fileLoaded }"
                                :key="file.name"
                                :file="file"
                                @load="onFileLoad"
                            />
                            <div class="portfolio-edit-modal__files-info">
                                <span>{{ file.name }}</span>
                                <span
                                    class="text-grey portfolio-edit-modal__files-info-delete"
                                    @click.stop="onDeleteFile"
                                >
                                    Удалить
                                </span>
                            </div>
                        </template>
                    </v-file>
                    <div class="status-color-error">
                        <transition name="slide-in-bottom">
                            <span v-if="error" key="error">{{ error }}</span>
                        </transition>
                    </div>
                </div>
            </transition>

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
import VFileItem from '@controls/VFile/VFileItem.vue';
import VSvg from '@controls/VSvg/VSvg.vue';
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';
import validationMixin, { required } from '@plugins/validation';

import { mapState, mapActions } from 'vuex';
import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as CABINET_MODULE, EDITABLE_PORTFOLIO, FILES } from '@store/modules/Profile/modules/Cabinet';
import {
    UPDATE_FILES,
    UPDATE_PORTFOLIO,
    UPLOAD_CERTIFICATE,
    FETCH_CABINET_DATA,
    ADD_PORTFOLIO,
    DELETE_PORTFOLIO,
    CLEAR_PORTFOLIO_DATA,
} from '@store/modules/Profile/modules/Cabinet/actions';

import { modalName, mimeType } from '@enums';
import '@images/sprites/cross.svg';
import './PortfolioEditModal.css';
import { $logger } from '@services';

const CABINET_MODULE_PATH = `${PROFILE_MODULE}/${CABINET_MODULE}`;
const NAME = modalName.profile.PORTFOLIO_EDIT;

export default {
    name: NAME,
    mixins: [validationMixin],

    components: {
        VSvg,
        VFile,
        VFileItem,
        VButton,
        VInput,
        GeneralModal,
    },

    validations: {
        [EDITABLE_PORTFOLIO]: {
            oneOrMore: (value) => value && value.length > 0,

            $each: {
                link: {
                    required,
                },
            },
        },

        [FILES]: {
            oneOrMore: (value) => value && value.length > 0,
        },
    },

    data() {
        return {
            error: null,
            inProcess: false,
            index: 0,
            fileLoaded: false,
        };
    },

    computed: {
        ...mapState(CABINET_MODULE_PATH, [EDITABLE_PORTFOLIO, FILES]),
        ...mapState(MODAL_MODULE, {
            isOpen: (state) => state[MODALS][NAME] && state[MODALS][NAME].open,
        }),

        header() {
            const { isTablet } = this;
            return isTablet ? 'Подтверждение статуса' : 'Подтверждение профессионального статуса';
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
        ...mapActions(CABINET_MODULE_PATH, [
            FETCH_CABINET_DATA,
            ADD_PORTFOLIO,
            DELETE_PORTFOLIO,
            UPDATE_PORTFOLIO,
            UPDATE_FILES,
            UPLOAD_CERTIFICATE,
            CLEAR_PORTFOLIO_DATA,
        ]),

        nameError(name) {
            if (this.$v.files.$invalid && name.$dirty && !name.required) return this.$t('validation.errors.required');
        },

        linkError(link) {
            if (this.$v.files.$invalid && link.$dirty && !link.required) return this.$t('validation.errors.required');
        },

        onAddPortfolio() {
            this.index += 1;
            this[ADD_PORTFOLIO]({ id: this.index, name: null, link: null });
        },

        onDeletePortfolio() {
            this[DELETE_PORTFOLIO]();
        },

        onFilesChanged(files) {
            this[UPDATE_FILES](files);
        },

        onHandleError() {
            this.error = 'Не удалось загрузить файлы. Проверьте размер и формат файлов.';
            setTimeout(() => (this.error = null), 5000);
        },

        onFileLoad(isLoaded) {
            this.fileLoaded = isLoaded;
        },

        onDeleteFile() {
            this.$refs.fileItem.onDeleteItem();
        },

        async onSubmit() {
            this.$v.$touch();
            if (this.$v.editablePortfolio.$invalid && this.$v.files.$invalid) return;

            this.inProcess = true;
            const { files, editablePortfolio } = this;

            if (!this.$v.editablePortfolio.$invalid) await this[UPDATE_PORTFOLIO](editablePortfolio);
            if (!this.$v.files.$invalid)
                await Promise.all(
                    files.map((file) => {
                        const formData = new FormData();
                        formData.append('file', file, file.name);
                        return this[UPLOAD_CERTIFICATE](formData);
                    })
                );

            try {
                this[FETCH_CABINET_DATA](this.$isServer);
            } catch (error) {
                $logger.error(error);
            }

            this.onClose();
            this[CHANGE_MODAL_STATE]({
                name: modalName.general.NOTIFICATION,
                open: true,
                state: {
                    title: 'Уведомление',
                    message:
                        'Спасибо! Данные на подтверждение профессионального статуса отправлены на модерацию. Мы пришлем смс, когда всё проверим.',
                },
            });
        },

        onClose() {
            this[CLEAR_PORTFOLIO_DATA]();
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },
};
</script>
