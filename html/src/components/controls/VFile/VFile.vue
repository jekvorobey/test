<template>
    <div class="v-file" id="drop-area">
        <template v-for="(file, index) in internal_files">
            <slot name="file" :file="file" :index="index">
                <v-file-item class="v-file__item" :key="file.name" :file="file" />
            </slot>
        </template>
        <form
            class="v-file__item v-file__form"
            :class="{ 'v-file__form--empty': isEmpty }"
            @dragenter.prevent
            @dragover.prevent
            @dragleave.prevent
            @drop.prevent="handleDrop"
            v-if="internal_files.length < maxFiles"
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
        files: {
            type: Array,
            default: () => [],
        },

        acceptedTypes: {
            type: Array,
            default: () => [],
        },

        maxFileSize: {
            type: Number,
        },

        filter: {
            type: Function,
            default: null,
        },

        maxFiles: {
            type: Number,
            default: 10,
        },
    },

    data() {
        return {
            inputId: 0,
            internal_files: [],
        };
    },

    computed: {
        acceptedTypesString() {
            return this.acceptedTypes.join(',');
        },

        isEmpty() {
            return !this.internal_files || this.internal_files.length === 0;
        },
    },

    methods: {
        isFileHeic(file) {
            return file.type === '' && file.name.split('.').pop().toLowerCase() === 'heic';
        },

        isAccepted(file) {
            if (!(file instanceof File)) return false;
            if (this.filter) return this.filter(file);

            const isAcceptedType =
                this.acceptedTypes && (this.acceptedTypes.length === 0 || this.acceptedTypes.includes(file.type) || this.isFileHeic(file));

            const isAcceptedSize = this.maxFileSize && file.size < this.maxFileSize;
            return isAcceptedType && isAcceptedSize;
        },

        deleteFile(file) {
            this.internal_files = this.internal_files.filter((f) => f !== file);
            this.$emit('change', [...this.internal_files]);
        },

        handleFiles(fs, fireEvent = true) {
            const notAccepted = [];
            const buffer = [...fs].slice(0, this.maxFiles - this.internal_files.length).filter((f) => {
                const accepted = !this.internal_files.some((fl) => fl.name === f.name) && this.isAccepted(f);
                if (!accepted) notAccepted.push(f);
                return accepted;
            });

            this.internal_files.push(...buffer);
            this.inputId += 1;
            if (fireEvent) this.$emit('change', [...this.internal_files]);
            if (notAccepted.length > 0) this.$emit('error', notAccepted);
        },

        handleDrop(e) {
            const files = (e.dataTransfer && e.dataTransfer.files) || [];
            this.handleFiles(files);
        },
    },

    created() {
        const { files } = this;
        this.handleFiles(files, false);
    },
};
</script>
