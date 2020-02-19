
<template>
    <picture class="v-picture" v-if="!image">
        <slot />
    </picture>
    <picture class="v-picture" v-else-if="isObject && lazy">
        <slot name="source" :image="image" :lazy="lazy">
            <source
                v-for="(source, index) in image.sources"
                :key="index"
                :data-srcset="source.srcset"
                :type="source.type"
                :media="source.media"
            />
        </slot>
        <slot name="fallback" :image="image" :lazy="lazy" :alt="alt">
            <img class="blur-up lazyload v-picture__img" :data-src="image.src" :alt="alt" />
        </slot>
    </picture>
    <picture class="v-picture" v-else-if="isObject && !lazy">
        <slot name="source" :image="image" :lazy="lazy">
            <source v-for="(source, index) in image.sources" :key="index" :srcset="source.srcset" :type="source.type" />
        </slot>
        <slot name="fallback" :image="image" :lazy="lazy" :alt="alt">
            <img class="v-picture__img" :src="image.src" :alt="alt" />
        </slot>
    </picture>
    <img v-else-if="!isObject && lazy" class="blur-up lazyload v-picture" :data-src="image" :alt="alt" />
    <img v-else-if="!isObject && !lazy" class="v-picture" :src="image" :alt="alt" />
</template>
<script>
import './VPicture.css';

export default {
    name: 'v-picture',

    props: {
        image: {
            type: [Object, String],
            default: '',
        },

        lazy: {
            type: Boolean,
            default: true,
        },

        alt: {
            type: String,
            default: '',
        },
    },

    computed: {
        isObject() {
            return this.image instanceof Object;
        },
    },
};
</script>