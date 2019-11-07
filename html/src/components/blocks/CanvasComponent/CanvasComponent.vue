<template>
    <div>
        <div :style="{ background: '#000', position: 'relative', width: '300px', height: '300px' }">
            <canvas
                ref="canvas"
                width="300"
                height="300"
                @mousemove="debounse_handleMouseMove"
                @mouseleave="handleMouseLeave"
                @mouseup="handleMouseUp"
            />
            <div class="btn" :style="style" @mousedown="handleMouseDown">
                Кнопка
            </div>
            <div class="btn" :style="style" @mousedown="handleMouseDown">
                Кнопка
            </div>
        </div>
    </div>
</template>
<script>
import _debounce from 'lodash/debounce';
import VButton from '../../controls/VButton/VButton.vue';
export default {
    name: 'canvas-component',
    components: { VButton },
    data() {
        return {
            selectedEl: null,
            style: {
                background: '#FFF',
                color: '#000',
                position: 'absolute',
                left: '0px',
                top: '0px',
            },
        };
    },
    methods: {
        getMousePos(e) {
            return {};
        },

        handleMouseMove(e) {
            if (!this.selectedEl) return;

            let top = e.clientY - this.rect.top - this.selectedEl.offsetHeight / 2;
            let left = e.clientX - this.rect.left - this.selectedEl.offsetWidth / 2;

            if (left + this.selectedEl.offsetWidth > this.rect.width) {
                left = this.rect.width - this.selectedEl.offsetWidth;
            }

            if (top + this.selectedEl.offsetHeight > this.rect.height) {
                top = this.rect.height - this.selectedEl.offsetHeight;
            }

            if (this.selectedEl.style.top !== top || this.selectedEl.style.left !== left)
                requestAnimationFrame(() => {
                    if (this.selectedEl) {
                        this.selectedEl.style.top = `${top > 0 ? top : 0}px`;
                        this.selectedEl.style.left = `${left > 0 ? left : 0}px`;
                    }
                });
        },

        handleMouseDown(e) {
            this.selectedEl = e.target;
            this.selectedEl.style.pointerEvents = 'none';
        },

        handleMouseLeave(e) {
            if (this.selectedEl) {
                this.selectedEl.style.pointerEvents = 'auto';
                this.selectedEl = null;
            }
        },

        handleMouseUp(e) {
            if (this.selectedEl) {
                this.selectedEl.style.pointerEvents = 'auto';
                this.selectedEl = null;
            }
        },
    },

    beforeMount() {
        this.debounse_handleMouseMove = _debounce(e => this.handleMouseMove(e), 20);
        //this.debounse_handleMouseMove = this.handleMouseMove;
    },

    mounted() {
        const { canvas } = this.$refs;
        this.rect = canvas.getBoundingClientRect();
        const resize = _debounce(() => {
            const { canvas } = this.$refs;
            this.rect = canvas.getBoundingClientRect();
        }, 300);
        window.addEventListener('resize', resize);
        this.$on('hook:beforeDestroy', () => window.removeEventListener('resize', resize));
    },
};
</script>