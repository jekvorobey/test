<template>
    <div class="v-file-item" :class="{ 'v-file-item--has-mask': hasMask }" @click.stop="onMaskClick">
        <transition name="fade" mode="out-in">
            <img v-if="!load" key="preloader" :src="preloader" width="30" height="30" />
            <img v-else-if="src" key="img" class="v-file-item__img" :src="src" />
            <div v-else key="name" class="v-file-item__container">{{ name }}</div>
        </transition>
        <div v-if="hasMask" class="v-file-item__mask">
            <div class="v-file-item__mask-inner" />
            <v-svg class="v-file-item__mask-icon" name="trash" width="24" height="24" />
        </div>
    </div>
</template>
<script>
import VSvg from '@controls/VSvg/VSvg.vue';

import { mimeType, interval } from '@enums';
import preloader from '@images/icons/preloader.svg';
import '@images/sprites/trash.svg';
import './VFileItem.css';

export default {
    name: 'v-file-item',
    inject: ['deleteFile'],

    components: {
        VSvg,
    },

    props: {
        file: {
            default: null,
        },

        hasMask: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            preloader,
            load: false,
            name: null,
            src: null,
        };
    },

    methods: {
        onMaskClick() {
            if (this.hasMask) this.deleteFile(this.file);
        },

        onDeleteItem() {
            this.deleteFile(this.file);
        },
    },

    watch: {
        load(value) {
            this.$emit('load', value);
        },
    },

    beforeMount() {
        const reader = new FileReader();
        if (this.file.type === mimeType.image.JPEG || this.file.type === mimeType.image.PNG) {
            reader.readAsDataURL(this.file);
            reader.onloadend = () => {
                this.src = reader.result;
                reader.onloadend = null;
                setTimeout(() => (this.load = true), interval.SECOND);
            };
        } else {
            this.name = this.file.name;
            setTimeout(() => (this.load = true), interval.SECOND);
        }
    },

    beforeDestroy() {
        this.$emit('load', false);
    },
};
</script>
