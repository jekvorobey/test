<template>
    <div class="pdf-control-panel">
        <button
            class="pdf-control-panel__btn"
            @click="updateScale(step)"
            aria-label="Увеличить масштаб"
            :disabled="disableZoomIn"
        >
            +
        </button>
        <button
            class="pdf-control-panel__btn"
            @click="updateScale(-step)"
            aria-label="Уменьшить масштаб"
            :disabled="disableZoomOut"
        >
            -
        </button>
    </div>
</template>

<script>
import './pdf-control-panel.css';

export default {
    name: 'pdf-control-panel',
    props: {
        maxScale: {
            type: Number,
            default: 1,
        },
        scale: {
            type: Number,
            default: 1,
        },
        step: {
            type: Number,
            default: 0.1,
        },
    },
    computed: {
        disableZoomOut() {
            return this.scale - this.step <= 0;
        },

        disableZoomIn() {
            return this.scale + this.step > this.maxScale;
        },
    },
    methods: {
        updateScale(value) {
            this.$emit('update:scale', this.scale + value);
        },
    },
};
</script>
