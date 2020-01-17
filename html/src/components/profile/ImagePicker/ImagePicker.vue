<template>
    <div class="image-picker">
        <div class="image-picker__img">
            <img :src="image" alt="" />
        </div>
        <div class="image-picker__body">
            <div class="image-picker__body-controls">
                <v-button class="btn--outline image-picker__body-controls-btn">
                    {{ isTablet ? 'Загрузить другой' : 'Загрузить новое фото' }}
                </v-button>
                <v-link tag="button" class="image-picker__body-controls-link">
                    <v-svg v-if="isTablet" name="cross" width="24" height="24" />
                    <template v-else>Удалить</template>
                </v-link>
            </div>
            <div class="text-grey image-picker__body-note">В формате png или jpg, до 1 Мб</div>
        </div>
    </div>
</template>

<script>
import VSvg from '../../controls/VSvg/VSvg.vue';
import VButton from '../../controls/VButton/VButton.vue';
import VLink from '../../controls/VLink/VLink.vue';

import profileImg from '../../../assets/images/mock/profile.png';
import '../../../assets/images/sprites/cross.svg';
import '../../../assets/images/sprites/account-middle.svg';
import './ImagePicker.css';

export default {
    name: 'image-picker',

    components: {
        VSvg,
        VLink,
        VButton,
    },

    props: {
        image: {
            type: [String, Object],
            default: profileImg,
        },

        validTypes: {
            type: Array,
            default() {
                return ['image/jpeg', 'image/jpg', 'image/png'];
            },
        },
    },

    computed: {
        inputId() {
            return `image-picker-${this._uid}`;
        },

        types() {
            return this.validTypes.join(', ');
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        validFileType(file) {
            return this.validTypes.some(t => t === file.type);
        },

        fileChange() {
            const { files } = this.$refs.imagePicker;
            if (files.length < 1 || !this.validFileType(files[0])) return;
            this.$emit('fileChanged', files[0]);
        },
    },
};
</script>
