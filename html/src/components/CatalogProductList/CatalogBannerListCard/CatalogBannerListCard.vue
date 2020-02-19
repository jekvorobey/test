<template>
    <li class="catalog-banner-list-card">
        <div class="catalog-banner-list-card__img" v-once>
            <v-picture v-if="item.image && item.image.id">
                <template v-if="isObject">
                    <source :data-srcset="img" type="image/webp" media="(min-width: 1024px)" />
                    <img class="blur-up lazyload v-picture__img" :data-src="defaultImg" alt="" />
                </template>
                <template v-else>
                    <img class="blur-up lazyload v-picture__img" :data-src="item.image" alt="" />
                </template>
            </v-picture>
        </div>

        <div class="catalog-banner-list-card__panel" v-once>
            <div v-if="item.upperText" class="catalog-banner-list-card__panel-upper-text">
                {{ item.upperText }}
            </div>
            <div class="catalog-banner-list-card__panel-title">
                {{ item.title }}
            </div>
            <div v-if="item.bottomText" class="catalog-banner-list-card__panel-bottom-text">
                {{ item.bottomText }}
            </div>
            <v-button v-if="item.btnText" class="btn--outline catalog-banner-list-card__panel-btn">
                {{ item.btnText }}
            </v-button>
        </div>
    </li>
</template>

<script>
import VButton from '../../controls/VButton/VButton.vue';
import VPicture from '../../controls/VPicture/VPicture.vue';

import { generatePictureSourcePath } from '../../../util/images';
import './CatalogBannerListCard.css';

export default {
    name: 'catalog-banner-list-card',

    components: {
        VButton,
        VPicture,
    },

    props: {
        item: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    computed: {
        img() {
            return generatePictureSourcePath(300, 300, this.item.image.id, 'webp');
        },

        defaultImg() {
            return generatePictureSourcePath(300, 300, this.item.image.id, this.item.image.sourceExt);
        },

        isObject() {
            return this.item.image instanceof Object;
        },
    },
};
</script>
