<template>
    <div class="v-video">
        <video v-bind="$attrs">
            <slot />
        </video>
    </div>
</template>

<script>
import './VVideo.css';

export default {
    name: 'v-video',
    inheritAttrs: false,

    props: {
        source: {
            type: [Object, String],
            default: '',
        },
    },
};
</script>
