<template>
    <a class="product-file-card" :href="filePath">
        <div class="product-file-card__img">
            <v-svg id="product-file-card" name="doc-pdf" width="24" height="24" />
        </div>
        <div class="product-file-card__body">
            <div class="product-file-card__body-top">
                {{ fileName }}
            </div>
            <div class="text-grey text-sm product-file-card__body-bottom">
                <span class="text-uppercase">{{ ext }}</span> - <span>{{ fileSize }}</span>
            </div>
        </div>
    </a>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';

import '@images/sprites/doc-pdf.svg';
import './ProductFileCard.css';

import { generateFileOriginalPath, formatFileSize } from '@util/file';

export default {
    name: 'product-file-card',

    components: {
        VSvg,
    },

    props: {
        fileId: {
            type: [String, Number],
            required: true,
        },

        fileName: {
            type: String,
            required: true,
        },

        size: {
            type: [String, Number],
        },

        ext: {
            type: String,
        },
    },

    computed: {
        fileSize() {
            return formatFileSize(this.size);
        },

        filePath() {
            return generateFileOriginalPath(this.fileId);
        },
    },
};
</script>
