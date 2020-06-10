<template>
    <div class="return-documents-page">
        <h3 class="return-documents-page__title">Заявление на возврат</h3>
        <div class="return-documents-page__content">
            <attention-panel class="return-documents-page__attention-panel">
                <span>
                    Заявление на возврат сформировано успешно. Вам нужно будет его распечатать и подписать, затем
                    отсканировать подписанное заявление и прикрепить ниже.
                </span>
            </attention-panel>
            <v-file
                class="return-documents-page__files"
                @change="onFilesChanged"
                :accepted-types="fileAcceptedTypes"
                :max-file-size="5242880"
                class-name="return-documents-page__filers-form"
                :max-files="1"
            >
                <template v-slot:file="{ file }">
                    <v-file-panel-item :file="file" />
                </template>

                <span class="return-documents-page__files-text text-bold">Выбери документ</span>&nbsp;
                <span class="return-documents-page__files-text">или перетащите его сюда</span>
            </v-file>
            <span class="return-documents-page__files-description">
                Документ или фото не более 5Mb, jpeg, png, pdf
            </span>
        </div>
        <div class="return-documents-page__controls">
            <v-button class="return-documents-page__btn" @click="onClickNext" :disabled="isBtnDisabled">
                Выбрать способ возврата
            </v-button>
            <v-button class="return-documents-page__btn btn--transparent" @click="onClickBack">
                Назад
            </v-button>
        </div>
    </div>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VFile from '@controls/VFile/VFile.vue';
import VFilePanelItem from '@controls/VFile/VFilePanelItem.vue';

import AttentionPanel from '@components/AttentionPanel/AttentionPanel.vue';

import { mapState, mapActions } from 'vuex';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as RETURN_MODULE } from '@store/modules/Profile/modules/ReturnPage';
import { SET_STEP } from '@store/modules/Profile/modules/ReturnPage/actions';

import { mimeType } from '@enums';
import { returnFormSteps } from '@enums/profile';
import './ReturnDocumentsPage.css';

const RETURN_MODULE_PATH = `${PROFILE_MODULE}/${RETURN_MODULE}`;

export default {
    name: 'return-documents-page',

    components: {
        VButton,
        VFile,
        VFilePanelItem,

        AttentionPanel,
    },

    data() {
        return {
            files: [],
        };
    },

    computed: {
        fileAcceptedTypes() {
            return [mimeType.image.JPEG, mimeType.image.PNG, mimeType.application.PDF];
        },

        isBtnDisabled() {
            return !this.files.length;
        },
    },

    methods: {
        ...mapActions(RETURN_MODULE_PATH, [SET_STEP]),

        onFilesChanged(files) {
            this.files = files || [];
        },

        onClickNext() {},

        onClickBack() {
            this[SET_STEP](returnFormSteps.CHECK);
        },
    },
};
</script>