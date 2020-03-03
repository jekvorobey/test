<template>
    <li class="catalog-banner-list-card">
        <div class="catalog-banner-list-card__img" v-once>
            <v-picture>
                <source
                    v-if="item.desktopImage && item.desktopImage.id"
                    :data-srcset="desktopImg"
                    type="image/webp"
                    media="(min-width: 1024px)"
                />
                <source
                    v-if="item.tabletImage && item.tabletImage.id"
                    :data-srcset="tabletImg"
                    type="image/webp"
                    media="(min-width: 480px)"
                />
                <source
                    v-if="item.mobileImage && item.mobileImage.id"
                    :data-srcset="mobileImg"
                    type="image/webp"
                    media="(max-width: 479px)"
                />
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
import VButton from '../../controls/VButton/VButton.vue';
import VPicture from '../../controls/VPicture/VPicture.vue';

import { generatePictureSourcePath } from '../../../util/images';
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
            return generatePictureSourcePath(320, 320, this.item.mobileImage.id, 'webp');
        },

        tabletImg() {
            return generatePictureSourcePath(540, 360, this.item.tabletImage.id, 'webp');
        },

        desktopImg() {
            return generatePictureSourcePath(600, 400, this.item.desktopImage.id, 'webp');
        },

        defaultImg() {
            return generatePictureSourcePath(600, 400, this.item.desktopImage.id, this.item.desktopImage.sourceExt);
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
