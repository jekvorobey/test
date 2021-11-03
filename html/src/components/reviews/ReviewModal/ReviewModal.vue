<template>
    <general-modal v-if="isOpen" type="wide" class="review-modal" @close="onClose">
        <template v-slot:content>
            <div class="review-modal__container">
                <div class="review-modal__container-item">
                    <v-picture>
                        <slot name="image" :image="image">
                            <source :data-srcset="generateSourcePath(null, null, image.id, 'webp')" type="image/webp" />
                            <img
                                class="blur-up lazyload v-picture__img"
                                :data-src="generateSourcePath(null, null, image.id)"
                                alt=""
                            />
                        </slot>
                    </v-picture>
                </div>
            </div>
        </template>
    </general-modal>
</template>

<script>
import VPicture from '@controls/VPicture/VPicture.vue';
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import { mapState, mapActions } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { generatePictureSourcePath } from '@util/file';
import { modalName } from '@enums';

import './ReviewModal.css';

const NAME = modalName.product.REVIEW;

export default {
    name: NAME,

    components: {
        VPicture,
        GeneralModal,
    },

    props: {
        image: {
            type: Object,
            default() {
                return {};
            },
        },

        name: {
            type: String,
            default: NAME,
        },
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen(state) {
                return state[MODALS][this.name] && state[MODALS][this.name].open;
            },
            modalState(state) {
                return (state[MODALS][this.name] && state[MODALS][this.name].state) || {};
            },
        }),
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        generateSourcePath(x, y, id, ext) {
            return generatePictureSourcePath(x, y, id, ext);
        },

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: this.name, open: false });
        },
    },
};
</script>
