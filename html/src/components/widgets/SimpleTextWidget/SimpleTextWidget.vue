<template>
    <div class="simple-text-widget">
        <div class="simple-text-widget__content">
            {{ content }}
        </div>
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
        }
    }
}
</script>
