<template>
    <div class="v-video">
        <video ref="video" v-bind="attrs">
            <slot />
        </video>
        <template v-if="!play">
            <div class="v-video__mask" @click="onPlay" />
            <v-svg class="v-video__icon" name="play" height="64" width="64" />
        </template>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';

import { eventName } from '@enums';
import '@images/sprites/play.svg';
import './VVideo.css';

export default {
    name: 'v-video',
    inheritAttrs: false,

    components: {
        VSvg,
    },

    data() {
        return {
            play: false,
        };
    },

    computed: {
        attrs() {
            const { play, $attrs } = this;
            return play ? $attrs : {};
        },
    },

    methods: {
        onPlay() {
            const { video } = this.$refs;
            this.play = true;
            this.$nextTick(() => video && video.play());
        },

        onStop() {
            this.play = false;
        },
    },

    mounted() {
        const { video } = this.$refs;
        video && video.addEventListener(eventName.video.PAUSE, this.onStop);
    },

    beforeDestroy() {
        const { video } = this.$refs;
        video && video.removeEventListener(eventName.video.PAUSE, this.onStop);
    },
};
</script>
