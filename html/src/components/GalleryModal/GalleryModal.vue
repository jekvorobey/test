<template>
    <general-modal v-if="isOpen" type="wide" class="gallery-modal" @close="onClose">
        <template v-slot:content>
            <div class="gallery-modal__gallery">
                <v-slider name="modal-gallery-slider" class="gallery-modal__gallery-slider" :options="galleryOptions">
                    <div class="swiper-slide gallery-modal__gallery-item" v-for="image in images" :key="image.id">
                        <v-picture v-if="image && image.id" :image="image" alt="">
                            <template v-slot:source="{ image, lazy }">
                                <source
                                    :data-srcset="generateSourcePath(750, 750, image.id, 'webp')"
                                    type="image/webp"
                                />
                            </template>
                            <template v-slot:fallback="{ image, lazy, alt }">
                                <img
                                    class="blur-up lazyload v-picture__img"
                                    :data-src="generateSourcePath(750, 750, image.id)"
                                    :alt="alt"
                                />
                            </template>
                        </v-picture>
                    </div>
                </v-slider>
            </div>
        </template>
    </general-modal>
</template>

<script>
import VSlider from '@controls/VSlider/VSlider.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import { mapState, mapActions } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PRODUCT_MODULE, PRODUCT } from '@store/modules/Product';

import { generatePictureSourcePath } from '@util/file';
import { breakpoints } from '@enums';
import './GalleryModal.css';

const galleryOptions = {
    slidesPerView: 1,
    effect: 'fade',
    grabCursor: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
};

export const NAME = 'gallery-modal';

export default {
    name: NAME,

    components: {
        VPicture,
        VSlider,

        GeneralModal,
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: state => state[MODALS][NAME] && state[MODALS][NAME].open,
            modalState: state => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),

        ...mapState(PRODUCT_MODULE, [PRODUCT]),

        galleryOptions() {
            return galleryOptions;
        },

        images() {
            const product = this[PRODUCT];
            return product ? product.media : [];
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        generateSourcePath(x, y, id, ext) {
            return generatePictureSourcePath(x, y, id, ext);
        },

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },
};
</script>
