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
                    <img class="blur-up lazyload v-picture__img" :data-src="generatePicturePath(brand.image)" alt="" />
                </v-picture>
            </router-link>
        </div>
        <ul class="popular-brands__list">
            <li class="popular-brands__list-item" v-for="brand in restBrands.slice(0, count)" :key="brand.id">
                <router-link :to="brand.href ? brand.href : '/'" class="popular-brands__link">
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
import VLink from '@controls/VLink/VLink.vue';

import { generatePictureSourcePath } from '@util/file';
import './PopularBrands.css';

export default {
    name: 'popular-brands',

    components: {
        VPicture,
        VLink,
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
            return this.items.filter(i => !!i.image);
        },

        restBrands() {
            return this.items.filter(i => !i.image);
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

