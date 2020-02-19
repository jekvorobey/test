<template>
    <div class="popular-brands">
        <div class="popular-brands__most-popular">
            <div
                class="popular-brands__most-popular-img"
                v-for="(brand, index) in mostPopularBrands"
                :key="brand.id || index"
            >
                <v-picture :image="brand.image" />
            </div>
        </div>
        <ul class="popular-brands__list">
            <li class="popular-brands__list-item" v-for="(brand, index) in restBrands" :key="brand.id || index">
                {{ brand.name }}
            </li>
            <li v-if="canShowAll" class="popular-brands__list-item">
                <button class="popular-brands__list-btn" @click="onShowAll">{{ btnText }}</button>
            </li>
        </ul>
    </div>
</template>

<script>
import VPicture from '../controls/VPicture/VPicture.vue';
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

        popularCount: {
            type: Number,
            default: 6,
        },

        restCount: {
            type: Number,
            default: 18,
        },

        btnText: {
            type: String,
            default: 'Показать все',
        },
    },

    data() {
        return {
            showAll: false,
        };
    },

    computed: {
        mostPopularBrands() {
            return this.items.slice(0, this.popularCount);
        },

        restBrands() {
            if (this.showAll) return this.items.slice(this.popularCount, this.items.length);
            return this.items.slice(this.popularCount, this.restCount);
        },

        canShowAll() {
            return this.items.length <= this.popularCount + this.restCount && !this.showAll;
        },
    },

    methods: {
        onShowAll() {
            this.showAll = !this.showAll;
        },
    },
};
</script>

