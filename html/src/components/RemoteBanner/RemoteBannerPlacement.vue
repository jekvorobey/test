<template>
    <remote-banner
        v-if="banner"
        :banner="banner"
        :desktop-size="desktopSize"
        :tablet-size="tabletSize"
        :mobile-size="mobileSize"
    />
</template>

<script>
import { getBannersByCode } from '@api';

import RemoteBanner from './RemoteBanner.vue';
import './BannerPlacement.css';

export default {
    name: 'remote-banner-placement',

    components: {
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
            banner: null,
            debounce: null,
        };
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
    },

    created() {
        this.fetchBanner();
    },

    methods: {
        async fetchBanner() {
            const banners = await getBannersByCode(this.type, false, this.$route.fullPath);

            if (Array.isArray(banners) && banners.length > 0) {
                let banner = banners
                    .sort((a, b) => {
                        if (a.sort > b.sort) {
                            return 1;
                        }

                        if (a.sort < b.sort) {
                            return -1;
                        }

                        return 0;
                    })
                    .slice(0, 1)[0];

                if (!this.banner || banner.id !== this.banner.id) {
                    this.banner = banner;
                }
            } else {
                this.banner = null;
            }
        },
    },
};
</script>
