<template>
    <v-sticky class="v-pdf">
        <template v-slot:sticky>
            <pdf-control-panel class="v-pdf__panel" :scale.sync="internal_scale" :max-scale="maxScale" :step="step" />
        </template>
        <div class="v-pdf__document" v-scroll-lock="scrollLock">
            <pdf-page
                class="v-pdf__page"
                v-for="(page, index) in pages"
                :key="index"
                :page="page"
                :max-scale="maxScale"
                :scale="internal_scale"
            />
        </div>
    </v-sticky>
</template>

<script>
import VSticky from '@controls/VSticky/VSticky.vue';
import PdfControlPanel from './pdf-control-panel/pdf-control-panel.vue';
import PdfPage from './pdf-page/pdf-page.vue';
import './VPdf.css';

// PDFDocument renders an entire PDF inline using
// PDF.js and <canvas>. Currently does not support,
// rendering of selected pages (but could be easily
// updated to do so).

const BUFFER_LENGTH = 10;

function range(startAt = 0, size) {
    return [...Array(size).keys()].map(i => i + startAt);
}

function getDocument(url) {
    // Using import statement in this way allows Webpack
    // to treat pdf.js as an async dependency so we can
    // avoid adding it to one of the main bundles
    return import(
        /* webpackChunkName: 'pdfjs-dist' */
        'pdfjs-dist/webpack'
    ).then(pdfjs => pdfjs.getDocument(url));
}

// pdf: instance of PDFData
// see docs for PDF.js for more info
function getPages(pdf, first, last) {
    const promises = [];
    const allPages = range(first, last).map(number => pdf.getPage(number));
    return Promise.all(allPages);
}

export default {
    name: 'v-pdf',
    components: {
        VSticky,
        PdfControlPanel,
        PdfPage,
    },
    props: {
        url: {
            type: String,
            required: true,
        },
        scale: {
            type: Number,
            default: 1,
            validator(value) {
                return value > 0;
            },
        },
        maxScale: {
            type: Number,
            default: 1,
            validator(value) {
                return value > 0;
            },
        },
        step: {
            type: Number,
            default: 0.1,
            validator(value) {
                return value >= 0.1 && value <= 1;
            },
        },

        scrollLock: {
            type: Boolean,
        },
    },
    data() {
        return {
            pages: [],
            pdf: undefined,
            internal_scale: this.scale > this.maxScale ? this.maxScale : this.scale,
        };
    },
    watch: {
        url: {
            handler(url) {
                getDocument(url)
                    .then(pdf => (this.pdf = pdf))
                    .catch(response => {
                        this.$emit('document-errored', { text: 'Failed to retrieve PDF', response });
                        console.log('Failed to retrieve PDF', response);
                    });
            },
            immediate: true,
        },
        pdf(pdf, oldPdf) {
            if (!pdf) return;
            if (oldPdf) Object.assign(this, getDefaults());
            this.$emit('page-count', this.pageCount);
            this.fetchPages();
        },
        maxScale(value, oldValue) {
            if (value !== oldValue) {
                this.internal_scale = this.scale > value ? value : this.scale;
                this.$forceUpdate();
            }
        },
    },
    computed: {
        pageCount() {
            return this.pdf ? this.pdf.numPages : 0;
        },
    },
    methods: {
        fetchPages(currentPage = 0) {
            if (!this.pdf) return;
            if (this.pageCount > 0 && this.pages.length === this.pageCount) return;
            const startIndex = this.pages.length;
            if (this.cursor > startIndex) return;
            const startPage = startIndex + 1;
            const endPage = Math.min(Math.max(currentPage, startIndex + BUFFER_LENGTH), this.pageCount);
            this.cursor = endPage;
            console.log(`Fetching pages ${startPage} to ${endPage}`);
            getPages(this.pdf, startPage, endPage)
                .then(pages => {
                    const deleteCount = 0;
                    this.pages.splice(startIndex, deleteCount, ...pages);
                    return this.pages;
                })
                .catch(response => {
                    this.$emit('document-errored', { text: 'Failed to retrieve pages', response });
                    console.log('Failed to retrieve pages', response);
                });
        },
        onPageRendered({ text, page }) {
            console.log(text, page);
        },
        onPageErrored({ text, response, page }) {
            console.log('Error!', text, response, page);
        },
    },
    created() {
        this.$on('page-rendered', this.onPageRendered);
        this.$on('page-errored', this.onPageErrored);
        this.$on('pages-fetch', this.fetchPages);
    },
};
</script>