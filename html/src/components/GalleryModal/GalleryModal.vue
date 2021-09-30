<template>
    <general-modal v-if="isOpen" type="wide" class="gallery-modal" @close="onClose">
        <template v-slot:content>
            <div class="gallery-modal__gallery">
                <v-slider
                    class="gallery-modal__gallery-slider"
                    name="modal-gallery-slider"
                    :options="galleryOptions"
                    :controls="images.length > 1"
                >
                    <div class="swiper-slide gallery-modal__gallery-item" v-for="image in images" :key="image.id">
                        <v-picture :key="image.id" v-if="image && image.id">
                            <slot name="image" :image="image">
                                <source
                                    :data-srcset="generateSourcePath(null, null, image.id, 'webp')"
                                    type="image/webp"
                                />
                                <img
                                    class="blur-up lazyload v-picture__img"
                                    :data-src="generateSourcePath(null, null, image.id)"
                                    alt=""
                                />
                            </slot>
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

import { generatePictureSourcePath } from '@util/file';
import { breakpoints, modalName } from '@enums';
import './GalleryModal.css';

const galleryOptions = {
    slidesPerView: 1,
    effect: 'fade',
    grabCursor: true,
    keyboard: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
};

const NAME = modalName.product.GALLERY;

export default {
    name: NAME,

    components: {
        VPicture,
        VSlider,

        GeneralModal,
    },

    props: {
        images: {
            type: Array,
            default() {
                return [];
            },
        },

        galleryOptions: {
            type: Object,
            default() {
                return galleryOptions;
            },
        },
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: (state) => state[MODALS][NAME] && state[MODALS][NAME].open,
            modalState: (state) => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),
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
