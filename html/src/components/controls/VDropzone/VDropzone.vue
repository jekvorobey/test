<template>
    <div class="v-dropzone">
        <slot />
        <dropzone v-on="$listeners" v-bind="$attrs">
            <div class="dropzone-custom-content">
                <label class="dropzone-custom-title">
                    <span class="v-dropzone__label">Выберите файл</span> или перетащите его сюда
                </label>
            </div>
        </dropzone>
    </div>
</template>

<script>
import dropzone from 'nuxt-dropzone';
import './VDropzone.css';

export default {
    name: 'v-dropzone',
    inheritAttrs: false,
    components: {
        dropzone,
    },
};
</script>
