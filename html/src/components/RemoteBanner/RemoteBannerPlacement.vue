<template>
    <div v-if="banners.length > 0" class="remote-banner-placement">
        <template v-if="banners.length === 1">
            <remote-banner
                :banner="banners[0]"
                :desktop-size="desktopSize"
                :tablet-size="tabletSize"
                :mobile-size="mobileSize"
            />
        </template>
        <template v-if="banners.length > 1">
            <v-slider
                ref="slider"
                v-model="slideIndex"
                class="container remote-banner-placement__slider"
                :options="sliderOptions"
                name="banners"
            >
                <template v-for="banner in banners">
                    <slot name="item" :item="banner">
                        <remote-banner
                            ref="remoteBanner"
                            class="swiper-slide"
                            :key="banner.id"
                            :mobile-size="mobileSize"
                            :tablet-size="tabletSize"
                            :desktop-size="desktopSize"
                            :banner="banner"
                        />
                    </slot>
                </template>
            </v-slider>
        </template>
    </div>
</template>

<script>
import { getBannersByCode } from '@api';

import RemoteBanner from './RemoteBanner.vue';

import './BannerPlacement.css';
import VSlider from '@controls/VSlider/VSlider.vue';

export default {
    name: 'remote-banner-placement',

    components: {
        VSlider,
        RemoteBanner,
    },

    props: {
        type: {
            required: true,
            type: String,
        },

        desktopSize: {
            type: Array,
            required: true,
        },

        tabletSize: {
            type: Array,
            required: true,
        },

        mobileSize: {
            type: Array,
            required: true,
        },

        watchRouter: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            slideIndex: 0,
            banners: [],
            debounce: null,
        };
    },

    computed: {
        sliderOptions() {
            return {
                slidesPerView: 1,
                grabCursor: true,
                loop: false,
                autoplay: false,

                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                },

                on: {
                    init: () => {
                        setTimeout(() => {
                            this.positionControls();
                        }, 1000);
                    },
                },
            };
        },
    },

    watch: {
        $route: {
            immediate: false,
            handler() {
                if (this.watchRouter) {
                    clearTimeout(this.debounce);

                    this.debounce = setTimeout(() => {
                        this.fetchBanner();
                    }, 100);
                }
            },
        },

        slideIndex(newValue, oldValue) {
            if (this.$refs.remoteBanner[oldValue]) {
                this.$refs.remoteBanner[oldValue].closeDescription();
            }
        },
    },

    created() {
        this.fetchBanner();
    },

    mounted() {
        window.addEventListener('resize', this.onWindowResize);
    },

    beforeDestroy() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this.onWindowResize);
        }
    },

    methods: {
        async fetchBanner() {
            const banners = await getBannersByCode(this.type, false, this.$route.fullPath);

            if (Array.isArray(banners) && banners.length > 0) {
                this.banners = banners.sort((a, b) => {
                    if (a.sort > b.sort) {
                        return 1;
                    }

                    if (a.sort < b.sort) {
                        return -1;
                    }

                    return 0;
                });
            } else {
                this.banners = [];
            }
        },

        onWindowResize() {
            this.positionControls();
        },

        positionControls() {
            const sliderElement = this.$refs.slider.$el;
            const picture = sliderElement.querySelector('.remote-banner__img');
            const controls = sliderElement.querySelector('.v-slider__controls');

            if (picture && controls) {
                const pictureHeight = picture.getBoundingClientRect().height;
                const controlsHeight = controls.getBoundingClientRect().height;

                if (pictureHeight !== 0) {
                    controls.setAttribute('style', `top: ${pictureHeight - controlsHeight - 8}px`);
                }
            }
        },
    },
};
</script>
