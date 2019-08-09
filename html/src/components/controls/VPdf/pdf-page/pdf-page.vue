<template>
    <div class="pdf-page">
        <canvas class="pdf-page__content" ref="canvas" v-visible.once="drawPage" v-bind="canvasAttrs" />
        <div class="pdf-page__mask" v-show="loading">
            <loader class="pdf-page__loader" />
        </div>
    </div>
</template>

<script>
import Loader from '../../../loader/loader.vue';
import './pdf-page.css';
const PIXEL_RATIO = window.devicePixelRatio || 1;
const VIEWPORT_RATIO = 0.98;

export default {
    name: 'pdf-page',
    components: {
        Loader,
    },
    props: {
        page: {
            type: Object, // instance of PDFPageProxy returned from pdf.getPage
            required: true,
        },
        maxScale: {
            type: Number,
            required: true,
        },
        scale: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            loading: true,
        };
    },
    computed: {
        actualViewportSize() {
            return this.viewport.clone({ scale: this.scale });
        },

        canvasSize() {
            const { width: actualSizeWidth, height: actualSizeHeight } = this.actualViewportSize;
            const [pixelWidth, pixelHeight] = [actualSizeWidth, actualSizeHeight].map(dim =>
                Math.ceil(dim / PIXEL_RATIO)
            );
            return { pixelWidth, pixelHeight };
        },

        canvasAttrs() {
            let { width, height } = this.viewport;
            [width, height] = [width, height].map(dim => Math.ceil(dim));
            const size = this.canvasSize;

            return {
                width: width,
                height: height,
                style: `width: ${size.pixelWidth}px; height: ${size.pixelHeight}px;`,
            };
        },

        pageNumber() {
            return this.page.pageNumber;
        },
    },

    methods: {
        drawPage() {
            if (this.renderTask) return;
            const { viewport } = this;
            const canvasContext = this.$refs.canvas.getContext('2d');
            const renderContext = { canvasContext, viewport };
            // PDFPageProxy#render
            // https://mozilla.github.io/pdf.js/api/draft/PDFPageProxy.html
            this.renderTask = this.page.render(renderContext);
            this.renderTask
                .then(() => {
                    this.loading = false;
                    this.$emit('page-rendered', {
                        page: this.page,
                        text: `Rendered page ${this.pageNumber}`,
                    });
                })
                .catch(response => {
                    this.loading = false;
                    this.destroyRenderTask();
                    this.$emit('page-errored', {
                        response,
                        page: this.page,
                        text: `Failed to render page ${this.pageNumber}`,
                    });
                });
        },

        updateVisibility() {
            this.$parent.$emit('update-visibility');
        },

        destroyPage(page) {
            // PDFPageProxy#_destroy
            // https://mozilla.github.io/pdf.js/api/draft/PDFPageProxy.html
            if (page) page._destroy();
            this.destroyRenderTask();
        },

        destroyRenderTask() {
            if (!this.renderTask) return;
            // RenderTask#cancel
            // https://mozilla.github.io/pdf.js/api/draft/RenderTask.html
            this.renderTask.cancel();
            this.renderTask = null;
        },
    },
    watch: {
        scale: 'updateVisibility',
        page(_newPage, oldPage) {
            this.destroyPage(oldPage);
        },
    },
    created() {
        // PDFPageProxy#getViewport
        // https://mozilla.github.io/pdf.js/api/draft/PDFPageProxy.html
        this.viewport = this.page.getViewport(this.maxScale);
    },

    mounted() {
        console.log(`Page ${this.pageNumber} mounted`);
    },

    beforeDestroy() {
        this.destroyPage(this.page);
    },
};
</script>
