<template>
    <div class="v-filepond">
        <slot />
        <file-pond
            ref="pond"
            class="v-filepond__wrapper"
            v-show="initialized"
            v-bind="$attrs"
            v-on="$listeners"
            @init="onInit"
        />
    </div>
</template>

<script>
import vueFilePond from 'vue-filepond';

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);
// Import FilePond styles
import { FileStatus, FileOrigin, Status } from 'filepond';
import './VFilepond.css';

export const status = Status;
export const fileStatus = FileStatus;
export const origin = FileOrigin;

export default {
    name: 'v-filepond',
    inheritAttrs: false,
    components: {
        FilePond,
    },
    data() {
        return {
            initialized: false,
        };
    },
    methods: {
        onInit() {
            this.initialized = true;
        },
    },
};
</script>


