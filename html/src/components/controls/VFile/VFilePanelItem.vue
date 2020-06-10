<template>
    <div class="v-file-panel-item">
        <div class="v-file-panel-item__content">
            <v-svg :name="fileType" width="18" height="24" />
            <span class="v-file-panel-item__title">
                {{ file.name }}
            </span>
            <span class="v-file-panel-item__size">
                {{ fileSize }}
            </span>
        </div>
        <div class="v-file-panel-item__controls" @click.stop="onDeleteItem">
            <v-svg name="cross" width="20" height="20" />
        </div>
    </div>
</template>
<script>
import VSvg from '@controls/VSvg/VSvg.vue';

import { formatFileSize } from '@util/file.js';

import { mimeType, interval } from '@enums';
import preloader from '@images/icons/preloader.svg';
import '@images/sprites/cross.svg';
import '@images/sprites/doc.svg';
import '@images/sprites/doc-pdf.svg';
import './VFilePanelItem.css';

export default {
    name: 'v-file-panel-item',
    inject: ['deleteFile'],

    components: {
        VSvg,
    },

    props: {
        file: {
            default: null,
        },
    },

    data() {
        return {
            preloader,
        };
    },

    computed: {
        fileType() {
            switch (this.file.type) {
                case mimeType.application.pdf:
                    return 'doc-pdf';
                default:
                    return 'doc';
            }
        },

        fileSize() {
            return formatFileSize(this.file.size);
        },
    },

    methods: {
        onDeleteItem() {
            this.deleteFile(this.file);
        },
    },

    beforeMount() {
        this.name = this.file.name;
    },
};
</script>