<template>
    <general-modal
        v-if="isOpen"
        class="return-reason-modal"
        type="sm"
        header="Выберите причину возврата"
        @close="onClose"
        :is-mobile="isTablet"
    >
        <template v-slot:content>
            <h3 class="return-reason-modal__title">Укажите причину возврата</h3>
            <ul class="return-reason-modal__list">
                <li class="return-reason-modal__list-item">
                    <v-check
                        id="radio-1"
                        v-model="reasonSelected"
                        type="radio"
                        name="radio-1"
                        :value="returnReasons.MARRIAGE"
                    >
                        Брак
                    </v-check>
                </li>
                <li class="return-reason-modal__list-item">
                    <v-check
                        id="radio-2"
                        v-model="reasonSelected"
                        type="radio"
                        name="radio-2"
                        :value="returnReasons.WRONG"
                    >
                        Не тот товар в заказе
                    </v-check>
                </li>
                <li class="return-reason-modal__list-item">
                    <v-check
                        id="radio-3"
                        v-model="reasonSelected"
                        type="radio"
                        name="radio-3"
                        :value="returnReasons.PACKAGE"
                    >
                        Вскрыта оригинальная упаковка
                    </v-check>
                </li>
                <li class="return-reason-modal__list-item">
                    <v-check
                        id="radio-4"
                        v-model="reasonSelected"
                        type="radio"
                        name="radio-4"
                        :value="returnReasons.TIME"
                    >
                        Истекает срок годности товара
                    </v-check>
                </li>
                <li class="return-reason-modal__list-item">
                    <v-check
                        id="radio-5"
                        v-model="reasonSelected"
                        type="radio"
                        name="radio-5"
                        :value="returnReasons.QUALITY"
                    >
                        Товар ненадлежащего качества
                    </v-check>
                </li>
                <li class="return-reason-modal__list-item">
                    <v-check
                        id="radio-6"
                        v-model="reasonSelected"
                        type="radio"
                        name="radio-6"
                        :value="returnReasons.DESCRIPTION"
                    >
                        Товар не соответствует описанию
                    </v-check>
                </li>
                <li class="return-reason-modal__list-item">
                    <v-check
                        id="radio-7"
                        v-model="reasonSelected"
                        type="radio"
                        name="radio-7"
                        :value="returnReasons.DECISION"
                    >
                        Изменил решение о покупке
                    </v-check>
                </li>
                <li class="return-reason-modal__list-item">
                    <v-check
                        id="radio-8"
                        v-model="reasonSelected"
                        type="radio"
                        name="radio-8"
                        :value="returnReasons.OTHER"
                    >
                        Другое
                    </v-check>
                    <v-input
                        v-model="reasonDescription"
                        :error="reasonDescriptionError"
                        @focus="reasonSelected = returnReasons.OTHER"
                        placeholder="Опишите проблему"
                    >
                        <template v-slot:error="{ error }">
                            <transition name="slide-in-bottom" mode="out-in">
                                <div :key="error" v-if="error">{{ error }}</div>
                            </transition>
                        </template>
                    </v-input>
                </li>
            </ul>
            <div class="return-reason-modal__section">
                <h4 class="return-reason-modal__subtitle">Фото и видео товара</h4>
                <div class="return-reason-modal__description">
                    Не более 10 файлов, jpeg, png, mp4, mov.<br />
                    Фото не более 5Mb, видео до 15Mb
                </div>
                <v-file
                    class="return-reason-modal__files"
                    @change="onFilesChanged"
                    :accepted-types="fileAcceptedTypes"
                    :max-file-size="5242880"
                    :filter="filter"
                >
                    <span class="return-reason-modal__files-text">Выберите фото</span>
                </v-file>
            </div>

            <v-button class="return-reason-modal__submit" @click="onSubmit" :disabled="isDisabledSubmit">
                Подтвердить
            </v-button>
        </template>
    </general-modal>
</template>
<script>
import VCheck from '@controls/VCheck/VCheck.vue';
import VFile from '@controls/VFile/VFile.vue';
import VInput from '@controls/VInput/VInput.vue';
import VButton from '@controls/VButton/VButton.vue';

import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import { mapActions, mapState } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';

import { NAME as RETURN_MODULE } from '@store/modules/Profile/modules/ReturnPage';
import { SET_REASON } from '@store/modules/Profile/modules/ReturnPage/actions';

import { modalName, mimeType, returnReasons } from '@enums';
import './ReturnReasonModal.css';

const NAME = modalName.profile.RETURN_REASON;
const RETURN_MODULE_PATH = `${PROFILE_MODULE}/${RETURN_MODULE}`;

export default {
    name: NAME,

    components: {
        VCheck,
        VFile,
        VInput,
        VButton,

        GeneralModal,
    },

    data() {
        return {
            reasonSelected: null,
            reasonDescription: '',
            reasonDescriptionError: false,
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: (state) =>
                state[MODALS][modalName.profile.RETURN_REASON] && state[MODALS][modalName.profile.RETURN_REASON].open,
            modalState: (state) => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),

        isTablet() {
            return this.$mq.tablet;
        },

        fileAcceptedTypes() {
            return [mimeType.image.JPEG, mimeType.image.PNG, mimeType.video.MOV, mimeType.video.MP4];
        },

        isDisabledSubmit() {
            if (this.reasonSelected && this.reasonSelected !== this.returnReasons.OTHER) return false;
            else if (this.reasonDescription) return false;
            return true;
        },

        reason() {
            return this.reasonSelected !== this.returnReasons.OTHER ? this.reasonSelected : this.reasonDescription;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(RETURN_MODULE_PATH, [SET_REASON]),

        onClose() {
            this.$emit('close');
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },

        onFilesChanged(files) {
            this.files = files || [];
        },

        onSubmit() {
            this[SET_REASON]({ productId: this.modalState.productId, reasonText: this.reason });
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },

        filter(file) {
            if (file.type === mimeType.image.JPEG || file.type === mimeType.image.PNG) {
                if (file.size <= 5242880) return true;
            } else if (file.type === mimeType.video.MOV || file.type === mimeType.video.MP4) {
                if (file.size <= 15728640) return true;
            }
            return false;
        },
    },

    beforeMount() {
        this.returnReasons = returnReasons;
    },
};
</script>
