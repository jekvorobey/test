<template>
    <div class="add-review">
        <h2 class="add-review__title">
            Отзывы
        </h2>
        <form class="add-review__form" enctype="multipart/form-data" @submit.prevent="onSubmit">
            <input type="hidden" :value="productCode" name="product_code" />

            <div class="add-review__form-review">
                <div class="add-review__form-rating">
                    <span class="add-review__form-rating-text">
                        Ваша оценка
                    </span>

                    <v-rating
                        class="add-review__form-rating-input"
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

                <div class="add-review__form-description">
                    Дополните свой отзыв — так вы поможете другим покупателям определиться с выбором
                </div>
            </div>

            <div class="add-review__form-content">
                <div class="add-review__form-cell">
                    <v-input class="add-review__form-input" tag="textarea" v-model="pros" name="pros">
                        Достоинства
                    </v-input>
                </div>

                <div class="add-review__form-cell">
                    <v-input class="add-review__form-input" tag="textarea" v-model="body" name="body">
                        Комментарий
                    </v-input>
                </div>

                <div class="add-review__form-cell">
                    <v-input class="add-review__form-input" tag="textarea" v-model="cons" name="cons">
                        Недостатки
                    </v-input>
                </div>

                <div class="add-review__form-cell">
                    <h3 class="add-review__form-title">
                        Фото и видео товара
                    </h3>

                    <span class="add-review__form-subtitle">
                        Не более 10 файлов, jpeg, png, mp4, mov
                    </span>

                    <v-file
                        class="add-review__form-files"
                        @change="onFilesChanged"
                        :accepted-types="fileAcceptedTypes"
                        :max-file-size="5242880"
                    >
                        <span class="add-review__form-files-desc">
                            Выберите фото
                        </span>
                    </v-file>
                </div>
                <v-button class="add-review__form-submit" type="submit" :disabled="isDisabled">
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
import './AddReview.css';

export default {
    name: 'add-review',

    components: {
        VInput,
        VButton,
        VFile,
        VRating,
    },

    props: {
        productCode: {
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
            this.$emit('add-review', formData);
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