<template>
    <div class="simple-text-widget">
        {{ content }}
    </div>
</template>

<script>
import './SimpleTextWidget.css';

export default {
    name: 'simple-text-widget',

    props: {
        content: {
            type: String,
            default: () => '',
        },
    },
};
</script>
