<template>
    <div class="popular-brands">
        <div class="popular-brands__most-popular">
            <router-link
                class="popular-brands__most-popular-img"
                v-for="brand in mostPopularBrands"
                :key="brand.id"
                :to="brand.href ? brand.href : '/'"
            >
                <v-picture v-if="brand.image">
                    <source :data-srcset="brand.image.webp" type="image/webp" />
                    <source :data-srcset="brand.image.orig" />
                    <img class="blur-up lazyload v-picture__img" :data-src="brand.image.default" alt="" />
                </v-picture>
                <noscript>{{ brand.name }}</noscript>
            </router-link>
        </div>

        <ul class="popular-brands__list">
            <li class="popular-brands__list-item" v-for="brand in restBrands.slice(0, count)" :key="brand.id">
                <router-link class="popular-brands__link" :to="brand.href ? brand.href : '/'">
                    {{ brand.name }}
                </router-link>
            </li>
            <li v-if="canShowAll" class="popular-brands__list-item">
                <button class="popular-brands__list-btn" @click="onShowAll">Показать все</button>
            </li>
        </ul>
    </div>
</template>

<script>
import VPicture from '@controls/VPicture/VPicture.vue';

import { fileExtension } from '@enums';
import { generatePictureSourcePath } from '@util/file';
import './PopularBrands.css';

export default {
    name: 'popular-brands',

    components: {
        VPicture,
    },

    props: {
        items: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    data() {
        return {
            count: 7,
        };
    },

    computed: {
        mostPopularBrands() {
            const brands = this.items.filter((i) => !!i.image);
            return brands.map((b) => {
                const image = {
                    webp: generatePictureSourcePath(200, 80, b.image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(200, 80, b.image.id),
                    default: generatePictureSourcePath(200, 80, b.image.id),
                };

                return {
                    ...b,
                    image,
                };
            });
        },

        restBrands() {
            return this.items.filter((i) => !i.image);
        },

        restCount() {
            return this.restBrands.length;
        },

        canShowAll() {
            const rest = this.restCount - this.count;
            return rest > 0;
        },
    },

    methods: {
        onShowAll() {
            this.count = this.restCount;
        },

        generatePicturePath(image) {
            return image && generatePictureSourcePath(null, null, image.id);
        },
    },
};
</script>
