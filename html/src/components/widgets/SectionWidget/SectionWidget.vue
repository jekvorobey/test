<template>
    <div class="section-widget">
        <h2>{{ title.content }}</h2>
        <component
            v-for="renderItem in renderData"
            :key="renderItem.id"
            :is="renderItem.component"
            v-bind="renderItem.data"
        />
    </div>
</template>

<script>
import SimpleTextWidget from '@components/widgets/SimpleTextWidget/SimpleTextWidget.vue';
import HtmlTextWidget from '@components/widgets/HtmlTextWidget/HtmlTextWidget.vue';
import PictureWidget from '@components/widgets/PictureWidget/PictureWidget.vue';

export default {
    name: 'section-widget',
    components: {
        SimpleTextWidget,
        HtmlTextWidget,
        PictureWidget,
    },

    props: {
        components: {
            type: Array,
            default: () => [],
        },

        title: {
            type: Object,
            default: () => {},
        },
    },

    computed: {
        renderData() {
            return this.components;
        }
    }
}
</script>
