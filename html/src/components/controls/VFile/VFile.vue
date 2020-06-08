<template>
    <div class="v-file" id="drop-area">
        <v-file-item class="v-file__item" v-for="file in files" :key="file.name" :file="file" />

        <form
            class="v-file__item v-file__form"
            :class="{ 'v-file__form--empty': isEmpty }"
            @dragenter.prevent
            @dragover.prevent
            @dragleave.prevent
            @drop.prevent="handleDrop"
        >
            <label class="v-file__form-label" for="fileInput">
                <slot>
                    <div class="text-medium v-file__form-label-title">Выберите файл&nbsp;</div>
                    <div class="text-sm text-grey">или&nbsp;перетащите сюда</div>
                </slot>
            </label>

            <input
                :key="inputId"
                id="fileInput"
                class="v-file__form-input"
                type="file"
                multiple
                :accept="acceptedTypes"
                @change="handleFiles($event.target.files)"
            />
        </form>
    </div>
</template>

<script>
import VFileItem from './VFileItem.vue';
import { mimeType } from '@enums';
import './VFile.css';

export default {
    name: 'v-file',

    provide() {
        return {
            deleteFile: this.deleteFile,
        };
    },

    components: {
        VFileItem,
    },

    props: {
        acceptedTypes: {
            type: Array,
            default: () => [],
        },

        maxFileSize: {
            type: Number,
        }
    },

    data() {
        return {
            inputId: 0,
            files: [],
        };
    },

    computed: {
        acceptedTypesString() {
            return this.acceptedTypes.join(',');
        },

        isEmpty() {
            return !this.files || this.files.length === 0;
        },
    },

    watch: {
        files() {
            this.$emit('change', [...this.files]);
        },
    },

    methods: {
        isAccepted(file) {
            const acceptedType = this.acceptedTypes && (this.acceptedTypes.length === 0 || this.acceptedTypes.includes(file.type));

            const acceptedSize = this.maxFileSize && file.size < this.maxFileSize;

            return acceptedType && acceptedSize;
        },

        deleteFile(file) {
            this.files = this.files.filter(f => f !== file);
        },

        handleFiles(fs) {
            const buffer = [...fs].filter(f => !this.files.some(fl => fl.name === f.name) && this.isAccepted(f));
            this.files.push(...buffer);
            this.inputId += 1;
        },

        handleDrop(e) {
            const files = (e.dataTransfer && e.dataTransfer.files) || [];
            this.handleFiles(files);
        },
    },
};
</script>