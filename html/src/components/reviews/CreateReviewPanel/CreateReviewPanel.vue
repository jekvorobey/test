<template>
    <div class="create-review-panel">
        <h2 class="create-review-panel__title">
            Отзывы
        </h2>
        <form class="create-review-panel__form" enctype="multipart/form-data" @submit.prevent="onSubmit">
            <input type="hidden" :value="code" name="object_code" />
            <input type="hidden" :value="type" name="object_type" />

            <div class="create-review-panel__form-review">
                <div class="create-review-panel__form-rating">
                    <span class="create-review-panel__form-rating-text">
                        Ваша оценка
                    </span>

                    <v-rating
                        class="create-review-panel__form-rating-input"
                        :value="rating"
                        @input="onRatingUpdate"
                        name="rating"
                    >
                        <template v-slot:activeLabel>
                            <v-svg name="star-small" width="20" height="20" />
                        </template>
                        <template v-slot:inactiveLabel>
                            <v-svg name="star-empty-small" width="20" height="20" />
                        </template>
                    </v-rating>
                </div>

                <div class="create-review-panel__form-description">
                    Поставь оценку и дополни свой отзыв — это поможет другим профессионалам определиться с выбором
                </div>
            </div>

            <div class="create-review-panel__form-content">
                <div class="create-review-panel__form-cell">
                    <v-input class="create-review-panel__form-input" tag="textarea" v-model="pros" name="pros">
                        Достоинства
                    </v-input>
                </div>

                <div class="create-review-panel__form-cell">
                    <v-input class="create-review-panel__form-input" tag="textarea" v-model="body" name="body">
                        Комментарий
                    </v-input>
                </div>

                <div class="create-review-panel__form-cell">
                    <v-input class="create-review-panel__form-input" tag="textarea" v-model="cons" name="cons">
                        Недостатки
                    </v-input>
                </div>

                <div class="create-review-panel__form-cell">
                    <h3 class="create-review-panel__form-title">
                        Фото и видео товара
                    </h3>

                    <span class="create-review-panel__form-subtitle">
                        Не более 10 файлов, jpeg, png, mp4, mov
                    </span>

                    <v-file
                        class="create-review-panel__form-files"
                        @change="onFilesChanged"
                        :accepted-types="fileAcceptedTypes"
                        :max-file-size="5242880"
                    >
                        <span class="create-review-panel__form-files-desc">
                            Выберите фото
                        </span>
                    </v-file>
                </div>
                <v-button class="create-review-panel__form-submit" type="submit" :disabled="isDisabled">
                    Отправить отзыв
                </v-button>
            </div>
        </form>
    </div>
</template>

<script>
import VInput from '@controls/VInput/VInput.vue';
import VButton from '@controls/VButton/VButton.vue';
import VFile from '@controls/VFile/VFile.vue';
import VRating from '@controls/VRating/VRating.vue';

import { mimeType } from '@enums';

import '@images/sprites/star-empty-small.svg';
import '@images/sprites/star-small.svg';
import './CreateReviewPanel.css';

export default {
    name: 'create-review-panel',

    components: {
        VInput,
        VButton,
        VFile,
        VRating,
    },

    props: {
        code: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            rating: 0,
            files: [],
            body: null,
            pros: null,
            cons: null,
        };
    },

    computed: {
        fileAcceptedTypes() {
            return [mimeType.image.JPEG, mimeType.image.PNG, mimeType.video.MP4, mimeType.video.MOV];
        },

        isDisabled() {
            return !this.rating || !this.body || !this.pros || !this.cons;
        },
    },

    methods: {
        onSubmit(e) {
            const formData = new FormData(e.target);
            for (const file of this.files) formData.append('files[]', file, file.name);
            this.$emit('create-review', formData);
        },

        onRatingUpdate(value) {
            this.rating = value;
        },

        onFilesChanged(files) {
            this.files = files || [];
        },
    },
};
</script>