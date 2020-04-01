<template>
    <div class="image-picker">
        <label :key="inputId" :for="inputId" class="image-picker__img" :class="{ 'image-picker__img--empty': !image }">
            <v-picture v-if="image" :image="image" alt="" :lazy="false" />
            <slot v-else />
        </label>
        <form ref="form" class="image-picker__body" enctype="multipart/form-data" @submit.prevent="onSubmit">
            <div class="image-picker__body-controls">
                <v-button
                    class="btn--outline image-picker__body-controls-btn"
                    @click.prevent="$refs.imagePicker.click()"
                >
                    {{ btnText }}
                </v-button>
                <v-link
                    v-if="image"
                    tag="button"
                    type="button"
                    class="image-picker__body-controls-link"
                    @click="onDelete"
                >
                    <v-svg name="cross" width="24" height="24" />
                    <span>Удалить</span>
                </v-link>
            </div>
            <div class="text-grey image-picker__body-note">
                <template v-if="typeLabels">В формате {{ typeLabels }},</template> до 1 Мб
            </div>
            <button style="display: none" ref="submitBtn" type="submit" />
            <input
                :id="inputId"
                :key="image"
                class="image-picker__body-input"
                ref="imagePicker"
                type="file"
                :name="name"
                :accept="types"
                @change.prevent="fileChange"
            />
        </form>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VButton from '@controls/VButton/VButton.vue';
import VLink from '@controls/VLink/VLink.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import { getRandomIntInclusive } from '@util';
import '@images/sprites/cross.svg';
import '@images/sprites/account-middle.svg';
import './ImagePicker.css';

export default {
    name: 'image-picker',

    components: {
        VSvg,
        VLink,
        VButton,
        VPicture,
    },

    props: {
        image: {
            type: [String, Object],
        },

        name: {
            type: String,
            default: 'file',
        },

        validTypesMap: {
            type: Object,
            required: true,
            default() {
                return {};
            },
        },

        validSize: {
            type: [Number, String],
            default: 1000000,
        },
    },

    data() {
        return {
            btnText: 'Загрузить фото',
            inputId: null,
        };
    },

    computed: {
        types() {
            return Object.keys(this.validTypesMap).join(', ');
        },

        typeLabels() {
            return Object.values(this.validTypesMap).join(', ');
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    watch: {
        isTablet(value) {
            this.btnText = value ? 'Загрузить фото' : 'Загрузить новое фото';
        },
    },

    methods: {
        validFileType(file) {
            return Boolean(this.validTypesMap[file.type]);
        },

        validFileSize(file) {
            const validSize = Number(this.validSize);
            return file && file.size < validSize;
        },

        fileChange() {
            const { files } = this.$refs.imagePicker;
            if (files.length < 1 || !this.validFileType(files[0]) || !this.validFileSize(files[0])) {
                alert('Большой размер или неправильный формат');
                return;
            }
            const { submitBtn } = this.$refs;
            if (submitBtn) submitBtn.click();
        },

        onSubmit() {
            const { form } = this.$refs;
            const data = new FormData(form);
            this.$emit('changed', data);
        },

        onDelete() {
            this.$emit('delete');
        },
    },

    mounted() {
        this.inputId = `image-picker-${getRandomIntInclusive(0, 100000)}`;
    },
};
</script>
