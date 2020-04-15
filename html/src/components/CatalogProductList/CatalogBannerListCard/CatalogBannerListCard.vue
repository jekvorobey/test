<template>
    <li class="catalog-banner-list-card">
        <div class="catalog-banner-list-card__img" v-once>
            <v-picture>
                <source :data-srcset="desktopImg" type="image/webp" media="(min-width: 1024px)" />
                <source :data-srcset="tabletImg" type="image/webp" media="(min-width: 480px)" />
                <source :data-srcset="mobileImg" type="image/webp" media="(max-width: 479px)" />
                <img class="blur-up lazyload v-picture__img" :data-src="defaultImg" alt="" />
            </v-picture>
        </div>

        <div v-if="item.button" class="catalog-banner-list-card__panel" :class="panelClasses" v-once>
            <v-button class="catalog-banner-list-card__panel-btn" :class="btnClasses" :to="item.button.url || '/'">
                {{ item.button.text }}
            </v-button>
        </div>
    </li>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import { generatePictureSourcePath } from '@util/file';
import { fileExtension } from '@enums';
import './CatalogBannerListCard.css';

const btnType = Object.freeze({
    WHITE: 'white',
    BLACK: 'black',
    OUTLINE_BLACK: 'outline_black',
    OUTLINE_WHITE: 'outline_white',
});

const btnLocation = Object.freeze({
    TOP: 'top',
    BOTTOM: 'bottom',

    LEFT: 'left',
    RIGHT: 'right',

    TOP_LEFT: 'top_left',
    TOP_RIGHT: 'top_right',

    BOTTOM_LEFT: 'bottom_left',
    BOTTOM_RIGHT: 'bottom_right',
});

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
        mobileImg() {
            const image = this.item.mobileImage || this.item.tabletImage || this.item.desktopImage;
            return generatePictureSourcePath(320, 320, image.id, fileExtension.image.WEBP);
        },

        tabletImg() {
            const image = this.item.tabletImage || this.item.desktopImage;
            return generatePictureSourcePath(540, 360, image.id, fileExtension.image.WEBP);
        },

        desktopImg() {
            const image = this.item.desktopImage || this.item.tabletImage;
            return generatePictureSourcePath(600, 400, image.id, fileExtension.image.WEBP);
        },

        defaultImg() {
            const image = this.item.desktopImage || this.item.tabletImage || this.item.mobileImage.id;
            return generatePictureSourcePath(600, 400, image.id);
        },

        btnClasses() {
            const classes = [];
            switch (this.item.button.type) {
                case btnType.WHITE:
                    classes.push('btn--white');
                    break;
                case btnType.OUTLINE_WHITE:
                    classes.push('btn--white');
                    classes.push('btn--outline');
                    break;
                case btnType.OUTLINE_BLACK:
                    classes.push('btn--outline');
                    break;
                default:
                    break;
            }
            return classes;
        },

        panelClasses() {
            const classes = [];
            switch (this.item.button.location) {
                case btnLocation.LEFT:
                    classes.push('catalog-banner-list-card__panel--left');
                    break;
                case btnLocation.RIGHT:
                    classes.push('catalog-banner-list-card__panel--right');
                    break;

                case btnLocation.TOP:
                    classes.push('catalog-banner-list-card__panel--top');
                    break;
                case btnLocation.TOP_LEFT:
                    classes.push('catalog-banner-list-card__panel--top-left');
                    break;
                case btnLocation.TOP_RIGHT:
                    classes.push('catalog-banner-list-card__panel--top-right');
                    break;

                case btnLocation.BOTTOM:
                    classes.push('catalog-banner-list-card__panel--bottom');
                    break;
                case btnLocation.BOTTOM_LEFT:
                    classes.push('catalog-banner-list-card__panel--bottom-left');
                    break;
                case btnLocation.BOTTOM_RIGHT:
                    classes.push('catalog-banner-list-card__panel--bottom-right');
                    break;
                default:
                    break;
            }
            return classes;
        },
    },
};
</script>
