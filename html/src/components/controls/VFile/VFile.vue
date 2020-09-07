<template>
    <div class="v-file" id="drop-area">
        <template v-for="(file, index) in files">
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
            v-if="files.length < maxFiles"
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
            if (this.filter) return this.filter(file);

            const isAcceptedType =
                this.acceptedTypes && (this.acceptedTypes.length === 0 || this.acceptedTypes.includes(file.type));

            const isAcceptedSize = this.maxFileSize && file.size < this.maxFileSize;
            return isAcceptedType && isAcceptedSize;
        },

        deleteFile(file) {
            this.files = this.files.filter(f => f !== file);
        },

        handleFiles(fs) {
            const notAccepted = [];
            const buffer = [...fs].slice(0, this.maxFiles - this.files.length).filter(f => {
                const accepted = !this.files.some(fl => fl.name === f.name) && this.isAccepted(f);
                if (!accepted) notAccepted.push(f);
                return accepted;
            });

            this.files.push(...buffer);
            this.inputId += 1;
            if (notAccepted.length > 0) this.$emit('error', notAccepted);
        },

        handleDrop(e) {
            const files = (e.dataTransfer && e.dataTransfer.files) || [];
            this.handleFiles(files);
        },
    },
};
</script>