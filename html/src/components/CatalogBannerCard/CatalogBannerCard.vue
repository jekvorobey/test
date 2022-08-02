<template>
    <component :is="bannerComponent" class="catalog-banner-card" v-bind="bannerProps">
        <div class="catalog-banner-card__img">
            <v-picture :key="item.id">
                <slot>
                    <source v-if="desktopImg" :data-srcset="desktopImg" type="image/webp" media="(min-width: 1024px)" />
                    <source v-if="tabletImg" :data-srcset="tabletImg" type="image/webp" media="(min-width: 480px)" />
                    <source v-if="mobileImg" :data-srcset="mobileImg" type="image/webp" media="(max-width: 479px)" />
                    <img
                        v-if="defaultImg"
                        class="blur-up lazyload v-picture__img"
                        :src="defaultImg"
                        :srcset="placeholderImg"
                        alt=""
                        loading="lazy"
                    />
                </slot>
            </v-picture>
        </div>

        <div v-if="isMounted && item.button" class="catalog-banner-card__panel" :class="panelClasses">
            <component
                :is="buttonComponent"
                class="btn catalog-banner-card__panel-btn"
                :class="btnClasses"
                v-bind="buttonProps"
            >
                {{ item.button.text }}
            </component>
        </div>
    </component>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import { mapState, mapActions } from 'vuex';

import { NAME as AUTH_MODULE, HAS_SESSION } from '@store/modules/Auth';

import { isExternalUrl } from '@util/router';
import { generatePictureSourcePath } from '@util/file';
import { fileExtension } from '@enums';
import './CatalogBannerCard.css';

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
    name: 'catalog-banner-card',

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

    data() {
        return {
            isMounted: false,
        };
    },

    computed: {
        ...mapState(AUTH_MODULE, [HAS_SESSION]),

        isExternal() {
            const { url } = this.item;
            return isExternalUrl(url);
        },

        isButtonExternal() {
            const { button } = this.item;
            return button && isExternalUrl(button.url);
        },

        bannerComponent() {
            const { isExternal } = this;
            return isExternal ? 'a' : 'router-link';
        },

        buttonComponent() {
            const { isButtonExternal } = this;
            return isButtonExternal ? 'a' : 'router-link';
        },

        bannerProps() {
            const { isExternal } = this;
            const { url } = this.item;

            if (isExternal)
                return {
                    href: url + '&isOpen=true',
                    target: '_blank',
                    rel: 'noopener noreferrer',
                };

            return {
                tag: 'a',
                to: url || this.$route.fullPath,
            };
        },

        buttonProps() {
            const { isButtonExternal } = this;
            const { button } = this.item;

            if (isButtonExternal) return {};

            return {
                to: (button && button.url) || this.$route.fullPath,
            };
        },

        mobileImg() {
            const image = this.item.mobileImage || this.item.tabletImage || this.item.desktopImage;
            if (image) return generatePictureSourcePath(360, 400, image.id, fileExtension.image.WEBP);
        },

        tabletImg() {
            const image = this.item.tabletImage || this.item.desktopImage;
            if (image) return generatePictureSourcePath(360, 400, image.id, fileExtension.image.WEBP);
        },

        desktopImg() {
            const image = this.item.desktopImage || this.item.tabletImage;
            if (image) return generatePictureSourcePath(400, 600, image.id, fileExtension.image.WEBP);
        },

        defaultImg() {
            const image = this.item.desktopImage || this.item.tabletImage || this.item.mobileImage;
            if (image) return generatePictureSourcePath(400, 600, image.id);
        },

        placeholderImg() {
            const image = this.item.desktopImage || this.item.tabletImage || this.item.mobileImage;
            if (image) return generatePictureSourcePath(40, 60, image.id);
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
                    classes.push('catalog-banner-card__panel--left');
                    break;
                case btnLocation.RIGHT:
                    classes.push('catalog-banner-card__panel--right');
                    break;

                case btnLocation.TOP:
                    classes.push('catalog-banner-card__panel--top');
                    break;
                case btnLocation.TOP_LEFT:
                    classes.push('catalog-banner-card__panel--top-left');
                    break;
                case btnLocation.TOP_RIGHT:
                    classes.push('catalog-banner-card__panel--top-right');
                    break;

                case btnLocation.BOTTOM:
                    classes.push('catalog-banner-card__panel--bottom');
                    break;
                case btnLocation.BOTTOM_LEFT:
                    classes.push('catalog-banner-card__panel--bottom-left');
                    break;
                case btnLocation.BOTTOM_RIGHT:
                    classes.push('catalog-banner-card__panel--bottom-right');
                    break;
                default:
                    break;
            }
            return classes;
        },
    },

    mounted() {
        this.isMounted = true;
    },
};
</script>
