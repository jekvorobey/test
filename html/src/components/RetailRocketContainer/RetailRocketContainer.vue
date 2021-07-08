<template>
    <div class="retail-rocket-container" />
</template>

<script>

export default {
    name: 'retail-rocket-container',

    data() {
        return {
            blockId: this.$attrs['data-retailrocket-markup-block'] || null,
        };
    },

    watch: {
        $attrs: {
            handler() {
                this.markupRender();
            },
        },
    },

    methods: {
        markupRender() {
            if (typeof retailrocket === 'undefined') {
                return;
            }

            // без сброса аттрибута "initialized" retailrocket не рендерит блок заново
            const selector = this.blockId
                ? `div[data-retailrocket-markup-block="${this.blockId}"]`
                : `div[data-retailrocket-markup-block]`;
            document.querySelectorAll(selector)
                .forEach(i => i.removeAttribute('initialized'));

            retailrocket.markup.render();

            console.warn('Retail rocket markup rendered!', this.blockId);
        }
    },

    mounted() {
        this.markupRender();
    }
};
</script>
